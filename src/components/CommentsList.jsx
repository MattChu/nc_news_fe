import { fetchComments } from "../utils/fetchComments";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Comment } from "./Comment";
import { AddComment } from "./AddComment";
import { Stack, Grid, Typography, Box } from "@mui/material";

export const CommentsList = ({ setCommentCount, comment_count }) => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);

  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const asyncGetComments = async () => {
      setIsErr(false);
      setIsLoading(true);
      try {
        const { comments } = await fetchComments(article_id);
        setComments([...comments]);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsErr(true);
      }
    };

    asyncGetComments();
  }, []);
  const sortedComments = [...comments].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const renderComments = () => {
    if (isLoading) {
      return <h2> Loading Comments...</h2>;
    }
    if (isErr) {
      return <h2>Failed to Load Comments</h2>;
    }
    return (
      <Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 1,
          }}
        >
          <AddComment setComments={setComments} setCommentCount={setCommentCount} comments={comments} />
        </Box>
        <Box sx={{ m: 1, textAlign: "center" }}>
          <Typography variant="h6">Comments</Typography>
        </Box>
        <Grid
          margin={1}
          container
          spacing={1}
          sx={{ flexWrap: "none", justifyContent: "center", alignItems: "flex-start" }}
        >
          {sortedComments.map((comment, index) => (
            <Comment
              key={comment.comment_id}
              index={index}
              comment={comment}
              setComments={setComments}
              comments={comments}
            />
          ))}
        </Grid>
      </Stack>
    );
  };

  return <>{renderComments()}</>;
};

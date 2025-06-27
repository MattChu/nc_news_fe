import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { fetchComments } from "../utils/fetchComments";

import { Comment } from "./Comment";
import { AddComment } from "./AddComment";

import { Stack, Grid, Typography, Box, Button } from "@mui/material";

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
  }, [comment_count]);

  const sortedComments = [...comments].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const renderComments = () => {
    if (isLoading) {
      return (
        <Box
          boxShadow={10}
          sx={{
            pt: 4,
            bgcolor: "white",
            display: "flex",
            height: 320,
            textAlign: "center",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <h3> Loading Comments...</h3>
        </Box>
      );
    }
    if (isErr) {
      return (
        <Grid
          container
          direction="row"
          spacing={0}
          sx={{
            m: 0,
            minHeight: 104,
            p: 1,
            pb: 2,
            justifyContent: "center",
          }}
        >
          <Typography color={"error"} textAlign={"center"} sx={{ p: 1 }}>
            <strong>Failed to Load Comments</strong>
          </Typography>
          <Button sx={{ bgcolor: "red" }} variant="contained" onClick={() => window.location.reload()}>
            <Typography variant="subtitle1" fontSize={10}>
              Click Here To Reload and Try Again
            </Typography>
          </Button>
        </Grid>
      );
    }
    return (
      <Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <AddComment setComments={setComments} setCommentCount={setCommentCount} comments={comments} />
        </Box>
        <Box sx={{ m: 4, textAlign: "center" }}>
          <Typography variant="h3" fontSize={40}>
            Comments
          </Typography>
        </Box>
        <Grid container spacing={1} sx={{ flexWrap: "none", justifyContent: "center", alignItems: "flex-start" }}>
          {sortedComments.map((comment, index) => (
            <Comment
              key={comment.comment_id}
              index={index}
              comment={comment}
              setComments={setComments}
              setCommentCount={setCommentCount}
              comments={comments}
            />
          ))}
        </Grid>
      </Stack>
    );
  };

  return <>{renderComments()}</>;
};

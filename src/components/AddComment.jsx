import { useState } from "react";
import { useParams } from "react-router";
import { postComment } from "../utils/postComment";
import { Card, CardHeader, Container, FormControl, Stack, TextField, Button, Box, Typography } from "@mui/material";

export function AddComment({ setComments, comments, setCommentCount }) {
  const { article_id } = useParams();
  const [comment, setCommentInput] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsErr(false);
    setIsLoading(true);
    try {
      const response = await postComment(article_id, comment, "grumpy19");
      setCommentInput("");
      setComments([...comments, response.postedComment]);
      setCommentCount((prev) => prev + 1);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setIsErr(true);
    }
  };

  const renderAddComment = () => {
    if (isLoading) {
      return (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            minWidth: 311,
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: 800,
              boxShadow: 6,
              px: 3,
              py: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 800,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {" "}
              <Typography
                sx={{
                  my: 1,
                }}
              >
                Posting Comment...
              </Typography>
            </Box>
          </Card>
        </Container>
      );
    }
    if (isErr) {
      return (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            minWidth: 311,
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: 800,
              boxShadow: 6,
              px: 3,
              py: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 800,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography color={"error"} textAlign={"center"} sx={{ p: 2.18 }}>
                <strong>Failed to Post Comment, Please Try Again Later</strong>
              </Typography>
            </Box>
          </Card>
        </Container>
      );
    }
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          minWidth: 311,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 800,
            boxShadow: 6,
            px: 3,
            py: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              my: 1,
            }}
          >
            Submit a Comment:
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              maxWidth: 800,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Your comment (min 10 caracters)"
              variant="outlined"
              value={comment}
              size="small"
              onChange={handleChange}
            />
            <Button
              type="submit"
              size="small"
              variant="contained"
              disabled={comment.length < 10}
              sx={{ alignSelf: "center", mb: 1 }}
            >
              Submit Comment
            </Button>
          </Box>
        </Card>
      </Container>
    );
  };

  return <>{renderAddComment()}</>;
}

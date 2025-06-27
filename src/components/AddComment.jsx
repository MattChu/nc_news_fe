import { useState, useContext } from "react";
import { useParams } from "react-router";

import { postComment } from "../utils/postComment";

import { UserContext } from "../contexts/UserContext";

import { Card, Container, TextField, Button, Box, Typography, FormControl, InputLabel } from "@mui/material";

export function AddComment({ setComments, comments, setCommentCount }) {
  const { article_id } = useParams();
  const [comment, setCommentInput] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const handleChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsErr(false);
    setIsLoading(true);
    try {
      const response = await postComment(article_id, comment, loggedInUser.username);
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
              <Typography color={"error"} alignItems={"center"} sx={{ p: 2.18 }}>
                <strong>Failed to Post Comment, Please Try Again Later</strong>
              </Typography>
              <Button sx={{ bgcolor: "red" }} variant="contained" onClick={() => window.location.reload()}>
                <Typography variant="subtitle1" fontSize={10}>
                  Click Here To Reload and Try Again
                </Typography>
              </Button>
            </Box>
          </Card>
        </Container>
      );
    }
    return (
      <Card
        sx={{
          width: "100%",
          maxWidth: 800,
          boxShadow: 6,
          px: 3,
          py: 2,
          mt: 2,
        }}
      >
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
          <FormControl>
            <InputLabel for="comment" />
            <TextField
              id="comment"
              fullWidth
              multiline
              rows={3}
              label="Submit a Comment"
              variant="outlined"
              value={comment}
              size="small"
              onChange={handleChange}
              helperText="Minimum 10 characters required"
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
          </FormControl>
        </Box>
      </Card>
    );
  };

  return <>{renderAddComment()}</>;
}

import { deleteComment } from "../utils/deleteComment";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

export function DeleteComment({ setComments, comment_id, setCommentCount }) {
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsErr(false);
    setIsLoading(true);
    try {
      await deleteComment(comment_id);
      setComments((prev) => prev.filter((c) => c.comment_id !== comment_id));
      setCommentCount((prev) => prev - 1);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setIsErr(true);
    }
  };

  const renderDeleteComment = () => {
    if (isLoading) {
      return (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            maxWidth: 800,
            display: "flex",
            alignContent: "left",
            flexDirection: "column",
            mt: 1,
          }}
        >
          <Typography>Deleting Comment...</Typography>
        </Box>
      );
    }
    if (isErr) {
      return <h3>Failed to Delete Comment</h3>;
    }
    return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 800,
          display: "flex",
          alignContent: "left",
          flexDirection: "column",
          mt: 1,
        }}
      >
        <Button type="submit" size="small" variant="contained" sx={{ alignSelf: "center", mb: 1, bgcolor: "red" }}>
          Delete This Comment
        </Button>
      </Box>
    );
  };

  return <>{renderDeleteComment()}</>;
}

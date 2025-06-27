import { useState } from "react";

import { deleteComment } from "../utils/deleteComment";

import { Box, Button, Typography, Grid } from "@mui/material";

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
      return (
        <Grid
          container
          direction="row"
          sx={{
            minHeight: 104,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography color={"error"} textAlign={"center"}>
            <strong>Failed to Delete Comment</strong>
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
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ pt: 1, display: "flex", flexDirection: "column", justifyContent: "right" }}
      >
        <Button
          type="submit"
          size="small"
          variant="outlined"
          sx={{
            border: "ButtonText",
          }}
        >
          <Typography variant="subtitle1" color="red" component="h4" fontSize={10}>
            <strong>Delete Comment</strong>
          </Typography>
        </Button>
      </Box>
    );
  };

  return <>{renderDeleteComment()}</>;
}

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
          spacing={4}
          sx={{
            minHeight: 104,
            p: 1,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography color={"error"} textAlign={"center"} sx={{ p: 2.18 }}>
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
      <Box component="form" onSubmit={handleSubmit} sx={{ pt: 2, m: 0, display: "flex", justifyContent: "right" }}>
        <Button type="submit" size="small" variant="contained" sx={{ alignSelf: "right", bgcolor: "red" }}>
          <Typography variant="subtitle1" fontSize={10}>
            Delete Comment
          </Typography>
        </Button>
      </Box>
    );
  };

  return <>{renderDeleteComment()}</>;
}

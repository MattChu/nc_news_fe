import { DeleteComment } from "./DeleteComment";
import { formatDate } from "../utils/formatDate";
import { Grid, Card, CardContent, Box, Typography, Divider, Badge } from "@mui/material";
import { ThumbUp, ThumbDown } from "@mui/icons-material";

export const Comment = ({ comment, setComments, comments, setCommentCount }) => {
  const isPosiVotes = comment.votes >= 0;
  return (
    <Card sx={{ maxWidth: 320, boxShadow: 4 }}>
      <CardContent>
        <Box sx={{ my: 1 }}>
          <Typography gutterBottom variant="body1" sx={{ textTransform: "capitalize" }}>
            {comment.body}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ my: 1 }}>
          <Typography variant="body4" size="small" sx={{ my: 2, color: "text.secondary" }}>
            Written by {comment.author} on {formatDate(comment.created_at)}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Grid
          container
          direction="row"
          spacing={4}
          sx={{
            mt: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid>
            <Badge sx={{ p: 0.4 }} showZero={true} badgeContent={comment.votes} color="primary">
              {isPosiVotes ? <ThumbUp sx={{ color: "green" }} /> : <ThumbDown sx={{ color: "red" }} />}
            </Badge>
          </Grid>
        </Grid>
        <Grid>
          {comment.author === "grumpy19" ? (
            <DeleteComment
              setComments={setComments}
              comment_id={comment.comment_id}
              comments={comments}
              setCommentCount={setCommentCount}
            />
          ) : (
            ""
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

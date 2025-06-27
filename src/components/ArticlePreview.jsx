import { useNavigate } from "react-router";

import { formatDate } from "../utils/formatDate";

import { Badge, Divider, Grid, Box, CardContent, Typography, Card, CardActionArea, CardMedia } from "@mui/material";
import { ThumbUp, ThumbDown, ChatBubble } from "@mui/icons-material";

export const ArticlePreview = ({ article }) => {
  const navigate = useNavigate();
  const isPosiVotes = article.votes >= 0;

  return (
    <Card sx={{ width: 320, boxShadow: 4, display: "flex", justifyContent: "center" }}>
      <CardActionArea onClick={() => navigate(`/articles/${article.article_id}`)} sx={{ maxWidth: 320, padding: 2 }}>
        <CardMedia
          sx={{ height: 140, boxShadow: 4 }}
          image={article.article_img_url}
          title={article.title}
          alt={`Lead image for article ${article.title}`}
        />
        <CardContent>
          <Box sx={{ mb: 1 }}>
            <Typography variant="body1" sx={{ textTransform: "capitalize" }}>
              {article.title}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ my: 1 }}>
            <Typography variant="body2" size="small" sx={{ my: 2, color: "text.secondary" }}>
              Written by {article.author} on {formatDate(article.created_at)}
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
              <Badge sx={{ p: 0.4 }} showZero={true} badgeContent={article.votes} color="primary">
                {isPosiVotes ? <ThumbUp sx={{ color: "green" }} /> : <ThumbDown sx={{ color: "red" }} />}
              </Badge>
            </Grid>
            <Grid>
              <Badge sx={{ p: 0.4 }} showZero={true} badgeContent={article.comment_count} color="primary">
                <ChatBubble />
              </Badge>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

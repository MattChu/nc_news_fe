import { useNavigate } from "react-router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import { ChatBubble } from "@mui/icons-material";
import { Badge, Divider, Grid, Box } from "@mui/material";
import { formatDate } from "../utils/formatDate";

export const ArticlePreview = ({ article }) => {
  const navigate = useNavigate();
  const isPosiVotes = article.votes >= 0;

  return (
    <Card sx={{ maxWidth: 320, boxShadow: 4 }}>
      <CardActionArea onClick={() => navigate(`/articles/${article.article_id}`)} sx={{ maxWidth: 300, padding: 2 }}>
        <CardMedia sx={{ height: 140, boxShadow: 4 }} image={article.article_img_url} title={article.title} />
        <CardContent>
          <Box sx={{ my: 1 }}>
            <Typography gutterBottom variant="body1" sx={{ textTransform: "capitalize" }}>
              {article.title}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ my: 1 }}>
            <Typography variant="body4" size="small" sx={{ my: 2, color: "text.secondary" }}>
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

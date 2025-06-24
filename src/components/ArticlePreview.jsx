import { useNavigate } from "react-router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { formatDate } from "../utils/formatDate";

export const ArticlePreview = ({ article }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 360 }}>
      <CardActionArea onClick={() => navigate(`/articles/${article.article_id}`)} sx={{ maxWidth: 300, padding: 2 }}>
        <CardMedia sx={{ height: 140 }} image={article.article_img_url} title={article.title} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {article.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Written by {article.author} on {formatDate(article.created_at)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// export const ArticlePreview = ({ article }) => {
//   const published = String(new Date(article.created_at));
//   return (
//     <Card>
//       <CardContent>
//         <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
//           Topic: {article.topic}
//         </Typography>
//         <Typography variant="h5" component="div">
//           {article.title}
//         </Typography>
//         <Typography sx={{ color: "text.secondary", mb: 1.5 }}>By {article.author}</Typography>

//         <p>Votes: {article.votes}</p>
//         <p>Comments: {article.comment_count}</p>
//         <p>Published: {published}</p>
//         <img src={article.article_img_url} />
//         <Link to={`/articles/${article.article_id}`}>See Details...</Link>
//       </CardContent>
//     </Card>
//   );
// };

import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { fetchArticleByID } from "../utils/fetchArticleByID";
import { Vote } from "./Vote";
import { formatDate } from "../utils/formatDate";
import { CommentsList } from "./CommentsList";
import { Uhoj } from "./Uhoj";
import { ChatBubble } from "@mui/icons-material";

import { Card, CardHeader, CardMedia, Container, Badge, Grid, Typography, Box, Stack } from "@mui/material";
import { Loader } from "./Loader";

export const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [votes, setVotes] = useState(0);
  const [comment_count, setCommentCount] = useState(0);
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const asyncGetArticle = async () => {
      setIsErr(false);
      setIsLoading(true);
      try {
        const response = await fetchArticleByID(article_id);
        setArticle(response.article);
        setVotes(response.article.votes);
        setCommentCount(response.article.comment_count);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsErr(true);
      }
    };

    asyncGetArticle();
  }, []);

  const renderArticle = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (isErr) {
      return <Uhoj />;
    }

    return (
      <Container sx={{ maxWidth: { lg: 1600 }, p: 0 }}>
        <Card sx={{ justifyContent: "center", boxShadow: 10, p: 1.5 }}>
          <Typography
            variant={"h2"}
            sx={{
              textTransform: "capitalize",
              textAlign: "center",
              py: 3,
              px: 4,
              fontSize: { xs: 30, md: 40 },
            }}
          >
            {article.title}
          </Typography>
          <Grid container sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
            <Grid sx={{ display: "flex", justifyContent: "center" }}>
              <CardMedia
                component="img"
                loading="lazy"
                sx={{
                  width: "80%",
                  height: "auto",
                  boxShadow: 4,
                  borderRadius: 2,
                }}
                image={article.article_img_url}
                title={`Lead image for article ${article.title}`}
                alt={`Lead image for article ${article.title}`}
              />
            </Grid>
            <Grid sx={{ padding: 1, mt: 4, mx: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  maxWidth: 1200,
                  lineHeight: 1.2,
                  textAlign: "justify",
                }}
              >
                {article.body}
              </Typography>
            </Grid>
          </Grid>
          <Stack spacing={1} sx={{ mx: 4, p: 3, marginBottom: 0 }}>
            <Typography textAlign={"center"} variant="subtitle">
              Written by <strong>{article.author} </strong> on {formatDate(article.created_at)} in{" "}
              <Link to={`/topics/${article.topic}`}>{article.topic}</Link>.
            </Typography>
            <Grid
              container
              direction="row"
              spacing={1}
              sx={{
                pt: 3,
                pb: 0,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Vote setVotes={setVotes} votes={votes} />
              <Grid>
                <Badge sx={{ p: 0.4 }} showZero={true} badgeContent={comment_count} color="primary">
                  <ChatBubble />
                </Badge>
              </Grid>
            </Grid>
          </Stack>
        </Card>

        {!isLoading && !isErr ? <CommentsList setCommentCount={setCommentCount} comment_count={comment_count} /> : null}
      </Container>
    );
  };

  return <section className="article">{renderArticle()}</section>;
};

import { fetchArticles } from "../utils/fetchArticles";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArticlePreview } from "./ArticlePreview";
import { QueryProvider } from "./QueryProvider";
import { Loader } from "./Loader";
import { Uhoj } from "./Uhoj";

import { Grid } from "@mui/material";

export const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const topic = searchParams.get("topic") ?? "";
  const sort_by = searchParams.get("sort_by") ?? "created_at";
  const order = searchParams.get("order") ?? "DESC";

  useEffect(() => {
    const asyncGetArticles = async () => {
      setIsErr(false);
      setIsLoading(true);
      try {
        const { articles } = await fetchArticles(topic, sort_by, order);
        setArticles(articles);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsErr(true);
      }
    };

    asyncGetArticles();
  }, [topic, sort_by, order]);

  const renderArticles = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (isErr) {
      return <Uhoj />;
    }
    return (
      <Grid container>
        <QueryProvider />
        <Grid
          margin={3}
          container
          spacing={3}
          sx={{ flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start" }}
        >
          {articles.map((article) => (
            <ArticlePreview key={article.article_id} article={article} />
          ))}
        </Grid>
      </Grid>
    );
  };

  return <>{renderArticles()}</>;
};

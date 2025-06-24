import { fetchArticles } from "../utils/fetchArticles";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArticlePreview } from "./ArticlePreview";
import { QueryProvider } from "./QueryProvider";

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
      return <h2> Loading Articles...</h2>;
    }
    if (isErr) {
      return <Uhoj />;
    }
    return (
      <section className="articlesview">
        <QueryProvider />
        <section className="article-list">
          {" "}
          <h4>Articles</h4>
          {articles.map((article) => (
            <ArticlePreview key={article.article_id} article={article} />
          ))}
        </section>
      </section>
    );
  };

  return <>{renderArticles()}</>;
};

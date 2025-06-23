import { fetchArticles } from "../utils/fetchArticles";
import { useState, useEffect } from "react";
import ArticlePreview from "./ArticlePreview";

export const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const asyncGetArticles = async () => {
      const { articles } = await fetchArticles();
      setArticles([...articles]);
    };

    asyncGetArticles();
  }, []);
  return (
    <>
      <section className="article-list">
        <h4>Articles</h4>
        {articles.map((article) => (
          <ArticlePreview key={article.id} article={article} />
        ))}
      </section>
    </>
  );
};

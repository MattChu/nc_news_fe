import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchArticleByID } from "../utils/fetchArticleByID";

export const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    const asyncGetArticle = async () => {
      const article = await fetchArticleByID(article_id);
      setArticle({ ...article.article });
    };

    asyncGetArticle();
  }, [article_id]);

  const published = String(new Date(article.created_at));
  return (
    <section className="article">
      <h2>{article.title}</h2>
      <img src={article.article_img_url} />
      <p>{article.body}</p>
      <p>Topic: {article.topic}</p>
      <p>Author: {article.author}</p>
      <p>Published: {published}</p>
    </section>
  );
};

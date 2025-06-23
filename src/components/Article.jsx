import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchArticleByID } from "../utils/fetchArticleByID";
import { Vote } from "./Vote";

export const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    const asyncGetArticle = async () => {
      const response = await fetchArticleByID(article_id);
      setArticle({ ...response.article });

      setVotes(response.article.votes);
    };

    asyncGetArticle();
  }, []);

  console.log(votes);

  const published = String(new Date(article.created_at));
  return (
    <section className="article">
      <h2>{article.title}</h2>
      <img src={article.article_img_url} />
      <p>{article.body}</p>
      <p>Topic: {article.topic}</p>
      <p>Author: {article.author}</p>
      <p>Votes: {article.votes}</p>
      <p>Comments: {article.comment_count}</p>
      <p>Published: {published}</p>
      <Vote article_id={article_id} setVotes={setVotes} votes={votes} />
    </section>
  );
};

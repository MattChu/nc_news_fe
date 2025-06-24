import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchArticleByID } from "../utils/fetchArticleByID";
import { Vote } from "./Vote";
import { formatDate } from "../utils/formatDate";
import { CommentsList } from "./CommentsList";
import { Uhoj } from "./Uhoj";

export const Article = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [votes, setVotes] = useState(0);

  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const asyncGetArticle = async () => {
      setIsErr(false);
      setIsLoading(true);
      try {
        const response = await fetchArticleByID(article_id);
        setArticle({ ...response.article });
        setVotes(response.article.votes);
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
      return <h2> Loading Article...</h2>;
    }
    if (isErr) {
      return <Uhoj />;
    }
    return (
      <>
        <section className="article">
          <h2>{article.title}</h2>
          <img
            src={article.article_img_url}
            title={`image for article ${article.title}`}
            alt={`image for article ${article.title}`}
          />
          <p>{article.body}</p>
          <p>Topic: {article.topic}</p>
          <p>Author: {article.author}</p>
          <p>Votes: {article.votes}</p>
          <p>Comments: {article.comment_count}</p>
          <p>Published: {formatDate(article.created_at)}</p>
          <Vote setVotes={setVotes} votes={votes} />
        </section>
        <CommentsList />
      </>
    );
  };

  return <section className="article">{renderArticle()}</section>;
};

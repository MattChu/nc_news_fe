import { Link } from "react-router";

const ArticlePreview = ({ article }) => {
  const published = String(new Date(article.created_at));
  return (
    <section className="articlepreview">
      <h5>{article.title}</h5>
      <p>Author: {article.author}</p>
      <p>Topic: {article.topic}</p>
      <p>Votes: {article.votes}</p>
      <p>Comments: {article.comment_count}</p>
      <p>Published: {published}</p>
      <img src={article.article_img_url} />
      <Link to={`/articles/${article.article_id}`}>See Details...</Link>
    </section>
  );
};

export default ArticlePreview;

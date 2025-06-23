export const Comment = ({ comment }) => {
  const published = String(new Date(comment.created_at));

  return (
    <section className="comment">
      <h3>Author: {comment.author}</h3>
      <p>Wrote: {comment.body}</p>
      <p>Published: {published}</p>
      <p>Votes: {comment.votes}</p>
    </section>
  );
};

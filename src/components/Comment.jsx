import { DeleteComment } from "./DeleteComment";
import { formatDate } from "../utils/formatDate";

export const Comment = ({ comment, setComments, comments }) => {
  return (
    <section className="comment">
      <h4>Author: {comment.author}</h4>
      <p>Wrote: {comment.body}</p>
      <p>Published: {formatDate(comment.created_at)}</p>
      <p>Votes: {comment.votes}</p>
      {comment.author === "grumpy19" ? (
        <DeleteComment setComments={setComments} comment_id={comment.comment_id} comments={comments} />
      ) : null}
    </section>
  );
};

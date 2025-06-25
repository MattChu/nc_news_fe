import { deleteComment } from "../utils/deleteComment";
import { useState } from "react";

export function DeleteComment({ setComments, comment_id, comments, index, setCommentCount }) {
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsErr(false);
    setIsLoading(true);
    try {
      await deleteComment(comment_id);
      setIsLoading(false);
      setComments((prev) => prev.filter((c) => c.comment_id !== comment_id));
      setCommentCount((prev) => prev - 1);
    } catch (err) {
      setIsLoading(false);
      setIsErr(true);
    }
  };

  const renderDeleteComment = () => {
    if (isLoading) {
      return <h3> deleting comment...</h3>;
    }
    if (isErr) {
      return <h3>Failed to Delete Comment</h3>;
    }
    return (
      <section className="addcomment">
        <form onSubmit={handleSubmit}>
          <h4>Delete Comment:</h4>
          <button type="Submit">Delete Comment</button>
        </form>
      </section>
    );
  };

  return <>{renderDeleteComment()}</>;
}

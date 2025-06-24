import { useState } from "react";
import { useParams } from "react-router";
import { postComment } from "../utils/postComment";

export function AddComment({ setComments, comments }) {
  const { article_id } = useParams();
  const [comment, setCommentInput] = useState("");
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setCommentInput(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsErr(false);
    setIsLoading(true);
    try {
      const response = await postComment(article_id, comment, "grumpy19");
      setCommentInput("");
      setComments([...comments, response.postedComment]);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setIsErr(true);
    }
  };

  const renderAddComment = () => {
    if (isLoading) {
      return <h3> posting comment...</h3>;
    }
    if (isErr) {
      return <h3>Failed to Post Comment</h3>;
    }
    return (
      <section className="addcomment">
        <form onSubmit={handleSubmit}>
          <h4>Make a Comment:</h4>
          <input type="text" value={comment} onChange={handleChange} />
          <button type="Submit" disabled={comment.length < 10}>
            Submit Comment
          </button>
        </form>
      </section>
    );
  };

  return <>{renderAddComment()}</>;
}

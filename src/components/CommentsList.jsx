import { fetchComments } from "../utils/fetchComments";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Comment } from "./Comment";

export const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();
  useEffect(() => {
    const asyncGetComments = async () => {
      const { comments } = await fetchComments(article_id);
      setComments([...comments]);
    };

    asyncGetComments();
  }, []);
  return (
    <>
      <section className="comment-list">
        <h4>Comments</h4>
        {comments.map((comment) => (
          <Comment key={comment.comment_id} comment={comment} />
        ))}
      </section>
    </>
  );
};

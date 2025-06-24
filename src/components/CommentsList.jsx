import { fetchComments } from "../utils/fetchComments";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Comment } from "./Comment";
import { AddComment } from "./AddComment";

export const CommentsList = () => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);

  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const asyncGetComments = async () => {
      setIsErr(false);
      setIsLoading(true);
      try {
        const { comments } = await fetchComments(article_id);
        setComments([...comments]);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsErr(true);
      }
    };

    asyncGetComments();
  }, []);

  const sortedComments = [...comments].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const renderComments = () => {
    if (isLoading) {
      return <h2> Loading Comments...</h2>;
    }
    if (isErr) {
      return <h2>Failed to Load Comments</h2>;
    }
    return (
      <section className="commentview">
        <AddComment setComments={setComments} comments={comments} />

        <section className="comment-list">
          <h3>Comments</h3>
          {sortedComments.map((comment, index) => (
            <Comment
              key={comment.comment_id}
              index={index}
              comment={comment}
              setComments={setComments}
              comments={comments}
            />
          ))}
        </section>
      </section>
    );
  };

  return <>{renderComments()}</>;
};

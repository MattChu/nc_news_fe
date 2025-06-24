import { useParams } from "react-router";
import { useState } from "react";
import { patchArticleVotes } from "../utils/patchArticleVotes";

export function Vote({ setVotes, votes }) {
  const { article_id } = useParams();
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (voteChange) => {
    setVotes((preVotes) => preVotes + voteChange);
    setIsErr(false);
    setIsLoading(true);
    try {
      await patchArticleVotes(article_id, voteChange);
      setIsLoading(false);
    } catch (err) {
      setVotes((preVotes) => preVotes - voteChange);
      setIsLoading(false);
      setIsErr(true);
    }
  };

  const renderVote = () => {
    if (isLoading) {
      return <h3> voting...</h3>;
    }
    if (isErr) {
      return <h3>Failed to Vote</h3>;
    }
    return (
      <form className="votebuttons">
        <p>Votes: {votes} </p>
        <button type="button" onClick={() => handleClick(-1)}>
          DownVote
        </button>
        <button type="button" onClick={() => handleClick(1)}>
          UpVote
        </button>
      </form>
    );
  };

  return <>{renderVote()}</>;
}

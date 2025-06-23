import { patchArticleVotes } from "../utils/patchArticleVotes";

export function Vote({ article_id, setVotes, votes }) {
  const handleClick = async (voteChange) => {
    setVotes((preVotes) => preVotes + voteChange);
    await patchArticleVotes(article_id, voteChange);
  };

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
}

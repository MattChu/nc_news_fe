export async function patchArticleVotes(article_id, voteChange) {
  const response = await fetch(`https://nc-news-mnui.onrender.cm/api/articles/${article_id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inc_votes: voteChange }),
  });

  if (!response.ok) {
    throw new Error("failed to patch votes");
  }
}

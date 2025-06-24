export async function postComment(article_id, comment, username) {
  const response = await fetch(`https://nc-news-mnui.onrender.com/api/articles/${article_id}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, body: comment }),
  });

  if (!response.ok) {
    throw new Error("failed to post comment");
  }

  return response.json();
}

export async function fetchComments(article_id) {
  const res = await fetch(`https://nc-news-mnui.onrender.com/api/articles/${article_id}/comments`);
  if (!res.ok) {
    const err = new Error("Failed to fetch comments");
    err.status = res.status;
    throw err;
  }
  return res.json();
}

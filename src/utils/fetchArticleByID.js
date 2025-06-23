export async function fetchArticleByID(article_id) {
  const res = await fetch(`https://nc-news-mnui.onrender.com/api/articles/${article_id}`);
  if (!res.ok) {
    const err = new Error("Failed to fetch article");
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export async function fetchArticles() {
  const res = await fetch(`https://nc-news-mnui.onrender.com/api/articles`);
  if (!res.ok) {
    const err = new Error("Failed to fetch articles");
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export async function fetchArticles(topic, sort_by, order) {
  let url = `https://nc-news-mnui.onrender.com/api/articles`;
  if (topic || sort_by || order) {
    url += "?";
  }

  if (topic && topic !== "All") {
    url += `&topic=${topic}`;
  }

  if (sort_by) {
    url += `&sort_by=${sort_by}`;
  }

  if (order) {
    url += `&order=${order}`;
  }
  const res = await fetch(url);
  if (!res.ok) {
    const err = new Error("Failed to fetch articles");
    err.status = res.status;
    throw err;
  }
  return res.json();
}

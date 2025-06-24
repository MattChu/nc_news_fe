export async function fetchTopics() {
  const res = await fetch(`https://nc-news-mnui.onrender.com/api/topics`);
  if (!res.ok) {
    const err = new Error("Failed to fetch topicss");
    err.status = res.status;
    throw err;
  }
  return res.json();
}

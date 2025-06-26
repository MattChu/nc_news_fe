export async function fetchUsers() {
  let url = `https://nc-news-mnui.onrender.com/api/users`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = new Error("Failed to fetch articles");
    err.status = res.status;
    throw err;
  }
  return res.json();
}

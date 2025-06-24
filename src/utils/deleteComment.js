export async function deleteComment(comment_id) {
  const response = await fetch(`https://nc-news-mnui.onrender.com/api/comments/${comment_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("failed to delete comment");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("id");

  if (!articleId) {
    document.getElementById("article-container").innerHTML = "<p>Article not found.</p>";
    return;
  }

  try {
    const response = await fetch(`articles/${articleId}.json`);
    if (!response.ok) throw new Error("Article not found");

    const article = await response.json();

    document.getElementById("article-heading").textContent = article.heading || "Untitled";
    document.getElementById("article-image").src = `images/${article.image || "default.jpg"}`;
    document.getElementById("article-body").innerHTML = article.body || "No content available.";
    document.getElementById("breadcrumb-article-heading").textContent = article.heading || "Article";
  } catch (error) {
    console.error("Error loading article:", error);
    document.getElementById("article-container").innerHTML = "<p>Error loading article.</p>";
  }
});

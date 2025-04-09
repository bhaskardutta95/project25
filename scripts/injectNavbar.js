document.addEventListener("DOMContentLoaded", () => {
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    fetch("components/navbar.html")
      .then(res => res.text())
      .then(html => {
        navbarPlaceholder.innerHTML = html;
      })
      .catch(err => {
        console.error("Failed to load navbar:", err);
      });
  });
  
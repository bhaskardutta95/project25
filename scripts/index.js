fetch('articles.json')
  .then(res => res.json())
  .then(articles => {
    // Sort by newest first
    articles.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

    const banner = articles[0];

    // Get containers
    const bannerSection = document.getElementById('banner-section');
    const trendingSection = document.getElementById('trending-section');
    const exclusiveSection = document.getElementById('exclusive-section');
    const latestSection = document.getElementById('latest-section');

    // --- Banner (Latest article overall) ---
    bannerSection.innerHTML = `
      <a href="article.html?id=${banner.id}" class="text-decoration-none text-light">
        <div class="card bg-secondary border-0">
          <img src="${banner.image}" class="card-img-top" alt="${banner.heading}">
          <div class="card-body">
            <h3 class="card-title">${banner.heading}</h3>
          </div>
        </div>
      </a>
    `;

    // --- Remaining articles by type ---
    articles.slice(1).forEach(article => {
      // Common card for Exclusive and Latest
      const articleCard = `
        <a href="article.html?id=${article.id}" class="text-decoration-none text-light">
          <div class="card h-100 bg-secondary border-0">
            <img src="${article.image}" class="card-img-top" alt="${article.heading}">
            <div class="card-body">
              <h5 class="card-title">${article.heading}</h5>
            </div>
          </div>
        </a>
      `;

      // Compact card for Trending
      const miniCard = `
        <a href="article.html?id=${article.id}" class="text-decoration-none text-light">
          <div class="card bg-secondary border-0">
            <div class="row g-0">
              <div class="col-4">
                <img src="${article.image}" class="img-fluid rounded-start" alt="${article.heading}">
              </div>
              <div class="col-8">
                <div class="card-body p-2">
                  <h6 class="card-title mb-0">${article.heading}</h6>
                </div>
              </div>
            </div>
          </div>
        </a>
      `;

      // Place into section by type
      if (article.type === "TRENDING") {
        trendingSection.innerHTML += miniCard;
      } else if (article.type === "EXCLUSIVE") {
        exclusiveSection.innerHTML += `<div class="col-md-4">${articleCard}</div>`;
      } else if (article.type === "LATEST") {
        latestSection.innerHTML += `<div class="col-md-4">${articleCard}</div>`;
      }
    });
  })
  .catch(err => {
    console.error("Failed to load articles.json:", err);
  });

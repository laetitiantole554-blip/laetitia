document.addEventListener("DOMContentLoaded", () => {
  const loading = document.querySelector(".loading-screen");
  if (loading) {
    window.setTimeout(() => loading.classList.add("hide"), 800);
  }

  const counters = document.querySelectorAll(".counter");
  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = Number(counter.dataset.target || 0);
      const duration = 1400;
      const startTime = performance.now();
      const step = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        counter.textContent = `${value}${target >= 500 ? "+" : ""}`;
        if (progress < 1) requestAnimationFrame(step);
        else counter.textContent = `${target}+`;
      };
      requestAnimationFrame(step);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.6 },
  );

  const statsSection = document.querySelector(".stats-section");
  if (statsSection) observer.observe(statsSection);

  document.querySelectorAll(".faq-item").forEach((item) => {
    item.querySelector(".faq-question").addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  const backToTop = document.querySelector(".back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) backToTop?.classList.add("show");
    else backToTop?.classList.remove("show");
  });
  backToTop?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );

  const toggleTheme = document.querySelector("#themeToggle");
  const savedTheme = localStorage.getItem("sfh-theme");
  if (savedTheme === "dark") document.body.classList.add("dark-mode");
  toggleTheme?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "sfh-theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light",
    );
  });

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const count = document.querySelector("#cartCount");
      if (count) count.textContent = Number(count.textContent) + 1;
      button.innerHTML = '<i class="fas fa-check"></i> Added';
      button.classList.add("btn-success");
    });
  });

  const searchInput = document.querySelector("#marketplaceSearch");
  const productCards = document.querySelectorAll(".product-card");
  searchInput?.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    productCards.forEach((card) => {
      const label = card.dataset.name.toLowerCase();
      card.style.display = label.includes(query) ? "block" : "none";
    });
  });
});

(function () {
  const projects = window.projects || [];
  const list = document.getElementById("project-list");
  const year = document.getElementById("year");
  const header = document.querySelector(".site-header");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function linkOrPlaceholder(url, label) {
    if (url) {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    }
    return `<a class="is-disabled" aria-disabled="true">${label}</a>`;
  }

  function mediaMarkup(project) {
    if (project.image) {
      return `<img src="${project.image}" alt="${project.title} preview" loading="lazy" />`;
    }
    const initials = project.title
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
    return `<div class="project-media-fallback" aria-hidden="true">${initials}</div>`;
  }

  if (list) {
    list.innerHTML = projects
      .map(
        (project, index) => `
          <li class="project-item" style="transition-delay: ${index * 60}ms">
            <div class="project-copy">
              <h3>${project.title}</h3>
              <p>${project.summary}</p>
              <div class="project-meta">
                ${project.stack.map((item) => `<span>${item}</span>`).join("")}
              </div>
              <div class="project-links">
                ${linkOrPlaceholder(project.repo, "GitHub")}
                ${linkOrPlaceholder(project.demo, "Live Demo")}
                ${linkOrPlaceholder(project.youtube, "YouTube")}
              </div>
            </div>
            <div class="project-media">${mediaMarkup(project)}</div>
          </li>
        `
      )
      .join("");
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll(".project-item").forEach((el) => observer.observe(el));

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

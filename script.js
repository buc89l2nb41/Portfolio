(function () {
  const projects = window.projects || [];
  const featuredList = document.getElementById("featured-list");
  const otherList = document.getElementById("other-list");

  function linkOrPlaceholder(url, label) {
    if (url) {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    }
    return `<a class="is-disabled" aria-disabled="true">${label}</a>`;
  }

  function getYouTubeId(url) {
    if (!url) return null;
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?/]+)/
    );
    return match ? match[1] : null;
  }

  function buildGalleryItems(project) {
    const items = [];
    const youtubeId = getYouTubeId(project.youtube);

    if (youtubeId) {
      items.push({
        type: "youtube",
        id: youtubeId,
        thumb: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      });
    }

    (project.images || []).forEach((src) => {
      items.push({ type: "image", src, thumb: src });
    });

    return items;
  }

  function fallbackMarkup(title) {
    const initials = title
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

    return `<div class="project-media-fallback" aria-hidden="true">${initials}</div>`;
  }

  function mainContentMarkup(item, title) {
    if (item.type === "youtube") {
      return `<iframe
        src="https://www.youtube.com/embed/${item.id}"
        title="${title} video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        loading="lazy"
      ></iframe>`;
    }

    return `<img src="${item.src}" alt="${title} screenshot" loading="lazy" />`;
  }

  function galleryMarkup(project) {
    const items = buildGalleryItems(project);

    if (!items.length) {
      return fallbackMarkup(project.title);
    }

    const thumbs = items
      .map(
        (item, index) => `
          <button
            type="button"
            class="gallery-thumb${index === 0 ? " is-active" : ""}"
            data-index="${index}"
            aria-label="${item.type === "youtube" ? "영상" : "스크린샷"} ${index + 1}"
            aria-current="${index === 0 ? "true" : "false"}"
          >
            <img src="${item.thumb}" alt="" loading="lazy" />
            ${item.type === "youtube" ? '<span class="gallery-thumb-play" aria-hidden="true">▶</span>' : ""}
          </button>
        `
      )
      .join("");

    const showNav = items.length > 1;

    return `
      <div class="project-gallery" data-count="${items.length}">
        <div class="gallery-main">
          ${mainContentMarkup(items[0], project.title)}
          ${
            showNav
              ? `
            <button type="button" class="gallery-nav gallery-prev" aria-label="이전 미디어">‹</button>
            <button type="button" class="gallery-nav gallery-next" aria-label="다음 미디어">›</button>
          `
              : ""
          }
        </div>
        ${
          showNav
            ? `<div class="gallery-thumbs" role="tablist" aria-label="${project.title} 미디어">${thumbs}</div>`
            : ""
        }
      </div>
    `;
  }

  function setGalleryIndex(gallery, index) {
    const projectTitle =
      gallery.closest(".project-item")?.querySelector("h3")?.textContent || "Project";
    const items = JSON.parse(gallery.dataset.items || "[]");
    const count = items.length;

    if (!count) return;

    const nextIndex = ((index % count) + count) % count;
    const item = items[nextIndex];
    const main = gallery.querySelector(".gallery-main");
    const thumbs = gallery.querySelectorAll(".gallery-thumb");

    if (!main || !item) return;

    main.querySelector("img, iframe")?.remove();
    main.insertAdjacentHTML("afterbegin", mainContentMarkup(item, projectTitle));

    thumbs.forEach((thumb, thumbIndex) => {
      const isActive = thumbIndex === nextIndex;
      thumb.classList.toggle("is-active", isActive);
      thumb.setAttribute("aria-current", isActive ? "true" : "false");
    });

    gallery.dataset.index = String(nextIndex);
  }

  function initGallery(gallery, project) {
    const items = buildGalleryItems(project);
    gallery.dataset.items = JSON.stringify(items);
    gallery.dataset.index = "0";

    if (items.length <= 1) return;

    gallery.querySelector(".gallery-prev")?.addEventListener("click", () => {
      const current = Number(gallery.dataset.index || 0);
      setGalleryIndex(gallery, current - 1);
    });

    gallery.querySelector(".gallery-next")?.addEventListener("click", () => {
      const current = Number(gallery.dataset.index || 0);
      setGalleryIndex(gallery, current + 1);
    });

    gallery.querySelectorAll(".gallery-thumb").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        setGalleryIndex(gallery, Number(thumb.dataset.index));
      });
    });
  }

  function featuredMarkup(project, index) {
    const body = project.detail || project.summary;
    return `
      <li class="project-item" style="transition-delay: ${index * 60}ms">
        <div class="project-copy">
          <h3>${project.title}</h3>
          <p class="project-hook">${project.summary}</p>
          <p>${body}</p>
          <div class="project-meta">
            ${(project.stack || []).map((item) => `<span>${item}</span>`).join("")}
          </div>
          <div class="project-links">
            ${linkOrPlaceholder(project.repo, "GitHub")}
            ${linkOrPlaceholder(project.demo, "Live Demo")}
            ${linkOrPlaceholder(project.youtube, "YouTube")}
          </div>
        </div>
        <div class="project-media">${galleryMarkup(project)}</div>
      </li>
    `;
  }

  function otherMarkup(project, index) {
    const badge = project.badge
      ? `<span class="project-badge">${project.badge}</span>`
      : "";
    const links = [
      project.repo
        ? `<a href="${project.repo}" target="_blank" rel="noopener noreferrer">GitHub</a>`
        : "",
      project.demo
        ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer">Demo</a>`
        : "",
    ]
      .filter(Boolean)
      .join('<span class="other-sep" aria-hidden="true">·</span>');

    return `
      <li class="other-item" style="transition-delay: ${index * 40}ms">
        <div class="other-main">
          ${badge}
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
        </div>
        <div class="other-links">${links}</div>
      </li>
    `;
  }

  const featured = projects.filter((p) => p.tier === "featured");
  const other = projects.filter((p) => p.tier === "other");

  if (featuredList) {
    featuredList.innerHTML = featured
      .map((project, index) => featuredMarkup(project, index))
      .join("");

    featuredList.querySelectorAll(".project-gallery").forEach((gallery, index) => {
      initGallery(gallery, featured[index]);
    });
  }

  if (otherList) {
    otherList.innerHTML = other.map((project, index) => otherMarkup(project, index)).join("");
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

  document.querySelectorAll(".project-item, .other-item").forEach((el) => observer.observe(el));
})();

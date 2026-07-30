(function () {
  const projects = window.projects || [];

  function linkOrPlaceholder(url, label) {
    if (url) {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    }
    return `<a class="is-disabled" aria-disabled="true">${label}</a>`;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
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

    (project.images || []).forEach((src) => {
      items.push({ type: "image", src, thumb: src });
    });

    if (youtubeId) {
      items.push({
        type: "youtube",
        id: youtubeId,
        thumb: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      });
    }

    return items;
  }

  function mainContentMarkup(item, title) {
    if (item.type === "youtube") {
      return `<iframe
        src="https://www.youtube.com/embed/${item.id}"
        title="${escapeHtml(title)} video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        loading="lazy"
      ></iframe>`;
    }

    return `<img src="${item.src}" alt="${escapeHtml(title)} screenshot" loading="lazy" />`;
  }

  function galleryMarkup(project) {
    const items = buildGalleryItems(project);

    if (!items.length) {
      return `<div class="project-media-fallback" aria-hidden="true"><span class="fallback-label">No media</span></div>`;
    }

    const thumbs = items
      .map(
        (item, itemIndex) => `
          <button
            type="button"
            class="gallery-thumb${itemIndex === 0 ? " is-active" : ""}"
            data-index="${itemIndex}"
            aria-label="${item.type === "youtube" ? "영상" : "스크린샷"} ${itemIndex + 1}"
            aria-current="${itemIndex === 0 ? "true" : "false"}"
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
            ? `<div class="gallery-thumbs" role="tablist" aria-label="${escapeHtml(project.title)} 미디어">${thumbs}</div>`
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

  function detailParagraphs(text) {
    return String(text || "")
      .split(/\n\n+/)
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => `<p class="project-detail">${escapeHtml(part)}</p>`)
      .join("");
  }

  function featuredMarkup(project, index) {
    const body = project.detail || project.summary;
    const num = String(index + 1).padStart(2, "0");
    const flip = index % 2 === 1 ? " is-flip" : "";

    return `
      <li class="project-item${flip}">
        <div class="project-index" aria-hidden="true">${num}</div>
        <div class="project-copy">
          <h3>${escapeHtml(project.title)}</h3>
          <p class="project-hook">${escapeHtml(project.summary)}</p>
          ${detailParagraphs(body)}
          <div class="project-meta">
            ${(project.stack || [])
              .map((item) => `<span>${escapeHtml(item)}</span>`)
              .join("")}
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

  function otherMarkup(project) {
    const badges = [];
    if (project.host) {
      badges.push(
        `<span class="project-badge project-badge-host">${escapeHtml(project.host)}</span>`,
      );
    }
    if (project.server) {
      badges.push(
        `<span class="project-badge project-badge-server">${escapeHtml(project.server)}</span>`,
      );
    }
    if (project.badge) {
      badges.push(
        `<span class="project-badge">${escapeHtml(project.badge)}</span>`,
      );
    }
    const badge = badges.join("");
    const thumb = (project.images && project.images[0]) || null;
    const thumbMarkup = thumb
      ? `<div class="other-thumb"><img src="${thumb}" alt="" loading="lazy" /></div>`
      : `<div class="other-thumb is-empty" aria-hidden="true"></div>`;
    const links = [
      project.repo
        ? `<a href="${project.repo}" target="_blank" rel="noopener noreferrer">GitHub</a>`
        : "",
      project.demo
        ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer">${project.tier === "games" ? "Play" : "Demo"}</a>`
        : "",
      project.youtube
        ? `<a href="${project.youtube}" target="_blank" rel="noopener noreferrer">YouTube</a>`
        : "",
    ]
      .filter(Boolean)
      .join('<span class="other-sep" aria-hidden="true">·</span>');

    return `
      <li class="other-item">
        ${thumbMarkup}
        <div class="other-main">
          ${badge}
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.summary)}</p>
        </div>
        <div class="other-links">${links}</div>
      </li>
    `;
  }

  const featuredList = document.getElementById("featured-list");
  const servicesList = document.getElementById("services-list");
  const gamesList = document.getElementById("games-list");
  const otherList = document.getElementById("other-list");

  const featured = projects.filter((p) => p.tier === "featured");
  const services = projects.filter((p) => p.tier === "services");
  const games = projects.filter((p) => p.tier === "games");
  const other = projects.filter((p) => p.tier === "other");

  if (featuredList) {
    featuredList.innerHTML = featured
      .map((project, index) => featuredMarkup(project, index))
      .join("");

    featuredList.querySelectorAll(".project-gallery").forEach((gallery, index) => {
      initGallery(gallery, featured[index]);
    });
  }

  if (servicesList) {
    servicesList.innerHTML = services.map((project) => otherMarkup(project)).join("");
  }

  if (gamesList) {
    gamesList.innerHTML = games.map((project) => otherMarkup(project)).join("");
  }

  if (otherList) {
    otherList.innerHTML = other.map((project) => otherMarkup(project)).join("");
  }
})();

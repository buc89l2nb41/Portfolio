/* 화면을 그립니다. 문구는 projects.js에만 있습니다.
 * body[data-page="home"]  → index.html (첫 화면, 작업 목록, 기타, 연락)
 * body[data-page="work"]  → work.html?p=<slug> (케이스 스터디 한 개)
 */
(function () {
  "use strict";

  const all = (window.projects || []).filter((project) => !project.hidden && project.repo);
  const profile = window.profile || {};

  // 주요 작업의 차례.
  const ORDER = [
    "StepCut",
    "Beat Mapper",
    "Deck Lab",
    "Prompt Editor",
    "Prompt Asset Forge",
    "Low Poly Cultivar",
    "GrowRoll",
    "Godot NNUE Prompt Chess",
    "SpriteGen",
    "GGPO Webgame",
  ];
  const OTHER_GROUPS = [
    { label: "배포한 AI 서비스", titles: ["TranslationChat", "AI Playlist Creator", "PersonaChat"] },
    { label: "브라우저 자동화 연습", titles: ["Apple Game Solver", "Count The Fingers Solver"] },
  ];
  const OTHER_LEAD =
    "주요 작업에 넣지 않은 것들입니다. 배포해 둔 AI 서비스와, 처음 바이브코딩을 익히며 만든 브라우저 자동화를 한 줄씩 적었습니다.";
  const ROLE = "기획 · 설계 · 개발 (혼자)";

  const byTitle = (title) => all.find((project) => project.title === title);
  const works = ORDER.map(byTitle).filter((project) => project && project.slug);
  const otherTitles = OTHER_GROUPS.flatMap((group) => group.titles);

  /* ---------- 공용 ---------- */

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  const pad = (n) => String(n).padStart(2, "0");
  const workHref = (project) => `./work.html?p=${encodeURIComponent(project.slug)}`;

  // 문구 속 다른 작업 이름을 그 작업으로 가는 링크로 바꿉니다.
  function linkedText(text, currentTitle) {
    const targets = [...works.map((project) => project.title), ...otherTitles]
      .filter((title) => title !== currentTitle && byTitle(title))
      .sort((a, b) => b.length - a.length);
    if (!targets.length) return esc(text);
    const pattern = new RegExp(targets.map(escapeRegExp).join("|"), "g");
    let html = "";
    let last = 0;
    for (const match of String(text).matchAll(pattern)) {
      html += esc(text.slice(last, match.index));
      const target = byTitle(match[0]);
      const href = target.slug ? workHref(target) : "./index.html#others";
      html += `<a class="ref" href="${href}">${esc(match[0])}</a>`;
      last = match.index + match[0].length;
    }
    return html + esc(text.slice(last));
  }

  function youtubeId(url) {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?/]+)/);
    return match ? match[1] : null;
  }

  function mediaOf(project) {
    const list = [];
    const video = youtubeId(project.youtube);
    if (video) list.push({ type: "youtube", id: video });
    (project.images || []).forEach((src) => list.push({ type: "image", src }));
    return list;
  }

  function mediaMarkup(item, title, eager) {
    if (!item) return `<div class="media-empty">화면 기록 없음</div>`;
    if (item.type === "youtube") {
      return `<button type="button" class="yt" data-yt="${esc(item.id)}" aria-label="${esc(title)} 영상 재생">
        <img src="https://i.ytimg.com/vi/${esc(item.id)}/hqdefault.jpg" alt="${esc(title)} 영상" loading="${eager ? "eager" : "lazy"}" />
        <span class="yt-play" aria-hidden="true"></span>
      </button>`;
    }
    return `<img src="${esc(item.src)}" alt="${esc(title)} 화면" loading="${eager ? "eager" : "lazy"}" />`;
  }

  function ytFrame(id) {
    return `<iframe src="https://www.youtube.com/embed/${esc(id)}?autoplay=1&rel=0&playsinline=1" title="영상" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  }

  function pillButtons(project, { withCase } = {}) {
    const out = [];
    if (project.demo) {
      out.push(`<a class="pill pill-main" href="${esc(project.demo)}" target="_blank" rel="noopener noreferrer">
        <span class="pill-dot"></span>${project.game ? "플레이" : "데모 열기"}<span class="pill-arrow">↗</span></a>`);
    }
    const yt = youtubeId(project.youtube);
    if (yt) {
      out.push(`<a class="pill" href="https://www.youtube.com/watch?v=${esc(yt)}" target="_blank" rel="noopener noreferrer">
        <span class="pill-dot"></span>영상<span class="pill-arrow">↗</span></a>`);
    }
    const repos = project.links && project.links.length ? project.links : [{ label: "GitHub", href: project.repo }];
    repos.forEach((link) => {
      out.push(`<a class="pill" href="${esc(link.href)}" target="_blank" rel="noopener noreferrer">
        <span class="pill-dot"></span>${esc(link.label)}<span class="pill-arrow">↗</span></a>`);
    });
    if (withCase) out.push(`<a class="case-link" href="${workHref(project)}">케이스 스터디 →</a>`);
    return out.join("");
  }

  // "A→B" 는 A를 작게 위에, B를 크게 씁니다.
  function metricValue(value) {
    const parts = String(value).split("→");
    if (parts.length !== 2) return esc(value);
    return `<span class="from">${esc(parts[0].trim())} →</span>${esc(parts[1].trim())}`;
  }

  function metricsMarkup(project, cls) {
    const metrics = project.metrics || [];
    if (!metrics.length) return "";
    return `<dl class="${cls}">${metrics
      .map(
        (m) => `<div class="metric">
          <dt>${metricValue(m.value)}</dt>
          <dd>${esc(m.label)}${m.note ? `<span>${esc(m.note)}</span>` : ""}</dd>
        </div>`,
      )
      .join("")}</dl>`;
  }

  function headerMarkup(page) {
    const github = profile.github
      ? `<a class="nav-gh" href="${esc(profile.github)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`
      : "";
    const base = page === "home" ? "" : "./index.html";
    return `<header class="nav">
      <a class="nav-logo" href="./index.html">${esc(profile.name || "Portfolio")}</a>
      <nav class="nav-links" aria-label="섹션">
        <a href="${base}#works">Works</a>
        <a href="${base}#others">Others</a>
        <a href="${base}#contact">Contact</a>
      </nav>
      ${github}
    </header>`;
  }

  function footerMarkup() {
    const year = new Date().getFullYear();
    return `<footer class="foot">
      <span>© ${year} ${esc(profile.name || "Portfolio")}</span>
      <span>정적 사이트 · GitHub Pages</span>
    </footer>`;
  }

  function wireMedia(root) {
    root.addEventListener("click", (event) => {
      const yt = event.target.closest("[data-yt]");
      if (yt) {
        const frame = yt.parentElement;
        frame.innerHTML = ytFrame(yt.dataset.yt);
        frame.classList.add("is-video");
        return;
      }
      const thumb = event.target.closest("[data-thumb]");
      if (thumb) {
        const block = thumb.closest("[data-media]");
        const project = all.find((p) => p.slug === block.dataset.media);
        const item = mediaOf(project)[Number(thumb.dataset.thumb)];
        const frame = block.querySelector(".media-frame");
        frame.classList.remove("is-video");
        frame.innerHTML = mediaMarkup(item, project.title, true);
        block.querySelectorAll("[data-thumb]").forEach((b) => b.classList.toggle("is-on", b === thumb));
      }
    });
  }

  function revealOnScroll() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => io.observe(el));
  }

  /* ---------- 첫 화면 ---------- */

  function heroMarkup() {
    const shown = all.length;
    const headline = profile.headline || "";
    // 헤드라인의 마지막 어절 두 개를 강조색으로.
    const words = headline.split(" ");
    const cut = Math.max(1, words.length - 2);
    const lead = words.slice(0, cut).join(" ");
    const tail = words.slice(cut).join(" ");
    const latest = works[0];
    return `<section class="hero zone-paper" id="top">
      <div class="meta-row mono">
        <span>Portfolio ©${new Date().getFullYear()}</span>
        <span>${esc(profile.role || "")}</span>
        <span>주요 작업 ${works.length} · 기타 ${shown - works.length}</span>
        <span>모두 공개 레포</span>
      </div>
      <h1 class="hero-word display">AI TOOLING<br />PORTFOLIO</h1>
      <div class="hero-foot">
        <p class="hero-line">${esc(lead)}<br /><em>${esc(tail)}</em></p>
        <div class="hero-side">
          <p>${esc(profile.intro || "")}</p>
          <div class="hero-anchors mono">
            <a class="accent" href="#works">( Works ↓ )</a>
            ${latest ? `<a href="#w-${esc(latest.slug)}">( Latest — ${esc(latest.title)} ↓ )</a>` : ""}
          </div>
        </div>
      </div>
    </section>`;
  }

  function workRowMarkup(project, index) {
    const media = mediaOf(project);
    const thumbs =
      media.length > 1
        ? `<div class="thumbs">${media
            .map((item, i) => {
              const src = item.type === "youtube" ? `https://i.ytimg.com/vi/${item.id}/default.jpg` : item.src;
              return `<button type="button" class="thumb${i ? "" : " is-on"}" data-thumb="${i}" aria-label="${i + 1}번째 화면">
                <img src="${esc(src)}" alt="" loading="lazy" />${item.type === "youtube" ? `<span class="thumb-yt">▶</span>` : ""}</button>`;
            })
            .join("")}</div>`
        : "";
    return `<article class="work reveal" id="w-${esc(project.slug)}" data-media="${esc(project.slug)}">
      <div class="work-top mono">
        <span><b class="accent">${pad(index + 1)}</b> ${esc(project.category || "")} · ${esc(project.since || "")}</span>
        <span>${esc(project.platform || "")}</span>
      </div>
      <div class="work-grid">
        <div class="work-copy">
          <h3 class="work-title display">${esc(project.title)}</h3>
          <p class="work-line">${esc(project.oneLine || "")}</p>
          ${metricsMarkup(project, "metrics metrics-small")}
          <div class="pills">${pillButtons(project, { withCase: true })}</div>
        </div>
        <div class="work-media">
          <div class="media-frame">${mediaMarkup(media[0], project.title, index < 2)}</div>
          ${thumbs}
        </div>
      </div>
    </article>`;
  }

  function othersMarkup() {
    const groups = OTHER_GROUPS.map((group) => ({
      label: group.label,
      items: group.titles.map(byTitle).filter(Boolean),
    })).filter((group) => group.items.length);
    const rows = groups
      .map(
        (group) => `<div class="other-group">
        <p class="label mono">( ${esc(group.label)} )</p>
        ${group.items
          .map(
            (p) => `<div class="other-row reveal">
            <h3>${esc(p.title)}</h3>
            <p>${linkedText(String(p.summary || "").replace(/\s+/g, " ").trim(), p.title)}</p>
            <div class="other-links mono">
              ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" rel="noopener noreferrer">열기 ↗</a>` : ""}
              ${(p.links && p.links.length ? p.links : [{ label: "GitHub", href: p.repo }])
                .map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} ↗</a>`)
                .join("")}
            </div>
          </div>`,
          )
          .join("")}
      </div>`,
      )
      .join("");
    const count = groups.reduce((n, g) => n + g.items.length, 0);
    return `<section class="others zone-paper" id="others">
      <div class="wrap">
        <div class="section-head">
          <h2 class="section-title display">Others</h2>
          <span class="mono muted">( ${count} Items )</span>
        </div>
        <p class="lead">${esc(OTHER_LEAD)}</p>
        ${rows}
      </div>
    </section>`;
  }

  function contactMarkup() {
    const github = profile.github || "";
    const handle = github.replace(/^https?:\/\/(www\.)?/, "");
    return `<section class="contact zone-accent" id="contact">
      <div class="wrap">
        <p class="label mono">( Contact )</p>
        <h2 class="contact-title display">Read<br />the code.</h2>
        <div class="contact-foot">
          <p>모든 작업은 공개 레포에 있습니다. 코드와 README에서 자세한 내용을 볼 수 있습니다.</p>
          <div class="contact-links">
            ${github ? `<a class="contact-big" href="${esc(github)}" target="_blank" rel="noopener noreferrer">${esc(handle)} ↗</a>` : ""}
            ${profile.email ? `<a class="contact-mail mono" href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>` : ""}
          </div>
        </div>
        ${footerMarkup()}
      </div>
    </section>`;
  }

  function renderHome(root) {
    root.innerHTML = `${headerMarkup("home")}
    <main id="main">
      ${heroMarkup()}
      <section class="works zone-ink" id="works">
        <div class="wrap">
          <div class="section-head">
            <h2 class="section-title display">Selected<br />Works</h2>
            <span class="mono muted">( ${works.length} Case Studies )</span>
          </div>
          ${works.map(workRowMarkup).join("")}
        </div>
      </section>
      ${othersMarkup()}
      ${contactMarkup()}
    </main>`;
    wireMedia(root);
    revealOnScroll();
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) requestAnimationFrame(() => target.scrollIntoView());
    }
  }

  /* ---------- 케이스 스터디 ---------- */

  function splitFirstSentence(text) {
    const match = String(text || "").match(/^(.+?[.!?])\s+([\s\S]+)$/);
    return match ? [match[1], match[2]] : [String(text || ""), ""];
  }

  function renderWork(root) {
    const slug = new URLSearchParams(location.search).get("p");
    const index = works.findIndex((project) => project.slug === slug);
    if (index < 0) {
      location.replace("./index.html#works");
      return;
    }
    const project = works[index];
    const next = works[(index + 1) % works.length];
    const media = mediaOf(project);
    const hero = media[0];
    const gallery = media.filter((item) => item.type === "image").filter((item) => item !== hero);
    const [bgLead, bgRest] = splitFirstSentence(project.problem);
    const titles = project.didTitles || [];

    document.title = `${project.title} — ${profile.role || "Portfolio"}`;

    root.innerHTML = `${headerMarkup("work")}
    <main id="main">
      <section class="case-hero zone-ink">
        <div class="wrap">
          <div class="meta-row mono">
            <a href="./index.html#w-${esc(project.slug)}">← Works</a>
            <span>Case <b class="accent">${pad(index + 1)}</b> / ${pad(works.length)}</span>
            <span>${esc(project.category || "")}</span>
            <span>${esc(project.since || "")}</span>
          </div>
          <h1 class="case-title display">${esc(project.title)}</h1>
          <div class="case-intro">
            <p class="case-line"><span class="dot"></span>${esc(project.oneLine || "")}</p>
            <div>
              <ul class="chips mono">${(project.stack || []).map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
              <div class="pills">${pillButtons(project)}</div>
            </div>
          </div>
          <div class="case-media media-frame">${hero && hero.type === "youtube" ? ytFrame(hero.id).replace("autoplay=1", "autoplay=0") : mediaMarkup(hero, project.title, true)}</div>
          <dl class="detail">
            <div><dt class="mono">Role</dt><dd>${esc(ROLE)}</dd></div>
            <div><dt class="mono">Since</dt><dd>${esc(project.since || "")}</dd></div>
            <div><dt class="mono">Platform</dt><dd>${esc(project.platform || "")}</dd></div>
            <div><dt class="mono">Repo</dt><dd><a href="${esc(project.repo)}" target="_blank" rel="noopener noreferrer">${esc(project.repo.replace("https://github.com/", ""))} ↗</a></dd></div>
          </dl>
        </div>
      </section>

      <section class="zone-paper case-block">
        <div class="wrap">
          <div class="bg-grid reveal">
            <p class="label mono">( Background )</p>
            <div>
              <h2 class="bg-lead">${linkedText(bgLead, project.title)}</h2>
              ${bgRest ? `<p class="bg-rest">${linkedText(bgRest, project.title)}</p>` : ""}
            </div>
          </div>
          <div class="section-head small">
            <p class="label mono">( Approach )</p>
            <span class="mono muted">${project.did.length} Points</span>
          </div>
          <ol class="points">
            ${project.did
              .map(
                (text, i) => `<li class="point reveal">
                <p class="mono point-no">Point ${pad(i + 1)}<span class="dot"></span></p>
                ${titles[i] ? `<h3>${esc(titles[i])}</h3>` : ""}
                <p>${linkedText(text, project.title)}</p>
              </li>`,
              )
              .join("")}
          </ol>
        </div>
      </section>

      <section class="zone-ink case-block">
        <div class="wrap">
          <p class="label mono">( Result )</p>
          ${metricsMarkup(project, "metrics metrics-big reveal")}
          <p class="result-text">${linkedText(project.result || "", project.title)}</p>
        </div>
      </section>

      ${
        gallery.length
          ? `<section class="zone-paper case-block">
        <div class="wrap">
          <div class="section-head">
            <h2 class="section-title display">Gallery</h2>
            <span class="mono muted">${gallery.length} Items</span>
          </div>
          <div class="gallery">
            ${gallery
              .map(
                (item, i) => `<a class="shot reveal${i === 0 || (i === gallery.length - 1 && gallery.length % 2 === 0) ? " shot-wide" : ""}" href="${esc(item.src)}" target="_blank" rel="noopener noreferrer">
                <img src="${esc(item.src)}" alt="${esc(project.title)} 화면 ${i + 2}" loading="lazy" /></a>`,
              )
              .join("")}
          </div>
        </div>
      </section>`
          : ""
      }

      <section class="zone-ink case-next">
        <div class="wrap">
          <div class="pills">${pillButtons(project)}</div>
          <a class="next" href="${workHref(next)}">
            <span class="label mono">( Next Case — ${pad(works.indexOf(next) + 1)} )</span>
            <span class="next-title display">${esc(next.title)} →</span>
            <span class="muted">${esc(next.oneLine || "")}</span>
          </a>
          ${footerMarkup()}
        </div>
      </section>
    </main>`;
    revealOnScroll();
    window.scrollTo(0, 0);
  }

  const root = document.getElementById("app");
  if (document.body.dataset.page === "work") renderWork(root);
  else renderHome(root);
})();

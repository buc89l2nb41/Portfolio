(function () {
  const projects = (window.projects || []).filter((project) => !project.hidden);
  const profile = window.profile || {};

  // 별의 좌표. 별 차례는 starTitles가 정한다.
  const dipper = [
    [76, 14],
    [84, 26],
    [68, 22],
    [58, 34],
    [45, 48],
    [37, 57],
    [29, 66],
    [21, 75],
    [13, 84],
    [5, 93],
  ];

  // 별 10개의 차례. dipper 좌표 수와 같아야 한다. 마지막 "기타"는 otherGroups를 묶어 보여 준다.
  const starTitles = [
    "Prompt Editor",
    "StepCut",
    "Prompt Asset Forge",
    "Low Poly Cultivar",
    "GrowRoll",
    "Godot NNUE Prompt Chess",
    "SpriteGen",
    "GGPO Webgame",
    "Beat Mapper",
    "기타",
  ];

  const otherGroups = [
    { label: "배포한 AI 서비스", titles: ["TranslationChat", "AI Playlist Creator", "PersonaChat"] },
    { label: "브라우저 자동화 연습", titles: ["Apple Game Solver", "Count The Fingers Solver"] },
  ];
  const otherTitles = otherGroups.flatMap((group) => group.titles);
  const OTHER_LEAD = "별에 넣지 않은 작업입니다. 배포해 둔 AI 서비스와, 처음 바이브코딩을 익히며 만든 브라우저 자동화를 한 줄씩 적었습니다.";

  const points = dipper;
  const main = document.getElementById("top");
  const side = document.getElementById("sky-side");
  const ghost = document.getElementById("sky-ghost");
  const glow = document.getElementById("sky-glow");
  const path = document.getElementById("sky-path");
  const figureStars = document.getElementById("sky-figure-stars");
  const travelerGlow = document.getElementById("sky-traveler-glow");
  const traveler = document.getElementById("sky-traveler");

  function findProject(title) {
    return projects.find((project) => project.title === title);
  }

  function itemOf(title) {
    const project = findProject(title);
    if (!project || !project.repo) return null;
    return {
      title,
      text: String(project.summary || "").replace(/\s+/g, " ").trim(),
      repo: project.repo,
      demo: project.demo,
      game: Boolean(project.game),
      links: project.links || null,
    };
  }

  const stars = starTitles
    .map((title) => {
      if (title === "기타") {
        const groups = otherGroups
          .map((group) => ({ label: group.label, items: group.titles.map(itemOf).filter(Boolean) }))
          .filter((group) => group.items.length);
        return {
          title,
          label: title,
          text: OTHER_LEAD,
          projects: otherTitles,
          groups,
          demo: null,
          game: false,
          video: false,
        };
      }
      const project = findProject(title);
      if (!project || !project.repo) return null;
      return {
        title,
        label: project.short || title,
        project,
        projects: [title],
        demo: project.demo,
        game: Boolean(project.game),
        video: Boolean(youtubeId(project.youtube)),
        links: project.links || null,
      };
    })
    .filter(Boolean);

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function linkedText(text, currentTitle) {
    const targets = [...starTitles.filter((title) => title !== "기타"), ...otherTitles]
      .filter((title) => title && title !== currentTitle)
      .sort((a, b) => b.length - a.length);
    if (!targets.length) return escapeHtml(text);
    const pattern = new RegExp(targets.map(escapeRegExp).join("|"), "g");
    let html = "";
    let last = 0;
    for (const match of text.matchAll(pattern)) {
      html += escapeHtml(text.slice(last, match.index));
      const title = match[0];
      const star = starTitles.indexOf(title);
      const dest = star >= 0 ? star : starTitles.indexOf("기타");
      html += `<button type="button" class="sky-ref" data-star="${dest}">${escapeHtml(title)}</button>`;
      last = match.index + title.length;
    }
    html += escapeHtml(text.slice(last));
    return html;
  }

  function youtubeId(url) {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?/]+)/);
    if (!match) return null;
    return match[1];
  }

  function roundedPath(radius) {
    if (points.length < 2) return "";
    const parts = [`M${points[0][0]},${points[0][1]}`];
    for (let index = 1; index < points.length - 1; index += 1) {
      const prev = points[index - 1];
      const curr = points[index];
      const next = points[index + 1];
      const inX = curr[0] - prev[0];
      const inY = curr[1] - prev[1];
      const outX = next[0] - curr[0];
      const outY = next[1] - curr[1];
      const inLen = Math.hypot(inX, inY) || 1;
      const outLen = Math.hypot(outX, outY) || 1;
      const cut = Math.min(radius, inLen * 0.28, outLen * 0.28);
      const ax = curr[0] - (inX / inLen) * cut;
      const ay = curr[1] - (inY / inLen) * cut;
      const bx = curr[0] + (outX / outLen) * cut;
      const by = curr[1] + (outY / outLen) * cut;
      parts.push(`L${ax},${ay}`, `Q${curr[0]},${curr[1]} ${bx},${by}`);
    }
    const last = points[points.length - 1];
    parts.push(`L${last[0]},${last[1]}`);
    return parts.join(" ");
  }

  function mediaOf(star) {
    const videos = [];
    const images = [];
    (star.projects || []).forEach((title) => {
      const project = findProject(title);
      if (!project || !project.repo) return;
      const video = youtubeId(project.youtube);
      if (video) {
        videos.push({
          type: "video",
          id: video,
          src: `https://i.ytimg.com/vi/${video}/maxresdefault.jpg`,
          fallback: `https://i.ytimg.com/vi/${video}/hqdefault.jpg`,
          label: project.title,
        });
      }
      (project.images || []).forEach((src) => {
        images.push({ type: "image", src, label: project.title });
      });
    });
    // 영상이 먼저, 스크린샷은 그 뒤 썸네일로.
    return [...videos, ...images];
  }

  function visualMarkup(star) {
    const frames = mediaOf(star);
    if (!frames.length) return "";
    const thumbs = frames.length > 1
      ? frames.map((frame, index) => ({ frame, index }))
      : [];
    const strip = thumbs.length
      ? `<div class="sky-thumbs"${thumbs.length > 3 ? ' data-scroll="1"' : ""}><div class="sky-thumbs-track">${thumbs
          .map(
            (item) =>
              `<button type="button" data-frame="${item.index}" aria-label="${escapeHtml(item.frame.type === "video" ? `${item.frame.label} 영상` : item.frame.label)}" class="${[item.index === 0 ? "is-active" : "", item.frame.type === "video" ? "is-video" : ""].filter(Boolean).join(" ")}"><img src="${item.frame.type === "video" ? item.frame.fallback : item.frame.src}" alt="" draggable="false"></button>`,
          )
          .join("")}</div></div>`
      : "";
    return `
      <div class="sky-visual${star.bright ? " is-bright" : ""}" data-frames="${escapeHtml(JSON.stringify(frames))}">
        <div class="sky-frame">${frameMarkup(frames[0])}</div>
        ${strip}
      </div>
    `;
  }

  function frameMarkup(frame) {
    if (frame.type === "video") {
      return `<button type="button" class="sky-play" data-video="${frame.id}" aria-label="영상 재생"><img src="${frame.src}"${frame.fallback ? ` data-fallback="${frame.fallback}"` : ""} alt=""></button>`;
    }
    return `<img src="${frame.src}" alt="${escapeHtml(frame.label)}">`;
  }

  function videoEmbed(id) {
    return `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&enablejsapi=1&playsinline=1&vq=hd1080" title="영상" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  }

  function watchQuality(player) {
    player.addEventListener("load", () => {
      ["setPlaybackQualityRange", "setPlaybackQuality", "playVideo"].forEach((func, index) => {
        player.contentWindow?.postMessage(JSON.stringify({
          event: "command",
          func,
          args: index === 0 ? ["hd1080", "highres"] : index === 1 ? ["hd1080"] : [],
        }), "*");
      });
    });
  }

  function activeFrame(visual) {
    const frames = JSON.parse(visual.dataset.frames || "[]");
    const active = visual.querySelector(".sky-thumbs .is-active");
    const index = active ? Number(active.dataset.frame) : 0;
    return frames[index];
  }

  function syncStageVideo(stage, playing) {
    const visual = stage.querySelector(".sky-visual");
    if (!visual) return;
    const frame = activeFrame(visual);
    const frameEl = visual.querySelector(".sky-frame");
    if (!frame || !frameEl) return;
    if (playing && frame.type === "video") {
      if (frameEl.querySelector("iframe")?.getAttribute("src")?.includes(frame.id)) return;
      frameEl.innerHTML = videoEmbed(frame.id);
      watchQuality(frameEl.querySelector("iframe"));
      return;
    }
    if (frameEl.querySelector("iframe")) {
      frameEl.innerHTML = frameMarkup(frame);
      return;
    }
    const image = frameEl.querySelector("img");
    if (frame.type !== "video" && (!image || image.getAttribute("src") !== frame.src)) {
      frameEl.innerHTML = frameMarkup(frame);
    }
  }

  function linkRow(item) {
    const named = (item.links || [])
      .map((link) => `<a href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`)
      .join("");
    const launch = item.demo
      ? `<a class="sky-launch${item.game ? " is-game" : ""}" href="${escapeHtml(item.demo)}" target="_blank" rel="noopener noreferrer">${item.game ? "플레이" : "바로 열기"}</a>`
      : "";
    const quiet = named || (item.repo ? `<a href="${escapeHtml(item.repo)}" target="_blank" rel="noopener noreferrer">GitHub</a>` : "");
    return `<div class="sky-title-links">${launch}<div class="sky-links">${quiet}</div></div>`;
  }

  function textParagraphs(text, title) {
    return text
      .split("\n")
      .filter((part) => part.trim())
      .map((part) => `<p>${linkedText(part, title)}</p>`)
      .join("");
  }

  function otherRow(item) {
    return `
      <li>
        <div class="sky-title-row">
          <h3>${escapeHtml(item.title)}</h3>
          ${linkRow(item)}
        </div>
        ${textParagraphs(item.text, item.title)}
      </li>`;
  }

  function stageMarkup(star, index) {
    const number = String(index + 1).padStart(2, "0");
    if (star.groups) {
      const groups = star.groups
        .map(
          (group) => `
            <p class="sky-group">${escapeHtml(group.label)}</p>
            <ul class="sky-others">${group.items.map(otherRow).join("")}</ul>`,
        )
        .join("");
      return `
        <section class="sky-stage is-list" id="star-${index + 1}" data-star="${index}">
          <div class="sky-stage-inner">
            <div class="sky-copy">
              <p class="sky-index">${number}</p>
              <h2>${escapeHtml(star.title)}</h2>
              ${star.text ? `<p class="sky-lead">${escapeHtml(star.text)}</p>` : ""}
              ${groups}
            </div>
          </div>
        </section>
      `;
    }
    const project = star.project;
    const links = linkRow({ ...star, repo: project.repo });
    const heading = `<p class="sky-index">${number}</p><div class="sky-title-row"><h2>${escapeHtml(star.title)}</h2>${links}</div>`;
    const section = (label, body) => (body ? `<div class="sky-part"><p class="sky-part-label">${label}</p>${body}</div>` : "");
    const did = (project.did || []).length
      ? `<ul class="sky-did">${project.did.map((line) => `<li>${linkedText(line, star.title)}</li>`).join("")}</ul>`
      : "";
    const names = project.stack || [];
    const stack = names.length ? `<p class="sky-note">사용 기술  ${escapeHtml(names.join(" · "))}</p>` : "";
    const detail = [
      section("문제", project.problem ? `<p>${linkedText(project.problem, star.title)}</p>` : ""),
      section("한 일", did),
      section("결과", project.result ? `<p>${linkedText(project.result, star.title)}</p>` : ""),
      stack,
    ].join("");
    const visual = visualMarkup(star);
    return `
      <section class="sky-stage${visual ? " has-visual" : ""}" id="star-${index + 1}" data-star="${index}">
        <div class="sky-stage-inner">
          <div class="sky-copy">${heading}</div>
          <div class="sky-detail">${detail}</div>
          ${visual}
        </div>
      </section>
    `;
  }

  const contact = [
    profile.github ? `<a href="${escapeHtml(profile.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>` : "",
    profile.email ? `<a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a>` : "",
  ].filter(Boolean).join("");
  const who = [profile.name, profile.role].filter(Boolean).map(escapeHtml).join(" · ");

  main.innerHTML = `
    <section class="sky-stage is-title" id="top-stage" data-star="-1">
      <div class="sky-stage-inner">
        <div class="sky-copy">
          <p class="sky-index">${who || "시작"}</p>
          <h1>${escapeHtml(profile.headline || "")}</h1>
          ${profile.intro ? `<p class="sky-lead">${escapeHtml(profile.intro)}</p>` : ""}
          ${contact ? `<div class="sky-links">${contact}</div>` : ""}
          <p class="sky-hint">별을 누르면 그 작업으로 바로 갑니다</p>
        </div>
      </div>
    </section>
    ${stars.map(stageMarkup).join("")}
  `;

  const full = roundedPath(3.4);
  ghost.setAttribute("d", full);
  glow.setAttribute("d", full);
  path.setAttribute("d", full);
  const length = path.getTotalLength();

  function closestLength(point) {
    let best = 0;
    let bestD = Infinity;
    const samples = 280;
    for (let step = 0; step <= samples; step += 1) {
      const at = (length * step) / samples;
      const hit = path.getPointAtLength(at);
      const dist = (hit.x - point[0]) ** 2 + (hit.y - point[1]) ** 2;
      if (dist < bestD) {
        bestD = dist;
        best = at;
      }
    }
    const span = length / samples;
    let lo = Math.max(0, best - span);
    let hi = Math.min(length, best + span);
    for (let step = 0; step < 16; step += 1) {
      const left = lo + (hi - lo) / 3;
      const right = hi - (hi - lo) / 3;
      const leftHit = path.getPointAtLength(left);
      const rightHit = path.getPointAtLength(right);
      const leftDist = (leftHit.x - point[0]) ** 2 + (leftHit.y - point[1]) ** 2;
      const rightDist = (rightHit.x - point[0]) ** 2 + (rightHit.y - point[1]) ** 2;
      if (leftDist < rightDist) hi = right;
      else lo = left;
    }
    return (lo + hi) / 2;
  }

  const vertexLengths = points.map((point, index) => {
    if (index === 0) return 0;
    if (index === points.length - 1) return length;
    return closestLength(point);
  });
  const onPath = vertexLengths.map((at) => {
    const hit = path.getPointAtLength(at);
    return [hit.x, hit.y];
  });

  function lengthAt(index) {
    const clamped = Math.max(0, Math.min(vertexLengths.length - 1, Math.round(index)));
    return vertexLengths[clamped];
  }
  path.style.strokeDasharray = String(length);
  glow.style.strokeDasharray = String(length);

  const nameLabels = [
    { y: 14 },
    { y: 30 },
    { y: 22 },
    { y: 36.5 },
    { y: 45, anchor: "start" },
    { y: 55, anchor: "start" },
    { y: 64, anchor: "start" },
    { y: 73.5, anchor: "start" },
    { y: 83, anchor: "start" },
    { y: 92.5, anchor: "start" },
  ];

  points.forEach((point, index) => {
    const seat = onPath[index];
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", seat[0]);
    dot.setAttribute("cy", seat[1]);
    dot.setAttribute("r", "0.9");
    dot.setAttribute("class", "sky-figure-star");
    figureStars.appendChild(dot);
    const hit = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    hit.setAttribute("cx", seat[0]);
    hit.setAttribute("cy", seat[1]);
    hit.setAttribute("r", "3.4");
    hit.setAttribute("class", "sky-figure-hit");
    hit.dataset.star = String(index);
    hit.setAttribute("aria-label", stars[index]?.title || "");
    figureStars.appendChild(hit);
    const title = stars[index]?.label;
    if (!title) return;
    const place = nameLabels[index];
    const anchor = place.anchor || "end";
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", String(anchor === "start" ? point[0] + 2.6 : point[0] - 2.6));
    label.setAttribute("y", String(place.y));
    label.setAttribute("text-anchor", anchor);
    label.setAttribute("dominant-baseline", "central");
    label.setAttribute("class", "sky-figure-name");
    label.dataset.star = String(index);
    label.textContent = title;
    const star = stars[index];
    if (star && (star.game || star.video)) {
      const mark = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      mark.setAttribute("class", "sky-figure-mark");
      mark.textContent = star.game ? "  플레이" : "  영상";
      label.appendChild(mark);
    }
    figureStars.appendChild(label);
  });

  side.innerHTML = [
    `<a href="#top" data-star="-1">시작</a>`,
    ...stars.map((star, index) => {
      const playable = star.demo ? " is-play" : "";
      const game = star.game ? " is-game" : "";
      const mark = star.game ? "<em>플레이</em>" : "";
      return `<a href="#star-${index + 1}" data-star="${index}" class="${(playable + game).trim()}"><span>${escapeHtml(star.title)}</span>${mark}</a>`;
    }),
  ].join("");

  main.addEventListener("error", (event) => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || !image.dataset.fallback || image.dataset.usedFallback) return;
    image.dataset.usedFallback = "1";
    image.src = image.dataset.fallback;
  }, true);

  function selectFrame(visual, index) {
    const frames = JSON.parse(visual.dataset.frames || "[]");
    const frame = frames[index];
    if (!frame) return;
    visual.querySelectorAll(".sky-thumbs button").forEach((button) => {
      button.classList.toggle("is-active", Number(button.dataset.frame) === index);
    });
    const stage = visual.closest(".sky-stage");
    syncStageVideo(stage, stage.classList.contains("is-reading"));
  }

  main.addEventListener("click", (event) => {
    const play = event.target.closest(".sky-play");
    if (play) {
      const frame = play.closest(".sky-frame");
      frame.innerHTML = videoEmbed(play.dataset.video);
      watchQuality(frame.querySelector("iframe"));
      return;
    }
    const thumb = event.target.closest(".sky-thumbs button");
    if (!thumb || thumb.classList.contains("is-active")) return;
    const visual = thumb.closest(".sky-visual");
    visual.dataset.pauseUntil = String(performance.now() + 6400);
    selectFrame(visual, Number(thumb.dataset.frame));
  });

  const stops = [...main.querySelectorAll(".sky-stage")];
  const figureDots = [...figureStars.querySelectorAll(".sky-figure-star")];
  const figureNames = [...figureStars.querySelectorAll(".sky-figure-name")];
  const sideStops = [...side.querySelectorAll("a")];

  function lengthBetween(amount) {
    const max = points.length - 1;
    const clamped = Math.max(0, Math.min(max, amount));
    const index = Math.floor(clamped);
    const fraction = clamped - index;
    if (index >= max) return length;
    return lengthAt(index) + (lengthAt(index + 1) - lengthAt(index)) * fraction;
  }

  const track = document.createElement("div");
  track.className = "sky-track";
  track.style.setProperty("--sky-steps", String(stops.length));
  main.appendChild(track);

  function openStar(starId) {
    const stageIndex = stops.findIndex((stage) => stage.dataset.star === String(starId));
    if (stageIndex < 0) return;
    flyToIndex(stageIndex);
  }

  side.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link || link.dataset.star == null) return;
    event.preventDefault();
    openStar(link.dataset.star);
  });

  main.addEventListener("click", (event) => {
    const ref = event.target.closest(".sky-ref");
    if (!ref) return;
    event.preventDefault();
    openStar(ref.dataset.star);
  });

  figureStars.addEventListener("click", (event) => {
    const target = event.target.closest("[data-star]");
    if (!target) return;
    const stageIndex = stops.findIndex((stage) => stage.dataset.star === target.dataset.star);
    if (stageIndex < 0) return;
    flyToIndex(stageIndex);
  });

  const figure = document.getElementById("sky-figure");
  const flareSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  flareSvg.id = "sky-flare";
  flareSvg.setAttribute("viewBox", "-50 -50 100 100");
  flareSvg.setAttribute("aria-hidden", "true");
  const flarePoly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  flareSvg.appendChild(flarePoly);
  document.body.appendChild(flareSvg);

  function pointForStage(stage) {
    if (!stage) return -1;
    const star = Number(stage.dataset.star);
    return star >= 0 && star < points.length ? star : -1;
  }

  function mix(from, to, amount) {
    return from + (to - from) * amount;
  }

  // 글이 접힘 → 별자리가 돌아옴 → 별이 미끄러짐 → 화면이 따라와 머무름 → 4각별 → 설명.
  const HOLD = 0.04;
  const COLLAPSE_END = 0.11;
  const ZOOMOUT_END = 0.2;
  const TRAVEL_END = 0.62;
  const REST_END = 0.74;
  const FLARE_END = 0.9;

  function screenTarget() {
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
  }

  function layoutStar(svgX, svgY) {
    figure.style.transform = "none";
    const box = figure.getBoundingClientRect();
    const point = figure.createSVGPoint();
    point.x = svgX;
    point.y = svgY;
    const screen = point.matrixTransform(figure.getScreenCTM());
    return {
      x: screen.x,
      y: screen.y,
      originX: screen.x - box.left,
      originY: screen.y - box.top,
    };
  }

  function applyZoom(svgX, svgY, zoom, cover, flareAmount) {
    const z = Math.max(0, Math.min(1, zoom || 0));
    const flareDim = Math.max(0, Math.min(1, flareAmount || 0));
    figure.classList.toggle("is-zooming", z > 0.08);
    figureDots.forEach((dot) => {
      dot.classList.remove("is-focus");
      dot.setAttribute("r", "0.9");
    });
    const spot = screenTarget();
    if (z <= 0.001 || svgX == null) {
      figure.style.transform = "none";
      figure.style.opacity = "";
      figure.style.zIndex = "";
      path.style.strokeWidth = "";
      glow.style.strokeWidth = "";
      ghost.style.strokeWidth = "";
      traveler.setAttribute("r", "1.15");
      travelerGlow.setAttribute("r", "2.2");
      traveler.style.opacity = "";
      travelerGlow.style.opacity = "";
      return spot;
    }
    const scale = 1 + z * (window.innerWidth < 860 ? 1.05 : 1.45);
    const laid = layoutStar(svgX, svgY);
    figure.style.transformOrigin = `${laid.originX}px ${laid.originY}px`;
    figure.style.transform = `translate(${(spot.x - laid.x) * z}px, ${(spot.y - laid.y) * z}px) scale(${scale})`;
    figure.style.opacity = String(mix(0.95, 0, Math.max(cover, flareDim) * z));
    path.style.strokeWidth = String(0.42 / scale);
    glow.style.strokeWidth = String(1.7 / scale);
    ghost.style.strokeWidth = String(0.35 / scale);
    traveler.setAttribute("r", String((1.15 + z * 2.2) / scale));
    travelerGlow.setAttribute("r", String((2.2 + z * 2.8) / scale));
    const starVisible = flareDim > 0 ? "0" : "1";
    traveler.style.opacity = starVisible;
    travelerGlow.style.opacity = starVisible;
    figure.style.zIndex = cover < 0.08 && flareDim < 0.02 ? "3" : "";
    return spot;
  }

  function applyFlare(amount, spot) {
    const t = Math.max(0, Math.min(1, amount || 0));
    if (t <= 0.001) {
      flareSvg.style.opacity = "0";
      return;
    }
    const stretch = easeOutExpo(Math.min(1, t / 0.58));
    const fadeIn = Math.min(1, t / 0.1);
    const fadeOut = t < 0.55 ? 1 : Math.max(0, 1 - (t - 0.55) / 0.45);
    const outer = mix(8, 47, stretch);
    const waist = mix(2.8, 0.42, stretch);
    flarePoly.setAttribute(
      "points",
      [
        `0,${-outer}`,
        `${waist},${-waist}`,
        `${outer},0`,
        `${waist},${waist}`,
        `0,${outer}`,
        `${-waist},${waist}`,
        `${-outer},0`,
        `${-waist},${-waist}`,
      ].join(" "),
    );
    flareSvg.style.left = `${spot.x}px`;
    flareSvg.style.top = `${spot.y}px`;
    flareSvg.style.zIndex = fadeOut < 0.98 ? "1" : "4";
    flareSvg.style.opacity = String(fadeIn * fadeOut);
  }

  let progress = 0;
  let cruise = null;

  function alongForStage(stageIndex) {
    const point = pointForStage(stops[stageIndex]);
    return point >= 0 ? point : -1;
  }

  function placeTraveler(along) {
    const before = along < 0;
    const drawn = lengthBetween(along);
    const atStar = Math.abs(along - Math.round(along)) < 0.025;
    const lit = before ? 0 : atStar ? drawn : Math.max(0, drawn - 1.8);
    const tip = path.getPointAtLength(drawn);
    const nearest = Math.round(along);
    const place = !before && atStar && onPath[nearest] ? onPath[nearest] : [tip.x, tip.y];
    path.style.strokeDashoffset = String(length - lit);
    glow.style.strokeDashoffset = String(length - lit);
    traveler.setAttribute("cx", place[0]);
    traveler.setAttribute("cy", place[1]);
    travelerGlow.setAttribute("cx", place[0]);
    travelerGlow.setAttribute("cy", place[1]);
    figure.classList.toggle("is-idle", before);
    figureDots.forEach((dot, dotIndex) => dot.classList.toggle("is-lit", !before && along >= dotIndex - 0.05));
    figureNames.forEach((label, dotIndex) => label.classList.toggle("is-lit", !before && along >= dotIndex - 0.05));
    return place;
  }

  function markSide(shown, amount) {
    sideStops.forEach((button) => {
      const active = button.dataset.star === String(shown) && amount > 0.55;
      if (!active) {
        button.removeAttribute("aria-current");
        return;
      }
      if (button.getAttribute("aria-current") === "true") return;
      button.setAttribute("aria-current", "true");
      const nextTop = side.scrollTop + (button.getBoundingClientRect().top - side.getBoundingClientRect().top) - side.clientHeight / 2 + button.offsetHeight / 2;
      side.scrollTo({ top: Math.max(0, nextTop), behavior: "smooth" });
    });
  }

  function renderCruise() {
    stops.forEach((stage, stageIndex) => {
      const inner = stage.querySelector(".sky-stage-inner");
      if (!inner) return;
      const active = stageIndex === cruise.focusIndex;
      const opacity = active ? cruise.opacity : 0;
      const scale = active ? cruise.scale : 1;
      inner.style.opacity = String(opacity);
      inner.style.transformOrigin = "50% 46%";
      inner.style.transform = Math.abs(scale - 1) < 0.001 ? "none" : `scale(${scale})`;
      inner.style.pointerEvents = opacity > 0.65 ? "auto" : "none";
    });
    const place = placeTraveler(cruise.along);
    const spot = applyZoom(
      cruise.zoom > 0.001 ? place[0] : null,
      cruise.zoom > 0.001 ? place[1] : null,
      cruise.zoom,
      cruise.opacity,
      cruise.flare,
    );
    applyFlare(cruise.flare, spot);
    markSide(cruise.shownStar, 1);
    if (nextButton) nextButton.hidden = flightTarget >= stops.length - 1.02;
  }

  function layoutConstellation() {
    if (window.innerWidth <= 860) {
      if (figure.dataset.layout === "mobile") return;
      figure.style.width = "";
      figure.style.height = "";
      figure.style.right = "";
      figure.style.left = "";
      figure.style.top = "";
      figure.style.bottom = "";
      figure.dataset.layout = "mobile";
      return;
    }
    const copy = document.querySelector("#top-stage .sky-copy");
    if (!copy) return;
    const text = copy.getBoundingClientRect();
    const key = [window.innerWidth, window.innerHeight, Math.round(text.width), Math.round(text.height)].join("x");
    if (figure.dataset.layout === key) return;
    const previous = figure.style.transform;
    figure.style.transform = "none";
    const pad = 26;
    const block = {
      left: text.left - 6,
      right: text.right + pad,
      top: text.top - 6,
      bottom: text.bottom + pad,
    };
    const rightInset = document.getElementById("sky-side").getBoundingClientRect().width + 18;
    const bottomInset = 12;
    const minTop = 70;
    const overlaps = (rect) => rect.right > block.left && rect.left < block.right && rect.bottom > block.top && rect.top < block.bottom;
    const collides = () => {
      const marks = figure.querySelectorAll(".sky-figure-name, .sky-figure-star");
      for (const mark of marks) {
        if (overlaps(mark.getBoundingClientRect())) return true;
      }
      const total = path.getTotalLength();
      const matrix = path.getScreenCTM();
      if (!matrix) return false;
      for (let step = 0; step <= 36; step += 1) {
        const point = path.getPointAtLength(total * step / 36);
        const screen = new DOMPoint(point.x, point.y).matrixTransform(matrix);
        if (screen.x > block.left && screen.x < block.right && screen.y > block.top && screen.y < block.bottom) return true;
      }
      return false;
    };
    const place = (width, mode) => {
      figure.style.width = `${width}px`;
      figure.style.height = "auto";
      figure.style.right = `${rightInset}px`;
      figure.style.left = "auto";
      if (mode === "below") {
        figure.style.top = `${Math.ceil(block.bottom)}px`;
        figure.style.bottom = "auto";
      } else {
        figure.style.top = "auto";
        figure.style.bottom = `${bottomInset}px`;
      }
    };
    const fits = () => {
      const box = figure.getBoundingClientRect();
      if (box.top < minTop - 1 || box.bottom > window.innerHeight - 4 || box.left < 4) return false;
      return !collides();
    };
    const largest = (mode) => {
      let lo = 240;
      const box = figure.viewBox.baseVal;
      let hi = Math.min(window.innerWidth - rightInset - 12, (window.innerHeight - minTop - bottomInset) * box.width / box.height);
      let best = 0;
      for (let step = 0; step < 14; step += 1) {
        const mid = (lo + hi) / 2;
        place(mid, mode);
        if (fits()) {
          best = mid;
          lo = mid;
        } else hi = mid;
      }
      return best;
    };
    const beside = largest("beside");
    const below = largest("below");
    place(Math.max(beside, below, 240), below > beside ? "below" : "beside");
    figure.style.transform = previous;
    figure.dataset.layout = key;
  }

  function renderScroll() {
    layoutConstellation();
    if (cruise) {
      renderCruise();
      return;
    }
    const scaled = progress;
    const index = Math.min(stops.length - 1, Math.floor(scaled));
    const fraction = index >= stops.length - 1 ? 0 : scaled - index;
    const currentPoint = pointForStage(stops[index]);
    const nextStage = stops[index + 1];
    const nextPoint = pointForStage(nextStage);

    let currentOpacity = 1;
    let currentScale = 1;
    let nextOpacity = 0;
    let nextScale = nextPoint >= 0 ? 0.14 : 1;
    let zoom = currentPoint >= 0 ? 1 : 0;
    let zoomPoint = currentPoint;
    let flare = 0;

    if (fraction > 0) {
      if (fraction < HOLD) {
        zoom = currentPoint >= 0 ? 1 : 0;
        zoomPoint = currentPoint;
      } else if (fraction < COLLAPSE_END) {
        const t = (fraction - HOLD) / (COLLAPSE_END - HOLD);
        currentOpacity = 1 - t;
        currentScale = currentPoint >= 0 ? mix(1, 0.12, t) : 1;
        zoom = currentPoint >= 0 ? 1 : 0;
        zoomPoint = currentPoint;
      } else if (fraction < ZOOMOUT_END) {
        const t = (fraction - COLLAPSE_END) / (ZOOMOUT_END - COLLAPSE_END);
        currentOpacity = 0;
        currentScale = currentPoint >= 0 ? 0.12 : 1;
        zoom = currentPoint >= 0 ? 1 - t : 0;
        zoomPoint = currentPoint;
      } else if (fraction < TRAVEL_END) {
        const t = (fraction - ZOOMOUT_END) / (TRAVEL_END - ZOOMOUT_END);
        const follow = Math.min(1, Math.max(0, (t - 0.2) / 0.8));
        currentOpacity = 0;
        nextOpacity = 0;
        zoom = nextPoint >= 0 ? easeInOutCubic(follow) : 0;
        zoomPoint = nextPoint;
      } else if (fraction < REST_END) {
        currentOpacity = 0;
        nextOpacity = 0;
        zoom = nextPoint >= 0 ? 1 : 0;
        zoomPoint = nextPoint;
      } else if (fraction < FLARE_END) {
        const t = (fraction - REST_END) / (FLARE_END - REST_END);
        currentOpacity = 0;
        const reveal = Math.max(0, (t - 0.55) / 0.45);
        nextOpacity = nextPoint >= 0 ? reveal : t;
        nextScale = nextPoint >= 0 ? mix(0.2, 1, reveal) : 1;
        zoom = nextPoint >= 0 ? 1 : 0;
        zoomPoint = nextPoint;
        flare = nextPoint >= 0 ? t : 0;
      } else {
        currentOpacity = 0;
        nextOpacity = 1;
        nextScale = 1;
        zoom = nextPoint >= 0 ? 1 : 0;
        zoomPoint = nextPoint;
      }
    }

    stops.forEach((stage, stageIndex) => {
      const inner = stage.querySelector(".sky-stage-inner");
      if (!inner) return;
      let opacity = 0;
      let scale = 1;
      if (stageIndex === index) {
        opacity = currentOpacity;
        scale = currentScale;
      } else if (stageIndex === index + 1) {
        opacity = nextOpacity;
        scale = nextScale;
      }
      inner.style.opacity = String(opacity);
      inner.style.transformOrigin = "50% 46%";
      inner.style.transform = Math.abs(scale - 1) < 0.001 ? "none" : `scale(${scale})`;
      inner.style.pointerEvents = opacity > 0.65 ? "auto" : "none";
    });

    const cover = Math.max(currentOpacity, nextOpacity);
    const firstIndex = stops.findIndex((stage) => stage.dataset.star === "0");
    let along = -1;
    if (scaled >= firstIndex) {
      const local = scaled - firstIndex;
      const starIndex = Math.floor(local);
      const step = local - starIndex;
      const raw = step <= ZOOMOUT_END ? 0 : step >= TRAVEL_END ? 1 : (step - ZOOMOUT_END) / (TRAVEL_END - ZOOMOUT_END);
      const moved = raw <= 0 || raw >= 1 ? raw : easeInOutCubic(raw);
      along = Math.min(points.length - 1, starIndex + moved);
    }
    const place = placeTraveler(along);
    const spot = applyZoom(zoom > 0.001 ? place[0] : null, zoom > 0.001 ? place[1] : null, zoom, cover, flare);
    applyFlare(flare, spot);

    let shown = Number(stops[index].dataset.star);
    let shownAmount = currentOpacity;
    if (nextOpacity > currentOpacity && nextStage) {
      shown = Number(nextStage.dataset.star);
      shownAmount = nextOpacity;
    }
    if (shownAmount <= 0.05) {
      shown = zoomPoint >= 0 ? zoomPoint : Number(stops[index].dataset.star);
      shownAmount = Math.max(zoom, 0.6);
    }

    markSide(shown, shownAmount);
    if (nextButton) nextButton.hidden = scaled >= stops.length - 1.02;
  }

  const nextButton = document.querySelector(".sky-next");
  let flight = 0;
  let flightTarget = 0;

  function easeInOutCubic(t) {
    const clamped = Math.max(0, Math.min(1, t));
    return clamped < 0.5 ? 4 * clamped ** 3 : 1 - ((-2 * clamped + 2) ** 3) / 2;
  }

  function easeOutExpo(t) {
    return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function cancelFlight() {
    if (!flight) return;
    cancelAnimationFrame(flight);
    flight = 0;
  }

  let settled = 0;

  let thumbTimer = 0;

  function stopThumbMarquee() {
    if (thumbTimer) clearInterval(thumbTimer);
    thumbTimer = 0;
  }

  function thumbMetrics(strip) {
    const track = strip.querySelector(".sky-thumbs-track");
    const item = track?.querySelector("button");
    if (!track || !item) return null;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
    const step = item.getBoundingClientRect().width + gap;
    const count = track.querySelectorAll("button").length;
    if (step <= 0) return null;
    return { track, step, max: Math.max(0, count - 3) };
  }

  function placeThumbs(strip, index, animate) {
    const metrics = thumbMetrics(strip);
    if (!metrics) return;
    const next = Math.max(0, Math.min(metrics.max, index));
    strip.dataset.index = String(next);
    if (animate) metrics.track.style.transition = "";
    else metrics.track.style.transition = "none";
    void metrics.track.offsetWidth;
    metrics.track.style.transform = `translate3d(${-next * metrics.step}px, 0, 0)`;
    if (!animate) {
      void metrics.track.offsetWidth;
      metrics.track.style.transition = "";
    }
  }

  function startThumbMarquee(stage) {
    stopThumbMarquee();
    const visual = stage.querySelector(".sky-visual");
    const frames = visual ? JSON.parse(visual.dataset.frames || "[]") : [];
    const slides = frames.length > 1 && frames.every((frame) => frame.type === "image");
    const strip = stage.querySelector(".sky-thumbs[data-scroll]");
    if (!strip && !slides) return;
    if (strip && !strip.dataset.bound) {
      strip.dataset.bound = "1";
      let drag = null;
      const pause = () => {
        strip.dataset.pauseUntil = String(performance.now() + 2500);
      };
      strip.addEventListener("pointerdown", (event) => {
        if (event.button !== 0 || !thumbMetrics(strip)) return;
        drag = {
          id: event.pointerId,
          x: event.clientX,
          index: Number(strip.dataset.index || 0),
          dx: 0,
          moved: false,
        };
        pause();
      });
      strip.addEventListener("pointermove", (event) => {
        if (!drag || event.pointerId !== drag.id) return;
        const dx = event.clientX - drag.x;
        if (!drag.moved && Math.abs(dx) < 8) return;
        const metrics = thumbMetrics(strip);
        if (!metrics) return;
        if (!drag.moved) {
          drag.moved = true;
          strip.classList.add("is-dragging");
          strip.setPointerCapture(event.pointerId);
        }
        drag.dx = dx;
        metrics.track.style.transition = "none";
        metrics.track.style.transform = `translate3d(${-drag.index * metrics.step + dx}px, 0, 0)`;
        pause();
      });
      const finishDrag = (event) => {
        if (!drag || event.pointerId !== drag.id) return;
        const moved = drag.moved;
        const dx = drag.dx;
        const index = drag.index;
        drag = null;
        strip.classList.remove("is-dragging");
        if (!moved) return;
        strip.dataset.dragged = "1";
        const metrics = thumbMetrics(strip);
        if (!metrics) return;
        const threshold = Math.max(28, metrics.step * 0.2);
        let next = index;
        if (dx <= -threshold) next = index >= metrics.max ? 0 : index + 1;
        else if (dx >= threshold) next = Math.max(0, index - 1);
        placeThumbs(strip, next, true);
        pause();
      };
      strip.addEventListener("pointerup", finishDrag);
      strip.addEventListener("pointercancel", finishDrag);
      strip.addEventListener("click", (event) => {
        if (strip.dataset.dragged !== "1") return;
        strip.dataset.dragged = "";
        event.preventDefault();
        event.stopPropagation();
      }, true);
    }
    thumbTimer = setInterval(() => {
      if (strip && !strip.classList.contains("is-dragging") && performance.now() >= Number(strip.dataset.pauseUntil || 0)) {
        const metrics = thumbMetrics(strip);
        if (metrics && metrics.max > 0) {
          const index = Number(strip.dataset.index || 0);
          placeThumbs(strip, index >= metrics.max ? 0 : index + 1, true);
        }
      }
      if (!slides) return;
      if (performance.now() < Number(visual.dataset.pauseUntil || 0)) return;
      const buttons = [...visual.querySelectorAll(".sky-thumbs button")];
      if (buttons.length < 2) return;
      const current = Math.max(0, buttons.findIndex((button) => button.classList.contains("is-active")));
      const next = buttons[(current + 1) % buttons.length];
      selectFrame(visual, Number(next.dataset.frame));
    }, 3200);
  }

  function markReading(index) {
    stops.forEach((stage, stageIndex) => {
      const reading = stageIndex === index;
      stage.classList.toggle("is-reading", reading);
      if (!reading) stage.scrollTop = 0;
      syncStageVideo(stage, reading);
    });
    const current = stops[index];
    if (current) startThumbMarquee(current);
    else stopThumbMarquee();
  }

  function flyToIndex(destination) {
    destination = Math.max(0, Math.min(stops.length - 1, destination));
    const previous = cruise;
    cancelFlight();
    flightTarget = destination;
    stops.forEach((stage) => {
      stage.classList.remove("is-reading");
      syncStageVideo(stage, false);
    });
    const start = progress;
    const distance = destination - start;
    if (Math.abs(distance) < 0.001 && !previous) {
      cruise = null;
      progress = destination;
      renderScroll();
      arrive(destination);
      return;
    }
    if (!previous && Math.abs(distance) <= 1.001) {
      cruise = null;
      const duration = Math.min(5400, Math.max(1500, Math.abs(distance) * 1860));
      let started = 0;
      function step(now) {
        if (!started) started = now;
        const t = Math.min(1, (now - started) / duration);
        progress = start + distance * t;
        renderScroll();
        if (t < 1) flight = requestAnimationFrame(step);
        else {
          flight = 0;
          progress = destination;
          renderScroll();
          arrive(destination);
        }
      }
      flight = requestAnimationFrame(step);
      return;
    }

    const alongFrom = previous ? previous.along : alongForStage(Math.round(start));
    const alongTo = alongForStage(destination);
    const originPoint = pointForStage(stops[Math.round(start)]);
    const destPoint = pointForStage(stops[destination]);
    const depart = !previous;
    const shownStar = Number(stops[destination].dataset.star);
    const fromStage = Math.round(start);
    const span = Math.abs(alongTo - alongFrom);
    const departMs = depart ? 420 : 0;
    const travelMs = span < 0.05 ? 0 : Math.min(3400, Math.max(820, span * 480));
    const arriveMs = destPoint >= 0 ? 1500 : 720;
    const total = departMs + travelMs + arriveMs;

    function frameAt(elapsed) {
      if (elapsed < departMs) {
        const t = departMs <= 0 ? 1 : elapsed / departMs;
        const fade = Math.min(1, t / 0.55);
        const zoomOut = t < 0.45 ? 0 : (t - 0.45) / 0.55;
        return {
          along: alongFrom,
          zoom: originPoint >= 0 ? 1 - zoomOut : 0,
          flare: 0,
          focusIndex: fromStage,
          opacity: 1 - fade,
          scale: originPoint >= 0 ? mix(1, 0.12, fade) : 1,
          shownStar,
        };
      }
      if (elapsed < departMs + travelMs) {
        const t = travelMs <= 0 ? 1 : (elapsed - departMs) / travelMs;
        return {
          along: mix(alongFrom, alongTo, easeInOutCubic(t)),
          zoom: 0,
          flare: 0,
          focusIndex: -1,
          opacity: 0,
          scale: 1,
          shownStar,
        };
      }
      const t = Math.min(1, (elapsed - departMs - travelMs) / arriveMs);
      const zoom = destPoint >= 0 ? easeOutExpo(Math.min(1, t / 0.4)) : 0;
      const flare = destPoint >= 0 && t > 0.4 ? (t - 0.4) / 0.6 : 0;
      const reveal = destPoint >= 0 ? Math.max(0, (flare - 0.55) / 0.45) : t < 0.4 ? 0 : (t - 0.4) / 0.6;
      return {
        along: alongTo,
        zoom,
        flare,
        focusIndex: destination,
        opacity: reveal,
        scale: destPoint >= 0 ? mix(0.2, 1, reveal) : 1,
        shownStar,
      };
    }

    let started = 0;
    function step(now) {
      if (!started) started = now;
      const elapsed = now - started;
      if (elapsed < total) {
        cruise = frameAt(elapsed);
        renderScroll();
        flight = requestAnimationFrame(step);
        return;
      }
      flight = 0;
      cruise = null;
      progress = destination;
      renderScroll();
      arrive(destination);
    }
    cruise = frameAt(0);
    renderScroll();
    flight = requestAnimationFrame(step);
  }

  function jumpTo(index) {
    const destination = Math.max(0, Math.min(stops.length - 1, index));
    cancelFlight();
    cruise = null;
    progress = destination;
    renderScroll();
    arrive(destination);
  }

  function goBy(direction) {
    if (flight) {
      const destination = direction > 0
        ? Math.min(stops.length - 1, Math.max(flightTarget, settled + 1))
        : Math.max(0, Math.min(flightTarget, settled - 1));
      jumpTo(destination);
      return;
    }
    const destination = Math.max(0, Math.min(stops.length - 1, settled + direction));
    if (destination === settled) return;
    flyToIndex(destination);
  }

  function arrive(index) {
    settled = index;
    flightTarget = index;
    markReading(index);
  }

  nextButton.addEventListener("click", () => goBy(1));

  window.addEventListener("keydown", (event) => {
    const down = event.key === "ArrowDown" || event.key === "PageDown";
    const up = event.key === "ArrowUp" || event.key === "PageUp";
    if (!down && !up) return;
    const stage = stops[settled];
    if (!stage || stage.scrollHeight - stage.clientHeight <= 1) return;
    event.preventDefault();
    const amount = event.key.startsWith("Page") ? stage.clientHeight * 0.85 : 72;
    stage.scrollBy({ top: down ? amount : -amount });
  });

  window.addEventListener("resize", renderScroll);
  renderScroll();
  markReading(0);
  if (document.fonts) {
    document.fonts.ready.then(() => {
      figure.dataset.layout = "";
      renderScroll();
    });
  }

  const canvas = document.getElementById("sky-canvas");
  const context = canvas.getContext("2d");
  const dust = Array.from({ length: 280 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: Math.random() * 1.35 + 0.15,
    a: Math.random() * 0.72 + 0.2,
    tw: Math.random() < 0.24,
    p: Math.random() * Math.PI * 2,
  }));

  function paint(now) {
    const width = Math.max(canvas.clientWidth || window.innerWidth, 1);
    const height = Math.max(canvas.clientHeight || window.innerHeight, 1);
    const ratio = window.devicePixelRatio || 1;
    const bitmapW = Math.floor(width * ratio);
    const bitmapH = Math.floor(height * ratio);
    if (canvas.width !== bitmapW || canvas.height !== bitmapH) {
      canvas.width = bitmapW;
      canvas.height = bitmapH;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    context.clearRect(0, 0, width, height);
    const sky = context.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, "#16203a");
    sky.addColorStop(0.55, "#10182c");
    sky.addColorStop(1, "#0c1220");
    context.fillStyle = sky;
    context.fillRect(0, 0, width, height);
    dust.forEach((star) => {
      const alpha = star.tw ? star.a * (0.55 + Math.sin(now / 700 + star.p) * 0.45) : star.a;
      context.fillStyle = `rgba(244, 236, 220, ${alpha})`;
      context.beginPath();
      context.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
      context.fill();
    });
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(paint);
    }
  }
  function paintNow() {
    paint(performance.now());
  }
  window.addEventListener("resize", paintNow);
  if (window.visualViewport) window.visualViewport.addEventListener("resize", paintNow);
  requestAnimationFrame(paint);
})();

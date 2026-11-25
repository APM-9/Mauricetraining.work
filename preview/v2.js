/* Shared engine for the new design (demo under /preview/).
 * Pages that exist in the demo link to each other; the rest link to the live site. */
export const DEMO_PAGES = new Set(["index.html", "coaching.html", "web-design.html", "fights.html", "contact.html"]);
const LINKS = [["coaching.html", "Coaching"], ["fights.html", "Fights"], ["merch.html", "Merch"], ["web-design.html", "Web design"], ["contact.html", "Contact"]];
export const href = (page) => (DEMO_PAGES.has(page.split("#")[0]) ? page : "../" + page);

history.scrollRestoration = "manual";
export const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
export const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
export const clamp01 = (v) => Math.min(1, Math.max(0, v));

/* the shared ticker */
const subs = new Set();
let raf = 0;
const loop = (time) => {
  for (const s of [...subs]) if (time - s.last > s.rate()) { s.last = time; s.fn(time); }
  raf = subs.size ? requestAnimationFrame(loop) : 0;
};
export const subscribe = (fn, rate = () => 0) => {
  const s = { fn, rate, last: -Infinity };
  subs.add(s);
  if (!raf) raf = requestAnimationFrame(loop);
  return () => subs.delete(s);
};
if (!REDUCED) {
  import("https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.mjs").then(({ default: Lenis }) => {
    const lenis = new Lenis({ smoothWheel: true });
    window.__lenis = lenis;
    subscribe((t) => lenis.raf(t));
  }).catch(() => {});
}

/* the spring */
export class Spring {
  constructor(value, { tension = 170, friction = 26 } = {}, onChange) {
    this.value = value; this.velocity = 0; this.target = value;
    this.tension = tension; this.friction = friction; this.onChange = onChange; this.stop = null;
  }
  to(target, delay = 0) {
    const go = () => {
      this.target = target;
      if (REDUCED) { this.value = target; this.onChange?.(target); return; }
      if (this.stop) return;
      let last = performance.now();
      this.stop = subscribe((now) => {
        const dt = Math.min(64, now - last); last = now;
        for (let i = 0; i < dt; i++) {
          const f = -this.tension * 0.000001 * (this.value - this.target) - this.friction * 0.001 * this.velocity;
          this.velocity += f; this.value += this.velocity;
        }
        if (Math.abs(this.velocity) < 0.0005 && Math.abs(this.target - this.value) < 0.001) {
          this.value = this.target; this.velocity = 0; this.stop(); this.stop = null;
        }
        this.onChange?.(this.value);
      });
    };
    delay ? setTimeout(go, delay) : go();
    return this;
  }
}
export const rise = (el, delay = 0, d = "0.75rem", cfg = { tension: 90, friction: 26 }) =>
  new Spring(0, cfg, (v) => { el.style.opacity = v; el.style.transform = `translateY(calc(${d} * ${1 - v}))`; }).to(1, delay);

/* text engine */
const prepared = new WeakSet();
export const prepSplit = (el) => {
  if (prepared.has(el)) return;
  prepared.add(el);
  const text = el.textContent.trim();
  const byLetter = el.dataset.split === "letters";
  const parts = byLetter ? [...text] : text.split(/\s+/);
  el.textContent = "";
  const hidden = document.createElement("span"); hidden.className = "sr"; hidden.textContent = text;
  const shown = document.createElement("span"); shown.setAttribute("aria-hidden", "true");
  el._units = parts.map((p) => {
    const u = document.createElement("span"); u.className = "u";
    u.textContent = p === " " ? " " : p;
    u.style.opacity = 0; u.style.transform = `translateY(${byLetter ? 0.3 : 0.35}em)`;
    shown.appendChild(u); return u;
  });
  el.append(hidden, shown);
};
export const playSplit = (el, base = 0) => {
  if (el._played) return; el._played = true;
  const byLetter = el.dataset.split === "letters";
  const [tension, friction] = (el.dataset.cfg || "90,26").split(",").map(Number);
  const stagger = Number(el.dataset.stagger || (byLetter ? 26 : 110)), delay = Number(el.dataset.delay || 0);
  const y = byLetter ? 0.3 : 0.35;
  el._units.forEach((u, i) => new Spring(0, { tension, friction }, (v) => {
    u.style.opacity = v; u.style.transform = `translateY(${(1 - v) * y}em)`;
  }).to(1, base + delay + i * stagger));
};
export const onView = (el, fn, margin = "0% 0% -20% 0%") => {
  const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); fn(); } }, { rootMargin: margin });
  io.observe(el);
};
/* Every [data-arm] block plays its reveals once it is on screen. */
export const arm = (section, base = 0) => {
  section.querySelectorAll("[data-split]").forEach((el) => !el.closest("[data-own]") && playSplit(el, base));
  section.querySelectorAll("[data-fade]").forEach((el) => new Spring(0, { tension: 90, friction: 26 }, (v) => (el.style.opacity = v)).to(1, base + Number(el.dataset.fade)));
  section.querySelectorAll("[data-rise]").forEach((el) => rise(el, base + Number(el.dataset.rise)));
  section.querySelectorAll("[data-draw]").forEach((el) => new Spring(0, { tension: 90, friction: 26 }, (v) => (el.style.transform = `scaleX(${v})`)).to(1, base + Number(el.dataset.draw)));
};

/* scroll progress */
export const progressOf = (el, start, end) => {
  const bb = el.getBoundingClientRect(), vh = innerHeight;
  const poses = {
    top_top: bb.top, center_top: bb.top + bb.height / 2, bottom_top: bb.bottom,
    top_bottom: bb.top - vh, center_bottom: bb.top + bb.height / 2 - vh, bottom_bottom: bb.bottom - vh,
    top_center: bb.top - vh / 2, center_center: bb.top + bb.height / 2 - vh / 2, bottom_center: bb.bottom - vh / 2,
  };
  const s = poses[start], e = poses[end], len = Math.abs(s - e) || 1;
  return clamp01(1 - (s + len) / len);
};
export const whileVisible = (el, fn, rate = () => 0) => {
  let stop = null, grace = 0;
  const io = new IntersectionObserver(([e]) => {
    e.target._in = e.isIntersecting;
    if (e.isIntersecting) { grace = 10; if (!stop) stop = subscribe((t) => { fn(t); if (!e.target._in && --grace <= 0) { stop(); stop = null; } }, rate); }
  });
  io.observe(el);
};

/* contour backdrop */
export const contours = (canvas, colourVar) => {
  const ctx = canvas.getContext("2d");
  const LINE_SCALE = 3.8, LINE_COUNT = 2.5, WAVE_AMOUNT = 0.37, WAVE_SPEED = 1.66, LINE_OPACITY = 0.85, CELLS = 96;
  const field = (x, y, t) => {
    let f = Math.sin(x + t * 0.6) * 0.5;
    f += Math.sin(y * 0.85 - t * 0.45) * 0.45;
    f += Math.sin((x + y) * 0.65 + t * 0.35) * 0.35;
    f += Math.sin((x - y) * 0.95 - t * 0.55) * 0.25;
    return f * 0.5 + 0.5;
  };
  const start = performance.now();
  whileVisible(canvas, (now) => {
    const ratio = Math.min(devicePixelRatio || 1, 2), width = canvas.clientWidth, height = canvas.clientHeight;
    if (!width || !height) return;
    if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) { canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio); }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0); ctx.clearRect(0, 0, width, height);
    const t = REDUCED ? 0 : ((now - start) / 1000) * WAVE_SPEED;
    const cols = width >= height ? CELLS : Math.max(8, Math.round((CELLS * width) / height));
    const rows = Math.max(8, Math.round((cols * height) / width));
    const stepX = width / cols, stepY = height / rows, aspect = width / height;
    const values = new Float32Array((cols + 1) * (rows + 1));
    for (let j = 0; j <= rows; j++) for (let i = 0; i <= cols; i++) {
      const nx = ((i / cols) * 2 - 1) * aspect * LINE_SCALE, ny = ((j / rows) * 2 - 1) * LINE_SCALE;
      const qx = nx + Math.sin(ny * 0.8 + t * 0.7) * WAVE_AMOUNT, qy = ny + Math.cos(nx * 0.7 - t * 0.6) * WAVE_AMOUNT;
      values[j * (cols + 1) + i] = field(qx, qy, t) * LINE_COUNT;
    }
    ctx.strokeStyle = css(colourVar); ctx.lineWidth = 1; ctx.globalAlpha = LINE_OPACITY; ctx.beginPath();
    const seg = (p, q) => { ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); };
    for (let level = 0.5; level < LINE_COUNT; level += 1)
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const a = values[j * (cols + 1) + i], b = values[j * (cols + 1) + i + 1];
        const c = values[(j + 1) * (cols + 1) + i + 1], d = values[(j + 1) * (cols + 1) + i];
        const idx = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0);
        if (idx === 0 || idx === 15) continue;
        const x0 = i * stepX, y0 = j * stepY;
        const top = [x0 + stepX * ((level - a) / (b - a)), y0];
        const right = [x0 + stepX, y0 + stepY * ((level - b) / (c - b))];
        const bottom = [x0 + stepX * ((level - d) / (c - d)), y0 + stepY];
        const left = [x0, y0 + stepY * ((level - a) / (d - a))];
        switch (idx) {
          case 1: case 14: seg(left, bottom); break;
          case 2: case 13: seg(bottom, right); break;
          case 3: case 12: seg(left, right); break;
          case 4: case 11: seg(top, right); break;
          case 6: case 9: seg(top, bottom); break;
          case 7: case 8: seg(left, top); break;
          case 5: seg(left, top); seg(bottom, right); break;
          case 10: seg(left, bottom); seg(top, right); break;
        }
      }
    ctx.stroke(); ctx.globalAlpha = 1;
  }, () => 24);
};

/* chequered dissolve */
export const chequer = (canvas) => {
  const ctx = canvas.getContext("2d");
  const CELL = 24, SOLID_UNTIL = 0.16, LIFT = 2, ACCENT_SHARE = 0.06;
  const noise = (x, y) => {
    let h = Math.imul(x, 374761393) + Math.imul(y, 668265263);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
  };
  const surface = canvas.dataset.carry === "light" ? "--background" : "--surface-black";
  const render = (progress) => {
    const ratio = Math.min(devicePixelRatio || 1, 2), width = canvas.clientWidth, height = canvas.clientHeight;
    if (!width) return;
    if (canvas.width !== Math.round(width * ratio)) { canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio); }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0); ctx.clearRect(0, 0, width, height);
    const columns = Math.ceil(width / CELL), rows = Math.ceil(height / CELL), lift = progress * LIFT;
    const accent = css("--accent"), fill = css(surface);
    for (let y = 0; y < rows; y++) {
      const depth = y / Math.max(1, rows - 1) + lift;
      if (depth > 1) break;
      const solid = depth <= SOLID_UNTIL, fade = clamp01(1 - (depth - SOLID_UNTIL) / (1 - SOLID_UNTIL));
      if (!solid && fade <= 0) break;
      for (let x = 0; x < columns; x++) {
        if (!solid) { if ((x + y) % 2 !== 0) continue; if (noise(x, y) > fade) continue; }
        ctx.fillStyle = !solid && noise(x + 101, y + 57) < ACCENT_SHARE ? accent : fill;
        ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
      }
    }
  };
  let shown = -1;
  const spring = new Spring(0, { tension: 140, friction: 30 }, render);
  render(0);
  subscribe(() => { const p = progressOf(canvas, "top_bottom", "top_top"); if (Math.abs(p - shown) > 0.001) { shown = p; spring.to(p); } }, () => 10);
  addEventListener("resize", () => render(spring.value));
};

/* the sticky stack recede */
export const stack = (root) => {
  const layers = [...root.querySelectorAll(":scope > .layer")];
  const pinned = layers.slice(0, -1).map((layer, i) => ({ inner: layer.querySelector(".layer-inner"), shade: layer.querySelector(".shade"), next: layers[i + 1] }));
  const phone = matchMedia("(max-width: 639px)");
  let queued = false;
  const apply = () => {
    queued = false;
    const view = innerHeight || 1, shrink = phone.matches ? 0 : 0.1;
    for (const { inner, shade, next } of pinned) {
      const layer = inner.parentElement;
      // Only pin a layer that fits on screen; a taller one scrolls normally so nothing is covered unseen.
      layer.style.position = inner.offsetHeight > view + 1 ? "relative" : "";
      const p = clamp01(1 - next.getBoundingClientRect().top / view);
      inner.style.transform = p > 0 && shrink > 0 ? `scale(${1 - shrink * p})` : "";
      shade.style.opacity = 0.55 * p;
      inner.style.visibility = p >= 1 ? "hidden" : "visible";
    }
  };
  addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(apply); } }, { passive: true });
  addEventListener("resize", apply);
  apply();
};

/* header, menu sheet, footer, preview pill */
const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
const corner = '<svg class="c tl"><use href="#corner"/></svg><svg class="c tr"><use href="#corner"/></svg><svg class="c bl"><use href="#corner"/></svg><svg class="c br"><use href="#corner"/></svg>';
export const CORNERS = corner;
const arrow = '<svg class="a" viewBox="0 0 13.7071 10.7071" aria-hidden="true"><path d="M0 5.35355H13M8 10.3536L13 5.35355L8 0.353553"/></svg>';
export const ctaHTML = (label, link, { hollow = false, target = "" } = {}) =>
  `<a class="cta${hollow ? " hollow" : ""}" href="${link}"${target}><svg class="f" viewBox="0 0 220 50" preserveAspectRatio="none" aria-hidden="true"><path class="body" d="M0.5 0.5H219.5V42L212 49.5H0.5Z"/><path class="flood" d="M0.5 0.5H219.5V42L212 49.5H0.5Z"/></svg><span>${label}</span>${arrow}</a>`;

const defs = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <clipPath id="plateClip" clipPathUnits="objectBoundingBox"><path d="M 0.01915,0.00107H 0.98085C 0.98574,0.00107 0.99044,0.00300 0.99390,0.00642C 0.99736,0.00984 0.99930,0.01449 0.99930,0.01933V 0.88815C 0.99930,0.89299 0.99736,0.89763 0.99390,0.90105C 0.99044,0.90448 0.98574,0.90640 0.98085,0.90640H 0.64733C 0.63864,0.90640 0.63007,0.90834 0.62224,0.91206C 0.61442,0.91579 0.60754,0.92122 0.60212,0.92794L 0.56153,0.97830C 0.55635,0.98474 0.54976,0.98993 0.54227,0.99350C 0.53478,0.99707 0.52656,0.99892 0.51825,0.99892H 0.01915C 0.01426,0.99892 0.00956,0.99700 0.00610,0.99358C 0.00264,0.99016 0.00070,0.98551 0.00070,0.98067V 0.01933C 0.00070,0.01449 0.00264,0.00984 0.00610,0.00642C 0.00956,0.00300 0.01426,0.00107 0.01915,0.00107Z"/></clipPath>
  <symbol id="corner" viewBox="0 0 10.5 10.5"><path d="M0 0.5H10V10.5"/></symbol>
  <symbol id="plateOutline" viewBox="0 0 710.995 462.995"><path d="M13.6168 0.497469H697.378C700.858 0.497469 704.195 1.38786 706.655 2.97277C709.115 4.55769 710.498 6.70729 710.498 8.94869V411.208C710.498 413.449 709.115 415.599 706.655 417.183C704.195 418.768 700.858 419.659 697.378 419.659H460.249C454.073 419.659 447.976 420.555 442.411 422.281C436.847 424.008 431.958 426.519 428.107 429.63L399.246 452.95C395.559 455.928 390.878 458.333 385.55 459.986C380.223 461.639 374.385 462.497 368.472 462.497H13.6168C10.1373 462.497 6.80038 461.607 4.34003 460.022C1.87968 458.437 0.497469 456.288 0.497469 454.046V8.94869C0.497469 6.70729 1.87968 4.55769 4.34003 2.97277C6.80038 1.38786 10.1373 0.497469 13.6168 0.497469Z"/></symbol>
</svg>`;
export const plateHTML = (src, alt, style = "") =>
  `<div class="plate-img" style="${style}"><div class="fill"><img src="${src}" alt="${alt}" loading="lazy"></div><svg class="o" viewBox="0 0 710.995 462.995" preserveAspectRatio="none" aria-hidden="true"><use href="#plateOutline" vector-effect="non-scaling-stroke"/></svg></div>`;

export const chrome = () => {
  document.body.insertAdjacentHTML("afterbegin", defs);
  const head = document.querySelector("[data-v2-header]");
  if (head) {
    head.outerHTML = `<header class="mast" id="mast">
      <a class="logo" href="${href("index.html")}" aria-label="Ashanti Maurice, home"><img src="../img/logo-badge.png" alt=""><span>Ashanti Maurice</span></a>
      <nav class="nav" aria-label="Primary"><ul>${LINKS.map(([p, l]) => `<li><a href="${href(p)}"${p === page ? ' aria-current="page"' : ""}>${l}</a></li>`).join("")}</ul></nav>
      <a class="mast-right" href="${href("coaching.html")}#apply"><span aria-hidden="true">[ </span>Apply<span aria-hidden="true"> → ]</span></a>
      <button class="burger" id="burger" aria-label="Open menu"><i></i><i></i></button>
    </header>`;
    document.body.insertAdjacentHTML("beforeend", `<div class="sheet" id="sheet" role="dialog" aria-modal="true" aria-label="Menu">
      <div class="sheet-top"><a class="logo" href="${href("index.html")}"><img src="../img/logo-badge.png" alt=""><span>Ashanti Maurice</span></a><button class="close" id="close" aria-label="Close menu"><i></i><i></i></button></div>
      <nav>${LINKS.map(([p, l]) => `<a href="${href(p)}">${l}</a>`).join("")}<a href="${href("coaching.html")}#apply">Apply</a></nav></div>`);
    const sheet = document.getElementById("sheet"), close = document.getElementById("close");
    const set = (open) => {
      sheet.classList.toggle("open", open);
      document.documentElement.style.overflow = open ? "hidden" : "";
      window.__lenis?.[open ? "stop" : "start"]();
      if (open) { close.focus(); sheet.querySelectorAll("nav a").forEach((a, i) => rise(a, 120 + i * 55, "0.75rem", { tension: 170, friction: 24 })); }
    };
    document.getElementById("burger").addEventListener("click", () => set(true));
    close.addEventListener("click", () => set(false));
    sheet.addEventListener("click", (e) => e.target.closest("nav a") && set(false));
    addEventListener("keydown", (e) => e.key === "Escape" && set(false));
  }
  const foot = document.querySelector("[data-v2-footer]");
  if (foot) {
    const [a, b] = (foot.dataset.head || "Stay ready|stay hungry").split("|");
    foot.outerHTML = `<section class="foot" id="foot">
      <div class="foot-panel"><canvas class="contours" data-contours="--footer-contour" aria-hidden="true"></canvas></div>
      <div class="foot-fig"><div class="in" id="footFig"><img src="../img/logo-badge.png" alt=""></div></div>
      <div class="foot-logo" data-rise="120"><img src="../img/logo-badge.png" alt=""><span>Chef Whippems</span></div>
      <h2 class="display foot-head"><span class="split" data-split="words">${a}</span><span style="display:flex;justify-content:flex-end"><span class="split" data-split="words" data-delay="130">${b}</span><span class="stop" data-fade="240">.</span></span></h2>
      <nav class="foot-nav" aria-label="Footer">${LINKS.map(([p, l], i) => `<a href="${href(p)}" class="split" data-split="letters" data-stagger="22" data-cfg="170,24" data-delay="${260 + i * 80}">${l}</a>`).join("")}</nav>
      <div class="foot-row">
        <span class="foot-copy" data-rise="640">© 2026 Ashanti Maurice. All rights reserved.</span>
        <span data-rise="720">${ctaHTML("Apply for coaching", href("coaching.html") + "#apply", { hollow: true })}</span>
        <div class="foot-soc" data-rise="800"><a href="https://instagram.com/Rx_Dolo" target="_blank" rel="noopener">inst</a><a href="${href("merch.html")}">merch</a><a href="${href("contact.html")}">contact</a></div>
      </div>
    </section>`;
    const f = document.getElementById("foot"), fig = document.getElementById("footFig");
    subscribe(() => { const p = progressOf(f, "top_bottom", "bottom_bottom"); fig.style.top = `${4.1667 * (1 - p)}cqw`; }, () => 10);
  }
  document.body.insertAdjacentHTML("beforeend", `<a class="back" href="../${page === "index.html" ? "" : page}">Design preview · <b>back to the current site</b></a>`);
};

/* wire up everything generic on the page */
export const boot = () => {
  chrome();
  document.querySelectorAll("[data-split]").forEach(prepSplit);
  document.querySelectorAll("[data-fade],[data-rise]").forEach((el) => (el.style.opacity = 0));
  document.querySelectorAll("[data-draw]").forEach((el) => { el.style.transformOrigin = "left"; el.style.transform = "scaleX(0)"; });
  document.querySelectorAll("canvas[data-contours]").forEach((c) => contours(c, c.dataset.contours));
  document.querySelectorAll("canvas.chequer").forEach(chequer);
  document.querySelectorAll(".stack").forEach(stack);
  document.querySelectorAll("[data-arm], .foot").forEach((s) => onView(s, () => arm(s), s.dataset.margin || "0% 0% -20% 0%"));
};

/* Ashanti Maurice — shared header, footer and page behaviour.
   ------------------------------------------------------------
   EDIT HERE: the details below show up across the whole site. */

window.SITE = {
  email: "AMaurice_94@yahoo.com",
  instagram: "Rx_Dolo",
  calendly: "https://calendly.com/fpconsultation/fighter-physique-consultation",

  /* Fight record (Wins-Losses-Draws). Update after every fight. */
  record: {
    mma: "0-1-0",
    bjj: "2-1-0"
  },

  /* Next fight. Leave date as "" to show "Next fight: TBA".
     Example: { date: "2027-03-20T19:00:00", event: "Dead Serious 70",
                opponent: "TBA", venue: "Showboat, Atlantic City NJ",
                weight: "147–154 lbs", tickets: "https://..." } */
  nextFight: {
    date: "",
    event: "",
    opponent: "",
    venue: "",
    weight: "",
    tickets: ""
  },

  /* ================= FITNESS COACHING: TRUST DETAILS =================
     Anything left empty is hidden on the live site.
     Add ?draft to any page address to see where each item goes. */

  /* Registered business name, e.g. "Fighter Physique LLC" */
  business: "",

  /* e.g. ["NASM Certified Personal Trainer", "CPR / AED Certified"] */
  certifications: [],

  /* e.g. [{ value: "5+", label: "Years coaching" }, { value: "60+", label: "Clients coached" }] */
  experience: [],

  /* Only use quotes clients agreed to share.
     e.g. { quote: "Down 22 lb and stronger than ever.", name: "Mike R.", result: "-22 lb in 12 weeks", photo: "" } */
  testimonials: [],

  /* Policies / FAQ, e.g. { q: "Is there a payment plan?", a: "Yes — ..." } */
  policies: [],

  /* ================= WEB DEVELOPMENT =================
     price: "" shows "Get a quote". Set it like "$1,500" or "From $900".
     The features are a starting draft. Edit them to match what you offer.
     examples = screenshots shown on that industry's tab, real projects first.
       label: "Real project" or "Sample design".
       image = desktop screenshot; phone = phone screenshot; or phones: [two phone shots] for apps.
       link = live page, or "" and a note like "Launching soon". */
  webPricing: [
    {
      id: "restaurants",
      name: "Restaurants",
      blurb: "Menus, hours and directions that look right on every screen.",
      examples: [
        { label: "Real project", name: "Torres Cafe & Catering", image: "img/work/torres-cafe-desktop.jpg", phone: "img/work/torres-cafe-phone.jpg",
          text: "Bilingual English/Spanish site for a Puerto Rican cafe in Perth Amboy: menu, catering quote requests, hours and commission-free online ordering.", link: "", note: "Launching soon" },
        { label: "Sample design", name: "Harbor & Hearth", image: "img/work/sample-restaurant-desktop.jpg", phone: "img/work/sample-restaurant-phone.jpg",
          text: "Tabbed menu, today's hours, weekly specials, map and one-tap reservations.", link: "examples/restaurant/" }
      ],
      tiers: [
        { name: "Starter", price: "", features: ["One-page site", "Menu, hours and map", "Click-to-call and directions", "Works on phones, tablets & desktops"] },
        { name: "Pro", price: "", featured: true, features: ["Everything in Starter", "Multi-page site", "Photo gallery", "Online ordering or reservation link", "Google search basics"] },
        { name: "Premium", price: "", features: ["Everything in Pro", "Menu you can edit yourself", "Specials and events section", "Monthly care plan included"] }
      ]
    },
    {
      id: "gyms",
      name: "Gyms & facilities",
      blurb: "Programs, schedules and sign-ups that bring in members.",
      examples: [
        { label: "Real project", name: "Elite Wrestling NJ", image: "img/work/elite-wrestling-desktop.jpg", phone: "img/work/elite-wrestling-phone.jpg",
          text: "Programs, a weekly schedule the coach edits from a spreadsheet, a gear shop and donations.", link: "", note: "Launching soon" },
        { label: "Real project", name: "GTG", image: "img/work/gtg-hq-desktop.jpg", phone: "img/work/gtg-hq-phone.jpg",
          text: "A scroll-through tour of a new combat facility (mats, cage, ring, rooftop track) with classes, a weekly schedule and member sign-up with coach referral codes.", link: "", note: "Launching soon" }
      ],
      tiers: [
        { name: "Starter", price: "", features: ["One-page site", "Programs and coaches", "Free-trial or contact form", "Works on phones, tablets & desktops"] },
        { name: "Pro", price: "", featured: true, features: ["Everything in Starter", "Weekly schedule you edit from a spreadsheet", "Membership and pricing section", "Events and tournaments list"] },
        { name: "Premium", price: "", features: ["Everything in Pro", "Merch shop section", "Donations or payments box", "Monthly care plan included"] }
      ]
    },
    {
      id: "insurance",
      name: "Adjusters & insurance",
      blurb: "A professional presence that earns trust and brings in leads.",
      examples: [
        { label: "Real project", name: "Field Photos", phones: ["img/work/field-photos-phone.jpg", "img/work/field-photos-phone-2.jpg"],
          text: "A phone app for flood adjusters: document damage room by room with photos and voice notes, work offline on site, then export a room-by-room list for the estimate.", link: "", note: "Private app" },
        { label: "Sample design", name: "Northpoint Claims", image: "img/work/sample-insurance-desktop.jpg", phone: "img/work/sample-insurance-phone.jpg",
          text: "Free claim review form up front, claim types, a clear process and FAQ.", link: "examples/insurance/" }
      ],
      tiers: [
        { name: "Starter", price: "", features: ["One-page site", "Services and service area", "Contact form", "Works on phones, tablets & desktops"] },
        { name: "Pro", price: "", featured: true, features: ["Everything in Starter", "Multi-page site", "Claim or quote request form", "Licenses and credentials section", "Google search basics"] },
        { name: "Premium", price: "", features: ["Everything in Pro", "Client reviews section", "FAQ and resources pages", "Monthly care plan included"] }
      ]
    }
  ],

  /* e.g. { name: "Care plan", price: "$50/mo", note: "Up to 3 small changes a month" } */
  webAddons: [],

  /* Portfolio. image = screenshot in img/work/. link = "" for no link. */
  projects: [
    { name: "Ashanti Maurice", type: "Personal brand · Redesign", image: "img/work/ashanti-maurice-desktop.jpg", phone: "img/work/ashanti-maurice-phone.jpg",
      text: "Fighter and coaching site with an online shop, coaching applications and fight updates.", link: "https://apm-9.github.io/Mauricetraining.work/" },
    { name: "Elite Wrestling NJ", type: "Wrestling gym · Redesign", image: "img/work/elite-wrestling-desktop.jpg", phone: "img/work/elite-wrestling-phone.jpg",
      text: "Rebuilt a gym's Wix site as a fast custom site: programs, a schedule the coach edits from a spreadsheet, a gear shop and donations.", link: "", note: "Launching soon" },
    { name: "Torres Cafe & Catering", type: "Restaurant · Redesign", image: "img/work/torres-cafe-desktop.jpg", phone: "img/work/torres-cafe-phone.jpg",
      text: "Bilingual English/Spanish cafe site with menu, catering quote requests, hours and commission-free online ordering.", link: "", note: "Launching soon" },
    { name: "GTG", type: "Combat gym · New site", image: "img/work/gtg-hq-desktop.jpg", phone: "img/work/gtg-hq-phone.jpg",
      text: "Scroll-through facility tour, classes, weekly schedule, and member accounts with coach referral tracking.", link: "", note: "Launching soon" },
    { name: "Field Photos", type: "Insurance adjusters · Web app", phones: ["img/work/field-photos-phone.jpg", "img/work/field-photos-phone-2.jpg"],
      text: "Offline phone app for flood adjusters to capture damage, photos and voice notes room by room and export them for the estimate.", link: "", note: "Private app" }
    /* Add more: { name: "", type: "", image: "img/work/....jpg", phone: "", text: "", link: "" } */
  ]
};

(function () {
  var S = window.SITE;
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var links = [
    ["index.html", "Home"],
    ["coaching.html", "Coaching"],
    ["fights.html", "Fights"],
    ["merch.html", "Merch"],
    ["web-design.html", "Web Design"],
    ["contact.html", "Contact"]
  ];
  function navLinks() {
    return links.map(function (l) {
      var cur = page === l[0] || (page === "" && l[0] === "index.html");
      return '<a href="' + l[0] + '"' + (cur ? ' aria-current="page"' : "") + ">" + l[1] + "</a>";
    }).join("");
  }

  var header = document.getElementById("site-header");
  if (header) {
    header.outerHTML =
      '<header class="site-header"><div class="wrap">' +
        '<a class="brand" href="index.html" aria-label="Ashanti Maurice, home">' +
          '<img src="img/logo-badge.png" alt="" width="44" height="41"><span>Ashanti Maurice</span></a>' +
        '<nav class="nav" aria-label="Main">' + navLinks() +
          '<a class="btn small" href="coaching.html#apply">Apply</a></nav>' +
        '<button class="menu-btn" type="button" aria-controls="drawer" aria-expanded="false"><span class="bars" aria-hidden="true"></span>Menu</button>' +
      "</div></header>" +
      '<div class="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Menu">' +
        '<div class="drawer-top"><a class="brand" href="index.html"><img src="img/logo-badge.png" alt="" width="44" height="41"><span>Ashanti Maurice</span></a>' +
        '<button class="close-btn" type="button">Close</button></div>' +
        "<nav aria-label=\"Main\">" + navLinks() + "</nav>" +
        '<a class="btn" href="coaching.html#apply">Apply for coaching</a>' +
      "</div>";

    var drawer = document.getElementById("drawer");
    var openBtn = document.querySelector(".menu-btn");
    var closeBtn = drawer.querySelector(".close-btn");
    function setOpen(open) {
      drawer.classList.toggle("open", open);
      document.body.classList.toggle("locked", open);
      openBtn.setAttribute("aria-expanded", open ? "true" : "false");
      (open ? closeBtn : openBtn).focus();
    }
    openBtn.addEventListener("click", function () { setOpen(true); });
    closeBtn.addEventListener("click", function () { setOpen(false); });
    drawer.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("open")) setOpen(false);
    });
    matchMedia("(min-width:1021px)").addEventListener("change", function (m) { if (m.matches && drawer.classList.contains("open")) setOpen(false); });
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.outerHTML =
      '<footer class="site-footer"><div class="wrap">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand"><img src="img/logo-badge.png" alt="Chef Whippems logo" width="72" height="67">' +
            "<div><strong>Ashanti Maurice</strong><p>Fighter, strength coach and web developer. New Jersey.</p></div></div>" +
          "<div><h4>Site</h4><ul>" + links.map(function (l) { return '<li><a href="' + l[0] + '">' + l[1] + "</a></li>"; }).join("") + "</ul></div>" +
          "<div><h4>Connect</h4><ul>" +
            '<li><a href="https://instagram.com/' + S.instagram + '" target="_blank" rel="noopener">Instagram @' + S.instagram + "</a></li>" +
            '<li><a href="mailto:' + S.email + '">Email</a></li>' +
            '<li><a href="' + S.calendly + '" target="_blank" rel="noopener">Book a call</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="copyright"><span>© ' + new Date().getFullYear() + " Ashanti Maurice</span><span>Train like a fighter.</span></div>" +
      "</div></footer>";
  }

  /* Fill in any [data-record] / [data-ig] / [data-email] placeholders */
  document.querySelectorAll("[data-record]").forEach(function (el) { el.textContent = S.record[el.dataset.record] || "—"; });
  document.querySelectorAll("a[data-ig]").forEach(function (a) { a.href = "https://instagram.com/" + S.instagram; });
  document.querySelectorAll("[data-ig-text]").forEach(function (el) { el.textContent = "@" + S.instagram; });
  document.querySelectorAll("a[data-email]").forEach(function (a) { a.href = "mailto:" + S.email; });
  document.querySelectorAll("[data-email-text]").forEach(function (el) { el.textContent = S.email; });
  document.querySelectorAll("a[data-calendly]").forEach(function (a) { a.href = S.calendly; });

  /* Next fight block (index + fights pages) */
  document.querySelectorAll("[data-next-fight]").forEach(function (box) {
    var f = S.nextFight;
    var when = f.date ? new Date(f.date) : null;
    if (!when || isNaN(when) || when < new Date(Date.now() - 6 * 3600e3)) {
      box.innerHTML =
        '<span class="eyebrow">Next fight</span><h3>To be announced</h3>' +
        '<p class="muted">Back in camp. Follow <a data-ig href="https://instagram.com/' + S.instagram + '" target="_blank" rel="noopener">@' + S.instagram + "</a> for the announcement.</p>";
      return;
    }
    var dateText = when.toLocaleDateString(undefined, { weekday: "short", month: "long", day: "numeric", year: "numeric" });
    box.innerHTML =
      '<span class="eyebrow">Next fight</span><h3>' + (f.event || "Fight night") + "</h3>" +
      "<p>" + dateText + (f.venue ? " · " + f.venue : "") + "</p>" +
      (f.opponent ? "<p>vs " + f.opponent + (f.weight ? " · " + f.weight : "") + "</p>" : "") +
      '<div class="countdown" aria-live="off"></div>' +
      (f.tickets ? '<a class="btn small" href="' + f.tickets + '" target="_blank" rel="noopener">Tickets &amp; stream</a>' : "");
    var cd = box.querySelector(".countdown");
    function tick() {
      var d = when - new Date();
      if (d <= 0) { cd.textContent = "Fight night is here."; return; }
      var days = Math.floor(d / 864e5), h = Math.floor(d % 864e5 / 36e5), m = Math.floor(d % 36e5 / 6e4);
      cd.innerHTML = "<span><b>" + days + "</b>days</span><span><b>" + h + "</b>hrs</span><span><b>" + m + "</b>min</span>";
    }
    tick(); setInterval(tick, 30000);
  });

  /* ---------- Data-driven blocks (coaching trust + web design) ---------- */
  var DRAFT = /[?&]draft\b/.test(location.search);
  if (DRAFT) document.documentElement.classList.add("draft");
  function esc(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function ph(label) { return '<div class="placeholder">' + esc(label) + "</div>"; }
  function shots(x) {
    if (x.phones && x.phones.length) {
      return '<div class="shots phones">' + x.phones.map(function (src, i) {
        return '<img src="' + esc(src) + '" alt="' + esc(x.name) + " app on a phone, screen " + (i + 1) + '" loading="lazy">';
      }).join("") + "</div>";
    }
    return '<div class="shots"><img class="desk" src="' + esc(x.image) + '" alt="' + esc(x.name) + ' website on a desktop" loading="lazy">' +
      (x.phone ? '<img class="phone" src="' + esc(x.phone) + '" alt="' + esc(x.name) + ' website on a phone" loading="lazy">' : "") + "</div>";
  }
  function linkOrNote(x, label) {
    return x.link ? '<a class="btn small ghost ext" href="' + esc(x.link) + '" target="_blank" rel="noopener">' + label + "</a>"
                  : '<span class="muted small-note">' + esc(x.note || "Launching soon") + "</span>";
  }
  /* Hide a [data-section] wrapper when it has nothing to show (unless ?draft). */
  function settle(el, has) {
    var sec = el.closest("[data-section]") || el;
    if (!has && !DRAFT) sec.hidden = true;
  }

  document.querySelectorAll("[data-block]").forEach(function (el) {
    var kind = el.dataset.block, html = "", has = false;

    if (kind === "trust") {
      var items = [];
      if (S.business) items.push('<div class="trust-item"><b>' + esc(S.business) + "</b><span>Registered business</span></div>");
      S.certifications.forEach(function (c) { items.push('<div class="trust-item"><b>' + esc(c) + "</b><span>Certified</span></div>"); });
      S.experience.forEach(function (x) { items.push('<div class="trust-item"><b>' + esc(x.value) + "</b><span>" + esc(x.label) + "</span></div>"); });
      has = items.length > 0;
      if (!has) items = ['<div class="trust-item">' + ph("Business name / LLC") + "</div>", '<div class="trust-item">' + ph("Certification, e.g. NASM CPT") + "</div>",
        '<div class="trust-item">' + ph("Years coaching") + "</div>", '<div class="trust-item">' + ph("Clients coached") + "</div>"];
      html = items.join("");
    }

    if (kind === "testimonials") {
      has = S.testimonials.length > 0;
      var list = has ? S.testimonials : [{}, {}, {}];
      html = list.map(function (t) {
        if (!t.quote) return '<figure class="quote">' + ph("Client quote") + '<figcaption>' + ph("Name · result") + "</figcaption></figure>";
        return '<figure class="quote">' + (t.photo ? '<img src="' + esc(t.photo) + '" alt="" loading="lazy">' : "") +
          "<blockquote>“" + esc(t.quote) + "”</blockquote><figcaption><b>" + esc(t.name) + "</b>" +
          (t.result ? '<span class="result">' + esc(t.result) + "</span>" : "") + "</figcaption></figure>";
      }).join("");
    }

    if (kind === "policies") {
      has = S.policies.length > 0;
      var pol = has ? S.policies : [{ q: "Payment plans?" }, { q: "Refund policy?" }, { q: "Is there a contract?" }];
      html = pol.map(function (p) {
        return "<details><summary>" + esc(p.q) + "</summary>" + (p.a ? "<p>" + esc(p.a) + "</p>" : ph("Your answer")) + "</details>";
      }).join("");
    }

    if (kind === "projects") {
      has = S.projects.length > 0;
      html = S.projects.map(function (p) {
        return '<article class="project">' +
          shots(p) +
          '<div class="info"><span class="eyebrow">' + esc(p.type) + "</span><h3>" + esc(p.name) + "</h3><p>" + esc(p.text) + "</p>" +
          linkOrNote(p, "Visit site") +
          "</div></article>";
      }).join("") + (DRAFT ? '<article class="project">' + ph("Another project: screenshot, name, one line, link") + "</article>" : "");
    }

    if (kind === "pricing") {
      has = true;
      var cats = S.webPricing;
      html = '<div class="tabs" role="tablist">' + cats.map(function (c, i) {
        return '<button type="button" role="tab" id="tab-' + c.id + '" aria-controls="panel-' + c.id + '" aria-selected="' + (i === 0) + '">' + esc(c.name) + "</button>";
      }).join("") + "</div>" + cats.map(function (c, i) {
        return '<div class="tab-panel" role="tabpanel" id="panel-' + c.id + '" aria-labelledby="tab-' + c.id + '"' + (i ? " hidden" : "") + ">" +
          '<p class="lede" style="margin-bottom:24px">' + esc(c.blurb) + "</p>" +
          (c.examples || []).map(function (x) {
            return '<div class="showcase">' + shots(x) +
              '<div><span class="pill' + (/sample/i.test(x.label) ? " sample" : "") + '">' + esc(x.label) + "</span><h3>" + esc(x.name) + "</h3><p>" + esc(x.text) + "</p>" +
              linkOrNote(x, /sample/i.test(x.label) ? "View sample site" : "View site") +
              "</div></div>";
          }).join("") +
          (DRAFT && !(c.examples || []).length ? ph("Example screenshots for " + c.name) : "") +
          '<h3 class="tiers-title">' + esc(c.name) + ' packages</h3><div class="grid grid-3">' +
          c.tiers.map(function (t) {
            return '<div class="card tier' + (t.featured ? " featured" : "") + '">' + (t.featured ? '<span class="tag">Most popular</span>' : "") +
              "<h3>" + esc(t.name) + '</h3><div class="amount">' + (t.price ? esc(t.price) : "Custom quote") + "</div>" +
              '<ul class="ticks">' + t.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>" +
              '<a class="btn' + (t.featured ? "" : " ghost") + '" href="contact.html?topic=web">' + (t.price ? "Get started" : "Get a quote") + "</a></div>";
          }).join("") + "</div></div>";
      }).join("");
    }

    if (kind === "addons") {
      has = S.webAddons.length > 0;
      var ad = has ? S.webAddons : [{}, {}, {}];
      html = ad.map(function (a) {
        return a.name ? '<div class="addon"><div><b>' + esc(a.name) + "</b>" + (a.note ? "<span>" + esc(a.note) + "</span>" : "") + '</div><strong>' + esc(a.price) + "</strong></div>"
                      : '<div class="addon">' + ph("Add-on · price (e.g. care plan, extra page)") + "</div>";
      }).join("");
    }

    el.innerHTML = html;
    settle(el, has);
  });

  /* Tabs */
  document.querySelectorAll('[role="tablist"]').forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    function select(t) {
      tabs.forEach(function (x) {
        var on = x === t; x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute("aria-controls")).hidden = !on;
      });
    }
    tabs.forEach(function (t, i) {
      t.tabIndex = i ? -1 : 0;
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (d) { var n = tabs[(i + d + tabs.length) % tabs.length]; select(n); n.focus(); }
      });
    });
    var want = location.hash.replace("#", "");
    tabs.forEach(function (t) { if (t.id === "tab-" + want) select(t); });
  });

  /* Gallery lightbox */
  var lb;
  document.addEventListener("click", function (e) {
    var fig = e.target.closest(".gallery figure");
    if (!fig || !window.HTMLDialogElement) return;
    var img = fig.querySelector("img");
    if (!lb) {
      lb = document.createElement("dialog");
      lb.className = "lightbox";
      lb.innerHTML = '<form method="dialog"><button class="close-btn">Close</button></form><img alt="">';
      lb.addEventListener("click", function (ev) { if (ev.target === lb) lb.close(); });
      document.body.appendChild(lb);
    }
    var big = lb.querySelector("img");
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    lb.showModal();
  });
  document.querySelectorAll(".gallery figure").forEach(function (f) {
    f.tabIndex = 0; f.setAttribute("role", "button");
    f.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); f.click(); } });
  });

  /* Reveal on scroll */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
})();

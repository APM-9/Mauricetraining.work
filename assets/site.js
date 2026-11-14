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
  }
};

(function () {
  var S = window.SITE;
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var links = [
    ["index.html", "Home"],
    ["coaching.html", "Coaching"],
    ["fights.html", "Fights"],
    ["merch.html", "Merch"],
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
    matchMedia("(min-width:861px)").addEventListener("change", function (m) { if (m.matches && drawer.classList.contains("open")) setOpen(false); });
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.outerHTML =
      '<footer class="site-footer"><div class="wrap">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand"><img src="img/logo-badge.png" alt="Chef Whippems logo" width="72" height="67">' +
            "<div><strong>Ashanti Maurice</strong><p>Amateur fighter and strength coach. New Jersey.</p></div></div>" +
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

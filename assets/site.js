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
    date: "2026-12-20T00:00:00",
    event: "Savage Invitational 001",
    type: "Folkstyle wrestling match",
    opponent: "BJ Clagon",
    venue: "Invitation only · location undisclosed",
    weight: "",
    poster: "img/fight/si001-poster.jpg",
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
       label: "Concept redesign", "Concept design" or "Sample design".
       image = desktop screenshot; phone = phone screenshot; or phones: [two phone shots] for apps.
       link = live page, or "" and a note like "Launching soon". */
  webPricing: [
    {
      id: "restaurants",
      name: "Restaurants",
      blurb: "Menus, hours and directions that look right on every screen.",
      examples: [
        { label: "Client preview", name: "Plaza Garibaldi", image: "img/work/plaza-garibaldi-desktop.jpg", phone: "img/work/plaza-garibaldi-phone.jpg",
          text: "Bilingual Spanish/English site for an authentic Mexican restaurant on State Street in Perth Amboy: a full menu, Grubhub and DoorDash ordering, hours and map, a food gallery, catering and customer reviews.", link: "plaza/", cta: "View preview", status: "Launching soon" },
        { label: "Concept redesign", name: "Torres Cafe & Catering", image: "img/work/torres-cafe-desktop.jpg", phone: "img/work/torres-cafe-phone.jpg",
          text: "Bilingual English/Spanish site for a Puerto Rican cafe in Perth Amboy: menu, catering quote requests, hours and commission-free online ordering.", link: "", note: "Concept" }
      ],
      tiers: [
        { name: "Starter", price: "$1,200", features: ["One-page site", "Menu, hours and map", "Click-to-call and directions", "Works on phones, tablets & desktops"] },
        { name: "Pro", price: "$2,500", featured: true, features: ["Everything in Starter", "Multi-page site", "Photo gallery", "Online ordering or reservation link", "Google search basics"] },
        { name: "Premium", price: "$4,000", features: ["Everything in Pro", "Menu you can edit yourself", "Specials and events section", "3 months of care plan included"] }
      ]
    },
    {
      id: "gyms",
      name: "Gyms & facilities",
      blurb: "Programs, schedules and sign-ups that bring in members.",
      examples: [
        { label: "Concept redesign", name: "Elite Wrestling NJ", image: "img/work/elite-wrestling-desktop.jpg", phone: "img/work/elite-wrestling-phone.jpg",
          text: "Programs, a weekly schedule the coach edits from a spreadsheet, a gear shop and donations.", link: "", note: "Concept" },
        { label: "Concept design", name: "GTG", image: "img/work/gtg-hq-desktop.jpg", phone: "img/work/gtg-hq-phone.jpg",
          text: "A scroll-through tour of a new combat facility (mats, cage, ring, rooftop track) with classes, a weekly schedule and member sign-up with coach referral codes.", link: "", note: "Concept" }
      ],
      tiers: [
        { name: "Starter", price: "$1,200", features: ["One-page site", "Programs and coaches", "Free-trial or contact form", "Works on phones, tablets & desktops"] },
        { name: "Pro", price: "$2,800", featured: true, features: ["Everything in Starter", "Weekly schedule you edit from a spreadsheet", "Membership and pricing section", "Events and tournaments list"] },
        { name: "Premium", price: "$4,500", features: ["Everything in Pro", "Merch shop section", "Donations or payments box", "3 months of care plan included"] }
      ]
    },
    {
      id: "insurance",
      name: "Adjusters & insurance",
      blurb: "A professional presence that earns trust and brings in leads.",
      examples: [
        { label: "Sample design", name: "Northpoint Claims", image: "img/work/sample-insurance-desktop.jpg", phone: "img/work/sample-insurance-phone.jpg",
          text: "Free claim review form up front, claim types, a clear process and FAQ.", link: "examples/insurance/" }
      ],
      tiers: [
        { name: "Starter", price: "$1,200", features: ["One-page site", "Services and service area", "Contact form", "Works on phones, tablets & desktops"] },
        { name: "Pro", price: "$2,500", featured: true, features: ["Everything in Starter", "Multi-page site", "Claim or quote request form", "Licenses and credentials section", "Google search basics"] },
        { name: "Premium", price: "$4,000", features: ["Everything in Pro", "Client reviews section", "FAQ and resources pages", "3 months of care plan included"] }
      ]
    },
    {
      id: "shops",
      name: "Clothing brands & online shops",
      blurb: "Show off your pieces and make buying easy, on any screen.",
      examples: [
        { label: "Concept design", name: "Sew Honey", image: "img/work/sew-honey-desktop.jpg", phone: "img/work/sew-honey-phone.jpg",
          text: "A walk-through storefront for a handmade swimwear brand: scroll down a 3D aisle of racks, tap a piece to try it on, mix top and bottom sizes and add to a bag. Includes a list view and a wholesale inquiry form.", link: "", note: "Concept" }
      ],
      tiers: [
        { name: "Starter", price: "$1,500", features: ["Brand homepage and lookbook", "Up to 15 products", "Buy buttons or order form", "Works on phones, tablets & desktops"] },
        { name: "Pro", price: "$3,000", featured: true, features: ["Everything in Starter", "Full shop with up to 50 products", "Sizes, colors and stock levels", "Cart and secure checkout (Shopify or Stripe)", "Google search basics"] },
        { name: "Premium", price: "$5,000", features: ["Everything in Pro", "Custom interactive shopping experience", "Wholesale inquiry page", "3 months of care plan included"] }
      ]
    },
    {
      id: "athletes",
      name: "Athletes",
      blurb: "A personal site for fighters, players and coaches: your story, your stats, your highlights and a way for fans, sponsors and clients to reach you.",
      examples: [
        { label: "Live site", name: "Ashanti Maurice", image: "img/work/ashanti-maurice-desktop.jpg", phone: "img/work/ashanti-maurice-phone.jpg",
          text: "My own athlete site: fight record, next fight, coaching applications, a merch shop and sponsor slots.", link: "https://ashantimaurice.com/" }
      ],
      tiers: [
        { name: "Starter", price: "$900", features: ["One-page athlete profile", "Bio, stats or record, photos", "Social links and contact", "Custom domain with SSL", "Works on phones, tablets & desktops"] },
        { name: "Pro", price: "$1,700", featured: true, features: ["Everything in Starter", "Home, about, services, gallery and contact", "Highlight videos", "Schedule or next-event section", "Basic Google search setup"] },
        { name: "Premium", price: "$3,000", features: ["Everything in Pro", "Merch shop or coaching sign-ups", "Sponsor page with your audience and stats", "Booking or inquiry form", "3 months of hosting & care included"] }
      ],
      terms: [
        "Build is paid in full before work begins. It covers the domain, hosting setup and everything needed to launch.",
        "Hosting & care: $50 a month, starting the month the site goes live. Covers hosting, domain and SSL, security checks, and up to 2 small updates a month. Cancel any time with 30 days' notice.",
        "Extra quick edit (text, photo, link): $25 each. Larger work (new page, section or redesign): $75 an hour. Rush within 24 hours: add $50.",
        "Build time: about 5 to 7 days after I receive your bio, services, photos, links and any colors or logos."
      ]
    },
    {
      id: "apps",
      name: "Apps",
      blurb: "Custom web apps that install on a phone's home screen, no app store needed.",
      examples: [
        { label: "Concept app", name: "Field Photos", phones: ["img/work/field-photos-phone.jpg", "img/work/field-photos-phone-2.jpg"],
          text: "A phone app for flood claim adjusters: document damage room by room with photos and voice notes, work offline on site, sync to the cloud, then export a room-by-room list for the estimate.", link: "", note: "Concept" },
        { label: "Concept app", name: "Spots", image: "img/work/spots-desktop.jpg", phone: "img/work/spots-phone.jpg",
          text: "IRL gaming for skaters: a 3D globe of real skate spots pinned from photo GPS, video-backed trick claims, head-to-head S.K.A.T.E. games, crews and direct messages.", link: "", note: "In development" }
      ],
      tiers: [
        { name: "Starter", price: "$5,000", features: ["Phone-first web app for one job", "Installs to the home screen", "Saves data on the device and works offline", "Export to PDF or spreadsheet"] },
        { name: "Pro", price: "$8,000", featured: true, features: ["Everything in Starter", "User accounts and sign-in", "Cloud backup and sync across devices", "Photos, voice notes and file uploads"] },
        { name: "Premium", price: "From $12,000", features: ["Everything in Pro", "Admin or team dashboard", "Payments, messaging or maps", "3 months of care plan included"] }
      ]
    }
  ],

  /* e.g. { name: "Care plan", price: "$50/mo", note: "Up to 3 small changes a month" } */
  webAddons: [
    { name: "Care plan", price: "$75/mo", note: "Hosting check-ins, backups and up to 3 small changes a month" },
    { name: "One-off update", price: "$50", note: "A single text, photo or price change" },
    { name: "Extra page", price: "$250", note: "Any additional page in the same style" },
    { name: "English / Spanish", price: "$500", note: "Full bilingual site with a language switch" },
    { name: "Online ordering or booking setup", price: "$300", note: "Connect your ordering, reservation or class-booking system" },
    { name: "Google Business Profile setup", price: "$150", note: "Get found on Google Maps and search" }
  ],

  /* Portfolio. image = screenshot in img/work/. link = "" for no link. */
  /* ================= WRESTLING PROGRAM AT GTG =================
     The schedule and prices on the Coaching page. Change times, days or
     prices here. kind: "practice" | "strength" | "recovery" | "rest". */
  wrestling: {
    where: "GTG",
    /* Who the program is for. */
    ages: "High school wrestlers · grades 9–12",
    /* First day at the gym (YYYY-MM-DD). Until then the page shows a "starts" notice; after it, the notice goes away. */
    starts: "2026-12-15",
    /* Paste the Google Sheet's "Publish to web" CSV link here and the site
       reads the schedule from the sheet instead of the list below. Leave ""
       to use the list below. See wrestling-schedule-template.csv for columns. */
    sheetCsv: "",
    /* Weekly schedule. Starts at 8 PM so it never overlaps GTG's own classes
       (filming 4–5, BJJ 5–6, MMA/Muay Thai 6–7, boxing 7–8). */
    schedule: [
      { day: "Mon", kind: "practice", time: "8:00 – 9:30 PM", items: ["Folkstyle wrestling practice", "Drilling, live goes, conditioning"] },
      { day: "Tue", kind: "strength", time: "8:00 – 9:00 PM", items: ["Strength training", "Nutrition check-in"] },
      { day: "Wed", kind: "practice", time: "8:00 – 9:30 PM", items: ["Folkstyle wrestling practice", "Technique and situational wrestling"] },
      { day: "Thu", kind: "recovery", time: "8:00 – 9:30 PM", items: ["Mentorship class: planning your future, dream boards", "Film study", "Red light therapy", "Sauna (add-on)", "Cold plunge (add-on)"] },
      { day: "Fri", kind: "practice", time: "8:00 – 9:30 PM", items: ["Folkstyle wrestling practice", "Live wrestling and conditioning"] },
      { day: "Sat", kind: "strength", time: "10:00 – 11:30 AM", items: ["Strength training", "Nutrition session"] },
      { day: "Sun", kind: "recovery", time: "11:00 AM – 12:00 PM", items: ["Mentorship class: brotherhood, growth and development", "Red light therapy", "Sauna (add-on)", "Cold plunge (add-on)"] }
    ],
    /* One-off changes: holidays, cancellations, moved sessions.
       date: "YYYY-MM-DD", kind: "cancelled" or a session kind, note shown on the site.
       e.g. { date: "2026-12-24", kind: "cancelled", note: "Christmas Eve — no practice" } */
    changes: [],
    /* Days with no session (e.g. the team has a match). Plain dates, no reason
       is shown on the site: that week's card just reads "Off". */
    off: [
      "2026-12-16", "2026-12-18", "2026-12-19", "2026-12-23",
      "2027-01-06", "2027-01-08", "2027-01-09", "2027-01-13", "2027-01-15", "2027-01-16",
      "2027-01-26", "2027-01-27", "2027-01-30",
      "2027-02-03", "2027-02-05", "2027-02-06"
    ],
    /* A full athlete development program, not wrestling alone: wrestling,
       personal training, nutrition, recovery and mentorship. Monthly sits at
       the top of GTG's all-access rate ($200–$250) because it adds individual
       programs a gym membership doesn't. */
    prices: [
      { name: "Daily", price: "$30", per: "per session", features: ["Any one practice, strength or recovery day", "Drop in, no commitment"] },
      { name: "Weekly", price: "$85", per: "per week", features: ["Every session for 7 days", "Practice, strength and recovery days", "Nutrition guidance"] },
      { name: "Monthly", price: "$250", per: "per month", featured: true, features: ["Unlimited sessions all month", "Your own personal training program", "Your own nutrition program", "Recovery program with red light therapy", "Weekly mentorship class"] }
    ],
    /* The five parts of the program, shown as cards. */
    pillars: [
      { name: "Wrestling", text: "Folkstyle practice three nights a week: drilling, live goes and situational wrestling." },
      { name: "Personal training", text: "A strength and conditioning program built for each wrestler, not a group template." },
      { name: "Nutrition", text: "A nutrition program for weight class, energy and recovery, with regular check-ins." },
      { name: "Recovery", text: "Planned recovery days with red light therapy. Sauna and cold plunge as add-ons." },
      { name: "Mentorship", text: "A weekly class: planning your future, building a dream board, studying film, and growing as a brotherhood on and off the mat." }
    ],
    included: ["Wrestling practice", "Personal training program", "Nutrition program", "Recovery program", "Mentorship class", "Film study", "Red light therapy"],
    /* Paid on top of any class plan. */
    addons: [
      { name: "Sauna", price: "$10", per: "per session" },
      { name: "Cold plunge", price: "$10", per: "per session" },
      { name: "Sauna + cold plunge", price: "$15", per: "per session" },
      { name: "Unlimited sauna + cold plunge", price: "$50", per: "per month" },
      { name: "Monthly program + unlimited sauna & cold plunge", price: "$300", per: "per month" }
    ]
  },

  projects: [
    { name: "Ashanti Maurice", type: "Personal brand · Redesign", image: "img/work/ashanti-maurice-desktop.jpg", phone: "img/work/ashanti-maurice-phone.jpg",
      text: "Fighter and coaching site with an online shop, coaching applications and fight updates.", link: "https://ashantimaurice.com/" },
    { name: "Elite Wrestling NJ", type: "Wrestling gym · Redesign", image: "img/work/elite-wrestling-desktop.jpg", phone: "img/work/elite-wrestling-phone.jpg",
      text: "A redesign of a gym's Wix site as a fast custom site: programs, a schedule the coach edits from a spreadsheet, a gear shop and donations.", link: "", note: "Concept" },
    { name: "Torres Cafe & Catering", type: "Restaurant · Redesign", image: "img/work/torres-cafe-desktop.jpg", phone: "img/work/torres-cafe-phone.jpg",
      text: "Bilingual English/Spanish cafe site with menu, catering quote requests, hours and commission-free online ordering.", link: "", note: "Concept" },
    { name: "GTG", type: "Combat gym · New site", image: "img/work/gtg-hq-desktop.jpg", phone: "img/work/gtg-hq-phone.jpg",
      text: "Scroll-through facility tour, classes, weekly schedule, and member accounts with coach referral tracking.", link: "", note: "Concept" },
    { name: "Plaza Garibaldi", type: "Mexican restaurant · New site", image: "img/work/plaza-garibaldi-desktop.jpg", phone: "img/work/plaza-garibaldi-phone.jpg",
      text: "Bilingual site with a full menu, online ordering, hours and map, catering and customer reviews.", link: "plaza/", cta: "View preview", status: "Launching soon" },
    { name: "Field Photos", type: "Insurance adjusters · Web app", phones: ["img/work/field-photos-phone.jpg", "img/work/field-photos-phone-2.jpg"],
      text: "Offline phone app for flood adjusters to capture damage, photos and voice notes room by room and export them for the estimate.", link: "", note: "Concept" },
    { name: "Spots", type: "Skateboarding · Web app", image: "img/work/spots-desktop.jpg", phone: "img/work/spots-phone.jpg",
      text: "IRL gaming for skaters: a 3D globe of real skate spots pinned from photo GPS, trick claims backed by video, head-to-head S.K.A.T.E. games, crews and direct messages.", link: "", note: "In development" },
    { name: "Sew Honey", type: "Clothing brand · Online shop concept", image: "img/work/sew-honey-desktop.jpg", phone: "img/work/sew-honey-phone.jpg",
      text: "A walk-through storefront: scroll down a 3D aisle of racks, tap any piece to try it on, mix top and bottom sizes, and fill a bag with a free-shipping meter. Includes a plain list view and a wholesale inquiry wall.", link: "", note: "Concept" }
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
      '<div class="next-fight' + (f.poster ? " has-poster" : "") + '">' +
      (f.poster ? '<img src="' + f.poster + '" alt="' + (f.event || "Fight") + ' poster: ' + (f.opponent || "") + ' vs Ashanti Maurice">' : "") +
      '<div><span class="eyebrow">Next fight</span><h3>' + (f.event || "Fight night") + "</h3>" +
      (f.type ? '<p class="fight-type">' + f.type + "</p>" : "") +
      "<p>" + dateText + (f.venue ? " · " + f.venue : "") + "</p>" +
      (f.opponent ? "<p>vs <strong>" + f.opponent + "</strong>" + (f.weight ? " · " + f.weight : "") + "</p>" : "") +
      '<div class="countdown" aria-live="off"></div>' +
      (f.tickets ? '<a class="btn small" href="' + f.tickets + '" target="_blank" rel="noopener">Tickets &amp; stream</a>' : "") +
      "</div></div>";
    var cd = box.querySelector(".countdown");
    function tick() {
      var d = when - new Date();
      if (d <= 0) { cd.textContent = "Fight night is here."; return; }
      var days = Math.floor(d / 864e5), h = Math.floor(d % 864e5 / 36e5), m = Math.floor(d % 36e5 / 6e4), sec = Math.floor(d % 6e4 / 1e3);
      cd.innerHTML = "<span><b>" + days + "</b>days</span><span><b>" + h + "</b>hrs</span><span><b>" + m + "</b>min</span><span><b>" + sec + "</b>sec</span>";
    }
    tick(); setInterval(tick, 1000);
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
    var out = "";
    if (x.link) out += '<a class="btn small ghost ext" href="' + esc(x.link) + '" target="_blank" rel="noopener">' + esc(x.cta || label) + "</a>";
    if (x.status) out += '<span class="muted small-note">' + esc(x.status) + "</span>";
    if (!x.link && !x.status) out += '<span class="muted small-note">' + esc(x.note || "Launching soon") + "</span>";
    return out;
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
          }).join("") + "</div>" +
          (c.terms && c.terms.length ? '<div class="terms"><h3>How payment works</h3><ul>' + c.terms.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div>" : "") +
          "</div>";
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

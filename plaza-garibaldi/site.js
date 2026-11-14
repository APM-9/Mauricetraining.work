(function () {
  var S = window.SITE || {};
  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  // ---- Fixed page labels in both languages --------------------------------
  var UI = {
    en: {
      navMenu: "Menu", navAbout: "About", navVisit: "Visit", navOrder: "Order",
      orderOnline: "Order Online", seeMenu: "See the Menu", callUs: "Call Us",
      menuKicker: "La Carta", menuTitle: "Menu",
      aboutKicker: "Nuestra Casa", aboutTitle: "About Us", aboutPhoto: "Inside Plaza Garibaldi",
      galleryKicker: "De Nuestra Cocina", galleryTitle: "From Our Kitchen",
      orderKicker: "Para Llevar", orderTitle: "Order Online", orderSub: "Pickup or delivery through your favorite app.",
      orderOn: "Order on", callPickup: "Call for Pickup",
      cateringTitle: "Catering", callBook: "Call to Book",
      visitKicker: "Visítanos", visitTitle: "Hours & Location", directions: "Get Directions",
      holidays: "Hours may change on holidays. Call ahead to confirm.",
      noHours: "Call or check our Facebook page for today's hours.",
      mapTitle: "Map to Plaza Garibaldi",
      ratingOn: "on", ratings: "ratings", reviewBy: "Grubhub review",
      bestSeller: "Best Seller", spicy: "Spicy",
      menuSoon: "Our full menu is coming to this page soon. In the meantime, see everything we serve on Grubhub.",
      viewOrder: "View Menu & Order",
      dish: "Dish from Plaza Garibaldi", footerName: "Plaza Garibaldi Mexican Restaurant",
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    es: {
      navMenu: "Menú", navAbout: "Nosotros", navVisit: "Visítanos", navOrder: "Ordenar",
      orderOnline: "Ordenar en Línea", seeMenu: "Ver el Menú", callUs: "Llámenos",
      menuKicker: "La Carta", menuTitle: "Menú",
      aboutKicker: "Nuestra Casa", aboutTitle: "Sobre Nosotros", aboutPhoto: "Dentro de Plaza Garibaldi",
      galleryKicker: "De Nuestra Cocina", galleryTitle: "Nuestra Comida",
      orderKicker: "Para Llevar", orderTitle: "Ordenar en Línea", orderSub: "Para recoger o a domicilio con su app favorita.",
      orderOn: "Ordenar en", callPickup: "Llame para Recoger",
      cateringTitle: "Catering", callBook: "Llame para Reservar",
      visitKicker: "Visítanos", visitTitle: "Horario y Ubicación", directions: "Cómo Llegar",
      holidays: "El horario puede cambiar en días festivos. Llame para confirmar.",
      noHours: "Llámenos o visite nuestra página de Facebook para ver el horario de hoy.",
      mapTitle: "Mapa a Plaza Garibaldi",
      ratingOn: "en", ratings: "calificaciones", reviewBy: "Reseña en Grubhub",
      bestSeller: "Más Vendido", spicy: "Picante",
      menuSoon: "Nuestro menú completo estará aquí pronto. Mientras tanto, vea todo lo que servimos en Grubhub.",
      viewOrder: "Ver Menú y Ordenar",
      dish: "Platillo de Plaza Garibaldi", footerName: "Plaza Garibaldi Restaurante Mexicano",
      days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    }
  };

  // ---- Language choice: saved choice, else the browser's language ---------
  var lang = "en";
  try {
    var saved = localStorage.getItem("pg-lang");
    if (saved === "en" || saved === "es") lang = saved;
    else if (/^es\b/i.test(navigator.language || "")) lang = "es";
  } catch (e) {}

  // Pick the right language from a value that is either "text" or { en, es }.
  var t = function (v) {
    if (v == null) return "";
    if (typeof v === "object" && !Array.isArray(v)) return v[lang] != null ? v[lang] : (v.en || "");
    return v;
  };
  var L = function (key) { return UI[lang][key]; };
  var setText = function (attr, val) { $$("[" + attr + "]").forEach(function (el) { el.textContent = val || ""; }); };
  var tel = S.phone ? "tel:" + S.phone.replace(/[^\d+]/g, "") : "";

  // ---- Things that don't change with language (set once) ------------------
  setText("data-name", S.name);
  setText("data-address", S.address);
  setText("data-city", S.city);
  $("#year").textContent = new Date().getFullYear();
  if (S.phone) {
    $$("[data-call]").forEach(function (a) { a.href = tel; a.hidden = false; });
    $$("[data-call-text]").forEach(function (a) { a.href = tel; a.textContent = S.phone; a.hidden = false; });
  }

  function usePhoto(el, src) {
    if (!src) return;
    var img = new Image();
    img.onload = function () { el.style.backgroundImage = "url('" + src + "')"; el.classList.add("has-photo"); };
    img.src = src;
  }
  var P = S.photos || {};
  usePhoto($("#hero"), P.hero);
  $$('[data-photo="about"]').forEach(function (el) { usePhoto(el, P.about); });

  // Gallery tiles are built once; their captions are relabeled on each render.
  var gallery = $("#gallery"), grid = $("#gallery-grid"), tiles = [];
  (P.gallery || []).forEach(function (g) {
    if (typeof g === "string") g = { src: g };
    var fig = document.createElement("figure");
    fig.className = "tile";
    fig.hidden = true;
    fig.innerHTML = "<img><figcaption></figcaption>";
    grid.appendChild(fig);
    var img = fig.querySelector("img");
    img.onload = function () { fig.hidden = false; gallery.hidden = false; };
    img.onerror = function () { fig.remove(); };
    img.src = g.src;
    tiles.push({ fig: fig, caption: g.caption });
  });

  var q = encodeURIComponent([S.name, S.address, S.city].join(", "));
  $("#map").src = "https://www.google.com/maps?q=" + q + "&output=embed";
  $("#directions").href = "https://www.google.com/maps/dir/?api=1&destination=" + q;

  var soc = S.social || {};
  $("#social").innerHTML = [["facebook", "Facebook"], ["instagram", "Instagram"]].filter(function (s) { return soc[s[0]]; })
    .map(function (s) { return '<a href="' + esc(soc[s[0]]) + '" target="_blank" rel="noopener">' + s[1] + "</a>"; }).join(" · ");

  var activeTab = 0;

  // ---- Everything with words: redrawn whenever the language changes -------
  function render() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(function (el) { el.textContent = L(el.getAttribute("data-i18n")); });
    $$("[data-i18n-label]").forEach(function (el) { el.setAttribute("aria-label", L(el.getAttribute("data-i18n-label"))); });
    $("#map").title = L("mapTitle");
    $$(".lang-toggle button").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang); });

    setText("data-tagline", t(S.tagline));
    setText("data-intro", t(S.intro));
    $("#highlights").innerHTML = (S.highlights || []).map(function (h) { return "<li>" + esc(t(h)) + "</li>"; }).join("");
    if (S.catering) { setText("data-catering", t(S.catering)); $("#catering").hidden = false; }
    $("#about-body").innerHTML = (S.about || []).map(function (p) { return "<p>" + esc(t(p)) + "</p>"; }).join("");

    tiles.forEach(function (tl) {
      var c = t(tl.caption);
      tl.fig.querySelector("img").alt = c || L("dish");
      tl.fig.querySelector("figcaption").textContent = c;
      tl.fig.querySelector("figcaption").hidden = !c;
    });

    // Menu
    var menuBody = $("#menu-body");
    var menu = (S.menu || []).filter(function (sec) { return sec.items && sec.items.length; });
    if (menu.length) {
      var nav = '<div class="menu-tabs" role="tablist">' + menu.map(function (sec, i) {
        return '<a href="#m-' + i + '" role="tab">' + esc(t(sec.section)) + "</a>";
      }).join("") + "</div>";
      var html = menu.map(function (sec, i) {
        var sub = lang === "en" ? t(sec.subtitle) : "";
        return '<div class="menu-section" id="m-' + i + '"><h3>' + esc(t(sec.section)) +
          (sub ? ' <span class="sub">' + esc(sub) + "</span>" : "") + "</h3>" +
          (t(sec.note) ? '<p class="muted note">' + esc(t(sec.note)) + "</p>" : "") +
          '<ul class="menu-list">' + sec.items.map(function (it) {
            var d = t(it.desc);
            return '<li><div class="row"><span class="item">' + esc(t(it.name)) +
              (it.popular ? ' <span class="badge">' + L("bestSeller") + "</span>" : "") +
              (it.spicy ? ' <span class="badge spicy">' + L("spicy") + "</span>" : "") + '</span><span class="dots"></span>' +
              (it.price ? '<span class="price">$' + esc(String(it.price).replace(/^\$/, "")) + "</span>" : "") +
              "</div>" + (d ? '<p class="desc">' + esc(d) + "</p>" : "") + "</li>";
          }).join("") + "</ul></div>";
      }).join("");
      menuBody.innerHTML = nav + '<div class="menu-grid">' + html + "</div>" +
        (t(S.menuNote) ? '<p class="muted center menu-note">' + esc(t(S.menuNote)) + "</p>" : "");

      // Show one category at a time; the tabs switch between them.
      var tabs = $$(".menu-tabs a"), secs = $$(".menu-section");
      var show = function (i) {
        activeTab = i;
        secs.forEach(function (el, j) { el.hidden = j !== i; });
        tabs.forEach(function (a, j) { a.classList.toggle("active", j === i); a.setAttribute("aria-selected", j === i); });
      };
      tabs.forEach(function (a, i) {
        a.addEventListener("click", function (e) {
          e.preventDefault();
          show(i);
          a.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
        });
      });
      show(Math.min(activeTab, tabs.length - 1));
    } else {
      menuBody.innerHTML = '<p class="muted center">' + esc(L("menuSoon")) + "</p>" +
        '<p class="center"><a class="btn btn-primary" href="#order">' + esc(L("viewOrder")) + "</a></p>";
    }

    // Rating + reviews
    var Rt = S.rating || {}, Rv = S.reviews || [], el = $("#rating");
    if (Rt.score || Rv.length) {
      el.innerHTML = (Rt.score ? '<p class="stars"><span class="star" aria-hidden="true">★</span> <strong>' + esc(Rt.score) + "</strong> " +
        L("ratingOn") + " " + esc(Rt.source) +
        (Rt.count ? ' <span class="muted">· ' + esc(Rt.count) + " " + L("ratings") + "</span>" : "") + "</p>" : "") +
        (Rv.length ? '<div class="reviews">' + Rv.map(function (r) {
          var by = L("reviewBy") + (r.date ? ", " + t(r.date) : "");
          return "<blockquote>“" + esc(t(r.quote)) + "”<cite>" + esc(by) + "</cite></blockquote>";
        }).join("") + "</div>" : "");
      el.hidden = false;
    }

    // Order buttons
    var O = S.order || {};
    var services = [["grubhub", "Grubhub"], ["doordash", "DoorDash"], ["ubereats", "Uber Eats"]];
    $("#order-buttons").innerHTML = services.filter(function (s) { return O[s[0]]; }).map(function (s) {
      return '<a class="btn btn-order ' + s[0] + '" href="' + esc(O[s[0]]) + '" target="_blank" rel="noopener">' + L("orderOn") + " " + s[1] + "</a>";
    }).join("") + (S.phone ? '<a class="btn btn-ghost dark" href="' + tel + '">' + L("callPickup") + "</a>" : "");

    // Hours (highlights today)
    var hours = S.hours || [], today = new Date().getDay(), days = L("days");
    $("#hours").innerHTML = hours.length
      ? hours.map(function (h) {
          var name = typeof h[0] === "number" ? days[h[0]] : t(h[0]);
          return '<tr class="' + (h[0] === today ? "today" : "") + '"><th>' + esc(name) + "</th><td>" + esc(t(h[1])) + "</td></tr>";
        }).join("")
      : '<tr><td class="muted">' + esc(L("noHours")) + "</td></tr>";
  }

  // ---- EN / ES switch ------------------------------------------------------
  $$(".lang-toggle button").forEach(function (b) {
    b.addEventListener("click", function () {
      lang = b.getAttribute("data-lang");
      try { localStorage.setItem("pg-lang", lang); } catch (e) {}
      render();
    });
  });

  render();
})();

(function () {
  var S = window.SITE || {};
  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var setText = function (attr, val) { $$("[" + attr + "]").forEach(function (el) { el.textContent = val || ""; }); };

  setText("data-name", S.name);
  setText("data-tagline", S.tagline);
  setText("data-intro", S.intro);
  setText("data-address", S.address);
  setText("data-city", S.city);
  $("#year").textContent = new Date().getFullYear();

  // Phone
  if (S.phone) {
    var tel = "tel:" + S.phone.replace(/[^\d+]/g, "");
    $$("[data-call]").forEach(function (a) { a.href = tel; a.hidden = false; });
    $$("[data-call-text]").forEach(function (a) { a.href = tel; a.textContent = S.phone; a.hidden = false; });
  }

  // Photos: only use an image if it actually loads; otherwise keep the pattern.
  function usePhoto(el, src) {
    if (!src) return;
    var img = new Image();
    img.onload = function () { el.style.backgroundImage = "url('" + src + "')"; el.classList.add("has-photo"); };
    img.src = src;
  }
  var P = S.photos || {};
  usePhoto($("#hero"), P.hero);
  $$('[data-photo="about"]').forEach(function (el) { usePhoto(el, P.about); });
  var gallery = $("#gallery");
  (P.gallery || []).forEach(function (src) {
    var tile = document.createElement("div");
    tile.className = "photo tile";
    gallery.appendChild(tile);
    usePhoto(tile, src);
  });

  // Menu
  var menuBody = $("#menu-body");
  var menu = S.menu || [];
  if (menu.length) {
    var nav = '<div class="menu-tabs">' + menu.map(function (sec, i) {
      return '<a href="#m-' + i + '">' + esc(sec.section) + "</a>";
    }).join("") + "</div>";
    var html = menu.map(function (sec, i) {
      return '<div class="menu-section" id="m-' + i + '"><h3>' + esc(sec.section) + "</h3>" +
        (sec.note ? '<p class="muted">' + esc(sec.note) + "</p>" : "") +
        '<ul class="menu-list">' + (sec.items || []).map(function (it) {
          return '<li><div class="row"><span class="item">' + esc(it.name) + '</span><span class="dots"></span>' +
            (it.price ? '<span class="price">$' + esc(String(it.price).replace(/^\$/, "")) + "</span>" : "") +
            "</div>" + (it.desc ? '<p class="desc">' + esc(it.desc) + "</p>" : "") + "</li>";
        }).join("") + "</ul></div>";
    }).join("");
    menuBody.innerHTML = nav + '<div class="menu-grid">' + html + "</div>";
  } else {
    menuBody.innerHTML = '<p class="muted center">Our full menu is coming to this page soon. In the meantime, see everything we serve on Grubhub.</p>' +
      '<p class="center"><a class="btn btn-primary" href="#order">View Menu &amp; Order</a></p>';
  }

  // About
  $("#about-body").innerHTML = (S.about || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");

  // Order buttons
  var O = S.order || {};
  var services = [["grubhub", "Grubhub"], ["doordash", "DoorDash"], ["ubereats", "Uber Eats"]];
  $("#order-buttons").innerHTML = services.filter(function (s) { return O[s[0]]; }).map(function (s) {
    return '<a class="btn btn-order ' + s[0] + '" href="' + esc(O[s[0]]) + '" target="_blank" rel="noopener">Order on ' + s[1] + "</a>";
  }).join("") + (S.phone ? '<a class="btn btn-ghost dark" href="tel:' + S.phone.replace(/[^\d+]/g, "") + '">Call for Pickup</a>' : "");

  // Hours (highlights today)
  var hours = S.hours || [];
  var today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  $("#hours").innerHTML = hours.length
    ? hours.map(function (h) {
        return '<tr class="' + (h[0] === today ? "today" : "") + '"><th>' + esc(h[0]) + "</th><td>" + esc(h[1]) + "</td></tr>";
      }).join("")
    : '<tr><td class="muted">Call or check our Facebook page for today\'s hours.</td></tr>';

  // Map + directions
  var q = encodeURIComponent([S.name, S.address, S.city].join(", "));
  $("#map").src = "https://www.google.com/maps?q=" + q + "&output=embed";
  $("#directions").href = "https://www.google.com/maps/dir/?api=1&destination=" + q;

  // Social
  var soc = S.social || {};
  $("#social").innerHTML = [["facebook", "Facebook"], ["instagram", "Instagram"]].filter(function (s) { return soc[s[0]]; })
    .map(function (s) { return '<a href="' + esc(soc[s[0]]) + '" target="_blank" rel="noopener">' + s[1] + "</a>"; }).join(" · ");
})();

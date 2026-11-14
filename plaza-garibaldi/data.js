/* =========================================================
   PLAZA GARIBALDI: all restaurant info lives in this file.
   Edit the values below; the page updates automatically.
   Leave a value as "" (empty) and that piece is hidden.
   ========================================================= */
window.SITE = {
  name: "Plaza Garibaldi",
  tagline: "Mexican Restaurant",
  intro: "Authentic Mexican cooking on State Street in Perth Amboy.",

  address: "638 State St",
  city: "Perth Amboy, NJ",
  phone: "",            // e.g. "(732) 555-0123"

  // Order-online links. Empty = button hidden.
  order: {
    grubhub: "https://www.grubhub.com/restaurant/plaza-garibaldi-mexican-restaurant-638-state-st-perth-amboy/3141221",
    doordash: "",
    ubereats: ""
  },

  social: {
    facebook: "https://www.facebook.com/share/1VHUUh5Kwh/",
    instagram: ""
  },

  // Hours: one line per day. Empty list = "Call for hours".
  hours: [
    // ["Monday", "11:00 AM – 10:00 PM"],
  ],

  about: [
    "Plaza Garibaldi brings the flavors of Mexico to the heart of Perth Amboy: food made fresh, served with warmth, and meant to be shared."
  ],

  // Photos: drop files into the images/ folder with these names.
  // Missing photos fall back to a colored pattern automatically.
  photos: {
    hero: "images/hero.jpg",
    about: "images/about.jpg",
    gallery: [
      "images/gallery-1.jpg",
      "images/gallery-2.jpg",
      "images/gallery-3.jpg",
      "images/gallery-4.jpg"
    ]
  },

  // Menu: add sections and items. Empty = menu shows "order online" note.
  // Example item: { name: "Tacos al Pastor", desc: "Marinated pork, pineapple, onion, cilantro", price: "12.99" }
  menu: [
    // { section: "Tacos", items: [ ... ] },
  ]
};

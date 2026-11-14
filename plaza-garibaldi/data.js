/* =========================================================
   PLAZA GARIBALDI: all restaurant info lives in this file.
   Edit the values below; the page updates automatically.
   Leave a value as "" (empty) and that piece is hidden.
   ========================================================= */
window.SITE = {
  name: "Plaza Garibaldi",
  tagline: "Authentic Mexican Restaurant",
  intro: "Breakfast, lunch & dinner on State Street. Dine in, take out, delivery and catering.",

  address: "638 State St",
  city: "Perth Amboy, NJ 08861",
  phone: "(732) 324-9898",

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

  // Short highlights shown under the top banner.
  highlights: ["Breakfast", "Lunch", "Dinner", "Dine In", "Take Out", "We Deliver", "Catering"],

  // Hours: one line per day. Empty list = "Call for hours".
  // Taken from a 2022 flyer: confirm with the restaurant.
  hours: [
    ["Monday", "10:00 AM – 10:00 PM"],
    ["Tuesday", "10:00 AM – 10:00 PM"],
    ["Wednesday", "10:00 AM – 10:00 PM"],
    ["Thursday", "10:00 AM – 10:00 PM"],
    ["Friday", "10:00 AM – 12:00 AM"],
    ["Saturday", "8:00 AM – 12:00 AM"],
    ["Sunday", "8:00 AM – 10:00 PM"]
  ],

  about: [
    "Plaza Garibaldi is an authentic Mexican restaurant on State Street in Perth Amboy, serving breakfast, lunch and dinner every day.",
    "Pull up a chair and dine in, grab your order to go, or have it delivered. Planning a party or event? We do catering too."
  ],

  catering: "We do catering! Call us to plan your party, family gathering or office event.",

  // Photos: drop files into the images/ folder with these names.
  // Missing photos fall back to a colored pattern automatically.
  photos: {
    hero: "images/hero.jpg",
    about: "images/about.jpg",
    // Gallery tiles only appear for photos that exist.
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

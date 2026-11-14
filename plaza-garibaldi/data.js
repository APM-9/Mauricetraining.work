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
    // "From Our Kitchen" photos. Tiles only appear for photos that exist.
    // Each one: { src: "images/file.jpg", caption: "Name shown on the photo" }
    gallery: [
      { src: "images/food-birria.jpg", caption: "Birria Tacos & Consomé" },
      { src: "images/food-street-tacos.jpg", caption: "Tacos" },
      { src: "images/food-mole-enchiladas.jpg", caption: "Enchiladas de Mole" },
      { src: "images/food-enchiladas-verdes.jpg", caption: "Enchiladas Verdes" },
      { src: "images/food-steak-eggs.jpg", caption: "Steak & Eggs Breakfast" },
      { src: "images/food-steak.jpg", caption: "Bistec Encebollado" },
      { src: "images/food-gorditas.jpg", caption: "Gorditas" },
      { src: "images/food-tamales.jpg", caption: "Tamales" },
      { src: "images/food-shrimp-cocktail.jpg", caption: "Coctel de Camarón" },
      { src: "images/food-camarones.jpg", caption: "Camarones a la Diabla" },
      { src: "images/food-mojarra.jpg", caption: "Mojarra Frita" },
      { src: "images/food-caldo-de-res.jpg", caption: "Caldo de Res" },
      { src: "images/food-pozole.jpg", caption: "Pozole" },
      { src: "images/food-flan.jpg", caption: "Flan" },
      { src: "images/food-churros.jpg", caption: "Churros & Ice Cream" },
      { src: "images/food-drinks.jpg", caption: "Frozen Drinks" }
    ]
  },

  // Menu: sections in the same order as Grubhub. Sections with no items are hidden.
  // Item: { name: "...", desc: "...", price: "12.00", popular: true }  (popular = "Best Seller" badge)
  menu: [
    { section: "Desayuno", subtitle: "Breakfast", note: "Comes with rice & beans.", items: [
      { name: "Huevos a la Mexicana", desc: "Scrambled eggs Mexican style.", price: "12.00" },
      { name: "Huevos Rancheros", desc: "Scrambled eggs ranch style.", price: "12.00" },
      { name: "Huevos con Jamón", desc: "Scrambled eggs with ham.", price: "12.00" },
      { name: "Huevos con Nopales", desc: "Scrambled eggs with tender cactus.", price: "12.00" },
      { name: "Huevos en Salsa Verde", desc: "Scrambled eggs in green sauce.", price: "12.00" },
      { name: "Huevos con Chorizo", desc: "Scrambled eggs with Mexican sausage.", price: "12.00" }
    ]},
    { section: "Tacos", note: "Most tacos come with choice of style. Add extras for an additional charge.", items: [
      { name: "Birria Taco", desc: "", price: "12.95", popular: true },
      { name: "Al Pastor Taco", desc: "Marinated pork with pineapple.", price: "3.50" },
      { name: "Cabeza Taco", desc: "Beef head.", price: "4.50" },
      { name: "Carne Asada Taco", desc: "Grilled steak.", price: "3.50", popular: true },
      { name: "Pollo Taco", desc: "Chicken stew and chicken breast.", price: "3.50" },
      { name: "Chorizo Taco", desc: "Mexican sausage.", price: "3.50" },
      { name: "Carne Enchilada Taco", desc: "Enchilada meat.", price: "3.50" },
      { name: "Carnitas Taco", desc: "Pulled pork.", price: "3.50" },
      { name: "Barbacoa Taco", desc: "Barbecue.", price: "4.50" },
      { name: "Tripa Taco", desc: "Intestine.", price: "4.50" },
      { name: "Lengua Taco", desc: "Tongue.", price: "5.50" }
    ]},
    { section: "Burritos", items: [] },
    { section: "Ensaladas", subtitle: "Salads", items: [] },
    { section: "Tostadas", items: [] },
    { section: "Specialties", items: [] },
    { section: "Fajitas", items: [] },
    { section: "Huarache", items: [] },
    { section: "Carnes Estilo Garibaldi", items: [] },
    { section: "Platillos Mexicanos", items: [] },
      // Flautas ($15.00, Best Seller): "De pollo o pechuga. Chicken or chicken breast flautas. Tomate, queso y crema..." (full text pending)
    { section: "Tortas", items: [] },
    { section: "Paloma", items: [] },
    { section: "Coctel", items: [] },
    { section: "Niños", subtitle: "Kids", items: [] },
    { section: "Caldos", subtitle: "Soups", items: [] },
    { section: "Postres", subtitle: "Desserts", items: [] },
    { section: "Extras", items: [] },
      // Papas Fritas ($3.50, Best Seller): "French fries." (category pending)
    { section: "Bebidas", subtitle: "Drinks", items: [] },
    { section: "Mojarra", subtitle: "Fish", items: [] },
    { section: "Quesadillas", items: [] }
  ]
};

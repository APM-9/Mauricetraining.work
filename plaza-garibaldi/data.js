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
  // Item: { name: "...", desc: "...", price: "12.00", popular: true, spicy: true }
  // popular = "Best Seller" badge, spicy = "Spicy" badge, "12.00+" = starting price
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
    { section: "Burritos", note: "Comes with lettuce, tomato, cheese & cream. Add extras for an additional charge.", items: [
      { name: "Burrito Bowl", desc: "", price: "10.00" },
      { name: "Wraps", desc: "", price: "12.00+" },
      { name: "Burrito al Pastor", desc: "Marinated pork burrito.", price: "11.00" },
      { name: "Burrito de Pollo", desc: "Chicken burrito. Chicken or chicken breast.", price: "11.00" },
      { name: "Burrito de Lengua", desc: "Tongue burrito.", price: "12.00" },
      { name: "Burrito de Chorizo", desc: "Chorizo burrito.", price: "11.00" },
      { name: "Burrito de Carne Asada", desc: "Carne asada burrito.", price: "11.00" },
      { name: "Burrito Vegetariano", desc: "Vegetarian burrito.", price: "11.00" },
      { name: "Burrito de Enchilada", desc: "Enchilada burrito.", price: "11.00" },
      { name: "Burrito Ahogado en Salsa", desc: "Drowned burrito in green or red sauce, with 2 eggs, cheese & sour cream.", price: "14.00" }
    ]},
    { section: "Ensaladas", subtitle: "Salads", note: "Come with lettuce, tomato, onions and avocado, with your choice of cheese or cream. Add extras for an additional charge.", items: [
      { name: "Ensalada de Pechuga", desc: "Grilled chicken salad.", price: "15.00" },
      { name: "Ensalada de Filete al Grill", desc: "Grilled fish fillet salad.", price: "16.00" },
      { name: "Ensalada de Bistec", desc: "Grilled steak salad.", price: "15.00" },
      { name: "Ensalada de Camarones", desc: "Grilled shrimp salad.", price: "16.00" },
      { name: "Ensalada Mixta", desc: "Mixed salad with grilled chicken, steak and shrimp.", price: "20.00" }
    ]},
    { section: "Tostadas", note: "Come with beans, lettuce, tomato, cheese & cream. Add extras for an additional charge.", items: [
      { name: "Tostada de Bistec", desc: "Grilled steak tostada.", price: "3.50" },
      { name: "Tostada de Pollo", desc: "Grilled chicken tostada.", price: "3.50" },
      { name: "Tostada al Pastor", desc: "Marinated pork tostada.", price: "3.50" },
      { name: "Tostada de Lengua", desc: "Beef tongue tostada.", price: "5.50" },
      { name: "Tostada de Barbacoa", desc: "", price: "4.50" },
      { name: "Tostada de Tripa", desc: "Beef intestine tostada.", price: "4.50" },
      { name: "Tostada de Carnitas", desc: "Pork tostada.", price: "3.50" },
      { name: "Tostada de Chorizo", desc: "Mexican sausage tostada.", price: "3.50" },
      { name: "Tostada de Carne Enchilada", desc: "Spicy pork tostada.", price: "3.50" },
      { name: "Tostada de Cabeza", desc: "Beef head tostada.", price: "4.50" }
    ]},
    { section: "Specialties", note: "Some dishes come with rice, beans & salad. Add extras for an additional charge.", items: [
      { name: "Alitas Party", desc: "Chicken wings: barbecue, buffalo, cheese and plain.", price: "33.00" },
      { name: "Bistec Plaza", desc: "Grilled steak, rice and beans, 1 green enchilada, fried eggs, 1 fried jalapeño and a cactus salad.", price: "21.00" },
      { name: "Mariscada", desc: "Different kinds of seafood with guacamole.", price: "37.00" },
      { name: "Tlayudas", desc: "", price: "15.00" },
      { name: "Alitas de Pollo con Papas y Ensalada", desc: "Wings, fries & salad.", price: "16.00" },
      { name: "Mojarra Fina", desc: "", price: "28.00" },
      { name: "Molcajete", desc: "", price: "30.00" },
      { name: "Mexican Fries", desc: "", price: "12.00" },
      { name: "La Especialidad de la Casa \u201cFiesta Garibaldi\u201d", desc: "House specialty with fried shrimp, steak fajitas, grilled chicken breast, 1 red enchilada and salad.", price: "28.00" },
      { name: "Alambre", desc: "Chicken, steak and ham.", price: "17.00" },
      { name: "Orden de Barbacoa", desc: "Spicy barbecue with rice & beans.", price: "18.00", spicy: true },
      { name: "Nachos con Carne Estilo Garibaldi", desc: "Nachos with meat.", price: "15.00+" }
    ]},
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

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
  // From their Grubhub listing (Nov 2026).
  hours: [
    ["Monday", "10:00 AM – 10:00 PM"],
    ["Tuesday", "10:00 AM – 10:00 PM"],
    ["Wednesday", "10:00 AM – 10:00 PM"],
    ["Thursday", "10:00 AM – 10:00 PM"],
    ["Friday", "10:00 AM – 11:00 PM"],
    ["Saturday", "10:00 AM – 11:00 PM"],
    ["Sunday", "10:00 AM – 10:00 PM"]
  ],

  // Rating shown in the Order section. Empty score = hidden.
  rating: { score: "4.4", count: "208", source: "Grubhub" },

  // Customer quotes (from Grubhub reviews). Empty list = hidden.
  reviews: [
    { quote: "Tasty and fast! Will order again. Had the steak tacos, chicken and birria. All delicious!", by: "Grubhub review, Dec 2025" },
    { quote: "Best value for the money, Hispanic food wise.", by: "Grubhub review, Jun 2024" },
    { quote: "The food was delicious, a lot of meat and flavor.", by: "Grubhub review, Nov 2023" },
    { quote: "¡La comida es excelente! Y tienen buenos precios.", by: "Grubhub review, Dec 2024" }
  ],

  menuNote: "Prices are from our online menu and may differ slightly in store.",

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
    { section: "Fajitas", note: "Orders come with rice and pico de gallo. Add extras for an additional charge.", items: [
      { name: "Pechuga Fajita", desc: "Chicken fajita.", price: "16.00" },
      { name: "Bistec Fajita", desc: "Steak fajita.", price: "16.00" },
      { name: "Camarón Fajita", desc: "Shrimp fajita.", price: "17.00" },
      { name: "Fajitas Mixtas", desc: "Mixed fajita with chicken, steak and shrimp.", price: "21.00" }
    ]},
    { section: "Huarache", note: "Comes with green or red sauce, cheese, cream & avocado. Add extras for an additional charge.", items: [
      { name: "Al Pastor Huarache", desc: "Marinated pork.", price: "7.50" },
      { name: "Chorizo Huarache", desc: "Mexican sausage.", price: "7.50" },
      { name: "Carne Asada Huarache", desc: "Grilled steak.", price: "7.50" },
      { name: "Carnitas Huarache", desc: "Pulled pork.", price: "7.50" },
      { name: "Carne Enchilada Huarache", desc: "Chili pork.", price: "7.50" },
      { name: "Pollo Huarache", desc: "Chicken.", price: "7.50" },
      { name: "Lengua Huarache", desc: "Tongue.", price: "8.00" }
    ]},
    { section: "Carnes Estilo Garibaldi", subtitle: "Meats Garibaldi Style", note: "Served with rice, beans, cactus salad, a green enchilada, roasted chiles, fried egg and avocado. Add extras for an additional charge.", items: [
      { name: "Bistec Asado Estilo Garibaldi", desc: "Grilled steak.", price: "21.00" },
      { name: "Pechuga Asada Estilo Garibaldi", desc: "Grilled chicken breast.", price: "21.00" },
      { name: "Chuleta Frita Estilo Garibaldi", desc: "Fried pork chop.", price: "21.00" },
      { name: "Carne Enchilada Estilo Garibaldi", desc: "Chili-marinated meat.", price: "21.00" },
      { name: "Cecina Estilo Garibaldi", desc: "Salted steak.", price: "21.00" }
    ]},
    { section: "Platillos Mexicanos", subtitle: "Mexican Dishes", note: "Come with rice, beans & salad. Add extras for an additional charge.", items: [
      { name: "Bistec Encebollado", desc: "Steak with grilled onions.", price: "16.00" },
      { name: "Bistec Oaxaqueño", desc: "", price: "21.00" },
      { name: "Chuletas a la Mexicana", desc: "Mexican-style pork chops.", price: "16.00" },
      { name: "Chuletas Rancheras", desc: "Ranch-style pork chops.", price: "16.00" },
      { name: "Chuletas en Mole", desc: "Pork chops in mole.", price: "16.00" },
      { name: "Chuletas en Salsa Verde", desc: "Pork chops in green salsa.", price: "16.00" },
      { name: "Chuletas Fritas, Papas y Ensalada", desc: "Fried pork chops, fries and salad.", price: "16.00" },
      { name: "Enchiladas", desc: "Red or green, with lettuce, avocado, cheese and sour cream.", price: "15.00" },
      { name: "Enchiladas Suizas", desc: "Swiss enchiladas.", price: "15.00+" },
      { name: "Entomatadas", desc: "In tomato sauce.", price: "16.00+" },
      { name: "Chilaquiles", desc: "Red or green, with steak or grilled chicken breast.", price: "16.00" },
      { name: "Cecina Ranchera", desc: "Salted ranch beef with tender cactus.", price: "17.00" },
      { name: "Flautas", desc: "Chicken or chicken breast flautas with tomato, cheese and sour cream.", price: "15.00", popular: true },
      { name: "Mole de Pollo", desc: "Tender chicken in mole.", price: "17.00" },
      { name: "Cielo, Mar y Tierra", desc: "Sky, surf and turf: paloma (pigeon), steak & shrimp.", price: "21.00" }
    ]},
    { section: "Tortas", subtitle: "Sandwiches & Burgers", note: "Come with beans, lettuce, tomato, onion, avocado & jalapeño. Add extras for an additional charge.", items: [
      { name: "Bacon Burger", desc: "", price: "12.00" },
      { name: "Mexican Burger", desc: "", price: "14.00" },
      { name: "Sub Pastor Torta", desc: "", price: "10.95" },
      { name: "Chipotle Burger", desc: "", price: "11.00" },
      { name: "Al Pastor Torta", desc: "Seasoned pork.", price: "9.00" },
      { name: "Jamón Torta", desc: "Ham.", price: "9.00" },
      { name: "Pechuga Asada Torta", desc: "Grilled chicken.", price: "9.00" },
      { name: "Carne Enchilada Torta", desc: "Chili pork.", price: "9.00" },
      { name: "Bistec Asado Torta", desc: "Grilled steak.", price: "9.00" },
      { name: "Huevo con Jamón Torta", desc: "Eggs & ham.", price: "9.00" },
      { name: "Huevo con Chorizo Torta", desc: "Eggs & chorizo.", price: "9.00" },
      { name: "Pechuga Empanizada Torta", desc: "Breaded chicken.", price: "9.00" },
      { name: "Milanesa Torta", desc: "Breaded steak.", price: "9.00" },
      { name: "Quesillo Torta", desc: "Cheese.", price: "9.00" },
      { name: "Torta Cubana", desc: "", price: "10.00" },
      { name: "Hamburguesa", desc: "Hamburger with french fries & salad.", price: "10.00" }
    ]},
    { section: "Paloma", subtitle: "Pigeon", note: "Add extras for an additional charge.", items: [
      { name: "Paloma a la Mexicana", desc: "Mexican style.", price: "18.00" },
      { name: "Paloma Ranchera", desc: "Ranch style.", price: "18.00" },
      { name: "Paloma a la Diabla", desc: "In hot sauce.", price: "18.00", spicy: true },
      { name: "Paloma en Mole", desc: "With mole sauce.", price: "18.00" },
      { name: "Paloma en Salsa", desc: "In green or red sauce.", price: "18.00" },
      { name: "Paloma al Mojo de Ajo", desc: "In garlic sauce.", price: "18.00" },
      { name: "Palomas, Papas Fritas y Ensalada", desc: "Pigeon, french fries and salad.", price: "18.00" }
    ]},
    { section: "Coctel", subtitle: "Seafood Cocktails", note: "Add extras for an additional charge.", items: [
      { name: "Coctel de Camarón", desc: "Shrimp cocktail.", price: "16.00" },
      { name: "Camarón a la Campechana", desc: "Shrimp campechana style.", price: "18.00" },
      { name: "Ceviche de Mariscos", desc: "Seafood ceviche.", price: "18.00" },
      { name: "Aguachile", desc: "", price: "18.00" }
    ]},
    { section: "Niños", subtitle: "Kids", items: [
      { name: "Pechuga Asada, Arroz y Frijoles", desc: "Grilled chicken, rice and beans.", price: "9.00" },
      { name: "Pechuga Empanizada con Papas", desc: "Breaded chicken with fries.", price: "9.00" },
      { name: "Bistec Empanizado con Papas", desc: "Breaded steak with fries.", price: "9.00" },
      { name: "Bistec Asado, Arroz y Frijoles", desc: "Grilled steak with rice and beans.", price: "9.00" },
      { name: "Dos Huevos, Arroz y Frijoles", desc: "2 eggs, rice and beans.", price: "9.00" },
      { name: "Dedos de Pollo", desc: "Chicken fingers.", price: "9.00" }
    ]},
    { section: "Caldos", subtitle: "Soups", items: [
      { name: "Caldo de Mariscos", desc: "Seafood soup.", price: "22.00" },
      { name: "Caldo de Res", desc: "Beef soup.", price: "16.00" },
      { name: "Menudo", desc: "", price: "15.00" },
      { name: "Caldo de Camarón", desc: "Shrimp soup.", price: "17.00" },
      { name: "Caldo de Pescado", desc: "Fish soup.", price: "18.00" }
    ]},
    { section: "Postres", subtitle: "Desserts", items: [
      { name: "Chocolate Cake", desc: "", price: "4.00" },
      { name: "Tiramisú", desc: "", price: "4.00" },
      { name: "Tres Leches", desc: "", price: "4.00" }
    ]},
    { section: "Extras", subtitle: "Sides", items: [
      { name: "Nopales", desc: "Cactus.", price: "3.50" },
      { name: "Jalapeños", desc: "", price: "2.00" },
      { name: "Guacamole", desc: "", price: "12.00" },
      { name: "Cebollitas", desc: "Grilled green onions.", price: "4.00" },
      { name: "Chile Asado", desc: "Roasted chile.", price: "2.00" },
      { name: "Papas Fritas", desc: "French fries.", price: "3.50", popular: true },
      { name: "Ensalada Regular", desc: "Side salad.", price: "3.50" },
      { name: "Pico de Gallo", desc: "", price: "6.00" },
      { name: "Arroz", desc: "Rice.", price: "2.50" },
      { name: "Frijoles", desc: "Beans.", price: "2.50" },
      { name: "Orden de Aguacate", desc: "Avocado.", price: "3.00" }
    ]},
    { section: "Bebidas", subtitle: "Drinks", items: [
      { name: "Licuados", desc: "Milkshakes.", price: "6.00" },
      { name: "Aguas Naturales", desc: "Flavored fresh waters.", price: "4.00" }
    ]},
    { section: "Mojarra", subtitle: "Fish", note: "Served with rice and beans, or salad and french fries.", items: [
      { name: "Filete Ahogado", desc: "Fish fillet topped with green or red salsa.", price: "16.00" },
      { name: "Mojarra a la Mexicana", desc: "Fried fish Mexican style.", price: "24.00" },
      { name: "Mojarra al Mojo de Ajo", desc: "Fried fish in garlic sauce.", price: "22.00" },
      { name: "Mojarra Frita", desc: "Fried fish.", price: "22.00" },
      { name: "Filete Empanizado", desc: "Breaded fillet.", price: "16.00" }
    ]},
    { section: "Quesadillas", note: "Flour or corn tortilla.", items: [
      { name: "Quesabirria de Harina", desc: "Quesabirria with flour tortilla.", price: "9.95" },
      { name: "Quesabirria de Maíz", desc: "Quesabirria with corn tortilla.", price: "15.00" },
      { name: "Quesadillas de Maíz", desc: "Quesadilla with corn tortilla.", price: "6.50+" }
    ]}
  ]
};

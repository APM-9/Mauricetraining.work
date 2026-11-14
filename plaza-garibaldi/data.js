/* =========================================================
   PLAZA GARIBALDI: all restaurant info lives in this file.
   Edit the values below; the page updates automatically.
   Leave a value as "" (empty) and that piece is hidden.

   ENGLISH / ESPAÑOL: any text can be written two ways:
     "Same in both languages"
     { en: "English text", es: "Texto en español" }
   The EN/ES button at the top of the site switches between them.
   ========================================================= */
window.SITE = {
  name: "Plaza Garibaldi",
  tagline: { en: "Authentic Mexican Restaurant", es: "Auténtico Restaurante Mexicano" },
  intro: {
    en: "Breakfast, lunch & dinner on State Street. Dine in, take out, delivery and catering.",
    es: "Desayuno, almuerzo y cena en State Street. Para comer aquí, para llevar, a domicilio y catering."
  },

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
  highlights: [
    { en: "Breakfast", es: "Desayuno" },
    { en: "Lunch", es: "Almuerzo" },
    { en: "Dinner", es: "Cena" },
    { en: "Dine In", es: "Para Comer Aquí" },
    { en: "Take Out", es: "Para Llevar" },
    { en: "We Deliver", es: "Entregas a Domicilio" },
    "Catering"
  ],

  // Hours: day number (0 = Sunday … 6 = Saturday) and time.
  // From their Grubhub listing (Nov 2026). Empty list = "Call for hours".
  hours: [
    [1, "10:00 AM – 10:00 PM"],
    [2, "10:00 AM – 10:00 PM"],
    [3, "10:00 AM – 10:00 PM"],
    [4, "10:00 AM – 10:00 PM"],
    [5, "10:00 AM – 11:00 PM"],
    [6, "10:00 AM – 11:00 PM"],
    [0, "10:00 AM – 10:00 PM"]
  ],

  // Rating shown in the Order section. Empty score = hidden.
  rating: { score: "4.4", count: "208", source: "Grubhub" },

  // Customer quotes (from Grubhub reviews). Empty list = hidden.
  reviews: [
    { quote: {
        en: "Tasty and fast! Will order again. Had the steak tacos, chicken and birria. All delicious!",
        es: "¡Sabroso y rápido! Volveré a pedir. Probé los tacos de bistec, pollo y birria. ¡Todo delicioso!" },
      date: { en: "Dec 2025", es: "dic. 2025" } },
    { quote: {
        en: "Best value for the money, Hispanic food wise.",
        es: "La mejor relación calidad-precio en comida hispana." },
      date: { en: "Jun 2024", es: "jun. 2024" } },
    { quote: {
        en: "The food was delicious, a lot of meat and flavor.",
        es: "La comida estuvo deliciosa, con mucha carne y sabor." },
      date: { en: "Nov 2023", es: "nov. 2023" } },
    { quote: {
        en: "The food is excellent! And they have good prices.",
        es: "¡La comida es excelente! Y tienen buenos precios." },
      date: { en: "Dec 2024", es: "dic. 2024" } }
  ],

  menuNote: {
    en: "Prices are from our online menu and may differ slightly in store.",
    es: "Los precios son de nuestro menú en línea y pueden variar un poco en el restaurante."
  },

  about: [
    { en: "Plaza Garibaldi is an authentic Mexican restaurant on State Street in Perth Amboy, serving breakfast, lunch and dinner every day.",
      es: "Plaza Garibaldi es un auténtico restaurante mexicano en State Street, en Perth Amboy, que sirve desayuno, almuerzo y cena todos los días." },
    { en: "Pull up a chair and dine in, grab your order to go, or have it delivered. Planning a party or event? We do catering too.",
      es: "Siéntese a comer con nosotros, pida para llevar o a domicilio. ¿Planea una fiesta o un evento? También hacemos catering." }
  ],

  catering: {
    en: "We do catering! Call us to plan your party, family gathering or office event.",
    es: "¡Hacemos catering! Llámenos para planear su fiesta, reunión familiar o evento de oficina."
  },

  // Photos: drop files into the images/ folder with these names.
  // Missing photos fall back to a colored pattern automatically.
  photos: {
    hero: "images/hero.jpg",
    about: "images/about.jpg",
    // "From Our Kitchen" photos. Tiles only appear for photos that exist.
    gallery: [
      { src: "images/food-birria.jpg", caption: { en: "Birria Tacos & Consomé", es: "Tacos de Birria y Consomé" } },
      { src: "images/food-street-tacos.jpg", caption: "Tacos" },
      { src: "images/food-mole-enchiladas.jpg", caption: "Enchiladas de Mole" },
      { src: "images/food-enchiladas-verdes.jpg", caption: "Enchiladas Verdes" },
      { src: "images/food-steak-eggs.jpg", caption: { en: "Steak & Eggs Breakfast", es: "Desayuno de Bistec con Huevos" } },
      { src: "images/food-steak.jpg", caption: "Bistec Encebollado" },
      { src: "images/food-gorditas.jpg", caption: "Gorditas" },
      { src: "images/food-tamales.jpg", caption: "Tamales" },
      { src: "images/food-shrimp-cocktail.jpg", caption: "Coctel de Camarón" },
      { src: "images/food-camarones.jpg", caption: "Camarones a la Diabla" },
      { src: "images/food-mojarra.jpg", caption: "Mojarra Frita" },
      { src: "images/food-caldo-de-res.jpg", caption: "Caldo de Res" },
      { src: "images/food-pozole.jpg", caption: "Pozole" },
      { src: "images/food-flan.jpg", caption: "Flan" },
      { src: "images/food-churros.jpg", caption: { en: "Churros & Ice Cream", es: "Churros con Helado" } },
      { src: "images/food-drinks.jpg", caption: { en: "Frozen Drinks", es: "Bebidas Frappé" } }
    ]
  },

  // Menu: sections in the same order as Grubhub. Sections with no items are hidden.
  // Item: { name, desc, price: "12.00", popular: true, spicy: true }
  // popular = "Best Seller" badge, spicy = "Spicy" badge, "12.00+" = starting price.
  // subtitle only shows in English (it's the English name of a Spanish section).
  menu: [
    { section: "Desayuno", subtitle: "Breakfast",
      note: { en: "Comes with rice & beans.", es: "Incluyen arroz y frijoles." }, items: [
      { name: "Huevos a la Mexicana", desc: { en: "Scrambled eggs Mexican style.", es: "Huevos revueltos a la mexicana." }, price: "12.00" },
      { name: "Huevos Rancheros", desc: { en: "Scrambled eggs ranch style.", es: "Huevos revueltos estilo ranchero." }, price: "12.00" },
      { name: "Huevos con Jamón", desc: { en: "Scrambled eggs with ham.", es: "Huevos revueltos con jamón." }, price: "12.00" },
      { name: "Huevos con Nopales", desc: { en: "Scrambled eggs with tender cactus.", es: "Huevos revueltos con nopales tiernos." }, price: "12.00" },
      { name: "Huevos en Salsa Verde", desc: { en: "Scrambled eggs in green sauce.", es: "Huevos revueltos en salsa verde." }, price: "12.00" },
      { name: "Huevos con Chorizo", desc: { en: "Scrambled eggs with Mexican sausage.", es: "Huevos revueltos con chorizo." }, price: "12.00" }
    ]},
    { section: "Tacos",
      note: { en: "Most tacos come with choice of style. Add extras for an additional charge.",
              es: "La mayoría de los tacos vienen con su estilo a elegir. Extras con costo adicional." }, items: [
      { name: "Birria Taco", desc: "", price: "12.95", popular: true },
      { name: "Al Pastor Taco", desc: { en: "Marinated pork with pineapple.", es: "Cerdo adobado con piña." }, price: "3.50" },
      { name: "Cabeza Taco", desc: { en: "Beef head.", es: "Cabeza de res." }, price: "4.50" },
      { name: "Carne Asada Taco", desc: { en: "Grilled steak.", es: "Bistec asado." }, price: "3.50", popular: true },
      { name: "Pollo Taco", desc: { en: "Chicken stew and chicken breast.", es: "Pollo guisado y pechuga." }, price: "3.50" },
      { name: "Chorizo Taco", desc: { en: "Mexican sausage.", es: "Chorizo mexicano." }, price: "3.50" },
      { name: "Carne Enchilada Taco", desc: { en: "Enchilada meat.", es: "Carne enchilada." }, price: "3.50" },
      { name: "Carnitas Taco", desc: { en: "Pulled pork.", es: "Carnitas de cerdo." }, price: "3.50" },
      { name: "Barbacoa Taco", desc: { en: "Barbecue.", es: "Barbacoa." }, price: "4.50" },
      { name: "Tripa Taco", desc: { en: "Intestine.", es: "Tripa." }, price: "4.50" },
      { name: "Lengua Taco", desc: { en: "Tongue.", es: "Lengua de res." }, price: "5.50" }
    ]},
    { section: "Burritos",
      note: { en: "Comes with lettuce, tomato, cheese & cream. Add extras for an additional charge.",
              es: "Con lechuga, tomate, queso y crema. Extras con costo adicional." }, items: [
      { name: { en: "Burrito Bowl", es: "Burrito en Plato" }, desc: "", price: "10.00" },
      { name: { en: "Wraps", es: "Wraps (Enrollados)" }, desc: "", price: "12.00+" },
      { name: "Burrito al Pastor", desc: { en: "Marinated pork burrito.", es: "Burrito de cerdo adobado." }, price: "11.00" },
      { name: "Burrito de Pollo", desc: { en: "Chicken burrito. Chicken or chicken breast.", es: "Burrito de pollo o pechuga." }, price: "11.00" },
      { name: "Burrito de Lengua", desc: { en: "Tongue burrito.", es: "Burrito de lengua de res." }, price: "12.00" },
      { name: "Burrito de Chorizo", desc: { en: "Chorizo burrito.", es: "Burrito de chorizo." }, price: "11.00" },
      { name: "Burrito de Carne Asada", desc: { en: "Carne asada burrito.", es: "Burrito de carne asada." }, price: "11.00" },
      { name: "Burrito Vegetariano", desc: { en: "Vegetarian burrito.", es: "Burrito vegetariano." }, price: "11.00" },
      { name: "Burrito de Enchilada", desc: { en: "Enchilada burrito.", es: "Burrito de carne enchilada." }, price: "11.00" },
      { name: "Burrito Ahogado en Salsa",
        desc: { en: "Drowned burrito in green or red sauce, with 2 eggs, cheese & sour cream.",
                es: "Burrito ahogado en salsa verde o roja, con dos huevos, queso y crema." }, price: "14.00" }
    ]},
    { section: "Ensaladas", subtitle: "Salads",
      note: { en: "Come with lettuce, tomato, onions and avocado, with your choice of cheese or cream. Add extras for an additional charge.",
              es: "Vienen con lechuga, tomate, cebolla y aguacate, con opción de queso o crema. Extras con costo adicional." }, items: [
      { name: "Ensalada de Pechuga", desc: { en: "Grilled chicken salad.", es: "Ensalada de pechuga asada." }, price: "15.00" },
      { name: "Ensalada de Filete al Grill", desc: { en: "Grilled fish fillet salad.", es: "Ensalada de filete de pescado a la parrilla." }, price: "16.00" },
      { name: "Ensalada de Bistec", desc: { en: "Grilled steak salad.", es: "Ensalada de bistec asado." }, price: "15.00" },
      { name: "Ensalada de Camarones", desc: { en: "Grilled shrimp salad.", es: "Ensalada de camarones asados." }, price: "16.00" },
      { name: "Ensalada Mixta", desc: { en: "Mixed salad with grilled chicken, steak and shrimp.", es: "Ensalada mixta con pollo, bistec y camarón asados." }, price: "20.00" }
    ]},
    { section: "Tostadas",
      note: { en: "Come with beans, lettuce, tomato, cheese & cream. Add extras for an additional charge.",
              es: "Incluyen frijoles, lechuga, tomate, queso y crema. Extras con costo adicional." }, items: [
      { name: "Tostada de Bistec", desc: { en: "Grilled steak tostada.", es: "Tostada de bistec asado." }, price: "3.50" },
      { name: "Tostada de Pollo", desc: { en: "Grilled chicken tostada.", es: "Tostada de pollo asado." }, price: "3.50" },
      { name: "Tostada al Pastor", desc: { en: "Marinated pork tostada.", es: "Tostada de cerdo adobado." }, price: "3.50" },
      { name: "Tostada de Lengua", desc: { en: "Beef tongue tostada.", es: "Tostada de lengua de res." }, price: "5.50" },
      { name: "Tostada de Barbacoa", desc: "", price: "4.50" },
      { name: "Tostada de Tripa", desc: { en: "Beef intestine tostada.", es: "Tostada de tripa de res." }, price: "4.50" },
      { name: "Tostada de Carnitas", desc: { en: "Pork tostada.", es: "Tostada de carnitas de cerdo." }, price: "3.50" },
      { name: "Tostada de Chorizo", desc: { en: "Mexican sausage tostada.", es: "Tostada de chorizo mexicano." }, price: "3.50" },
      { name: "Tostada de Carne Enchilada", desc: { en: "Spicy pork tostada.", es: "Tostada de cerdo enchilado." }, price: "3.50" },
      { name: "Tostada de Cabeza", desc: { en: "Beef head tostada.", es: "Tostada de cabeza de res." }, price: "4.50" }
    ]},
    { section: { en: "Specialties", es: "Especialidades" },
      note: { en: "Some dishes come with rice, beans & salad. Add extras for an additional charge.",
              es: "Algunos platos incluyen arroz, frijoles y ensalada. Extras con costo adicional." }, items: [
      { name: "Alitas Party", desc: { en: "Chicken wings: barbecue, buffalo, cheese and plain.", es: "Alitas de pollo: barbacoa, búfalo, con queso y naturales." }, price: "33.00" },
      { name: "Bistec Plaza",
        desc: { en: "Grilled steak, rice and beans, 1 green enchilada, fried eggs, 1 fried jalapeño and a cactus salad.",
                es: "Bistec asado, arroz y frijoles, 1 enchilada verde, huevos fritos, 1 jalapeño frito y ensalada de nopales." }, price: "21.00" },
      { name: "Mariscada", desc: { en: "Different kinds of seafood with guacamole.", es: "Variedad de mariscos con guacamole." }, price: "37.00" },
      { name: "Tlayudas", desc: "", price: "15.00" },
      { name: "Alitas de Pollo con Papas y Ensalada", desc: { en: "Wings, fries & salad.", es: "Alitas, papas fritas y ensalada." }, price: "16.00" },
      { name: "Mojarra Fina", desc: "", price: "28.00" },
      { name: "Molcajete", desc: "", price: "30.00" },
      { name: { en: "Mexican Fries", es: "Papas a la Mexicana" }, desc: "", price: "12.00" },
      { name: "La Especialidad de la Casa “Fiesta Garibaldi”",
        desc: { en: "House specialty with fried shrimp, steak fajitas, grilled chicken breast, 1 red enchilada and salad.",
                es: "Con camarones fritos, fajitas de bistec, pechuga asada, 1 enchilada roja y ensalada." }, price: "28.00" },
      { name: "Alambre", desc: { en: "Chicken, steak and ham.", es: "Pechuga, bistec y jamón." }, price: "17.00" },
      { name: "Orden de Barbacoa", desc: { en: "Spicy barbecue with rice & beans.", es: "Barbacoa picante con arroz y frijoles." }, price: "18.00", spicy: true },
      { name: "Nachos con Carne Estilo Garibaldi", desc: { en: "Nachos with meat.", es: "Nachos con carne." }, price: "15.00+" }
    ]},
    { section: "Fajitas",
      note: { en: "Orders come with rice and pico de gallo. Add extras for an additional charge.",
              es: "Órdenes con arroz y pico de gallo. Extras con costo adicional." }, items: [
      { name: "Pechuga Fajita", desc: { en: "Chicken fajita.", es: "Fajita de pechuga." }, price: "16.00" },
      { name: "Bistec Fajita", desc: { en: "Steak fajita.", es: "Fajita de bistec." }, price: "16.00" },
      { name: "Camarón Fajita", desc: { en: "Shrimp fajita.", es: "Fajita de camarón." }, price: "17.00" },
      { name: "Fajitas Mixtas", desc: { en: "Mixed fajita with chicken, steak and shrimp.", es: "Fajita mixta de pechuga, bistec y camarón." }, price: "21.00" }
    ]},
    { section: "Huarache",
      note: { en: "Comes with green or red sauce, cheese, cream & avocado. Add extras for an additional charge.",
              es: "Con salsa verde o roja, queso, crema y aguacate. Extras con costo adicional." }, items: [
      { name: "Al Pastor Huarache", desc: { en: "Marinated pork.", es: "Cerdo adobado." }, price: "7.50" },
      { name: "Chorizo Huarache", desc: { en: "Mexican sausage.", es: "Chorizo mexicano." }, price: "7.50" },
      { name: "Carne Asada Huarache", desc: { en: "Grilled steak.", es: "Bistec asado." }, price: "7.50" },
      { name: "Carnitas Huarache", desc: { en: "Pulled pork.", es: "Carnitas de cerdo." }, price: "7.50" },
      { name: "Carne Enchilada Huarache", desc: { en: "Chili pork.", es: "Cerdo enchilado." }, price: "7.50" },
      { name: "Pollo Huarache", desc: { en: "Chicken.", es: "Pollo." }, price: "7.50" },
      { name: "Lengua Huarache", desc: { en: "Tongue.", es: "Lengua de res." }, price: "8.00" }
    ]},
    { section: "Carnes Estilo Garibaldi", subtitle: "Meats Garibaldi Style",
      note: { en: "Served with rice, beans, cactus salad, a green enchilada, roasted chiles, fried egg and avocado. Add extras for an additional charge.",
              es: "Servido con arroz, frijoles, ensalada de nopales, enchilada verde, chiles asados, huevo frito y aguacate. Extras con costo adicional." }, items: [
      { name: "Bistec Asado Estilo Garibaldi", desc: { en: "Grilled steak.", es: "Bistec asado." }, price: "21.00" },
      { name: "Pechuga Asada Estilo Garibaldi", desc: { en: "Grilled chicken breast.", es: "Pechuga de pollo asada." }, price: "21.00" },
      { name: "Chuleta Frita Estilo Garibaldi", desc: { en: "Fried pork chop.", es: "Chuleta de cerdo frita." }, price: "21.00" },
      { name: "Carne Enchilada Estilo Garibaldi", desc: { en: "Chili-marinated meat.", es: "Carne enchilada." }, price: "21.00" },
      { name: "Cecina Estilo Garibaldi", desc: { en: "Salted steak.", es: "Cecina de res." }, price: "21.00" }
    ]},
    { section: "Platillos Mexicanos", subtitle: "Mexican Dishes",
      note: { en: "Come with rice, beans & salad. Add extras for an additional charge.",
              es: "Con arroz, frijoles y ensalada. Extras con costo adicional." }, items: [
      { name: "Bistec Encebollado", desc: { en: "Steak with grilled onions.", es: "Bistec con cebolla asada." }, price: "16.00" },
      { name: "Bistec Oaxaqueño", desc: "", price: "21.00" },
      { name: "Chuletas a la Mexicana", desc: { en: "Mexican-style pork chops.", es: "Chuletas de cerdo a la mexicana." }, price: "16.00" },
      { name: "Chuletas Rancheras", desc: { en: "Ranch-style pork chops.", es: "Chuletas de cerdo en salsa ranchera." }, price: "16.00" },
      { name: "Chuletas en Mole", desc: { en: "Pork chops in mole.", es: "Chuletas de cerdo en mole." }, price: "16.00" },
      { name: "Chuletas en Salsa Verde", desc: { en: "Pork chops in green salsa.", es: "Chuletas de cerdo en salsa verde." }, price: "16.00" },
      { name: "Chuletas Fritas, Papas y Ensalada", desc: { en: "Fried pork chops, fries and salad.", es: "Chuletas fritas con papas fritas y ensalada." }, price: "16.00" },
      { name: "Enchiladas", desc: { en: "Red or green, with lettuce, avocado, cheese and sour cream.", es: "Verdes o rojas, con lechuga, aguacate, queso y crema." }, price: "15.00" },
      { name: "Enchiladas Suizas", desc: { en: "Swiss enchiladas.", es: "Enchiladas suizas." }, price: "15.00+" },
      { name: "Entomatadas", desc: { en: "In tomato sauce.", es: "En salsa de tomate." }, price: "16.00+" },
      { name: "Chilaquiles", desc: { en: "Red or green, with steak or grilled chicken breast.", es: "Rojos o verdes, con bistec o pechuga asada." }, price: "16.00" },
      { name: "Cecina Ranchera", desc: { en: "Salted ranch beef with tender cactus.", es: "Cecina ranchera con nopales tiernos." }, price: "17.00" },
      { name: "Flautas", desc: { en: "Chicken or chicken breast flautas with tomato, cheese and sour cream.", es: "Flautas de pollo o pechuga, con tomate, queso y crema." }, price: "15.00", popular: true },
      { name: "Mole de Pollo", desc: { en: "Tender chicken in mole.", es: "Pieza de pollo tierno en mole." }, price: "17.00" },
      { name: "Cielo, Mar y Tierra", desc: { en: "Sky, surf and turf: paloma (pigeon), steak & shrimp.", es: "Paloma, bistec y camarones." }, price: "21.00" }
    ]},
    { section: "Tortas", subtitle: "Sandwiches & Burgers",
      note: { en: "Come with beans, lettuce, tomato, onion, avocado & jalapeño. Add extras for an additional charge.",
              es: "Con frijoles, lechuga, tomate, cebolla, aguacate y jalapeño. Extras con costo adicional." }, items: [
      { name: { en: "Bacon Burger", es: "Hamburguesa con Tocino" }, desc: "", price: "12.00" },
      { name: { en: "Mexican Burger", es: "Hamburguesa Mexicana" }, desc: "", price: "14.00" },
      { name: "Sub Pastor Torta", desc: "", price: "10.95" },
      { name: { en: "Chipotle Burger", es: "Hamburguesa Chipotle" }, desc: "", price: "11.00" },
      { name: "Al Pastor Torta", desc: { en: "Seasoned pork.", es: "Cerdo adobado." }, price: "9.00" },
      { name: "Jamón Torta", desc: { en: "Ham.", es: "Jamón." }, price: "9.00" },
      { name: "Pechuga Asada Torta", desc: { en: "Grilled chicken.", es: "Pechuga asada." }, price: "9.00" },
      { name: "Carne Enchilada Torta", desc: { en: "Chili pork.", es: "Cerdo enchilado." }, price: "9.00" },
      { name: "Bistec Asado Torta", desc: { en: "Grilled steak.", es: "Bistec asado." }, price: "9.00" },
      { name: "Huevo con Jamón Torta", desc: { en: "Eggs & ham.", es: "Huevo con jamón." }, price: "9.00" },
      { name: "Huevo con Chorizo Torta", desc: { en: "Eggs & chorizo.", es: "Huevo con chorizo." }, price: "9.00" },
      { name: "Pechuga Empanizada Torta", desc: { en: "Breaded chicken.", es: "Pechuga empanizada." }, price: "9.00" },
      { name: "Milanesa Torta", desc: { en: "Breaded steak.", es: "Milanesa de res." }, price: "9.00" },
      { name: "Quesillo Torta", desc: { en: "Cheese.", es: "Quesillo." }, price: "9.00" },
      { name: "Torta Cubana", desc: "", price: "10.00" },
      { name: "Hamburguesa", desc: { en: "Hamburger with french fries & salad.", es: "Con papas fritas y ensalada." }, price: "10.00" }
    ]},
    { section: "Paloma", subtitle: "Pigeon",
      note: { en: "Add extras for an additional charge.", es: "Extras con costo adicional." }, items: [
      { name: "Paloma a la Mexicana", desc: { en: "Mexican style.", es: "Estilo mexicano." }, price: "18.00" },
      { name: "Paloma Ranchera", desc: { en: "Ranch style.", es: "Estilo ranchero." }, price: "18.00" },
      { name: "Paloma a la Diabla", desc: { en: "In hot sauce.", es: "En salsa picante." }, price: "18.00", spicy: true },
      { name: "Paloma en Mole", desc: { en: "With mole sauce.", es: "En salsa de mole." }, price: "18.00" },
      { name: "Paloma en Salsa", desc: { en: "In green or red sauce.", es: "En salsa verde o roja." }, price: "18.00" },
      { name: "Paloma al Mojo de Ajo", desc: { en: "In garlic sauce.", es: "En salsa de ajo." }, price: "18.00" },
      { name: "Palomas, Papas Fritas y Ensalada", desc: { en: "Pigeon, french fries and salad.", es: "Paloma con papas fritas y ensalada." }, price: "18.00" }
    ]},
    { section: "Coctel", subtitle: "Seafood Cocktails",
      note: { en: "Add extras for an additional charge.", es: "Extras con costo adicional." }, items: [
      { name: "Coctel de Camarón", desc: { en: "Shrimp cocktail.", es: "Coctel de camarón." }, price: "16.00" },
      { name: "Camarón a la Campechana", desc: { en: "Shrimp campechana style.", es: "Camarón estilo campechana." }, price: "18.00" },
      { name: "Ceviche de Mariscos", desc: { en: "Seafood ceviche.", es: "Ceviche de mariscos." }, price: "18.00" },
      { name: "Aguachile", desc: "", price: "18.00" }
    ]},
    { section: "Niños", subtitle: "Kids", items: [
      { name: "Pechuga Asada, Arroz y Frijoles", desc: { en: "Grilled chicken, rice and beans.", es: "Pechuga asada con arroz y frijoles." }, price: "9.00" },
      { name: "Pechuga Empanizada con Papas", desc: { en: "Breaded chicken with fries.", es: "Pechuga empanizada con papas fritas." }, price: "9.00" },
      { name: "Bistec Empanizado con Papas", desc: { en: "Breaded steak with fries.", es: "Bistec empanizado con papas fritas." }, price: "9.00" },
      { name: "Bistec Asado, Arroz y Frijoles", desc: { en: "Grilled steak with rice and beans.", es: "Bistec asado con arroz y frijoles." }, price: "9.00" },
      { name: "Dos Huevos, Arroz y Frijoles", desc: { en: "2 eggs, rice and beans.", es: "Dos huevos con arroz y frijoles." }, price: "9.00" },
      { name: "Dedos de Pollo", desc: { en: "Chicken fingers.", es: "Tiras de pollo empanizadas." }, price: "9.00" }
    ]},
    { section: "Caldos", subtitle: "Soups", items: [
      { name: "Caldo de Mariscos", desc: { en: "Seafood soup.", es: "Caldo de mariscos." }, price: "22.00" },
      { name: "Caldo de Res", desc: { en: "Beef soup.", es: "Caldo de res." }, price: "16.00" },
      { name: "Menudo", desc: "", price: "15.00" },
      { name: "Caldo de Camarón", desc: { en: "Shrimp soup.", es: "Caldo de camarón." }, price: "17.00" },
      { name: "Caldo de Pescado", desc: { en: "Fish soup.", es: "Caldo de pescado." }, price: "18.00" }
    ]},
    { section: "Postres", subtitle: "Desserts", items: [
      { name: { en: "Chocolate Cake", es: "Pastel de Chocolate" }, desc: "", price: "4.00" },
      { name: "Tiramisú", desc: "", price: "4.00" },
      { name: "Tres Leches", desc: "", price: "4.00" }
    ]},
    { section: "Extras", subtitle: "Sides", items: [
      { name: "Nopales", desc: { en: "Cactus.", es: "Nopales." }, price: "3.50" },
      { name: "Jalapeños", desc: "", price: "2.00" },
      { name: "Guacamole", desc: "", price: "12.00" },
      { name: "Cebollitas", desc: { en: "Grilled green onions.", es: "Cebollitas asadas." }, price: "4.00" },
      { name: "Chile Asado", desc: { en: "Roasted chile.", es: "Chile asado." }, price: "2.00" },
      { name: "Papas Fritas", desc: { en: "French fries.", es: "Papas fritas." }, price: "3.50", popular: true },
      { name: "Ensalada Regular", desc: { en: "Side salad.", es: "Ensalada sencilla." }, price: "3.50" },
      { name: "Pico de Gallo", desc: "", price: "6.00" },
      { name: "Arroz", desc: { en: "Rice.", es: "" }, price: "2.50" },
      { name: "Frijoles", desc: { en: "Beans.", es: "" }, price: "2.50" },
      { name: "Orden de Aguacate", desc: { en: "Avocado.", es: "" }, price: "3.00" }
    ]},
    { section: "Bebidas", subtitle: "Drinks", items: [
      { name: "Licuados", desc: { en: "Milkshakes.", es: "Licuados de fruta con leche." }, price: "6.00" },
      { name: "Aguas Naturales", desc: { en: "Flavored fresh waters.", es: "Aguas frescas de sabores." }, price: "4.00" }
    ]},
    { section: "Mojarra", subtitle: "Fish",
      note: { en: "Served with rice and beans, or salad and french fries.",
              es: "Servidos con arroz y frijoles, o ensalada y papas fritas." }, items: [
      { name: "Filete Ahogado", desc: { en: "Fish fillet topped with green or red salsa.", es: "Filete de pescado bañado en salsa verde o roja." }, price: "16.00" },
      { name: "Mojarra a la Mexicana", desc: { en: "Fried fish Mexican style.", es: "Mojarra frita a la mexicana." }, price: "24.00" },
      { name: "Mojarra al Mojo de Ajo", desc: { en: "Fried fish in garlic sauce.", es: "Mojarra frita en salsa de ajo." }, price: "22.00" },
      { name: "Mojarra Frita", desc: { en: "Fried fish.", es: "Mojarra frita." }, price: "22.00" },
      { name: "Filete Empanizado", desc: { en: "Breaded fillet.", es: "Filete de pescado empanizado." }, price: "16.00" }
    ]},
    { section: "Quesadillas",
      note: { en: "Flour or corn tortilla.", es: "De tortilla de harina o de maíz." }, items: [
      { name: "Quesabirria de Harina", desc: { en: "Quesabirria with flour tortilla.", es: "Quesabirria con tortilla de harina." }, price: "9.95" },
      { name: "Quesabirria de Maíz", desc: { en: "Quesabirria with corn tortilla.", es: "Quesabirria con tortilla de maíz." }, price: "15.00" },
      { name: "Quesadillas de Maíz", desc: { en: "Quesadilla with corn tortilla.", es: "Quesadilla con tortilla de maíz." }, price: "6.50+" }
    ]}
  ]
};

/* Ashanti Maurice — shirt stock, shared by the live shop and the preview.
   ============================================================
   EDIT HERE: shirt stock. Number = how many are left. 0 = sold out.
   ============================================================ */
window.SHOP = (function () {
var PRICES = { short: 40, long: 50 };
var SHIRTS = {
  black:   { name: "Black",   swatch: "#151515", photos: { long: "img/shirt-black-long.jpg" },
             stock: { short: { M: 0, L: 0, XL: 0 }, long: { M: 2, L: 0, XL: 1 } } },
  mocha:   { name: "Mocha",   swatch: "#5a3f30", photos: { short: "img/shirt-mocha-short.jpg", long: "img/shirt-mocha-long.jpg" },
             stock: { short: { M: 0, L: 1, XL: 1 }, long: { M: 0, L: 2, XL: 2 } } },
  cream:   { name: "Cream",   swatch: "#efe7d6", photos: { short: "img/shirt-cream-short.jpg", long: "img/shirt-cream-long.jpg" },
             stock: { short: { M: 1, L: 1, XL: 1 }, long: { M: 1, L: 2, XL: 0 } } },
  oatmeal: { name: "Oatmeal", swatch: "#cbb89b", photos: { short: "img/shirt-oatmeal-short.jpg", long: "img/shirt-oatmeal-long.jpg" },
             stock: { short: { M: 2, L: 2, XL: 0 }, long: { M: 1, L: 1, XL: 1 } } },
  smoke:   { name: "Smoke",   swatch: "#4a4a48", photos: { short: "img/shirt-smoke-short.jpg", long: "img/shirt-smoke-long.jpg" },
             stock: { short: { M: 0, L: 0, XL: 0 }, long: { M: 1, L: 1, XL: 0 } } }
};
  return { PRICES: PRICES, SHIRTS: SHIRTS };
})();

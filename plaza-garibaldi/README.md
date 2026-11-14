# Plaza Garibaldi website

Website for Plaza Garibaldi Mexican Restaurant, 638 State St, Perth Amboy, NJ.

## How to update it
- **Info, hours, phone, menu, order links:** edit `data.js`. Anything left empty is hidden.
- **Photos:** put them in `images/` using the names listed in `data.js` (`hero.jpg`, `about.jpg`, `gallery-1.jpg` … `gallery-4.jpg`). A missing photo shows a colored pattern instead.

To preview, open `index.html` in a browser.

## English / Español
The **EN / ES** button in the top bar switches the whole site, including every menu item and description.
In `data.js`, any text can be written as `{ en: "English", es: "Español" }`; plain text shows the same in both languages.
Fixed labels (buttons, headings, day names) are in the `UI` list at the top of `site.js`.
The site opens in Spanish for visitors whose phone or browser is set to Spanish, and remembers the visitor's choice.

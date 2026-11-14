# Ashanti Maurice — website

Live at https://apm-9.github.io/Mauricetraining.work/ (GitHub Pages, served from `main`).

## Quick edits

| To change | Edit |
|---|---|
| Fight record (MMA / BJJ) | `assets/site.js` → `record` |
| Next fight + countdown | `assets/site.js` → `nextFight` (leave `date` empty to show "TBA") |
| Email, Instagram, Calendly link | `assets/site.js` (top) |
| Shirt stock / prices | `merch.html` → `SHIRTS` and `PRICES` near the bottom (0 = sold out) |
| Past fights | `fights.html` → "Past fights" section (copy the `<article class="card bout">` block) |
| Coaching prices / features | `coaching.html` |

The header and footer on every page come from `assets/site.js`; styles are in `assets/site.css`.
Web-sized photos live in `img/`. The full-size originals in the repo root are no longer used by the pages.

Old shirt links (`black-shirt.html` etc.) redirect to `merch.html#<color>`.

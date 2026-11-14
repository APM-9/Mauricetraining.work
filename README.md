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
| Business name, certifications, experience numbers | `assets/site.js` → `business`, `certifications`, `experience` |
| Client testimonials | `assets/site.js` → `testimonials` (only quotes clients agreed to share) |
| Coaching policies / FAQ | `assets/site.js` → `policies` |
| Web design prices and what each tier includes | `assets/site.js` → `webPricing` (empty price shows "Custom quote") |
| Example work shown on each industry tab | `assets/site.js` → `webPricing[].examples` |
| Sample site (insurance) | `examples/insurance/` — a fictional business, marked as a sample |
| Web add-ons (care plan, extra pages…) | `assets/site.js` → `webAddons` |
| Portfolio projects | `assets/site.js` → `projects` (screenshots go in `img/work/`) |

**Placeholders:** any empty item above is hidden on the live site. Add `?draft` to a page address
(for example `coaching.html?draft` or `web-design.html?draft`) to see dashed yellow boxes where each one will go.

The header and footer on every page come from `assets/site.js`; styles are in `assets/site.css`.
Web-sized photos live in `img/`. The full-size originals in the repo root are no longer used by the pages.

Old shirt links (`black-shirt.html` etc.) redirect to `merch.html#<color>`.

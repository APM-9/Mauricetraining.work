# Handoff: Elite Wrestling NJ website

Notes for the next Claude session that picks up this project. Last updated 2026-11-13.

## What this is

A one-page redesign of **elitewrestlingnj.com**, built as a surprise gift-and-paid-job for the gym owner,
**Coach Steve Rivera** (Elite Wrestling NJ). The user is a former wrestler of his. The current live site is
on **Wix**, and the gym just moved from Jackson, NJ to **Superdome Sports, 2nd floor, 780 NJ-70, Brick Township, NJ 08723**.

The rest of this repo (`index.html`, `fights.html`, `merch.html` and so on at the root) is the **user's own
fighter/coaching site**. It is unrelated. Do not touch it when working on the wrestling site.

## Status (as of 2026-11-13)

- **Site:** done and merged to `main` (PRs #2, #3, #4 on `APM-9/Mauricetraining.work`). Work branch:
  `claude/keen-allen-p3gpaa`; its site files are identical to `main`.
- **Preview for the coach:** https://claude.ai/artifact/GoGtKBDjDCUKCNhMesToq4 (private until the user shares it).
- **Quote doc:** https://claude.ai/artifact/QkY6d9uT6Ugo7qq1SLNPWC (a Claude Docs doc). It offers $1,500 value,
  minus a $900 family discount, for **$600 one-time**, plus an optional **$50/month care plan** (first month free,
  up to 3 small changes a month within 48 hours, cancel with 30 days' notice). One-off updates are $30, and new
  pages or features $100–$250. Quote valid until 2026-12-12.
- **Waiting on:** the coach's feedback and payment. The user plans to do the launch work *with* the coach after he pays.
  Don't start the launch steps below until the user says so.

## Files

All in `elite-wrestling/`:

| File | What it is |
|---|---|
| `index.html` | The whole site: one self-contained HTML file with inline CSS and JS. No build step. |
| `assets/` | Photos and logo, resized from the Wix site. `assets/store/` holds the 7 Short Time product photos. |
| `schedule-template.csv` | The weekly schedule. Same data as `DEFAULT_SCHEDULE` in `index.html`; import it into Google Sheets. |
| `SCHEDULE.md` | Coach-facing guide: set up and edit the schedule Google Sheet. |
| `DONATE.md` | Coach-facing guide: how the donate box works, plus the optional PayPal client ID. |
| `HANDOFF.md` | This file. |

## How the page is built (`index.html`)

- **Look:** dark, black and red (the gym's brand). Fonts are Big Shoulders Display (headings) and Archivo (body) from
  Google Fonts. Colour tokens are on `:root`. It's a single committed dark theme on purpose, with `color-scheme: dark`.
- **Sections in order:** header and menu, hero, "We moved" band, Programs (filter chips + 1–5 intensity meters),
  **Weekly schedule** (`#schedule`), Membership (light band), Coaches, Champions, Freestyle (`#freestyle`), Camp (`#camp`),
  Tournaments, Elite for Life and partner, **Shop** (`#shop`), Visit (contact, uniform policy), footer.
  The **donate dialog** (`#donate-dlg`) sits just before `</main>`.
- **Menu:** 9 links on desktop. The full row shows above 1200px; at 1200px and below it becomes the
  "Menu" button with a full-screen drawer (`#drawer`, outside `<header>`). The breakpoint lives in three places:
  `@media (max-width:1200px)`, `@media (min-width:1201px)`, and `matchMedia("(min-width:1201px)")` in the JS.
  The header bar is capped at 1200px wide, so adding a link means tightening `.nav a` spacing, not just moving the breakpoint.
- **In-page links:** a JS `goTo(id)` measures the sticky header's real bottom edge (which includes the iPhone
  safe-area inset) and scrolls the section 16px below it. Every `a[href^="#"]` goes through it.
- **Data you can edit in the JS**, all near the bottom of `index.html`:
  - `programs` array: the Programs cards.
  - `SCHEDULE_SHEET_CSV` (currently `""`) and `DEFAULT_SCHEDULE` (a CSV string). Columns:
    `Day,Start,End,Class,Group,Note`. Group is one of `youth|hs|girls|new|group|all`. A row whose Day is a date
    (`YYYY-MM-DD` or `M/D/YYYY`) becomes a "Heads up" notice for 45 days before that date.
  - `events` array: upcoming tournaments. Past dates hide automatically. **The list runs out after 2027-01-03**,
    so it needs new entries from the coach's tournament page.
  - `gear` array: the 7 store items. **All have `soldOut:true`** because they were sold out on Short Time on
    2026-11-12. Flip to `false` on restock.
  - `PAYPAL_CLIENT_ID` (currently `""`), `PAYPAL_BUTTON_ID = "ZDRNNV7Y3HSBC"`, and `PAYPAL_LINK`.
- **Outside links** (`target="_blank"`) get an arrow drawn with a CSS mask (`a[target="_blank"]::after`, `.ext-ico`).
  **Never use the ↗ character or other arrow characters**: iOS renders them as emoji. The page currently contains none.

## External services and key links

| Service | What it's used for | Link / ID |
|---|---|---|
| WrestlingIQ | Sign-ups, free trial, real practice calendar | Register: `https://www.wrestlingiq.com/register/elitewrestlingnj/membership` · Freestyle/all options: `https://www.wrestlingiq.com/elitewrestlingnj/register` · Calendar: `https://www.wrestlingiq.com/elitewrestlingnj/schedule` |
| Short Time | Team store (gear) | `https://shorttime.net/collection/elite-wrestling/elite-wrestling-store/` |
| PayPal | Elite for Life donations | Hosted button `ZDRNNV7Y3HSBC`, merchant `6RZQCS9V6VEM4`, page `https://www.paypal.com/ncp/payment/ZDRNNV7Y3HSBC` |
| Wix | Current live site, which also hosts the domain today | `https://www.elitewrestlingnj.com` |
| Contact | Shown on the site | 732-433-5890 · SteveRivera@EliteWrestlingNJ.com |

What we learned about these services:

- **WrestlingIQ** can't be embedded (`X-Frame-Options: SAMEORIGIN`). Its API (`/api/team/v1/events`) needs a
  bearer token and doesn't allow cross-origin requests, so the site **can't read the schedule from WrestlingIQ live**.
  That's why the schedule comes from a Google Sheet. The coach would then keep two schedules (WrestlingIQ for
  members, the sheet for the website); the user knows about this trade-off.
- **Short Time** pages *can* be framed, but the cart breaks in Safari (third-party cookies), so we link out instead.
- **PayPal** checkout can't be framed. The donate dialog opens the hosted page in a centered `window.open` pop-up
  (desktop), or a new tab on phones or when pop-ups are blocked. Rendering PayPal's buttons *inside* the dialog
  needs the merchant's own SDK client ID (usually starts with `BAA`), which only the coach can copy from his PayPal
  account. The NCP page's own client ID is PayPal's internal one; don't use it.

## Previewing and publishing

- **Local check:** open `elite-wrestling/index.html` directly, or run Playwright against `file://…/index.html`
  (Chromium is pre-installed in cloud sessions).
- **Re-publishing the preview artifact:** artifact pages must not have their own `<!DOCTYPE>`, `<html>`, `<head>`
  or `<body>`, so publish a stripped copy. Generate it like this, then publish it to the **same artifact URL** with
  the `assets/...` files mapped in `files`:

  ```python
  import re
  s = open('elite-wrestling/index.html').read()
  t = re.sub(r'<!DOCTYPE html>\s*<html[^>]*>\s*<head>\s*', '', s)
  t = re.sub(r'<meta charset="utf-8">\s*<meta name="viewport"[^>]*>\s*', '', t)
  t = t.replace('</head>\n<body>\n', '').replace('</body>\n</html>\n', '')
  open('<scratchpad>/artifact/elite-wrestling.html', 'w').write(t)
  ```

  Pass `url: https://claude.ai/artifact/GoGtKBDjDCUKCNhMesToq4` on a new session; read it first, as the tool requires.
- **Limits of the preview:** it blocks outside data and most pop-ups. So it always shows the built-in schedule
  (never the Google Sheet), and PayPal usually opens in a new tab there. Both behave properly on a real domain.

## Launch plan (only after the coach pays and the user says go)

1. **Hosting:** put `elite-wrestling/` on a free static host (Netlify, Cloudflare Pages or GitHub Pages). The quote
   tells the coach hosting is free.
2. **Schedule sheet:** walk the coach through `SCHEDULE.md`, then paste his published CSV link into
   `SCHEDULE_SHEET_CSV`. Test that the live site reads it. Google's published-CSV response has not been tested yet.
3. **PayPal (optional):** get his client ID per `DONATE.md`, set `PAYPAL_CLIENT_ID`, and test the in-dialog buttons.
4. **Domain:** point elitewrestlingnj.com at the new host. Wix currently controls it, so check whether the domain is
   registered through Wix or elsewhere before changing DNS.
5. **Before cancelling Wix:** confirm he isn't relying on its member area, forms, Wix email or other apps. The old site
   had Wix Members, Pricing Plans, Bookings and Forms installed.
6. **Content to refresh:** tournaments after Jan 3, 2027; 2027 camp dates; the 2027 freestyle session dates and
   price (the page shows the 2026 ones); store `soldOut` flags.

## Gotchas we already hit

- **Class-name clashes:** `.copy` (copy buttons) once collided with a text block, and `.day` (camp timetable) with the
  schedule (now `.sday`). Search for a class before reusing a short name.
- **`.top .wrap` also matched the drawer once:** the header bar now uses `.bar`. Keep the drawer out of the header.
- **Sticky header covering titles:** the header is solid on purpose. Don't make it translucent again.
- **Lazy images and full-page screenshots:** `loading="lazy"` images come out blank in full-page Playwright
  screenshots. That's not a bug; set `loading='eager'` in the test if you need them.
- **Pushing:** force-pushes are blocked in this environment. To update the branch after a PR merges, merge `origin/main`
  into the branch and push normally.

## Cloud environment

The session ran in a personal environment named **`mauricetraining.work`** (scoped to this repo). Its allowed hosts are:
`elitewrestlingnj.com`, `www.elitewrestlingnj.com`, `static.wixstatic.com`, `www.wrestlingiq.com`, `wrestlingiq.com`,
`prod-assets.wrestlingiq.com`, `shorttime.net`, `www.paypal.com`, `www.paypalobjects.com`.
Hosting providers and Google Sheets (`docs.google.com`) are **not** allowed yet; launch work will need them.

## Working with the user

- They want plain, non-technical explanations and like seeing screenshots before and after a fix.
- They test on an iPhone in the Claude app, in both orientations. Check phone portrait and landscape every time.
- Ask before merging; they have asked for PRs and merges explicitly each time.

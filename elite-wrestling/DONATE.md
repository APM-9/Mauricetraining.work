# Donate button (Elite for Life)

Tapping **Donate** on the website opens an Elite for Life box over the page.

## How it works today

The box has a **Donate with PayPal** button. It opens Elite's PayPal donation page
(`https://www.paypal.com/ncp/payment/ZDRNNV7Y3HSBC`) in a small secure pop-up window on top of the site.
Donors enter any amount and pay with PayPal, Venmo, a card or Pay Later.
When they close the PayPal window, the box thanks them.

- **On computers**, PayPal opens as a pop-up window over the site.
- **On phones**, browsers open pop-ups as a new tab. Closing that tab brings the visitor back to the site.
- If a pop-up blocker stops the window, PayPal opens in a new tab instead.

PayPal does not allow its checkout to be shown inside another website's page,
except through its own button code, described below.

## Optional: show PayPal's buttons right inside the box

PayPal can draw its PayPal, Venmo and card buttons inside the box.
Checkout then opens in PayPal's own overlay without leaving the page.
This needs Elite's PayPal **client ID**, which only the account owner can get:

1. Log in to PayPal → **Pay Links & Buttons** (under Tools / Business tools).
2. Open the **Elite for Life Trust 501C3** button (Hosted Button ID `ZDRNNV7Y3HSBC`) and choose **Embed code** (or **Copy code**).
3. In that code, copy the value after `client-id=`. It's a long code that usually starts with `BAA`. Stop before the next `&`.
4. In `index.html`, find `var PAYPAL_CLIENT_ID = "";` and paste it between the quotes.

The client ID is public (it's shown in the embed code on any site that uses it), so it is safe to put in the page.
If the PayPal buttons ever fail to load, the box falls back to the pop-up button automatically.

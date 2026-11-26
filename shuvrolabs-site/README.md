# ShuvroLabs — Your Vision. Our Creation.

A premium, mobile-responsive digital agency landing page for **ShuvroLabs** (established 2025), founded by **Muhammad Hossain**.

## Live features

- Original ShuvroLabs logo integrated throughout the design
- Mobile navigation with accessible toggle
- Nine services with click-to-select project inquiry
- Six linked portfolio examples sourced from Muhammad's existing public GitHub repositories
- Working portfolio category filters
- Founder, about, process and FAQ sections
- Project inquiry form that opens the visitor's email app (no backend or database)
- Responsive layouts, scroll-reveal effects, reduced-motion support
- SEO/social metadata, favicon, and a full footer

## Launch locally

No installation or build tool required. Open `index.html` in a browser, or run a basic static server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish

Deploy the contents of this folder as a **static site** to Netlify, Vercel, Cloudflare Pages, GitHub Pages, or your hosting provider. The website has no server-side requirements.

## What's new in this version

- Packages & pricing section with six starting-price packages (BDT and approx. USD)
- Founding client offer (30% off for the first 10 clients, in exchange for an honest review) and a free digital audit offer
- Messenger button, optional WhatsApp button, and a floating chat button
- Form can send straight to your inbox through Web3Forms (free), with the old email-app method as fallback
- Facebook page and LinkedIn company page linked in contact and footer
- Better SEO: local keywords, canonical URL, schema.org business data, `robots.txt`, `sitemap.xml`
- New FAQs about trust, payment and delivery time

## Setup before upload (5 minutes)

1. Open `script.js`. At the top, in `CONFIG`:
   - `whatsappNumber`: your WhatsApp number, digits only, e.g. `8801712345678`. The WhatsApp buttons appear once this is set.
   - `web3formsKey`: go to https://web3forms.com, enter your business email, and paste the key you receive. Inquiries then arrive in your inbox without opening the visitor's email app.
2. Edit the package prices in `index.html` (search for `price-card`) if you want different numbers.
3. Upload all files to your host, replacing the old ones.
4. Add the site to Google Search Console and submit `https://www.shuvrolabs.tech/sitemap.xml`.

## Customize before launch

1. Replace the interim personal contact email (`muhammadhossain.27.2001@gmail.com`) with the official ShuvroLabs business email once available, in both `index.html` and `script.js`.
2. Add a real inquiry backend (e.g., Formspree, Resend, Netlify Forms, or a custom endpoint) if you want messages to be delivered without launching the visitor's email application.
3. Add verified client reviews, case studies, and proof of results as you earn them. **The current work is labeled as selected founder portfolio projects rather than paid client work.**
4. Swap illustrative project mockups with screenshots of the respective applications if desired.
5. Add your domain, legal/policy pages, analytics (with appropriate consent), and a real OG image URL after going live.

## Brand

- Name: **ShuvroLabs**
- Tagline: **Your Vision. Our Creation.**
- Founded: **2025**
- Founder & CEO: **Muhammad Hossain**
- Colors: near-black `#0b0b0d`, orange `#fa6b27`, warm paper `#f5f4f0`
- Fonts: Manrope and DM Sans (Google Fonts, with local system fallbacks)

The logo assets are derived from the original image supplied by the founder.

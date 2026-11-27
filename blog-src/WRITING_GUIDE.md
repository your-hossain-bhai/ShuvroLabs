# ShuvroLabs blog: how a new post is made

Each post is two things:

1. An entry in `blog-src/posts.json` (newest first is handled by the build):
   ```json
   {
     "slug": "english-words-with-hyphens",
     "tag": "WEBSITE",
     "title": "বাংলা শিরোনাম",
     "desc": "১–২ বাক্যের বাংলা সারাংশ, ১৬০ অক্ষরের মধ্যে",
     "read": "৫ মিনিট",
     "date": "YYYY-MM-DD"
   }
   ```
   Tags in use: `TECH GUIDE`, `WEBSITE`, `MARKETING`, `LOCAL SEO`, `CAREER`, `VIDEO`, `APP`.
2. The article body in `blog-src/posts/<slug>.html` — plain HTML fragment, no `<html>`/`<head>`.

Then run `python3 tools/build_blog.py`. It rebuilds every blog page, the blog index, related links, footer and `shuvrolabs-site/sitemap.xml`. Never hand-edit files under `shuvrolabs-site/blog/`.

## Writing rules

- Language: natural, simple Bangla (চলিত ভাষা), addressing the reader as "আপনি". English only for product names and technical terms.
- Length: 700–1,100 words. Practical and specific: steps, checklists, tables, mistakes to avoid.
- Audience: Bangladeshi small-business owners, students, freelancers, new entrepreneurs.
- First paragraph states the problem and what the reader will get. No filler intro.
- Facts: check anything about the present (prices, policies, how a platform works) with a web search first. Give prices only as approximate ranges and say they change. Never invent statistics, quotes, reviews, clients or results.
- Halal only: no betting, alcohol, adult, interest-based lending promotion.
- One post must not repeat a topic already in `posts.json`.

## Allowed HTML building blocks

- `<h2>` for sections (with `id` when the post has a table of contents), `<h3>`, `<p>`, `<ul>`, `<ol>`, `<strong>`.
- Table: `<div class="table-scroll"><table>…</table></div>`
- Tip box: `<div class="note">…</div>`
- Table of contents: `<div class="toc"><strong>এই লেখায় যা আছে</strong><ol>…</ol></div>`
- Affiliate button (only these keys exist in `shuvrolabs-site/blog/blog.js`: `datahostbd`, `bdwebs`, `tenms`, `hostinger`; prefer the first three, which pay via bKash/Nagad/Rocket):
  `<div class="aff-box"><a class="aff-btn" data-aff="KEY" href="PLAIN_URL">লেখা <span>↗</span></a></div>`
  Posts without their own affiliate button get a small affiliate box automatically from `tools/build_blog.py` (10 Minute School for `TECH GUIDE`/`VIDEO`, 10 Minute School + DataHost BD for `CAREER`, DataHost BD + BDWebs for the rest).
  If a post has any affiliate button, it must start with
  `<p class="disclosure">এই লেখার কিছু লিংক affiliate লিংক। সেখান থেকে কিনলে ShuvroLabs সামান্য কমিশন পায়, আপনার দাম বাড়ে না।</p>`
- Closing call to action, matched to the topic, pointing to `/#pricing`, `/#offer` or `/#contact`:
  ```html
  <div class="cta-box">
  <h2>…</h2>
  <p>…</p>
  <a class="btn btn-orange" href="/#pricing">… <span aria-hidden="true">↗</span></a>
  </div>
  ```
  Current packages (starting prices): landing page ৳6,000; business website ৳15,000; Facebook page growth ৳6,000/month; 10 reels ৳4,000; local SEO setup ৳5,000; app/software MVP ৳40,000. Founding offer: 30% off for the first 10 clients. Free digital audit.

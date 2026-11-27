"""Build the ShuvroLabs blog.

Usage: python3 tools/build_blog.py
Reads blog-src/posts.json and blog-src/posts/<slug>.html, writes shuvrolabs-site/blog/** and shuvrolabs-site/sitemap.xml.
"""
import os, json, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://www.shuvrolabs.tech'
OUT = os.path.join(ROOT, 'shuvrolabs-site', 'blog')
SRC = os.path.join(ROOT, 'blog-src', 'posts')

BN_DIGITS = str.maketrans('0123456789', '০১২৩৪৫৬৭৮৯')
BN_MONTHS = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর']


def date_bn(iso):
    y, m, d = iso.split('-')
    return f'{int(d)} {BN_MONTHS[int(m) - 1]} {y}'.translate(BN_DIGITS)


POSTS = json.load(open(os.path.join(ROOT, 'blog-src', 'posts.json'), encoding='utf-8'))
POSTS.sort(key=lambda p: p['date'], reverse=True)

FB = 'https://www.facebook.com/profile.php?id=61595728853182'
LI = 'https://www.linkedin.com/company/144095780/'
MSG = 'https://m.me/61595728853182'

HEADER = f'''  <a class="skip-link" href="#main">Skip to main content</a>
  <header class="site-header" id="site-header">
    <div class="container header-inner">
      <a class="brand" href="/" aria-label="ShuvroLabs Home">
        <span class="brand-emblem"><img src="/assets/shuvrolabs-mark.png" alt="" /></span>
        <span class="brand-name">Shuvro<span>Labs</span><small>THE DIGITAL GROWTH STUDIO</small></span>
      </a>
      <nav id="main-nav" class="main-nav" aria-label="Main navigation">
        <a href="/#services">Services</a>
        <a href="/#pricing">Pricing</a>
        <a href="/blog/">Blog</a>
        <a href="/#about">About</a>
        <a href="/#contact" class="mobile-contact">Start a Project <span aria-hidden="true">↗</span></a>
      </nav>
      <a class="nav-cta" href="/#contact">Let's Talk <span class="arrow-circle" aria-hidden="true">↗</span></a>
      <button id="menu-toggle" class="menu-toggle" type="button" aria-label="Open menu" aria-controls="main-nav" aria-expanded="false"><span></span><span></span></button>
    </div>
  </header>'''

FOOTER = f'''  <a class="float-chat" href="{MSG}" target="_blank" rel="noopener noreferrer" aria-label="Chat with ShuvroLabs"><span class="float-dot"></span>Chat with us</a>
  <footer class="site-footer"><div class="container"><div class="footer-main"><div class="footer-brand-col"><a class="brand footer-brand" href="/" aria-label="ShuvroLabs home"><span class="brand-emblem"><img src="/assets/shuvrolabs-mark.png" alt="" /></span><span class="brand-name">Shuvro<span>Labs</span><small>THE DIGITAL GROWTH STUDIO</small></span></a><p>Independent in spirit. Creative by nature.<br/>Building what's next, together.</p><span class="footer-est">✳ ESTABLISHED 2025</span></div><div class="footer-links"><div><h4>EXPLORE</h4><a href="/#services">Services</a><a href="/#pricing">Pricing</a><a href="/blog/">Blog</a><a href="/#about">About Us</a></div><div><h4>GUIDES</h4>{''.join(f'<a href="/blog/{p["slug"]}/">{html.escape(p["title"].split(":")[0])}</a>' for p in POSTS[:4])}<a href="/blog/">সব লেখা →</a></div><div><h4>CONNECT</h4><a href="/#contact">Start a Project</a><a href="{FB}" target="_blank" rel="noopener noreferrer">Facebook ↗</a><a href="{LI}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div></div><div class="footer-bigword" aria-hidden="true">SHUVROLABS<span>✳</span></div><div class="footer-bottom"><span>© 2025 SHUVROLABS. ALL RIGHTS RESERVED.</span><span>MUHAMMAD HOSSAIN — FOUNDER & CEO</span><a href="#top">BACK TO TOP ↑</a></div></div></footer>'''


def head(title, desc, url, extra=''):
    return f'''<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#0b0b0d" />
  <title>{html.escape(title)}</title>
  <meta name="description" content="{html.escape(desc)}" />
  <link rel="canonical" href="{url}" />
  <meta property="og:site_name" content="ShuvroLabs" />
  <meta property="og:title" content="{html.escape(title)}" />
  <meta property="og:description" content="{html.escape(desc)}" />
  <meta property="og:url" content="{url}" />
  <meta property="og:image" content="{SITE}/assets/shuvrolabs-original.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" type="image/png" href="/assets/favicon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/style.css" />
  <link rel="stylesheet" href="/blog/blog.css" />
  <script src="/blog/blog.js" defer></script>
  <meta name="google-adsense-account" content="ca-pub-7237759996121208" />
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7237759996121208" crossorigin="anonymous"></script>
{extra}</head>
<body class="blog-body" id="top">
'''


def ld(obj):
    return '  <script type="application/ld+json">\n' + json.dumps(obj, ensure_ascii=False, indent=2) + '\n  </script>\n'


os.makedirs(OUT, exist_ok=True)

# post pages
for p in POSTS:
    url = f'{SITE}/blog/{p["slug"]}/'
    body = open(os.path.join(SRC, p['slug'] + '.html'), encoding='utf-8').read()
    others = [o for o in POSTS if o is not p][:3]
    related = '<div class="related"><h2>আরও পড়ুন</h2><ul>' + ''.join(
        f'<li><a href="/blog/{o["slug"]}/">{html.escape(o["title"])}</a></li>' for o in others) + '</ul></div>'
    schema = ld({
        '@context': 'https://schema.org', '@type': 'BlogPosting',
        'headline': p['title'], 'description': p['desc'], 'inLanguage': 'bn',
        'datePublished': p['date'], 'dateModified': p.get('updated', p['date']), 'mainEntityOfPage': url,
        'image': f'{SITE}/assets/shuvrolabs-original.png',
        'author': {'@type': 'Organization', 'name': 'ShuvroLabs', 'url': SITE + '/'},
        'publisher': {'@type': 'Organization', 'name': 'ShuvroLabs',
                      'logo': {'@type': 'ImageObject', 'url': f'{SITE}/assets/shuvrolabs-original.png'}},
    })
    page = head(p['title'] + ' | ShuvroLabs', p['desc'], url, schema) + HEADER + f'''
  <main id="main">
    <section class="blog-hero">
      <div class="container">
        <div class="section-kicker"><span class="kicker-icon">✳</span> <a href="/blog/">BLOG</a> / {p['tag']}</div>
        <h1>{html.escape(p['title'])}</h1>
        <p>{html.escape(p['desc'])}</p>
        <div class="blog-meta"><span>ShuvroLabs</span><span>{date_bn(p['date'])}</span><span>পড়তে {p['read']}</span></div>
      </div>
    </section>
    <section class="article-wrap">
      <div class="container">
        <article class="article">
{body}
{related}
        </article>
      </div>
    </section>
  </main>
''' + FOOTER + '\n</body>\n</html>\n'
    os.makedirs(os.path.join(OUT, p['slug']), exist_ok=True)
    open(os.path.join(OUT, p['slug'], 'index.html'), 'w', encoding='utf-8').write(page)

# blog index
cards = ''.join(f'''<a class="post-card" href="/blog/{p['slug']}/"><span class="post-tag">{p['tag']}</span><h2>{html.escape(p['title'])}</h2><p>{html.escape(p['desc'])}</p><span class="read-more">পড়ুন · {p['read']} <span aria-hidden="true">↗</span></span></a>''' for p in POSTS)
title = 'ShuvroLabs Blog — ওয়েবসাইট, টেক ও ডিজিটাল মার্কেটিং গাইড'
desc = 'বাংলায় সহজ ভাষায় ওয়েবসাইট বানানো, ল্যাপটপ কেনা, Facebook মার্কেটিং আর ছোট ব্যবসার ডিজিটাল গ্রোথ নিয়ে প্র্যাকটিক্যাল গাইড।'
schema = ld({'@context': 'https://schema.org', '@type': 'Blog', 'name': 'ShuvroLabs Blog', 'url': SITE + '/blog/', 'inLanguage': 'bn',
             'blogPost': [{'@type': 'BlogPosting', 'headline': p['title'], 'url': f'{SITE}/blog/{p["slug"]}/'} for p in POSTS]})
page = head(title, desc, SITE + '/blog/', schema) + HEADER + f'''
  <main id="main">
    <section class="blog-hero">
      <div class="container">
        <div class="section-kicker"><span class="kicker-icon">✳</span> SHUVROLABS BLOG</div>
        <h1>ওয়েবসাইট, টেক আর ডিজিটাল মার্কেটিং — সহজ বাংলায়।</h1>
        <p>ছোট ব্যবসা, ছাত্র আর নতুন উদ্যোক্তাদের জন্য প্র্যাকটিক্যাল গাইড। যা নিজেরা কাজ করে শিখেছি, তাই লিখি।</p>
      </div>
    </section>
    <section class="post-list">
      <div class="container"><div class="post-grid">{cards}</div></div>
    </section>
  </main>
''' + FOOTER + '\n</body>\n</html>\n'
open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8').write(page)
print('built', len(POSTS) + 1, 'pages')

# sitemap
latest = max(p.get('updated', p['date']) for p in POSTS)
urls=[(SITE+'/','1.0',latest),(SITE+'/blog/','0.8',latest)]+[(f"{SITE}/blog/{p['slug']}/",'0.7',p.get('updated', p['date'])) for p in POSTS]
sm='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'  <url><loc>{u}</loc><lastmod>{lm}</lastmod><priority>{pr}</priority></url>\n' for u,pr,lm in urls)+'</urlset>\n'
open(os.path.join(ROOT, 'shuvrolabs-site', 'sitemap.xml'), 'w', encoding='utf-8').write(sm)
print('sitemap', len(urls))

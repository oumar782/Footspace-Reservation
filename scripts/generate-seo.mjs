import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_SITE_URL, SEO_ALIASES, SEO_PAGES } from '../src/seo/routes.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(root, 'dist');
const siteUrl = (process.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '');
const template = await readFile(path.join(outputDirectory, 'index.html'), 'utf8');
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[character]));

function setMeta(html, attribute, key, value) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const expression = new RegExp(`<meta\\s+${attribute}="${escapedKey}"[^>]*>`);
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return expression.test(html) ? html.replace(expression, tag) : html.replace('</head>', `  ${tag}\n  </head>`);
}

function setCanonical(html, url) {
  const tag = `<link rel="canonical" href="${escapeHtml(url)}" />`;
  const expression = /<link\s+rel="canonical"[^>]*>/;
  return expression.test(html) ? html.replace(expression, tag) : html.replace('</head>', `  ${tag}\n  </head>`);
}

function setStructuredData(html, data) {
  const tag = `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
  const expression = /<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/;
  return expression.test(html) ? html.replace(expression, tag) : html.replace('</head>', `  ${tag}\n  </head>`);
}

function publicDocument(page, canonicalPath) {
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const imageUrl = `${siteUrl}/favicon.png`;
  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'PlayForest',
        url: `${siteUrl}/`,
        logo: { '@type': 'ImageObject', url: imageUrl },
        email: 'contact@playforest.ma',
        areaServed: { '@type': 'Country', name: 'Morocco' },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'PlayForest',
        url: `${siteUrl}/`,
        inLanguage: 'fr-MA',
        publisher: { '@id': `${siteUrl}/#organization` },
      },
      {
        '@type': 'WebPage',
        name: page.title,
        description: page.description,
        url: canonicalUrl,
        isPartOf: { '@id': `${siteUrl}/#website` },
        inLanguage: 'fr-MA',
      },
    ],
  };

  const sections = (page.sections || []).map((section) => (
    `<section><h2>${escapeHtml(section.heading)}</h2><p>${escapeHtml(section.text)}</p></section>`
  )).join('');
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace('<div id="root"></div>', `<div id="root"><main><h1>${escapeHtml(page.heading || page.title)}</h1><p>${escapeHtml(page.description)}</p>${sections}<a href="/explore">Explorer PlayForest</a></main></div>`);
  html = setMeta(html, 'name', 'description', page.description);
  html = setMeta(html, 'name', 'robots', 'index,follow,max-image-preview:large');
  html = setMeta(html, 'property', 'og:title', page.title);
  html = setMeta(html, 'property', 'og:description', page.description);
  html = setMeta(html, 'property', 'og:url', canonicalUrl);
  html = setMeta(html, 'property', 'og:image', imageUrl);
  html = setMeta(html, 'name', 'twitter:title', page.title);
  html = setMeta(html, 'name', 'twitter:description', page.description);
  html = setMeta(html, 'name', 'twitter:image', imageUrl);
  html = setCanonical(html, canonicalUrl);
  return setStructuredData(html, pageSchema);
}

const sitemapEntries = [];
for (const [route, page] of Object.entries(SEO_PAGES)) {
  const canonicalPath = SEO_ALIASES[route] || route;
  const routeDirectory = path.join(outputDirectory, route.replace(/^\//, ''));
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(path.join(routeDirectory, 'index.html'), publicDocument(page, canonicalPath));

  if (route === canonicalPath) {
    sitemapEntries.push(`  <url><loc>${escapeHtml(`${siteUrl}${route}`)}</loc><changefreq>weekly</changefreq><priority>${route === '/explore' ? '1.0' : '0.8'}</priority></url>`);
  }
}

for (const [alias, canonicalPath] of Object.entries(SEO_ALIASES)) {
  const page = SEO_PAGES[canonicalPath];
  if (!page) continue;
  const aliasDirectory = path.join(outputDirectory, alias.replace(/^\//, ''));
  await mkdir(aliasDirectory, { recursive: true });
  await writeFile(path.join(aliasDirectory, 'index.html'), publicDocument(page, canonicalPath));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join('\n')}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /home\nDisallow: /communities/\nDisallow: /play\nDisallow: /profile\nDisallow: /reservation\nDisallow: /paiement\nDisallow: /consultation-reservation\nDisallow: /business\nDisallow: /organizer\nDisallow: /login\nDisallow: /register\nDisallow: /onboarding\nDisallow: /feed\nDisallow: /notifications\nDisallow: /messages\nSitemap: ${siteUrl}/sitemap.xml\n`;

await writeFile(path.join(outputDirectory, 'sitemap.xml'), sitemap);
await writeFile(path.join(outputDirectory, 'robots.txt'), robots);
console.log(`SEO assets generated for ${siteUrl}: ${sitemapEntries.length} canonical pages.`);
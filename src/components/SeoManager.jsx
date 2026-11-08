import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_SITE_URL, SEO_ALIASES, SEO_PAGES } from '../seo/routes.js';

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonicalPath = SEO_ALIASES[pathname] || pathname;
    const page = SEO_PAGES[canonicalPath];
    const defaultSiteUrl = import.meta.env.PROD ? DEFAULT_SITE_URL : window.location.origin;
    const siteUrl = (import.meta.env.VITE_SITE_URL || defaultSiteUrl).replace(/\/+$/, '');
    const title = page?.title || 'PlayForest | Le sport se vit ensemble';
    const description = page?.description || 'Trouvez des joueurs, découvrez des sports et rapprochez-vous des communautés sportives avec PlayForest.';
    const isIndexable = Boolean(page);
    const canonicalUrl = `${siteUrl}${canonicalPath === '/' ? '/' : canonicalPath}`;
    const imageUrl = `${siteUrl}/favicon.png`;

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', isIndexable ? 'index,follow,max-image-preview:large' : 'noindex,nofollow');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', imageUrl);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', imageUrl);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (isIndexable) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
    } else {
      canonical?.remove();
    }

    const schema = {
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
          name: title,
          description,
          url: canonicalUrl,
          isPartOf: { '@id': `${siteUrl}/#website` },
          inLanguage: 'fr-MA',
        },
      ],
    };
    let structuredData = document.getElementById('playforest-structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'playforest-structured-data';
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(schema);
  }, [pathname]);

  return null;
}
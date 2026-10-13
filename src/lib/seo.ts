import { SITE } from '../site';
import { tagSlug, type Post } from './posts';

/** Facts about the site's author, written the way search engines expect (schema.org "Person"). */
export function personSchema(site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': new URL('/#person', site).href,
    name: SITE.name,
    url: site.href,
    image: new URL('/og.png', site).href,
    sameAs: [SITE.linkedin],
    description: SITE.description,
    affiliation: { '@type': 'EducationalOrganization', name: 'Fordham University School of Law' },
    knowsAbout: ['Digital assets', 'Decentralized finance', 'Artificial intelligence', 'Law'],
  };
}

export function websiteSchema(site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': new URL('/#website', site).href,
    name: SITE.name,
    url: site.href,
    description: SITE.description,
    inLanguage: 'en',
    author: { '@id': new URL('/#person', site).href },
  };
}

export function articleSchema(post: Post, site: URL) {
  const url = new URL(`/writing/${post.id}/`, site).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.data.title,
    description: post.data.description,
    datePublished: post.data.date.toISOString().slice(0, 10),
    image: [new URL(`/og/${post.id}.png`, site).href],
    mainEntityOfPage: url,
    url,
    inLanguage: 'en',
    keywords: post.data.tags.map(tagSlug).join(', '),
    author: { '@id': new URL('/#person', site).href, '@type': 'Person', name: SITE.name, url: site.href },
  };
}

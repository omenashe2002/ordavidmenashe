// Site-wide facts live here, in one place. Change them here and every page updates.

// The topic tags an article can have. To add a topic, add its name here (keep the capital letters you want to see).
export const TAGS = ['Crypto', 'AI', 'Law', 'Other'] as const;
export type Tag = (typeof TAGS)[number];

export const SITE = {
  name: 'Or Menashe',
  tagline: 'Writing on crypto, AI, and law.',
  description:
    'Long-form writing and occasional videos on digital assets, DeFi, AI, and law by Or Menashe, a law student at Fordham Law.',
  email: 'ordavidmenashe@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ordavidmenashe',
  disclaimer:
    'This site is personal commentary. It is not legal advice and does not reflect the views of any employer or institution.',
};

export const NAV = [
  { label: 'Writing', href: '/writing/' },
  { label: 'Videos', href: '/videos/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

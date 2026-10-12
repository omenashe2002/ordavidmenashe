// Site-wide facts live here, in one place. Change them here and every page updates.

// The topic tags an article can have. To add a topic, add its name here (keep the capital letters you want to see).
export const TAGS = ['Crypto', 'AI', 'Law', 'Other'] as const;
export type Tag = (typeof TAGS)[number];

// If you edit the lines below, change only the words between the single quotation marks. Keep both
// quotation marks and the comma at the end of the line, or the site will not build.
export const SITE = {
  name: 'Or Menashe',
  tagline: 'Law, digital assets, and AI',
  description:
    'Long-form writing and occasional videos on digital assets, DeFi, AI, and law by Or Menashe, a law student at Fordham Law.',
  email: 'ordavidmenashe@gmail.com',
  // The signup form on the Contact page appears only when this holds the form address from your newsletter
  // service (it starts with https://). Leave the two quotation marks empty to hide the form. See HOW-TO-UPDATE.md.
  newsletter: '',
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

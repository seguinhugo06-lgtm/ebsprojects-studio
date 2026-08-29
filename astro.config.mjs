// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ebsprojects.studio',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  image: {
    // Generated at build time — no external image service, no runtime cost.
    responsiveStyles: true,
  },
  build: { inlineStylesheets: 'auto' },
  // Legacy Framer URLs that carried accents. Kept so old links and search
  // results keep resolving after the migration.
  redirects: {
    '/projects/expertises/édition': '/projects/expertises/edition',
    '/projects/expertises/identité-visuelle': '/projects/expertises/identite-visuelle',
    '/projects/expertises/signalétique': '/projects/expertises/signaletique',
    '/projects/epeda-collection-dédicace': '/projects/epeda-collection-dedicace',
  },
});

import { defineConfig } from 'astro/config';

// GitHub Pages repository path: set SITE_URL and BASE_PATH in GitHub Actions.
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
});

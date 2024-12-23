// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],

  server: { port: 8080 },

  adapter: node({
    mode: 'standalone'
  })
});
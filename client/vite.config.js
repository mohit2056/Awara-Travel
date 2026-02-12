import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate', 
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      
      // 👇 IMPORTANT: Dev mode mein PWA chalane ke liye ye zaroori hai
      devOptions: {
        enabled: true,
        type: 'module',
      },

      manifest: {
        name: 'Awara Travel',
        short_name: 'Awara',
        description: 'Discover hidden gems and plan your budget trips.',
        theme_color: '#581c87',
        background_color: '#1a1a1a',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },

      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB limit
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],

        // 👇 Data Caching Rule (API calls ko save karne ke liye)
        runtimeCaching: [{
          urlPattern: ({ url }) => url.href.includes('/api/places'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-data-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24, // 1 Din
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        }],

        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
      },
    }),
  ],
});
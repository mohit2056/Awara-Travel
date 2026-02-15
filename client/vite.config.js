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

      // 👇 Dev mode mein install button check karne ke liye
      devOptions: {
        enabled: true,
      },

      // 👇 Ye zaroori hai App Install hone ke liye (Naam, Icon, Color)
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

      // 👇 Caching Logic ko minimal kar diya (Sirf purana kachra saaf karega)
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        // Yahan se 'runtimeCaching' hata diya hai -> Matlab ab sab kuch Online chalega! 🌐
      },
    }),
  ],
});
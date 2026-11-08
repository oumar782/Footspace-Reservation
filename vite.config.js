import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    proxy: {
      '/api/communities': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/api/notifications': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'robots.txt', 'assets/*'],
      injectManifest: {
        globPatterns: [
          'index.html',
          'manifest.webmanifest',
          'favicon.png',
          'registerSW.js',
          'assets/index-*.js',
          'assets/index-*.css',
          'assets/index.es-*.js',
        ],
        globIgnores: ['**/jspdf.es.min-*.js', '**/html2canvas.esm-*.js']
      },
      manifest: {
        name: 'PlayForest — Ton sport. Ta communauté. Ton terrain.',
        short_name: 'PlayForest',
        description: 'Réseau social sportif — trouve des joueurs, rejoins une communauté et joue quand tu veux.',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait-primary',
        background_color: '#0f172a',
        theme_color: '#10b981',
        icons: [
          {
            src: '/favicon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/favicon.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/favicon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        categories: ['sports', 'social', 'lifestyle'],
        lang: 'fr-FR'
      },
      devOptions: { enabled: true, type: 'module' }
    })
  ]
})


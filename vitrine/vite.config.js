import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Build entièrement statique : aucun script inline généré, ce qui permet
// une CSP stricte (script-src 'self') côté nginx.
export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsInlineLimit: 0, // pas d'inlining base64 : tout passe par des fichiers servis en 'self'
    sourcemap: false
  }
})

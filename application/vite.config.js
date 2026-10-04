import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// URL publique du site (valeur NON secrète). Source unique pour canonical,
// og:url, robots.txt et sitemap.xml. Définie via VITE_SITE_URL (Dokploy >
// Build Args). Repli : URL de pré-production actuelle.
const FALLBACK_SITE_URL = 'https://escale.birostweb.fr'

export function resolveSiteUrl(raw) {
  const value = (raw || '').trim().replace(/\/+$/, '')
  if (!value) return FALLBACK_SITE_URL
  const u = new URL(value) // lève une erreur claire si l'URL est invalide
  if (u.protocol !== 'https:') throw new Error('VITE_SITE_URL doit être en https://')
  return u.origin
}

function siteUrlPlugin(siteUrl) {
  return {
    name: 'site-url',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          `  <url>\n    <loc>${siteUrl}/</loc>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n` +
          `  <url>\n    <loc>${siteUrl}/mentions-legales.html</loc>\n    <changefreq>yearly</changefreq>\n    <priority>0.3</priority>\n  </url>\n` +
          `</urlset>\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const siteUrl = resolveSiteUrl(process.env.VITE_SITE_URL || env.VITE_SITE_URL)
  return { plugins: [vue(), tailwindcss(), siteUrlPlugin(siteUrl)] }
})

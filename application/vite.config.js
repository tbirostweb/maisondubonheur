import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * URL publique du site — source unique de vérité.
 *
 * Elle alimente le canonical, l'og:url, robots.txt et sitemap.xml. Définie
 * au build par VITE_SITE_URL (Dokploy > Build Args), avec le domaine de
 * production en repli pour que le site reste correct même sans variable.
 */
const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.maisondubonheurstesavine.fr')
  .trim()
  .replace(/\/+$/, '')

/**
 * Remplace %SITE_URL% partout.
 *
 * Vite ne substitue nativement que les jetons `%VITE_*%` dans index.html, et
 * ne touche jamais aux fichiers de `public/`. Sans ce plugin, le site était
 * livré avec `<link rel="canonical" href="%SITE_URL%/">` — littéralement.
 */
function urlDuSite() {
  return {
    name: 'url-du-site',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', SITE_URL),
    closeBundle() {
      // public/ est copié tel quel : on post-traite après coup.
      for (const nom of ['robots.txt', 'sitemap.xml']) {
        const chemin = resolve('dist', nom)
        if (!existsSync(chemin)) continue
        const avant = readFileSync(chemin, 'utf8')
        const apres = avant.replaceAll('%SITE_URL%', SITE_URL)
        if (apres !== avant) writeFileSync(chemin, apres)
      }
    },
  }
}

export default defineConfig({
  plugins: [vue(), tailwindcss(), urlDuSite()],
})

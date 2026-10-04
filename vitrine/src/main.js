import { createApp } from 'vue'
import App from './App.vue'
// Polices auto-hébergées (aucun appel à Google Fonts) — sous-ensembles latin / latin-ext
import '@fontsource/hanken-grotesk/latin-400.css'
import '@fontsource/hanken-grotesk/latin-ext-400.css'
import '@fontsource/hanken-grotesk/latin-500.css'
import '@fontsource/hanken-grotesk/latin-ext-500.css'
import '@fontsource/hanken-grotesk/latin-600.css'
import '@fontsource/hanken-grotesk/latin-ext-600.css'
import '@fontsource/hanken-grotesk/latin-700.css'
import '@fontsource/hanken-grotesk/latin-ext-700.css'
import '@fontsource/hanken-grotesk/latin-800.css'
import '@fontsource/hanken-grotesk/latin-ext-800.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import '@fontsource/ibm-plex-mono/latin-ext-500.css'
import './assets/main.css'

const app = createApp(App)

/* Directive de révélation au scroll (remplace l'ancien IntersectionObserver
   global). S'auto-désactive si l'utilisateur préfère les mouvements réduits. */
const reduceMotion =
  typeof matchMedia === 'function' &&
  matchMedia('(prefers-reduced-motion: reduce)').matches

app.directive('reveal', {
  mounted(el) {
    el.classList.add('es-reveal')
    if (!('IntersectionObserver' in window) || reduceMotion) {
      el.classList.add('es-in')
      return
    }
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('es-in')
            o.unobserve(en.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    obs.observe(el)
  }
})

app.mount('#app')

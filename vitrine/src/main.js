import { createApp } from 'vue'
import App from './App.vue'
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

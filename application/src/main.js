import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Les animations ne masquent le contenu que si JavaScript tourne et que
// l'utilisateur n'a pas demandé un mouvement réduit. Posé avant le montage
// pour éviter tout clignotement au premier rendu.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-motion')
}
document.documentElement.classList.add('grain')

createApp(App).mount('#app')

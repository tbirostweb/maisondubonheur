<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { site } from '../data/site.js'

const open = ref(false)
const active = ref('accueil')
const links = [
  { href: '#logements', id: 'logements', label: 'Logements' },
  { href: '#services', id: 'services', label: 'Services' },
  { href: '#hote', id: 'hote', label: "L'hôte" },
  { href: '#avis', id: 'avis', label: 'Avis' },
  { href: '#faq', id: 'faq', label: 'FAQ' },
  { href: '#contact', id: 'contact', label: 'Contact' }
]

// Scrollspy : surligne le lien de la section visible.
let obs
onMounted(() => {
  if (!('IntersectionObserver' in window)) return
  const ids = ['accueil', ...links.map((l) => l.id)]
  obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) active.value = en.target.id
      })
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  )
  ids.forEach((id) => {
    const el = document.getElementById(id)
    if (el) obs.observe(el)
  })
})
onBeforeUnmount(() => obs && obs.disconnect())
</script>

<template>
  <header class="es-header">
    <div class="es-container">
      <nav class="es-nav" aria-label="Navigation principale">
        <a class="es-brand" href="#accueil" aria-label="Accueil L'Escale">
          <span class="es-brand__mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 11 12 5l7.5 6" /><path d="M6.5 10v8.5h11V10" /></svg>
          </span>
          <span class="es-brand__name">{{ site.marque }}</span>
        </a>
        <div class="es-nav__links">
          <a
            v-for="l in links"
            :key="l.href"
            :href="l.href"
            :class="{ 'is-active': active === l.id }"
            :aria-current="active === l.id ? 'true' : undefined"
            >{{ l.label }}</a
          >
        </div>
        <div class="es-nav__cta">
          <a
            class="es-btn es-btn--primary"
            :href="site.reservationUrl"
            target="_blank"
            rel="noopener noreferrer"
            >Réserver</a
          >
          <button
            class="es-burger"
            aria-label="Ouvrir le menu"
            :aria-expanded="String(open)"
            @click="open = !open"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </nav>
    </div>
    <div v-show="open" class="es-mobile">
      <a v-for="l in links" :key="l.href" :href="l.href" @click="open = false">{{ l.label }}</a>
    </div>
  </header>
</template>

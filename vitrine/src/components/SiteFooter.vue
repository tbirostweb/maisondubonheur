<script setup>
import { site } from '../data/site.js'

const visiter = [
  { href: '#logements', label: 'Logements' },
  { href: '#services', label: 'Services' },
  { href: '#hote', label: "L'hôte" },
  { href: '#avis', label: 'Avis' },
  { href: '#faq', label: 'FAQ' }
]
const sejour = [
  { href: '#contact', label: 'Réserver' },
  { href: '#services', label: 'Check-in autonome' },
  { href: '#services', label: 'Conciergerie' },
  { href: '#contact', label: 'Demande sur mesure' }
]
const annee = new Date().getFullYear()
</script>

<template>
  <footer class="es-footer">
    <div class="es-container">
      <div class="es-footer__top">
        <div class="es-footer__brand">
          <a class="es-brand" href="#accueil">
            <span class="es-brand__mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 11 12 5l7.5 6" /><path d="M6.5 10v8.5h11V10" /></svg>
            </span>
            <span class="es-brand__name">{{ site.marque }}</span>
          </a>
          <p>
            Séjours de caractère et accompagnement sur mesure, dans une poignée de
            logements choisis.
          </p>
        </div>

        <div>
          <h4>Visiter</h4>
          <ul>
            <li v-for="l in visiter" :key="l.label"><a :href="l.href">{{ l.label }}</a></li>
          </ul>
        </div>

        <div>
          <h4>Séjour</h4>
          <ul>
            <li v-for="l in sejour" :key="l.label"><a :href="l.href">{{ l.label }}</a></li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul class="es-footer__contact">
            <li>{{ site.contact.email }}</li>
            <li>{{ site.contact.telephoneAffiche }}</li>
            <li>{{ site.contact.ville }}</li>
          </ul>
        </div>
      </div>

      <div class="es-footer__bottom">
        <span>© {{ annee }} {{ site.marque }} — Tous droits réservés.</span>
        <div class="es-social">
          <a href="#" aria-label="Airbnb">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1.6 0 2.9 1 3.9 3 .8 1.6 3.6 7.6 4.6 9.8.4.9.6 1.7.6 2.4 0 2.4-1.8 4-4.1 4-1.6 0-3.1-.9-5-3-1.9 2.1-3.4 3-5 3-2.3 0-4.1-1.6-4.1-4 0-.7.2-1.5.6-2.4 1-2.2 3.8-8.2 4.6-9.8C9.1 3 10.4 2 12 2Zm0 2.3c-.7 0-1.4.6-2 1.9-.8 1.5-3.5 7.4-4.4 9.5-.3.7-.4 1.2-.4 1.6 0 1.2.9 1.9 2 1.9 1 0 2.2-.8 3.7-2.6-1.2-1.6-2-3-2-4.3 0-1.6 1.2-2.7 3.1-2.7s3.1 1.1 3.1 2.7c0 1.3-.8 2.7-2 4.3 1.5 1.8 2.7 2.6 3.7 2.6 1.1 0 2-.7 2-1.9 0-.4-.1-.9-.4-1.6-.9-2.1-3.6-8-4.4-9.5-.6-1.3-1.3-1.9-2-1.9Zm0 7c-.8 0-1.2.4-1.2 1 0 .7.5 1.6 1.2 2.5.7-.9 1.2-1.8 1.2-2.5 0-.6-.4-1-1.2-1Z" /></svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" /></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

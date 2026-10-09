<script setup>
import { site } from '../data/site.js'
</script>

<template>
  <section class="es-section es-section--warm" id="avis">
    <div class="es-container">
      <div class="es-head" v-reveal>
        <span class="es-eyebrow">Avis</span>
        <h2 class="es-h2">Ce qu'en disent les voyageurs.</h2>
      </div>

      <div class="es-grid es-grid--avis">
        <article v-for="a in site.avis" :key="a.nom" class="es-avis" v-reveal>
          <div class="es-stars" :aria-label="`${a.note} sur 5`">
            <svg v-for="n in a.note" :key="n" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18.4 6.1 26l1.2-6.5-4.8-4.6 6.6-.9z" transform="scale(.92) translate(1 -1)" />
            </svg>
          </div>
          <p class="es-avis__txt">«&nbsp;{{ a.texte }}&nbsp;»</p>
          <div class="es-avis__by">
            <span class="es-avis__name">{{ a.nom }}</span>
            <span class="es-avis__meta">{{ a.meta }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

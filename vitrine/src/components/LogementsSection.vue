<script setup>
import { reactive } from 'vue'
import { site, PH } from '../data/site.js'
import AppIcon from './AppIcon.vue'

// suivi des images en échec (pour masquer l'img et laisser le fond de repli)
const failed = reactive({})
</script>

<template>
  <section class="es-section" id="logements">
    <div class="es-container">
      <div class="es-head" v-reveal>
        <span class="es-eyebrow">Nos adresses</span>
        <h2 class="es-h2">Des logements où l'on se sent bien.</h2>
        <p class="es-lead">
          Chaque adresse est choisie, équipée et entretenue avec soin. Vous
          arrivez, tout est prêt à vous accueillir.
        </p>
      </div>

      <div class="es-grid es-grid--logements">
        <article
          v-for="(l, i) in site.logements"
          :key="l.nom"
          class="es-card"
          v-reveal
        >
          <div class="es-card__media" :style="{ '--ph': PH[i % PH.length] }">
            <img
              v-if="!failed[i]"
              :src="l.image"
              :alt="l.nom"
              loading="lazy"
              @error="failed[i] = true"
            />
            <span class="es-price">{{ l.prix }} €<small> / nuit</small></span>
          </div>
          <div class="es-card__body">
            <span class="es-card__lieu">{{ l.lieu }}</span>
            <h3 class="es-card__title">{{ l.nom }}</h3>
            <div class="es-specs">
              <span>{{ l.voyageurs }} voyageurs</span>
              <span>{{ l.chambres }} ch.</span>
              <span>{{ l.surface }} m²</span>
            </div>
            <p class="es-card__desc">{{ l.desc }}</p>
            <div class="es-tags">
              <span v-for="t in l.tags" :key="t" class="es-tag">{{ t }}</span>
            </div>
            <div class="es-card__footer">
              <a class="es-card__link" :href="l.booking" target="_blank" rel="noopener noreferrer">
                Réserver sur Booking <AppIcon name="arrow" />
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

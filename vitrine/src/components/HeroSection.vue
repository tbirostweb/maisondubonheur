<script setup>
import { ref } from 'vue'
import { site } from '../data/site.js'
import AppIcon from './AppIcon.vue'

const imgOk = ref(true)
</script>

<template>
  <section class="es-hero">
    <img
      v-if="imgOk"
      class="es-hero__bg"
      :src="site.heroImage"
      alt=""
      @error="imgOk = false"
    />
    <div class="es-container es-hero__inner">
      <div v-reveal>
        <span class="es-eyebrow">Locations de caractère · Votre région</span>
        <h1>Posez vos valises quelque part de beau.</h1>
        <p class="es-hero__sub">
          Des logements pleins de caractère, entièrement équipés, et un accueil
          aux petits soins. Vous n'avez plus qu'à profiter.
        </p>
        <div class="es-hero__actions">
          <a class="es-btn es-btn--primary" href="#logements">
            Voir les logements
            <AppIcon name="arrow" />
          </a>
          <a class="es-btn es-btn--ghost" href="#services">Découvrir les services</a>
        </div>
      </div>
    </div>
  </section>
</template>

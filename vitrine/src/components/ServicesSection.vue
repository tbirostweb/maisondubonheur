<script setup>
import { site } from '../data/site.js'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <section class="es-section es-section--warm" id="services">
    <div class="es-container">
      <div class="es-head" v-reveal>
        <span class="es-eyebrow">Services</span>
        <h2 class="es-h2">Tout est prévu, vous n'avez qu'à profiter.</h2>
        <p class="es-lead">
          De l'arrivée au départ, je m'occupe des détails qui font la différence
          sur un séjour.
        </p>
      </div>

      <div class="es-grid es-grid--services">
        <article
          v-for="s in site.services"
          :key="s.titre"
          class="es-srv"
          v-reveal
        >
          <div class="es-srv__ico"><AppIcon :name="s.icone" /></div>
          <h3 class="es-srv__title">{{ s.titre }}</h3>
          <p class="es-srv__desc">{{ s.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

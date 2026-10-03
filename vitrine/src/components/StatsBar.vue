<script setup>
import { site } from '../data/site.js'
</script>

<template>
  <section class="es-stats">
    <div class="es-container">
      <div class="es-stats__grid">
        <div v-for="c in site.confiance" :key="c.l" class="es-stats__item">
          <div class="es-stats__n">{{ c.n }}</div>
          <div class="es-stats__l">{{ c.l }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

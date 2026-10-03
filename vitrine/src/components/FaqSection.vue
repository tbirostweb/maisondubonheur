<script setup>
import { ref } from 'vue'
import { site } from '../data/site.js'

// Index de la question ouverte (-1 = tout fermé). Première ouverte par défaut.
const openIdx = ref(0)
const toggle = (i) => {
  openIdx.value = openIdx.value === i ? -1 : i
}
</script>

<template>
  <section class="es-section" id="faq">
    <div class="es-container">
      <div class="es-head" v-reveal>
        <span class="es-eyebrow">Questions fréquentes</span>
        <h2 class="es-h2">Tout ce qu'il faut savoir avant de venir.</h2>
      </div>

      <div class="es-faq" v-reveal>
        <div
          v-for="(item, i) in site.faq"
          :key="item.q"
          class="es-faq__item"
          :class="{ 'is-open': openIdx === i }"
        >
          <h3>
            <button
              class="es-faq__q"
              :aria-expanded="String(openIdx === i)"
              @click="toggle(i)"
            >
              <span>{{ item.q }}</span>
              <svg class="es-faq__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
            </button>
          </h3>
          <div v-show="openIdx === i" class="es-faq__a">
            <p>{{ item.r }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

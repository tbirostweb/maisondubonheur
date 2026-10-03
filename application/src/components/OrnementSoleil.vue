<script setup>
/**
 * Soleil décoratif tracé à la main (rayons de longueurs inégales).
 * Purement ornemental : masqué aux lecteurs d'écran.
 */
defineProps({ rayons: { type: Number, default: 16 } })

// Longueurs volontairement irrégulières : un soleil parfaitement régulier
// fait « clipart », l'irrégularité fait dessin.
const suite = [1, 0.72, 0.9, 0.66, 1, 0.78, 0.86, 0.7]
</script>

<template>
  <svg viewBox="-50 -50 100 100" fill="none" aria-hidden="true" focusable="false">
    <circle r="17" stroke="currentColor" stroke-width="1.6" />
    <g stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
      <line
        v-for="n in rayons"
        :key="n"
        x1="0" :y1="-24"
        x2="0" :y2="-24 - 14 * suite[(n - 1) % suite.length]"
        :transform="`rotate(${(360 / rayons) * (n - 1)})`"
      />
    </g>
  </svg>
</template>

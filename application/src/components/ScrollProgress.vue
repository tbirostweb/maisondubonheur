<script setup>
import { useScrollProgress } from '../composables/useMotion.js'
const progression = useScrollProgress()
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]" aria-hidden="true">
    <div
      class="h-full origin-left bg-orange"
      :style="{ transform: `scaleX(${progression})` }"
      style="transition: transform 120ms linear"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)
const onScroll = () => {
  visible.value = window.scrollY > 600
}
const toTop = () => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <transition name="es-fade">
    <button
      v-show="visible"
      class="es-totop"
      aria-label="Revenir en haut de page"
      @click="toTop"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 15l-6-6-6 6" /></svg>
    </button>
  </transition>
</template>

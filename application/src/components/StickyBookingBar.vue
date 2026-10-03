<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import IconBase from './IconBase.vue'
import { note10 } from '../utils/format.js'

defineProps({ prix: Number, note: Number, nbAvis: Number })
defineEmits(['reserver'])

const visible = ref(false)
function onScroll() {
  const y = window.scrollY
  const bas = window.innerHeight + y >= document.body.scrollHeight - 220
  visible.value = y > window.innerHeight * 0.85 && !bas
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-500"
    enter-from-class="translate-y-[130%] opacity-0"
    leave-active-class="transition duration-300 ease-in"
    leave-to-class="translate-y-[130%] opacity-0"
  >
    <div
      v-if="visible"
      class="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-5 sm:pb-5"
      style="transition-timing-function: cubic-bezier(.22,1,.36,1)"
    >
      <div class="mx-auto flex max-w-[1240px] items-center justify-between gap-5 border border-encre/10 bg-espresso/95 py-2.5 pl-6 pr-2.5 text-papier shadow-relief backdrop-blur-md">
        <div class="flex min-w-0 items-center gap-5">
          <p class="display-s chiffres shrink-0 text-[1.16rem] leading-none">
            {{ prix }} €
            <span class="font-texte text-[0.8rem] font-normal text-papier/55">/ nuit</span>
          </p>
          <span class="hidden h-6 w-px bg-papier/15 sm:block" />
          <p class="hidden items-center gap-2 truncate text-[0.82rem] text-papier/60 sm:flex">
            <span class="chiffres bg-[#003B95] px-1.5 py-px text-[0.7rem] font-bold text-white">
              {{ note10(note) }}
            </span>
            {{ nbAvis }} avis · petit-déjeuner compris
          </p>
        </div>

        <button
          class="group relative inline-flex flex-none items-center gap-2.5 overflow-hidden bg-orange px-6 py-3 text-[0.9rem] font-semibold text-white sm:px-7"
          @click="$emit('reserver')"
        >
          <span
            class="absolute inset-0 translate-y-full bg-orange-fonce transition-transform duration-500 group-hover:translate-y-0"
            style="transition-timing-function: cubic-bezier(.22,1,.36,1)"
            aria-hidden="true"
          />
          <span class="relative">Réserver</span>
          <IconBase name="fleche" class="relative hidden h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 sm:block" />
        </button>
      </div>
    </div>
  </Transition>
</template>

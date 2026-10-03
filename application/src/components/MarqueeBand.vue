<script setup>
const props = defineProps({
  items: { type: Array, required: true },
  ton: { type: String, default: 'orange' }, // orange | sable
})

// La piste est dupliquée : l'animation translate de -50 %, la boucle est donc
// invisible. Une seule copie suffirait à l'écran mais laisserait un trou.
const piste = [...props.items, ...props.items]
</script>

<template>
  <div
    class="defile relative overflow-hidden border-y py-3.5 select-none"
    :class="ton === 'orange'
      ? 'border-orange-fonce/25 bg-orange text-white'
      : 'border-ligne-2 bg-sable text-encre'"
    role="presentation"
  >
    <div class="defile-piste">
      <span
        v-for="(t, i) in piste"
        :key="i"
        class="surtitre flex items-center whitespace-nowrap px-7"
        :aria-hidden="i >= items.length ? 'true' : undefined"
      >
        {{ t }}
        <span
          class="ml-7 text-[0.85rem] opacity-55"
          :class="ton === 'orange' ? 'text-jaune-vif' : 'text-orange'"
          aria-hidden="true"
        >✳</span>
      </span>
    </div>

    <!-- Fondu sur les bords, pour que le texte n'apparaisse pas net au bord -->
    <div
      class="pointer-events-none absolute inset-y-0 left-0 w-16"
      :class="ton === 'orange'
        ? 'bg-gradient-to-r from-orange to-transparent'
        : 'bg-gradient-to-r from-sable to-transparent'"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-y-0 right-0 w-16"
      :class="ton === 'orange'
        ? 'bg-gradient-to-l from-orange to-transparent'
        : 'bg-gradient-to-l from-sable to-transparent'"
      aria-hidden="true"
    />
  </div>
</template>

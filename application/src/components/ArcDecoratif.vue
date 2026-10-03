<script setup>
/**
 * Bord supérieur en arc, pour adoucir la rencontre entre une section
 * claire et une section sombre. Se pose en haut d'une section : l'arc
 * est rempli de la couleur de la section précédente.
 */
defineProps({ couleur: { type: String, default: 'text-papier' } })
</script>

<template>
  <div class="pointer-events-none absolute inset-x-0 top-0 -translate-y-px" aria-hidden="true">
    <svg
      class="block h-[36px] w-full sm:h-[54px]"
      :class="couleur"
      viewBox="0 0 1440 54"
      preserveAspectRatio="none"
      fill="currentColor"
    >
      <path d="M0 0h1440v6c-240 32-480 48-720 48S240 38 0 6z" />
    </svg>
  </div>
</template>

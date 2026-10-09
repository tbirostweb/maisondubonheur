<script setup>
// Icônes de service + flèche. Rendu 100% déclaratif (aucun v-html),
// compatible avec une CSP stricte.
defineProps({
  name: { type: String, required: true }
})
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'keyhole'">
      <circle cx="12" cy="9" r="3.2" />
      <path d="M10.4 11.7 9 18h6l-1.4-6.3" />
    </template>
    <template v-else-if="name === 'sparkle'">
      <path d="M12 4.5c.6 2.8 1.7 3.9 4.5 4.5-2.8.6-3.9 1.7-4.5 4.5-.6-2.8-1.7-3.9-4.5-4.5C10.3 8.4 11.4 7.3 12 4.5Z" />
      <path d="M17.6 13.8c.3 1.3.8 1.8 2.1 2.1-1.3.3-1.8.8-2.1 2.1-.3-1.3-.8-1.8-2.1-2.1 1.3-.3 1.8-.8 2.1-2.1Z" />
    </template>
    <template v-else-if="name === 'gift'">
      <rect x="4.5" y="9.5" width="15" height="9.5" rx="1.4" />
      <path d="M4 9.5h16M12 9.5V19" />
      <path d="M12 9.5c-1.8 0-3.6-.5-3.6-2.2 0-1.1 1-1.8 2-1.4 1.3.5 1.6 3.6 1.6 3.6Zm0 0c1.8 0 3.6-.5 3.6-2.2 0-1.1-1-1.8-2-1.4-1.3.5-1.6 3.6-1.6 3.6Z" />
    </template>
    <template v-else-if="name === 'chat'">
      <path d="M20 4.5H4A1.5 1.5 0 0 0 2.5 6v8A1.5 1.5 0 0 0 4 15.5h3v3.5l4-3.5h9A1.5 1.5 0 0 0 21.5 14V6A1.5 1.5 0 0 0 20 4.5Z" />
    </template>
    <template v-else-if="name === 'pin'">
      <path d="M12 21c4.5-4.2 7-7.2 7-10.5a7 7 0 1 0-14 0C5 13.8 7.5 16.8 12 21Z" />
      <circle cx="12" cy="10.5" r="2.4" />
    </template>
    <template v-else-if="name === 'car'">
      <path d="M4 14.5h16M5.6 14.5l1.3-4.2A2 2 0 0 1 8.8 9h6.4a2 2 0 0 1 1.9 1.3l1.3 4.2" />
      <path d="M4 14.5v3M20 14.5v3" />
      <circle cx="7.5" cy="17.5" r="1.6" />
      <circle cx="16.5" cy="17.5" r="1.6" />
    </template>
    <template v-else-if="name === 'arrow'">
      <path d="M5 12h14M13 6l6 6-6 6" stroke-width="2" />
    </template>
  </svg>
</template>

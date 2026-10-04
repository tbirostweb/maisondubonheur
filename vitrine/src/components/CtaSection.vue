<script setup>
import { site } from '../data/site.js'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <section class="es-cta es-section" id="contact">
    <div class="es-container">
      <div class="es-cta__inner" v-reveal>
        <span class="es-eyebrow" style="color: #f0c99a">Réservation</span>
        <h2>Envie de vous évader ?</h2>
        <p>
          Dites-moi vos dates et le nombre de voyageurs, je vous réponds en moins
          d'une heure.
        </p>
        <a
          class="es-btn es-btn--primary"
          :href="site.reservationUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Réserver sur Booking <AppIcon name="arrow" />
        </a>
        <p class="es-cta__contact">
          <template v-if="site.contact.email">
            <a :href="`mailto:${site.contact.email}`">{{ site.contact.email }}</a>
            ·
          </template>
          <a :href="`tel:${site.contact.telephone}`">{{ site.contact.telephoneAffiche }}</a>
        </p>
      </div>
    </div>
  </section>
</template>

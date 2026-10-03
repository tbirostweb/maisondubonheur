<script setup>
import { ref, computed, watch } from 'vue'
import { site } from './data/site.js'
import { useMotion } from './composables/useMotion.js'

import ScrollProgress from './components/ScrollProgress.vue'
import TheNav from './components/TheNav.vue'
import HeroSection from './components/HeroSection.vue'
import MarqueeBand from './components/MarqueeBand.vue'
import HostSection from './components/HostSection.vue'
import LogementsSection from './components/LogementsSection.vue'
import BreakfastSection from './components/BreakfastSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import GuideSection from './components/GuideSection.vue'
import ReviewsSection from './components/ReviewsSection.vue'
import FaqSection from './components/FaqSection.vue'
import ContactSection from './components/ContactSection.vue'
import TheFooter from './components/TheFooter.vue'
import ChoixLogement from './components/ChoixLogement.vue'
import GalleryLightbox from './components/GalleryLightbox.vue'
import StickyBookingBar from './components/StickyBookingBar.vue'

useMotion()

const prixMin = computed(() => Math.min(...site.logements.map((l) => l.prix)))
const totalAvis = computed(() => site.logements.reduce((s, l) => s + l.nbAvis, 0))

// Note moyenne pondérée par le nombre d'avis de chaque logement.
// Calculée ici et transmise partout : le héros affichait auparavant 9,0
// (la note de Troyes seul) pendant que la section Avis affichait 8,6.
const noteMoyenne = computed(() =>
  totalAvis.value
    ? site.logements.reduce((s, l) => s + l.note * l.nbAvis, 0) / totalAvis.value
    : 0
)
// Libellé Booking : 9+ « Fabuleux », 8+ « Très bien », 7+ « Bien ».
const mentionNote = computed(() =>
  noteMoyenne.value >= 9 ? 'Fabuleux' : noteMoyenne.value >= 8 ? 'Très bien' : 'Bien'
)

// --- Sélecteur de logement ---
// Aucune réservation n'est traitée sur le site : on choisit une adresse,
// puis Booking.com prend le relais (disponibilités, tarif, paiement).
const reservationOuverte = ref(false)
const ouvrirReservation = () => (reservationOuverte.value = true)

// --- Lightbox galerie ---
const galerie = ref(null)

// Bloque le défilement de l'arrière-plan quand une couche est ouverte
watch(
  () => reservationOuverte.value || galerie.value !== null,
  (bloque) => { document.body.style.overflow = bloque ? 'hidden' : '' }
)
</script>

<template>
  <ScrollProgress />
  <TheNav :marque="site.marque" :prix="prixMin" @reserver="ouvrirReservation()" />

  <main id="accueil">
    <HeroSection :hero="site.hero" :logements="site.logements" :prix="prixMin" :note="noteMoyenne" :mention="mentionNote" @reserver="ouvrirReservation()" />
    <MarqueeBand :items="site.bandeau" ton="orange" />
    <HostSection :hote="site.hote" />
    <LogementsSection
      :logements="site.logements"
      @ouvrir-galerie="galerie = $event"
    />
    <BreakfastSection :pd="site.petitDejeuner" />
    <ServicesSection :services="site.services" />
    <GuideSection :guide="site.guide" />
    <ReviewsSection :avis="site.avis" :logements="site.logements" />
    <FaqSection :faq="site.faq" @reserver="ouvrirReservation()" />
    <ContactSection :contact="site.contact" :logements="site.logements" :prix="prixMin" @reserver="ouvrirReservation()" />
  </main>

  <TheFooter
    :marque="site.marque"
    :domaine="site.domaine"
    :baseline="site.baseline"
    :credit="site.credit"
  />

  <StickyBookingBar
    v-if="!reservationOuverte && !galerie"
    :prix="prixMin"
    :note="noteMoyenne"
    :nb-avis="totalAvis"
    @reserver="ouvrirReservation()"
  />

  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    leave-active-class="transition duration-200 ease-in"
    leave-to-class="opacity-0"
  >
    <ChoixLogement
      v-if="reservationOuverte"
      :logements="site.logements"
      @fermer="reservationOuverte = false"
    />
  </Transition>

  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    leave-active-class="transition duration-200 ease-in"
    leave-to-class="opacity-0"
  >
    <GalleryLightbox
      v-if="galerie"
      :photos="galerie.photos"
      :depart="galerie.depart"
      :nom="galerie.nom"
      @fermer="galerie = null"
    />
  </Transition>
</template>

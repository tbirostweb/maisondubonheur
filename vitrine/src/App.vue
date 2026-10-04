<script setup>
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import StatsBar from './components/StatsBar.vue'
import LogementsSection from './components/LogementsSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import HoteSection from './components/HoteSection.vue'
import AvisSection from './components/AvisSection.vue'
import FaqSection from './components/FaqSection.vue'
import CtaSection from './components/CtaSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import BackToTop from './components/BackToTop.vue'
</script>

<template>
  <div class="es-demo" role="note">
    Site de démonstration — logements, tarifs, avis, notes et coordonnées sont fictifs et ne constituent pas une offre.
  </div>
  <a class="es-skip" href="#accueil">Aller au contenu</a>
  <SiteHeader />
  <main id="accueil">
    <HeroSection />
    <StatsBar />
    <LogementsSection />
    <ServicesSection />
    <HoteSection />
    <AvisSection />
    <FaqSection />
    <CtaSection />
  </main>
  <SiteFooter />
  <BackToTop />
</template>

<style>
.es-demo{background:#2a2119;color:#fff;text-align:center;font-size:.85rem;line-height:1.4;padding:.55rem 1rem;font-weight:600}
</style>

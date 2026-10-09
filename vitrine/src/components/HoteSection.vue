<script setup>
import { ref } from 'vue'
import { site } from '../data/site.js'

const imgOk = ref(true)
const chips = [
  "Réponse en moins d'une heure",
  'Logements vérifiés',
  'Accueil personnalisé'
]
</script>

<template>
  <section class="es-section" id="hote">
    <div class="es-container">
      <div class="es-hote">
        <div class="es-hote__media" v-reveal>
          <img v-if="imgOk" :src="site.hoteImage" alt="Portrait de l'hôte" @error="imgOk = false" />
        </div>
        <div v-reveal>
          <span class="es-eyebrow">L'hôte</span>
          <h2 class="es-h2">Bonjour, moi c'est Marie.</h2>
          <p>
            Depuis plusieurs années, j'accueille des voyageurs dans mes logements
            avec une idée simple : qu'on s'y sente comme à la maison, sans rien
            avoir à gérer.
          </p>
          <p>
            Préparation, ménage, accueil, recommandations… je m'occupe de tout
            pour que vous n'ayez plus qu'à profiter de votre séjour et de la
            région.
          </p>
          <div class="es-chips">
            <span v-for="c in chips" :key="c" class="es-chip">{{ c }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

/* =========================================================================
   CONFIG — tout ce qui se modifie au quotidien est ici.
   Les "image" sont des photos d'illustration (Unsplash) → à remplacer par
   les vraies photos du client (idéalement auto-hébergées dans /public).
   ========================================================================= */
const U = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

// ⚠️ À REMPLACER par tes vraies URLs Booking.
//   - BOOKING       : ta page d'hôte / recherche de tes annonces
//   - chaque logement possède son propre champ `booking` (annonce précise)
const BOOKING = 'https://www.booking.com/'

// Domaine de production (sert au SEO / partage / sitemap).
export const SITE_URL = 'https://escale.birostweb.fr'

export const site = {
  marque: "L'Escale",

  // Lien de réservation global (boutons "Réserver" / "Nous contacter").
  reservationUrl: BOOKING,

  // grande photo du hero + photo de l'hôte
  heroImage: U('1493809842364-78817add7ffb', 1800),
  hoteImage: U('1556911220-bff31c812dba'),

  contact: {
    email: 'bonjour@lescale.fr',
    telephone: '+33600000000',
    telephoneAffiche: '06 00 00 00 00',
    ville: 'Votre ville, France'
  },

  confiance: [
    { n: '2', l: 'Logements' },
    { n: '4,9/5', l: 'Note moyenne' },
    { n: '+300', l: 'Voyageurs accueillis' },
    { n: '< 1h', l: 'Temps de réponse' }
  ],

  logements: [
    {
      nom: 'Le Clos des Tilleuls', lieu: 'Cœur de ville',
      voyageurs: 4, chambres: 2, surface: 65, prix: 95,
      desc: "Un appartement lumineux à deux pas des commerces, idéal pour découvrir la ville à pied.",
      tags: ['Wifi fibre', 'Cuisine équipée', 'Lit king size'],
      booking: BOOKING, image: U('1586023492125-27b2c045efd7')
    },
    {
      nom: 'La Maison du Verger', lieu: 'En pleine campagne',
      voyageurs: 6, chambres: 3, surface: 110, prix: 145,
      desc: "Une maison familiale avec jardin clos et terrasse, parfaite pour se ressourcer au calme.",
      tags: ['Jardin', 'Parking privé', 'Cheminée'],
      booking: BOOKING, image: U('1568605114967-8130f3a36994')
    }
  ],

  // icone : keyhole | sparkle | gift | chat | pin | car
  services: [
    { icone: 'keyhole', titre: 'Check-in autonome', desc: "Arrivée à votre rythme grâce à une boîte à clés sécurisée. Aucun horaire à respecter." },
    { icone: 'sparkle', titre: 'Ménage & linge hôtelier', desc: "Logement impeccable à votre arrivée, draps et serviettes de qualité fournis." },
    { icone: 'gift', titre: "Panier d'accueil", desc: "Produits locaux et essentiels du quotidien pour bien démarrer le séjour." },
    { icone: 'chat', titre: 'Conciergerie 7j/7', desc: "Une réponse rapide à la moindre question, avant et pendant votre séjour." },
    { icone: 'pin', titre: 'Bonnes adresses', desc: "Mes recommandations de restaurants, balades et activités autour du logement." },
    { icone: 'car', titre: 'Services à la carte', desc: "Lit bébé, transfert gare, ménage supplémentaire : dites-moi ce dont vous avez besoin." }
  ],

  avis: [
    { note: 5, texte: "Tout était parfait, de l'accueil au confort du logement. On reviendra sans hésiter.", nom: 'Camille R.', meta: 'Lyon · Mars 2026' },
    { note: 5, texte: "Communication au top et appartement encore plus beau qu'en photo. Je recommande les yeux fermés.", nom: 'Thomas & Léa', meta: 'Nantes · Février 2026' },
    { note: 5, texte: "Un vrai cocon, propre et bien équipé. Les conseils sur le quartier ont fait toute la différence.", nom: 'Sophie M.', meta: 'Lille · Janvier 2026' }
  ],

  faq: [
    { q: "Comment se passe la réservation ?", r: "Toutes les réservations se font directement via Booking, en cliquant sur « Réserver » : paiement sécurisé, confirmation immédiate et conditions d'annulation claires." },
    { q: "À quelle heure puis-je arriver ?", r: "Le check-in est autonome grâce à une boîte à clés sécurisée : vous arrivez à l'heure qui vous arrange, sans contrainte d'horaire." },
    { q: "Le linge et le ménage sont-ils inclus ?", r: "Oui. Le logement est nettoyé avant chaque arrivée et le linge de lit ainsi que les serviettes de qualité hôtelière sont fournis." },
    { q: "Les animaux sont-ils acceptés ?", r: "Selon le logement. Indiquez-le au moment de la réservation ou contactez-moi, je vous confirme rapidement." },
    { q: "Puis-je demander un service supplémentaire ?", r: "Bien sûr : lit bébé, transfert gare, ménage additionnel… dites-moi ce dont vous avez besoin et je m'en occupe." }
  ]
}

/* repli chaud si une image ne charge pas */
export const PH = ['#E2D4BE', '#DBCBB2', '#E4D7C2', '#D7C7AD']

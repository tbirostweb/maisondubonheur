/* ============================================================
   CONFIG — TOUT LE CONTENU DU SITE SE MODIFIE ICI
   Données réelles reprises des deux annonces Booking.com
   ============================================================ */

// Helper photos Booking (CDN bstatic). "id|clé" → URL.
// Pour remplacer par vos propres photos : mettez directement
// "https://votre-site.fr/photo.jpg" à la place de P("…").
const P = (s, taille = 'max1024x768') => {
  const [id, k] = s.split('|')
  return `https://cf.bstatic.com/xdata/images/hotel/${taille}/${id}.jpg?k=${k}&o=`
}

// Liens Booking officiels des deux annonces (paramètres de suivi conservés,
// identifiants de session retirés).
const BOOKING_SAVINE =
  'https://www.booking.com/hotel/fr/maison-du-bonheur-sainte-savine.fr.html?aid=1263239&label=PShare-Pulse-6hocE0%401787597825'
const BOOKING_TROYES =
  'https://www.booking.com/hotel/fr/escapade-a-troyes-maison-du-bonheur-2.fr.html?aid=1263239&label=PShare-Pulse-gEFNse%401787597810'

export const site = {
  marque: 'Maison du Bonheur',
  domaine: 'www.Maisondubonheurstesavine.fr',
  baseline: 'L’art de vivre à la française · Troyes & Sainte-Savine',

  hero: {
    image: P('356689034|f120669390f2ca03a238123226ad45dcd2500d3c0cf1112dbcc42da3fedb336c', 'max1920x1080'),
    // note et mention ne sont plus écrites ici : elles sont calculées dans
    // App.vue à partir des deux logements (moyenne pondérée par le nombre
    // d'avis). Le héros affichait 9,0 « Fabuleux » — la note du seul
    // logement de Troyes — alors que la section Avis calculait 8,6.
    badge: 'sur Booking.com',
    titre: 'Deux appartements où l’on se sent tout de suite chez soi.',
    // Découpage en lignes pour l'animation d'apparition du titre
    titreLignes: ['Deux appartements', 'où l’on se sent', 'tout de suite', 'chez soi.'],
    sousTitre:
      'À Troyes et à Sainte-Savine, deux logements entiers climatisés, avec parking gratuit et petit-déjeuner maison compris. Vous n’avez plus qu’à poser vos valises.',
    stats: [
      { valeur: 'dès 119 €', label: 'la nuit pour deux, petit-déj compris' },
      { valeur: '134', label: 'voyageurs nous ont noté' },
      { valeur: '9,4', label: 'note de l’accueil sur Booking' },
    ],
  },

  hote: {
    prenom: 'Marie',
    // Pas de portrait sur Booking : ajoutez le vôtre ici, sinon une
    // illustration douce est affichée à la place.
    image: '',
    titre: 'Une hôtesse, pas un standard téléphonique.',
    texte: [
      'Ici, ce n’est pas une agence qui vous accueille. C’est moi, Marie, qui prépare chaque logement, garnis le frigo avant votre arrivée et prépare le petit-déjeuner qui a fait la réputation de la maison.',
      'Mes voyageurs me notent 9,4 sur 10 pour l’accueil, et c’est la note dont je suis la plus fière. Une question sur les dates, le quartier ou un lit bébé ? Écrivez-moi, je réponds vite.',
    ],
    citation: {
      texte: 'La gentillesse des hôtes, l’emplacement avec un parking à 2 minutes à pied, les équipements, les petites attentions…',
      auteur: 'Laurent',
      pays: 'Belgique',
    },
  },

  // ---- LES DEUX LOGEMENTS (données réelles Booking) ----
  // accent : "orange" ou "jaune"
  logements: [
    {
      id: 'maison-du-bonheur-2',
      nom: 'Maison du Bonheur 2',
      sousNom: 'Escapade à Troyes',
      accent: 'orange',
      ville: 'Troyes',
      lieu: '89 Rue de la Paix, 10000 Troyes',
      repere: 'À 1,4 km de la gare de Troyes · 10 min des magasins d’usines',
      voyageurs: 5,
      chambres: 1,
      lits: '1 grand lit double + 1 canapé-lit',
      surface: 48,
      prix: 119,
      note: 9.0,
      mention: 'Fabuleux',
      nbAvis: 83,
      noteCouples: 8.4,
      // Relevé Booking : 238 € les 2 nuits, taxes et petit-déjeuner compris,
      // sans remise. Tarif identique en octobre et en novembre 2026.
      desc: 'Notre appartement le mieux noté. 48 m² climatisés au calme d’une rue peu passante, avec une place de parking privée et sécurisée — la bonne surprise de tous les voyageurs. Cuisine entièrement équipée, literie confortable, et un petit-déjeuner copieux servi chaque matin.',
      atouts: [
        'Parking privé sécurisé',
        'Petit-déjeuner compris',
        'Climatisation',
        'Wifi gratuit 9,5/10',
        'Cuisine équipée',
        'Animaux admis',
        'Linge & serviettes fournis',
        'Location de vélos',
      ],
      // Notes détaillées Booking (réelles)
      detailNotes: [
        { label: 'Personnel', v: 9.6 },
        { label: 'Rapport qualité/prix', v: 9.4 },
        { label: 'Confort', v: 9.3 },
        { label: 'Propreté', v: 9.2 },
        { label: 'Équipements', v: 9.2 },
        { label: 'Situation', v: 8.5 },
      ],
      lien: BOOKING_TROYES,
      photo: P('423108287|70410f7aeb3cfbc028412a43e424afdfa82c1c886ce38926a16630134d9d8048'),
      galerie: [
        P('626273893|5ffa078ae7289914bd1a5d55d84609a9158d322ef0517c8fabad2cb361291303'),
        P('423108338|8a01379a573b41249a797c09f3568c7ab0a2d8b3aa39398cccb294047955d6ff'),
        P('423108275|0e91253c7eda9406de4519fc7dcbddf41114c2aa9e37a3b4d9e157ce1f299e4b'),
        P('626273890|cdec026b6fc9289c1428d5b2f2a13a001775ba11157a16bd69c23646bebbd4b4'),
        P('423108294|e874c5024fe927212d409406919425ffd917e5df90ea3d5e8a6e4da1c6957aae'),
        P('432429305|2775d6c44bc271cd38bc6ef8391c9593d8062988d815c3c71beb3fd5d10de929'),
        P('432431625|e43c6412f3ac3fdf9e0fef3146327e062bd89524f7d6330a6d6103e5a34f6d13'),
        P('432431544|084ab97e9a137b6f73bf59619b4f06a8f9351c083574dc4aa92391e69aa1b593'),
      ],
    },
    {
      id: 'maison-du-bonheur',
      nom: 'Maison du Bonheur',
      sousNom: 'L’art de vivre à la française',
      accent: 'jaune',
      ville: 'Sainte-Savine',
      lieu: '2 Rue de l’Union, 10300 Sainte-Savine',
      repere: 'À 1 km à pied de la gare de Troyes · commerces à 400 m',
      voyageurs: 5,
      chambres: 1,
      lits: '1 grand lit double + 2 canapés-lits',
      surface: 42,
      prix: 143,
      // 143 € au tarif plein ; Booking affichait 133,50 € avec une
      // remise de 7 % (286 € barré → 267 € les 2 nuits).
      prixRemise: 133.5,
      note: 8.0,
      mention: 'Très bien',
      nbAvis: 51,
      noteCouples: 8.3,
      desc: 'Le premier de la maison, dans une ruelle tranquille de Sainte-Savine. 42 m² climatisés, décorés avec soin, à quinze minutes à pied du centre de Troyes. Supermarché, boulangerie et restaurant à moins de 400 m, et un espace bien-être pour souffler après la visite.',
      atouts: [
        'Parking gratuit',
        'Petit-déjeuner compris',
        'Climatisation',
        'Wifi gratuit 10/10',
        'Espace bien-être',
        'Animaux admis',
        'Console de jeux',
        'Service d’étage',
      ],
      detailNotes: [
        { label: 'Personnel', v: 9.0 },
        { label: 'Confort', v: 8.3 },
        { label: 'Équipements', v: 8.3 },
        { label: 'Propreté', v: 8.2 },
        { label: 'Rapport qualité/prix', v: 8.2 },
        { label: 'Situation', v: 8.1 },
      ],
      lien: BOOKING_SAVINE,
      photo: P('356689034|f120669390f2ca03a238123226ad45dcd2500d3c0cf1112dbcc42da3fedb336c'),
      galerie: [
        P('360096447|b7ddaf5b1484aa6e994eeca1e63e9c280a5e27fe1e54a5e696bce15498f8737b'),
        P('351492802|0e8c177c23e8fc31b6c2c0fd9c0d4f815594435d101a7963fd449d5b1fb57aff'),
        P('351500733|6f29a3594f546d677c6cff3c21870cfc897eac7515780528ba3075a7c0fedd5b'),
        P('351492861|a9420dc554a9da46a775d0969fc3538e7fd6424aafd0d58c01eb653be28c9b7f'),
        P('351500736|965d4941465e066ed46963631005503daf01acfbb15291a43059d3466a7e19c5'),
        P('351492867|cdcd91828ce98e772bab0538aa118a4a68c8e1d8ee00e846bea2f2a1c3e2e9e0'),
        P('404477071|f45cd89fad9a319d9c93db0f940cfec5fc5d7b0d0e681e9738d7a70794155dad'),
        P('351500831|7b56fcd5e72b29bbbe1f82396001c30086b4e0ec838eaeffac0101ea0aaca095'),
      ],
    },
  ],

  // ---- LE PETIT-DÉJEUNER (l'argument nº1 des avis) ----
  petitDejeuner: {
    titre: 'Le petit-déjeuner qui revient dans tous les avis.',
    texte:
      'Continental et copieux, préparé le matin même et compris dans le tarif. Viennoiseries, boissons chaudes, jus, produits frais — et de quoi l’emporter si vous partez tôt.',
    points: [
      'Compris dans le prix, sans supplément',
      'Servi dans le logement, à votre rythme',
      'Formule à emporter pour les départs matinaux',
      'Le frigo est garni avant votre arrivée',
    ],
    photos: [
      P('351500733|6f29a3594f546d677c6cff3c21870cfc897eac7515780528ba3075a7c0fedd5b'), // plateau du matin
      P('432429305|2775d6c44bc271cd38bc6ef8391c9593d8062988d815c3c71beb3fd5d10de929'), // panier garni
      P('423108275|0e91253c7eda9406de4519fc7dcbddf41114c2aa9e37a3b4d9e157ce1f299e4b'), // cuisine équipée
    ],
    citation: {
      texte: 'L’appartement était d’une propreté irréprochable, sans parler du petit-déjeuner extrêmement copieux que nous avons su apprécier.',
      auteur: 'Nathalie',
      pays: 'France',
    },
  },

  // ---- ÉQUIPEMENTS & SERVICES (icone : cle | menage | panier | message | pin | plus | wifi | parking | clim | animal) ----
  services: [
    { icone: 'parking', titre: 'Parking gratuit', desc: 'Place privée et sécurisée à Troyes, stationnement gratuit à Sainte-Savine. Aucun frais, aucune recherche.' },
    { icone: 'panier', titre: 'Petit-déjeuner compris', desc: 'Continental et copieux, préparé le matin même. Formule à emporter possible.' },
    { icone: 'clim', titre: 'Climatisation', desc: 'Les deux logements sont climatisés — appréciable l’été comme au cœur de l’hiver.' },
    { icone: 'wifi', titre: 'Wifi fibre gratuit', desc: 'Noté 9,5/10 à Troyes et 10/10 à Sainte-Savine par les voyageurs. Télétravail et visios sans mauvaise surprise.' },
    { icone: 'cle', titre: 'Logement entier', desc: 'Vous avez tout l’appartement : chambre, salon, cuisine équipée et salle de bains privative.' },
    { icone: 'animal', titre: 'Animaux acceptés', desc: 'Vos compagnons sont les bienvenus dans les deux logements. Prévenez-moi simplement à la réservation.' },
    { icone: 'menage', titre: 'Linge & serviettes fournis', desc: 'Draps, serviettes et logement impeccable à votre arrivée. Rien à apporter.' },
    { icone: 'message', titre: 'Navette aéroport', desc: 'Service de navette possible (payant) vers l’aéroport, ainsi que location de vélos et de voitures.' },
  ],

  // ---- BANDEAU DÉFILANT ----
  bandeau: [
    'Petit-déjeuner compris',
    'Parking gratuit',
    'Logement entier',
    'Climatisation',
    'Wifi fibre gratuit',
    'Animaux acceptés',
    '9,0 sur Booking',
    'À 1 km de la gare',
  ],

  // ---- GAGES DE CONFIANCE ----
  // ⚠️ Plus affiché : faisait doublon avec le bandeau défilant et les
  // chiffres du héros. Conservé si vous voulez réintroduire un bandeau.
  confiance: [
    { valeur: '9,0 / 10', label: 'note Booking « Fabuleux »', icone: 'etoile' },
    { valeur: '134 avis', label: 'de voyageurs vérifiés', icone: 'message' },
    { valeur: 'Parking', label: 'gratuit sur les deux adresses', icone: 'parking' },
    { valeur: 'Petit-déj', label: 'compris dans le tarif', icone: 'panier' },
  ],

  // ---- GUIDE LOCAL (vraies adresses autour de Troyes) ----
  guide: {
    titre: 'Troyes, à quelques minutes de votre porte.',
    sousTitre:
      'Capitale historique de la Champagne, ses maisons à pans de bois, ses magasins d’usines et ses lacs. Voici ce que mes voyageurs préfèrent.',
    lieux: [
      { nom: 'Le centre historique', type: 'Incontournable', emoji: '🏘️', distance: '15 min à pied', desc: 'Le « bouchon de Champagne » et ses ruelles médiévales bordées de maisons à pans de bois colorées. À faire au coucher du soleil.' },
      { nom: 'La Ruelle des Chats', type: 'Curiosité', emoji: '🐈', distance: '15 min à pied', desc: 'La ruelle la plus photographiée de Troyes : les toits se touchent presque au-dessus de vos têtes.' },
      { nom: 'Magasins d’usines', type: 'Shopping', emoji: '🛍️', distance: '10 min en voiture', desc: 'McArthurGlen et Marques Avenue : les plus grands centres de marques de France, nés ici même à Troyes.' },
      { nom: 'Cathédrale Saint-Pierre-et-Saint-Paul', type: 'Patrimoine', emoji: '⛪', distance: '18 min à pied', desc: 'Des vitraux du XIIIᵉ siècle parmi les plus beaux d’Europe. L’entrée est libre.' },
      { nom: 'Lacs de la Forêt d’Orient', type: 'Nature', emoji: '🌊', distance: '30 min en voiture', desc: 'Plages, voile et observation des oiseaux dans un parc naturel régional. Parfait pour une journée au vert.' },
      { nom: 'Nigloland', type: 'En famille', emoji: '🎢', distance: '46 km', desc: 'Le grand parc d’attractions de l’Aube, idéal pour une journée avec les enfants.' },
    ],

    // ---- COMMENT VENIR ----
    // Les voyageurs veulent savoir comment arriver avant de réserver.
    acces: [
      {
        icone: 'gare',
        titre: 'En train',
        detail: 'Gare de Troyes à 1 km à pied de Sainte-Savine, 1,4 km de la Maison du Bonheur 2.',
        appui: 'Environ 1 h 30 depuis Paris Gare de l’Est',
      },
      {
        icone: 'parking',
        titre: 'En voiture',
        detail: 'Autoroute A5, environ 2 h depuis Paris. Parking gratuit sur les deux adresses, place privée et sécurisée à Troyes.',
        appui: 'Aucun frais de stationnement',
      },
      {
        icone: 'boussole',
        titre: 'En avion',
        detail: 'Aéroport de Châlons-Vatry à 68 km. Je peux organiser une navette depuis l’aéroport.',
        appui: 'Navette sur demande (payante)',
      },
      {
        icone: 'cle',
        titre: 'Sur place',
        detail: 'Centre historique de Troyes à 15 min à pied. Location de vélos et de voitures possible.',
        appui: 'Commerces à moins de 400 m',
      },
    ],
  },

  // ---- AVIS (repris des commentaires Booking) ----
  avis: [
    { note: 5, texte: 'Logement bien équipé et arrangé avec goût. Bonne literie, climatisation. Petits déjeuners copieux. Parking privé.', nom: 'Thierry', meta: 'France · Maison du Bonheur 2' },
    { note: 5, texte: 'Le confort, la propreté, le calme, le petit-déjeuner, la gentillesse de la propriétaire.', nom: 'Christopher', meta: 'Belgique · Maison du Bonheur 2' },
    { note: 5, texte: 'Ce joli logement est dans une ruelle tranquille de Sainte-Savine. Il est facile de se garer et il y a toutes les commodités à moins de 400 m.', nom: 'Ines', meta: 'France · Maison du Bonheur' },
    { note: 5, texte: 'Nous avons beaucoup apprécié l’accueil et la disponibilité de notre hôtesse. Le parking sécurisé était une très bonne surprise.', nom: 'Odile', meta: 'France · Maison du Bonheur 2' },
    { note: 5, texte: 'Les équipements et les attentions de l’hôte, c’était parfait pour passer trois nuits avec ma famille.', nom: 'Abdellah', meta: 'France · Maison du Bonheur' },
    { note: 5, texte: 'Appartement cosy, bien situé à 10 minutes des magasins d’usines. Hôtesse très agréable. Un grand merci.', nom: 'Juliana', meta: 'La Réunion · Maison du Bonheur 2' },
  ],

  // ---- FAQ ----
  faq: [
    { q: 'Le petit-déjeuner est-il vraiment compris ?', r: 'Oui. Le petit-déjeuner continental est compris dans le tarif affiché, sans supplément. Il est préparé le matin même, et une formule à emporter est possible si vous partez tôt.' },
    { q: 'Y a-t-il un parking ?', r: 'Oui, et il est gratuit sur les deux adresses. La Maison du Bonheur 2 à Troyes dispose d’une place privée et sécurisée sur place ; à Sainte-Savine, le stationnement est libre et facile, à deux minutes à pied.' },
    { q: 'Combien de personnes peut-on accueillir ?', r: 'Chaque appartement accueille jusqu’à 5 voyageurs : 1 chambre avec un grand lit double, plus des canapés-lits dans le salon. Les tarifs affichés correspondent à deux personnes ; contactez-moi pour un séjour à plus.' },
    { q: 'Les animaux sont-ils acceptés ?', r: 'Oui, dans les deux logements. Merci simplement de me le signaler au moment de la réservation pour que je prépare le logement en conséquence.' },
    { q: 'Comment se passe l’arrivée ?', r: 'Je vous accueille personnellement ou vous transmets les accès à l’avance selon votre heure d’arrivée. Le frigo est garni et le logement prêt : vous n’avez rien à prévoir en arrivant.' },
    { q: 'Peut-on venir en télétravail ?', r: 'Bien sûr. Le wifi est noté 9,5 et 10 sur 10 par les voyageurs, les deux logements sont climatisés et disposent d’un salon séparé et d’une cuisine complète pour une semaine confortable.' },
    { q: 'Comment réserver ?', r: 'Toutes les réservations passent par Booking.com : c’est là que figurent les disponibilités en temps réel, le tarif définitif et le paiement sécurisé. Les boutons « Réserver » de ce site vous emmènent directement sur l’annonce du logement choisi.' },
  ],

  contact: {
    // Renseignez vos coordonnées ici pour les afficher sur le site.
    // Laissez vide ("") pour masquer la ligne correspondante.
    email: '',
    tel: '',
    instagram: '',
    lienInstagram: '',
    adresses: [
      { ville: 'Troyes', adresse: '89 Rue de la Paix, 10000 Troyes' },
      { ville: 'Sainte-Savine', adresse: '2 Rue de l’Union, 10300 Sainte-Savine' },
    ],
  },

  credit: '', // ex : "Site réalisé par Théo Birost" — vide pour masquer
}

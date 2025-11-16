
<div align="center">
  <h1 style="font-size: 4rem; font-weight: bold; background: linear-gradient(90deg, #FBBF24, #F97316, #EF4444); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
    XELDA
  </h1>
  <p style="font-size: 1.25rem; color: #E5E7EB;">
    Votre Assistant de Design d'Intérieur IA de Nouvelle Génération
  </p>
  
  <p><strong>🚀 Version SaaS Production-Ready - Intégration complète Supabase + Auth + Paiements</strong></p>
</div>

<br>

**XELDA** n'est pas un simple éditeur d'images. C'est un écosystème de design complet qui transforme l'inspiration en un résultat visuel concret, réalisable et hyper-personnalisé. Sa mission est de démocratiser le design d'intérieur en donnant à chacun le pouvoir de visualiser la chambre de ses rêves et d'explorer sa créativité sans limites.

---git remote add origin https://github.com/DonaldDuke32/Xelda.git


### **Table des Matières**

1.  [**Vision du Projet**](#-vision-du-projet)
2.  [**Fonctionnalités Clés**](#-fonctionnalités-clés)
    *   [L'Espace Créateur](#lespace-créateur)
    *   [La Galerie d'Inspiration](#la-galerie-dinspiration)
    *   [Le Profil de Style](#le-profil-de-style)
3.  [**Architecture & Stack Technique**](#-architecture--stack-technique)
4.  [**Structure du Projet**](#-structure-du-projet)
5.  [**Détail des Composants**](#-détail-des-composants)
6.  [**Le Service d'IA Modulaire**](#-le-service-dia-modulaire)
7.  [**Design System & Philosophie**](#-design-system--philosophie)
8.  [**Installation & Lancement**](#-installation--lancement)
9.  [**Vision & Prochaines Étapes**](#-vision--prochaines-étapes)

---

## 🔭 Vision du Projet

La philosophie de XELDA repose sur trois piliers fondamentaux :

*   **Créativité Augmentée :** Fournir des outils IA qui agissent comme un partenaire créatif, capables de fusionner des styles, d'interpréter des palettes de couleurs et de proposer des améliorations pertinentes.
*   **Expérience Intégrée :** Couvrir l'intégralité du parcours de design, de l'idée brute et de l'inspiration initiale jusqu'à la visualisation concrète du mobilier dans l'espace physique de l'utilisateur via la Réalité Augmentée.
*   **Communauté et Personnalisation :** Créer un espace où les utilisateurs s'inspirent mutuellement et où l'IA apprend à connaître les goûts de chacun pour devenir un véritable assistant personnel, proactif et intelligent.

---

## ✨ Fonctionnalités Clés

XELDA est structuré en trois univers interconnectés pour une expérience riche et complète.

### L'Espace Créateur

Le cœur de l'application, où la magie de la transformation opère à travers un flux intuitif :

*   **Upload Intelligent :** Zone de glisser-déposer pour la photo de la chambre.
*   **Sélection de Style :** Carrousel de 10 styles prédéfinis (Minimaliste, Bohème, Futuriste, etc.).
*   **"Me Surprendre" :** Un bouton qui génère des fusions de styles, en se basant sur le profil de l'utilisateur pour des suggestions de plus en plus pertinentes.
*   **Palette d'Inspiration :** Fonctionnalité unique permettant d'uploader une seconde image (paysage, art...) pour que l'IA en extraie la palette de couleurs et l'applique au design.
*   **Comparateur Avant/Après :** Un curseur interactif pour visualiser l'impact de la transformation.
*   **Ambiance Lumineuse :** Changement de l'éclairage en un clic ("Matin", "Soirée cosy", "Néon") pour voir comment l'espace vit à différents moments.
*   **Chat d'Affinage :** Conversation avec l'IA pour modifier les détails en langage naturel ("Ajoute une plante", "Change les murs en bleu").
*   **Analyse du Mobilier :** L'IA identifie et liste les éléments clés qu'elle a ajoutés, transformant l'image en un plan d'action concret.
*   **Réalité Augmentée (Simulation 3D) :** Pour chaque meuble identifié, un aperçu 3D animé permet de mieux visualiser l'objet.

### La Galerie d'Inspiration

XELDA est une plateforme sociale où la créativité est partagée.

*   **Découverte :** Un flux constant de créations partagées par la communauté.
*   **Interaction :** Possibilité de "liker" les designs pour montrer son appréciation.
*   **Action :** Téléchargement direct des créations favorites pour les conserver.

### Le Profil de Style

XELDA apprend à vous connaître pour une expérience hyper-personnalisée.

*   **Analyse Intelligente :** L'application analyse les styles que vous utilisez le plus et présente un profil visuel de vos préférences sous forme de graphiques.
*   **Personnalisation Accrue :** Ce profil est utilisé pour affiner les suggestions du bouton "Me Surprendre", rendant l'IA de plus en plus pertinente à chaque utilisation.

---

## 🛠️ Architecture & Stack Technique

*   **Framework Frontend :** **React 19** avec **TypeScript** pour un code robuste, typé et maintenable.
*   **Styling :** **Tailwind CSS** pour un design system rapide, cohérent et entièrement personnalisable directement dans le balisage.
*   **API d'Intelligence Artificielle :** **Google Gemini**
    *   `gemini-2.5-flash-image` : Utilisé pour la génération et la modification d'images photoréalistes.
    *   `gemini-2.5-flash` : Utilisé pour l'analyse de texte et l'extraction de données structurées (JSON) pour l'analyse du mobilier.

---

## 📁 Structure du Projet

L'arborescence du projet est conçue pour être claire, modulaire et évolutive.

```
/
├── public/
│   └── (fichiers statiques)
├── src/
│   ├── components/       # Composants React réutilisables
│   ├── services/
│   │   ├── ai/
│   │   │   ├── interface.ts  # Contrat/Interface pour TOUS les services IA
│   │   │   ├── gemini.ts     # Implémentation SPÉCIFIQUE à Gemini
│   │   │   └── index.ts      # Point d'entrée qui exporte le service IA actif
│   ├── constants.ts      # Constantes (textes UI, données statiques)
│   ├── types.ts          # Définitions des types TypeScript partagés
│   ├── App.tsx           # Composant principal, chef d'orchestre de l'état
│   └── index.tsx         # Point d'entrée de l'application React
├── index.html            # Fichier HTML principal
├── metadata.json         # Métadonnées de l'application
└── README.md             # Ce fichier
```

---

## 🧩 Détail des Composants

L'interface est découpée en composants logiques et réutilisables.

*   `App.tsx`: Le composant racine qui gère l'état global, la navigation entre les vues (Créateur, Galerie, Profil) et le flux de création.
*   `Header.tsx`: La barre de navigation supérieure, permettant de switcher entre les trois univers de l'application.
*   `UploadSection.tsx`: Zone de glisser-déposer pour l'upload d'images.
*   `StyleCarousel.tsx`: Carrousel horizontal pour la sélection des styles.
*   `InspirationPrompt.tsx`: Écran intermédiaire pour l'upload optionnel de l'image de palette de couleurs.
*   `GenerationView.tsx`: La vue principale de l'espace créateur, qui assemble le slider, le chat et les panneaux d'analyse.
*   `BeforeAfterSlider.tsx`: Le composant interactif de comparaison d'images.
*   `ChatPanel.tsx`: L'interface de conversation pour l'affinage du design.
*   `ARViewModal.tsx`: Le modal qui s'affiche pour la simulation 3D, utilisant un **Portail React** pour s'afficher correctement au-dessus de toute l'interface.
*   `GalleryView.tsx`: La page affichant la grille des créations de la communauté.
*   `ProfileView.tsx`: La page affichant l'analyse des préférences de style de l'utilisateur.
*   `Loader.tsx`: L'animation de chargement stylisée avec le 'X' de XELDA.
*   `icons.tsx`: Un fichier centralisant toutes les icônes SVG pour une gestion simplifiée.

---

## 🤖 Le Service d'IA Modulaire

C'est un point d'architecture crucial pour la pérennité du projet. XELDA n'est **pas** couplé à Gemini.

1.  **L'Interface (`services/ai/interface.ts`) :** Elle définit un "contrat" que n'importe quel service d'IA doit respecter. Elle dicte les fonctions nécessaires (`generateDesign`, `analyzeFurniture`, etc.) et leurs signatures.
2.  **L'Implémentation (`services/ai/gemini.ts`) :** Ce fichier contient le code qui dialogue *spécifiquement* avec l'API Gemini. Il respecte le contrat défini par l'interface.
3.  **Le Point d'Entrée (`services/ai/index.ts`) :** C'est le "commutateur". Le reste de l'application importe depuis ce fichier. Pour changer de fournisseur d'IA, il suffirait de créer une nouvelle implémentation (ex: `dalle.ts`) et de changer une seule ligne dans ce fichier.

Cette abstraction rend XELDA **agnostique au modèle d'IA** et prête pour les technologies futures.

---

## 🎨 Design System & Philosophie

L'identité visuelle de XELDA est pensée pour être à la fois luxueuse, moderne et intuitive.

*   **Palette de Couleurs :** Un thème sombre et immersif (`#000000`) rehaussé par un dégradé vibrant et chaleureux allant de l'or (`#FBBF24`) à l'orange (`#F97316`) et au rouge (`#EF4444`).
*   **Typographie :** La police 'Poppins' est utilisée pour son look moderne, clair et élégant.
*   **UI/UX :**
    *   **Micro-interactions :** Des animations subtiles (effets de brillance, pulsations, fondus) sont utilisées pour rendre l'interface vivante et réactive.
    *   **Clarté Visuelle :** Utilisation d'icônes claires, de contrastes élevés et d'une hiérarchie visuelle bien définie pour guider l'utilisateur.
    *   **Cohérence :** Les éléments récurrents (boutons, cartes) partagent un style unifié pour une expérience prédictible et agréable.

---

## 🚀 Installation & Lancement

Le projet est conçu pour être lancé directement dans un environnement de développement web supportant les modules ES.

1.  **Prérequis :** Un serveur web local pour servir les fichiers statiques.
2.  **Clé d'API :** Le projet nécessite une clé d'API Google Gemini. Elle doit être configurée en tant que variable d'environnement `process.env.API_KEY` dans l'environnement d'exécution.
3.  **Lancement :** Servez le répertoire racine du projet via votre serveur local et ouvrez `index.html` dans votre navigateur.

---

## 🔮 Vision & Prochaines Étapes

XELDA a une feuille de route ambitieuse pour devenir la solution de référence mondiale.

*   **Court Terme : Consolidation**
    1.  **Véritable Intégration AR :** Passer de la simulation 3D à une expérience de Réalité Augmentée native (via WebXR).
    2.  **Fonctionnalité "Remix" Complète :** Permettre d'appliquer le style et la palette d'un design de la galerie à sa propre photo.
    3.  **Comptes Utilisateurs & Favoris :** Sauvegarder ses créations, favoris et son profil de style.
    4.  **Affiliation Shopping :** Proposer des liens d'achat pour les meubles identifiés par l'IA.

*   **Moyen Terme : Expansion de l'Offre**
    5.  **Extension à d'Autres Pièces :** Adapter l'IA pour les salons, cuisines, bureaux, etc.
    6.  **Génération de Vidéos (Veo) :** Proposer une option "Visite virtuelle" qui générerait un court clip vidéo de la pièce redécorée.
    7.  **Partenariats Marques :** Intégrer des catalogues de meubles de marques réelles.

*   **Long Terme : Révolution de l'Interaction**
    8.  **Designer Conversationnel (Live API) :** Intégrer la Gemini Live API pour permettre un dialogue vocal en temps réel avec XELDA.
    9.  **Génération de Scènes 3D Complètes :** La frontière ultime : générer un modèle 3D complet de la pièce dans lequel l'utilisateur pourrait se déplacer librement.

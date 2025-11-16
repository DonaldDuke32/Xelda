import type { Style, GalleryItem } from './types';
import { MinimalistIcon, ScandinavianIcon, CozyIcon, ModernIcon, BohemianIcon, IndustrialIcon, LuxuryIcon, VintageIcon, GamerIcon, FuturisticIcon } from './components/icons';

export const STYLES: Style[] = [
  { id: 'Minimalist', name: 'Minimaliste', description: 'Lignes épurées, couleurs neutres, esthétique zen.', icon: MinimalistIcon },
  { id: 'Scandinavian', name: 'Scandinave', description: 'Bois clairs, textures douillettes, design fonctionnel.', icon: ScandinavianIcon },
  { id: 'Cozy', name: 'Cozy', description: 'Couleurs chaudes, textures douces, atmosphère intime.', icon: CozyIcon },
  { id: 'Modern', name: 'Moderne', description: 'Contemporain, couleurs vives, formes géométriques.', icon: ModernIcon },
  { id: 'Bohemian', name: 'Bohème', description: 'Éclectique, coloré, artistique, rempli de plantes.', icon: BohemianIcon },
  { id: 'Industrial', name: 'Industriel', description: 'Matériaux bruts, accents métalliques, ambiance urbaine.', icon: IndustrialIcon },
  { id: 'Luxury', name: 'Luxe', description: 'Haut de gamme, accents or/argent, mobilier élégant.', icon: LuxuryIcon },
  { id: 'Vintage', name: 'Vintage', description: 'Éléments rétro, nostalgique, éclairage chaleureux.', icon: VintageIcon },
  { id: 'Gamer', name: 'Gamer', description: 'Éclairage RGB, high-tech, esthétique de jeu moderne.', icon: GamerIcon },
  { id: 'Futuristic', name: 'Futuriste', description: 'Ultra-moderne, épuré, métallique, inspiration sci-fi.', icon: FuturisticIcon },
];

export const UI_TEXT = {
  welcomeTitle: "Bienvenue dans XELDA ✨",
  welcomeSubtitle: "Transformez votre chambre de rêve en quelques clics.",
  welcomeCTA: "Commencez par uploader une photo ! 🎨",
  uploadTitle: "Déposer votre photo ici",
  uploadSubtitle: "Formats acceptés: JPG, PNG, WebP (Max 10MB)",
  generating: "Génération en cours...",
  generatingSubtitle: "Votre chambre se transforme...",
  generatingAlmostReady: "C'est presque prêt !",
  refineTitle: "Affinez votre design...",
  refinePlaceholder: "Que souhaitez-vous modifier ?",
  quickSuggestions: "Suggestions rapides :",
  download: "Télécharger",
  share: "Partager",
  tryAnotherStyle: "Essayer un autre style",
  surpriseMe: "Me Surprendre",
  send: "Envoyer",
  successDownload: "Design téléchargé avec succès !",
  successUpload: "Image téléchargée avec succès !",
  errorInvalidImage: "Erreur : Veuillez uploader une image valide.",
  errorGeneration: "Une erreur est survenue lors de la génération. Veuillez réessayer.",
  chatWelcome: "Votre design est prêt ! Vous pouvez maintenant l'affiner. Demandez-moi ce que vous voulez changer.",
  before: "Avant",
  after: "Après",
  inspirationTitle: "Ajoutez une palette de couleurs",
  inspirationSubtitle: "Optionnel : Uploadez une image d'inspiration pour guider les couleurs du design.",
  inspirationCTA: "Générer avec cette palette",
  inspirationSkip: "Générer sans inspiration",
  inspirationBack: "Retour",
  furnitureAnalysisTitle: "Éléments clés du design",
  ambianceTitle: "Changer l'ambiance lumineuse",
  publishToGallery: "Publier dans la galerie",
  viewInAR: "Voir en AR",
  arModalTitle: "Visualisation en Réalité Augmentée",
  arModalDescription: "La vraie magie de la RA arrive bientôt ! En attendant, profitez de cet aperçu 3D pour imaginer comment cet objet s'intégrera dans votre espace.",
  arModalClose: "Fermer",
  navCreator: "Créateur",
  navGallery: "Galerie",
  navProfile: "Profil",
  galleryTitle: "Galerie d'Inspiration",
  gallerySubtitle: "Découvrez les créations de la communauté XELDA.",
  profileTitle: "Votre Profil de Style",
  profileSubtitle: "XELDA apprend à connaître vos goûts uniques.",
  profileStyleDistribution: "Distribution de vos styles",
  profileNoData: "Créez quelques designs pour que nous puissions analyser votre style !",
};

export const GENERATING_MESSAGES = [
  "Votre chambre se transforme...",
  "Application de la magie du design...",
  "Polissage des détails fins...",
  "Analyse des éléments du mobilier...",
  "Création de l'ambiance parfaite...",
  "C'est presque prêt !"
];

export const AMBIANCE_PRESETS = [
    { id: 'morning', name: "Lumière du matin", prompt: "Re-render this image with a bright and airy morning light, with sunlight streaming through the windows." },
    { id: 'evening', name: "Soirée cosy", prompt: "Re-render this image with a warm and cozy evening ambiance, using soft, warm artificial light from lamps." },
    { id: 'neon', name: "Néon futuriste", prompt: "Re-render this image with a futuristic neon vibe, using colored LED and neon lights to create a vibrant, modern mood." },
];

export const MOCK_GALLERY_ITEMS: GalleryItem[] = [
    { id: '1', imageUrl: 'https://storage.googleapis.com/static.aistudio.google.com/gallery/XELDA_Bohemian.png', styleName: 'Bohème', prompt: 'Chambre bohème avec beaucoup de plantes et des textures naturelles.', author: 'Clara D.', likes: 125 },
    { id: '2', imageUrl: 'https://storage.googleapis.com/static.aistudio.google.com/gallery/XELDA_Futuristic.png', styleName: 'Futuriste', prompt: 'Un design épuré et futuriste avec des néons bleus.', author: 'Léo M.', likes: 234 },
    { id: '3', imageUrl: 'https://storage.googleapis.com/static.aistudio.google.com/gallery/XELDA_Scandinavian.png', styleName: 'Scandinave', prompt: 'Style scandinave, bois clair et ambiance minimaliste.', author: 'Eva R.', likes: 412 },
    { id: '4', imageUrl: 'https://storage.googleapis.com/static.aistudio.google.com/gallery/XELDA_Gamer.png', styleName: 'Gamer', prompt: 'Setup de jeu ultime avec éclairage RGB.', author: 'Tom G.', likes: 301 },
];
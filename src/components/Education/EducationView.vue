<!-- src/views/EducationView.vue -->
<template>
  <!-- Barre de navigation -->
  <Navbar />

  <!-- Layout principal -->
  <div class="educatio-layout">
    <!-- Sidebar gauche -->
    <div class="sidebar-left">
      <LeftSidebar @select-video="handleSelectVideo" />
    </div>

    <!-- Contenu principal -->
    <div class="main-content">
      <h1>Littératie en santé digital - Module Option Soins infirmiers B22</h1>
   

      <!-- Affichage du composant sélectionné -->
      <component
        :is="currentComponent"
        v-bind="currentProps"
      />
    </div>

    <!-- Sidebar droite -->
    <div class="sidebar-right">
      <RightSidebar @navigate-external="handleExternalNavigate" />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Utils/Navbar.vue';
import LeftSidebar from '@/components/Education/LeftSidebar.vue';
import RightSidebar from '@/components/Education/RightSidebar.vue';
import VideoComp from '@/components/Education/VideoComp.vue';
import IntroComponent from '@/components/Education/IntroComponent.vue';
import ProcessComp from '@/components/Education/ProcessComp.vue';
import IACom from '@/components/Education/IACom.vue';
import TableRondeComp from '@/components/Education/TableRondeComp.vue';
import AproposComponent from '@/components/Education/AproposComponent.vue';

export default {
  name: 'EducatioView',
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
    IntroComponent,
    ProcessComp,
    IACom,
    TableRondeComp,
    AproposComponent,
    VideoComp,
  },
  data() {
    return {
      // Définition des vidéos
      videos: [
        {
          title: 'Comment réussir la digitalisation en santé',
          url: 'https://player.vimeo.com/video/1043452370',
          description: 'Rafaël Weissbrodt HES-SO Valais/Wallais-HEdS, Introduction à la digitalisation dans les systèmes de santé selon l ergonomie',
        },
        {
          title: 'La digitalisation en santé - Table ronde',
          url: 'https://player.vimeo.com/video/1043450226',
          description: 'Henning Müller (HES-SO Valais/Wallis), Pascal Tritz (Hôpital du Valais), Cédric Michelet (Etat du Valais), Débat entre experts sur les avancées et les implications de la digitalisation en santé et son historique',
        },
        {
          title: 'Dossier Electronique Patient',
          url: 'https://player.vimeo.com/video/1043438107',
          description: 'Cédric Michelet Etat du Valais-Responsale E-Health, Présentation du Dossier Electronique du Patient et de CARA',
        },
        {
          title: 'L\'intelligence artificielle en santé',
          url: 'https://player.vimeo.com/video/1043426642',
          description: 'Andrei Kucharavy HES-SO Valais/Wallis -HEG, Présentation de l intelligence artificielle en santé et ses avantages et des défis',
        },
        // Ajoutez une cinquième vidéo si nécessaire
      ],
      currentVideoIndex: 'IntroComponent', // Index de la vidéo actuellement sélectionnée
      externalPage: null, // URL de la page externe à afficher
    };
  },
  computed: {
    currentVideo() {
      if (this.currentVideoIndex !== null && typeof this.currentVideoIndex === 'number' && this.videos[this.currentVideoIndex]) {
        return this.videos[this.currentVideoIndex];
      }
      return null;
    },
    currentComponent() {
      switch (this.currentVideoIndex) {
        case 0:
          return 'VideoComp';
        case 1:
          return 'ProcessComp';
        case 2:
          return 'TableRondeComp';
        case 3:
          return 'IACom';
        case 'apropos':
          return 'AproposComponent';
        case 'intro':
          return 'IntroComponent';
        default:
          return 'IntroComponent';
      }
    },
    currentProps() {
      if (typeof this.currentVideoIndex === 'number' && this.currentVideo) {
        return {
          videoUrl: this.currentVideo.url,
          title: this.currentVideo.title,
          description: this.currentVideo.description,
        };
      }
      return {};
    },
  },
  methods: {
    handleSelectVideo(selection) {
      if (typeof selection === 'number') {
        this.currentVideoIndex = selection;
        this.externalPage = null;
      } else if (selection === 'apropos') {
        this.currentVideoIndex = 'apropos';
        this.externalPage = null;
      } else if (selection === 'intro') {
        this.currentVideoIndex = 'intro';
        this.externalPage = null;
      }
    },
    handleExternalNavigate(url) {
      // Charger l'URL externe dans l'iframe
      this.externalPage = url;
      // Réinitialiser la vidéo sélectionnée
      this.currentVideoIndex = null;
    },
  },
};
</script>

<style scoped>

h1, h2, h3, p {
    color: black;
}

/* Layout principal global */
.educatio-layout {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  /* Sidebar gauche, Contenu, Sidebar droite */
  gap: 1.5rem;
  height: 100vh;
  overflow: hidden;
  /* Évite le débordement des barres latérales */
  padding: 1rem;
  background-color: var(--background-color);
}

/* Scroll sur les barres latérales uniquement si nécessaire */
.sidebar-left,
.sidebar-right {
  overflow-y: auto;
}

/* Zone principale (où se situent la vidéo et les textes) */
.main-content {
  overflow-y: auto;
  /* Permet le scroll uniquement sur cette zone */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  /* Espacement entre les éléments */
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Masque la barre de défilement (style webkit et Firefox) */
.main-content::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.main-content {
  scrollbar-width: none;
}

/* Contenu externe */
.external-content iframe {
  width: 100%;
  height: 80vh;
  /* Ajustez selon vos besoins */
  border: none;
  border-radius: 8px;
}

/* Responsiveness */

/* Réduction : À partir de 1024px */
@media (max-width: 1024px) {
  .educatio-layout {
    grid-template-columns: 1fr 2fr;
  }

  .sidebar-right {
    display: none;
    /* Masque la sidebar droite */
  }
}

/* Réduction supplémentaire : À partir de 768px */
@media (max-width: 768px) {
  .educatio-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .sidebar-left {
    display: none;
    /* Masque la sidebar gauche */
  }

  .external-content iframe {
    height: 60vh;
    /* Ajustez pour les petits écrans */
  }
}

/* Très petits écrans : À partir de 480px */
@media (max-width: 480px) {
  .educatio-layout {
    padding: 0 1rem;
  }

  .main-content {
    gap: 0.5rem;
    /* Réduire l'espacement pour un rendu optimal */
  }
}
</style>

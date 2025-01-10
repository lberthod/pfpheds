<template>

<Navbar />

    <div class="tbchris-layout">
      <!-- Barre latérale gauche -->
      <div class="sidebar-left">
        <LeftSidebar />
      </div>
  
      <!-- Contenu principal -->
      <div class="main-content">
        <h1>TBChrisView - Vue principale</h1>
        <p>Exemple de layout avec LeftSidebar & RightSidebar.</p>
  
        <!-- Exemple d’utilisation : affichage conditionnel d’un composant -->
        <component
          :is="currentView"
          v-bind="currentProps"
        />
      </div>
  
      <!-- Barre latérale droite -->
      <div class="sidebar-right">
        <RightSidebar />
      </div>
    </div>
  </template>

  <script>
  import LeftSidebar from './LeftSidebar.vue'; 
  import RightSidebar from './RightSidebar.vue';
  import IntroComponent from './IntroComponent.vue';
  import ConclusionComponent from './ConclusionComponent.vue';
  import SimilarTableRonde from './SimilarTableRonde.vue';
  import Navbar from '@/components/Utils/Navbar.vue';

  export default {
    name: 'TBChrisView',
    components: {
        Navbar,

      LeftSidebar,
      RightSidebar,
      IntroComponent,
      ConclusionComponent,
      SimilarTableRonde,
    },
    data() {
      return {
        // Par exemple, si on veut basculer d’un composant à l’autre
        currentView: 'IntroComponent', 
        currentProps: {}, // si on veut passer des props selon le composant
      };
    },
    methods: {
      // Méthodes pour changer de composant dynamiquement si besoin
      showIntro() {
        this.currentView = 'IntroComponent';
        this.currentProps = {};
      },
      showConclusion() {
        this.currentView = 'ConclusionComponent';
        this.currentProps = {};
      },
      showSimilar() {
        this.currentView = 'SimilarTableRonde';
        this.currentProps = {
          videoUrl: 'https://player.vimeo.com/video/...', 
          title: 'Une autre vidéo ?',
          description: 'Description de la vidéo "SimilarTableRonde".',
        };
      },
    },
  };
  </script>
  
  <style scoped>
  /* Layout principal : 3 colonnes, sidebars & contenu */
  .tbchris-layout {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr; 
    gap: 1rem;
    height: 100vh;
    padding: 1rem;
    background-color: #f9f9f9;
  }
  
  /* Barre latérale */
  .sidebar-left,
  .sidebar-right {
    overflow-y: auto;
    background-color: #fff;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  /* Contenu principal */
  .main-content {
    overflow-y: auto;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  </style>
  
<template>
    <div class="eportfolio-view">
      <!-- Navbar globale (optionnel selon votre organisation) -->
      <Navbar />
  
      <!-- Mise en page en 3 colonnes : barre gauche, contenu central, barre droite -->
      <div class="eportfolio-layout">
        <LeftEportfolioSidebar class="left-sidebar" />
        <EportfolioManagement class="center-content" />
        <RightEportfolioSidebar class="right-sidebar" />
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Utils/Navbar.vue';
  import LeftEportfolioSidebar from '@/components/Eportfolio/LeftEportfolioSidebar.vue';
  import EportfolioManagement from '@/components/Eportfolio/EportfolioManagement.vue';
  import RightEportfolioSidebar from '@/components/Eportfolio/RightEportfolioSidebar.vue';
  
  export default {
    name: 'EportfolioView',
    components: {
      Navbar,
      LeftEportfolioSidebar,
      EportfolioManagement,
      RightEportfolioSidebar,
    },
  };
  </script>
  
  <style scoped>
  .eportfolio-view {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f0f2f5; /* gris clair, exemple */
  }
  
  .eportfolio-layout {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    gap: 1rem;
    padding: 1rem;
  }
  
  .left-sidebar,
  .right-sidebar {
    overflow-y: auto;
  }
  
  .center-content {
    overflow-y: auto;
  }
  </style>
  
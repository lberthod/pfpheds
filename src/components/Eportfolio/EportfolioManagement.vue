<template>
    <!-- Exemple : vous pouvez ajouter votre Navbar habituelle en haut -->
    <Navbar />
  
    <div class="eportfolio-page">
      <!-- Barre latérale gauche -->
      <LeftEportfolioSidebar class="left-sidebar" />
  
      <!-- Contenu principal du e-portfolio -->
      <div class="eportfolio-management">
  
        <header>
          <h1>Gestion de l’E-Portfolio</h1>
          <p>Organisez et visualisez vos accomplissements professionnels.</p>
        </header>
  
        <section class="portfolio-sections">
          <!-- Exemple de rubriques : Projets, Compétences, etc. -->
          <div class="portfolio-block">
            <h2>Mes Projets</h2>
            <p>Listez ou présentez ici vos projets réalisés.</p>
          </div>
  
          <div class="portfolio-block">
            <h2>Mes Compétences</h2>
            <p>Mettez en avant vos compétences clés et vos évaluations.</p>
          </div>
  
          <div class="portfolio-block">
            <h2>Mes Certifications</h2>
            <p>Conservez une trace de toutes vos certifications obtenues.</p>
          </div>
        </section>
      </div>
  
      <!-- Barre latérale droite -->
      <RightEportfolioSidebar class="right-sidebar" />
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Utils/Navbar.vue';
  import LeftEportfolioSidebar from './LeftEportfolioSidebar.vue';
  import RightEportfolioSidebar from './RightEportfolioSidebar.vue';
  
  export default {
    name: 'EportfolioManagement',
    components: {
      Navbar,
      LeftEportfolioSidebar,
      RightEportfolioSidebar,
    },
  };
  </script>
  
  <style scoped>
  /* ---------------------------------------- */
  /* Layout global en 3 colonnes :            */
  /* Sidebar gauche, contenu, sidebar droite. */
  /* ---------------------------------------- */
  .eportfolio-page {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    gap: 1rem;
    min-height: 100vh;
    padding: 1rem;
    background-color: #f5f5f5; /* léger fond gris pour distinguer */
  }
  
  .left-sidebar,
  .right-sidebar {
    overflow-y: auto;
    background-color: #fff;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* ---------------------------------------- */
  /* Zone centrale - le composant principal   */
  /* ---------------------------------------- */
  .eportfolio-management {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #fff;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  header {
    text-align: center;
  }
  
  header h1 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  header p {
    font-size: 1rem;
    color: #7f8c8d;
    margin-bottom: 1.5rem;
  }
  
  /* ---------------------------------------- */
  /* Rubriques du portfolio en blocs          */
  /* ---------------------------------------- */
  .portfolio-sections {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 1rem;
  }
  
  .portfolio-block {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }
  
  .portfolio-block h2 {
    font-size: 1.2rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  .portfolio-block p {
    font-size: 0.95rem;
    color: #7f8c8d;
  }
  </style>
  
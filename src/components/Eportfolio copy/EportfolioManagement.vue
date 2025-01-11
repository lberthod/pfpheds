<template>
  <!-- Exemple : vous pouvez ajouter votre Navbar habituelle en haut si souhaité -->
  <!-- <Navbar /> -->

  <div class="eportfolio-page">
    <!-- Barre latérale gauche -->
    <!-- On ne l’inclut plus ici, car on préfère la mettre dans EportfolioView.vue -->
    
    <!-- Contenu principal du e-portfolio -->
    <div class="eportfolio-management">
      <header>
        <h1>Gestion de l’E-Portfolio</h1>
        <p>Organisez et visualisez vos accomplissements professionnels.</p>
      </header>

      <section class="portfolio-sections">
        <!-- Exemple de rubriques : Projets, Compétences, etc. -->
        <!-- On va réutiliser MyProjectsSection pour la partie projets -->
        
        <MyProjectsSection />
<br>
        <div class="portfolio-block">
          <h2>Mes Compétences</h2>
          <p>Mettez en avant vos compétences clés et vos évaluations.</p>
          <!-- TODO: Lister les compétences (via un composant CompetencyItem, par ex.) -->
        </div>

        <div class="portfolio-block">
          <h2>Mes Certifications</h2>
          <p>Conservez une trace de toutes vos certifications obtenues.</p>
        </div>
      </section>
    </div>

    <!-- Barre latérale droite -->
    <!-- Idem, on l’a déportée dans EportfolioView.vue -->
  </div>
</template>

<script>
import MyProjectsSection from './MyProjectsSection.vue';

export default {
  name: 'EportfolioManagement',
  components: {
    MyProjectsSection,
  },
};
</script>

<style scoped>
/* ---------------------------------------- */
/* Layout global en 3 colonnes :            */
/* Sidebar gauche, contenu, sidebar droite. */
/* Ici, on n’affiche que la colonne centrale  */
/* ---------------------------------------- */
.eportfolio-page {
  /* Si vous gérez les sidebars dans EportfolioView.vue,
     vous pouvez retirer grid-template-columns ici. */
  display: block;
  min-height: 100%;
  padding: 1rem;
}

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

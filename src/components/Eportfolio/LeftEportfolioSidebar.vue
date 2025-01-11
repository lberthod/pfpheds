<template>
    <aside class="left-eportfolio-sidebar">
      <header class="sidebar-header">
        <h2>E-Portfolio</h2>
        <p>Parcours utilisateur</p>
      </header>
  
      <section class="user-profile">
        <h3>Profil</h3>
        <ul>
          <li><strong>Nom :</strong> Jane Doe</li>
          <li><strong>Compétences clés :</strong> Développement Web</li>
          <li><strong>Niveau :</strong> Intermédiaire</li>
        </ul>
      </section>
  
      <section class="pathway-section">
        <h3>Votre Parcours</h3>
        <p>Gestion du "Parthway" (ou plan de progression) pour le e-portfolio :</p>
        <div class="progress-bar">
          <div class="progress-fill" style="width:50%;"></div>
        </div>
        <p>5 objectifs sur 10 atteints</p>
      </section>
    </aside>
  </template>
  
  <script>
  export default {
    name: 'LeftEportfolioSidebar',
    // props: ['userName', 'keySkills', 'progression'] // si besoin de props dynamiques
  };
  </script>
  
  <style scoped>
  .left-eportfolio-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    background-color: #fff;
  }
  
  .sidebar-header {
    text-align: center;
  }
  .sidebar-header h2 {
    margin: 0;
    font-size: 1.4rem;
    color: #2c3e50;
  }
  .sidebar-header p {
    margin: 0.25rem 0 0;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
  
  .user-profile h3,
  .pathway-section h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #34495e;
  }
  
  .user-profile ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  .user-profile li {
    margin-bottom: 0.25rem;
  }
  
  /* Barre de progression */
  .progress-bar {
    background-color: #eee;
    height: 12px;
    border-radius: 6px;
    overflow: hidden;
    margin: 0.5rem 0;
  }
  .progress-fill {
    background-color: #2980b9;
    height: 100%;
    border-radius: 6px 0 0 6px;
  }
  </style>
  
<template>
    <aside class="leftisdebarpedago">
      <header class="pedago-header">
        <h2>Espace Pédagogique</h2>
        <p>Suivi de l’étudiant</p>
      </header>
  
      <section class="user-info">
        <h3>Profil de l’Utilisateur</h3>
        <ul>
          <li><strong>Nom :</strong> John Doe</li>
          <li><strong>Niveau :</strong> Débutant</li>
          <li><strong>Progression :</strong> 30%</li>
        </ul>
      </section>
  
      <section class="progress-section">
        <h3>Avancement Pédagogique</h3>
        <!-- Exemple de petite barre de progression (fictive) -->
        <div class="progress-bar">
          <div class="progress-fill" style="width:30%;"></div>
        </div>
        <p>3 modules complétés sur 10</p>
      </section>
    </aside>
  </template>
  
  <script>
  export default {
    name: 'Leftisdebarpedago',
    // Ici, tu peux recevoir des props si tu veux personnaliser les données :
    // props: ['userName', 'progress'],
  };
  </script>
  
  <style scoped>
  .leftisdebarpedago {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    /* Adaptation pour distinguer clairement la sidebar : */
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
  }
  
  .pedago-header {
    text-align: center;
  }
  .pedago-header h2 {
    margin: 0;
    font-size: 1.4rem;
    color: #2c3e50;
  }
  .pedago-header p {
    margin: 0.25rem 0 0;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
  
  .user-info h3,
  .progress-section h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #34495e;
  }
  
  .user-info ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  .user-info li {
    margin-bottom: 0.25rem;
  }
  
  .progress-bar {
    background-color: #eee;
    height: 12px;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }
  .progress-fill {
    background-color: #2980b9;
    height: 100%;
    border-radius: 6px 0 0 6px;
  }
  </style>
  
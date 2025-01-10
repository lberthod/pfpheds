<template>
    <aside class="rightsidebarepedago">
      <header class="pedago-header">
        <h2>Bonnes Pratiques</h2>
        <p>Cours à distance</p>
      </header>
  
      <section class="tips-section">
        <h3>Conseils pour bien gérer son temps</h3>
        <ul>
          <li>Planifier son emploi du temps chaque semaine.</li>
          <li>Se fixer des objectifs de progression réalistes.</li>
          <li>Faire des pauses régulières pour mieux se concentrer.</li>
        </ul>
      </section>
  
      <section class="tools-section">
        <h3>Ressources utiles</h3>
        <ul>
          <li><a href="https://trello.com/">Trello</a> pour organiser ses tâches.</li>
          <li><a href="https://pomofocus.io/">Pomodoro Timer</a> pour garder le rythme.</li>
          <li><a href="https://www.coursera.org/">Cours en ligne</a> supplémentaires.</li>
        </ul>
      </section>
    </aside>
  </template>
  
  <script>
  export default {
    name: 'Rightsidebarepedago',
    // Ici, tu peux également recevoir des props pour du contenu dynamique
  };
  </script>
  
  <style scoped>
  .rightsidebarepedago {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
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
  
  .tips-section,
  .tools-section {
    margin-bottom: 1rem;
  }
  
  .tips-section h3,
  .tools-section h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #34495e;
  }
  
  .tips-section ul,
  .tools-section ul {
    list-style: disc;
    margin-left: 1.2rem;
    padding-left: 0;
  }
  
  .tips-section li,
  .tools-section li {
    margin-bottom: 0.25rem;
  }
  .tools-section a {
    color: #2980b9;
    text-decoration: none;
  }
  .tools-section a:hover {
    text-decoration: underline;
  }
  </style>
  
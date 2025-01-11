<template>
    <div class="right-falle-sidebar">
      <header>
        <h2>Infos Complémentaires</h2>
      </header>
  
      <section class="info-block">
        <h3>Capacité Totale</h3>
        <p>Environ 120 places (réparties sur 3 salles).</p>
      </section>
  
      <section class="info-block">
        <h3>Planning</h3>
        <p>Consultez le calendrier pour voir la disponibilité.</p>
        <button @click="openCalendar">Ouvrir Calendrier</button>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RightFalleSidebar',
    methods: {
      openCalendar() {
        // Ex. : émettre un événement, ou gérer autrement
        alert('Ouverture du calendrier... (à implémenter)');
      },
    },
  };
  </script>
  
  <style scoped>
  .right-falle-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .right-falle-sidebar header h2 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.2rem;
  }
  
  .info-block h3 {
    margin-bottom: 0.5rem;
    color: #34495e;
  }
  
  .info-block p {
    margin: 0 0 0.75rem 0;
    color: #666;
    font-size: 0.95rem;
  }
  
  .info-block button {
    background-color: #27ae60;
    border: none;
    color: #fff;
    padding: 0.4rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  .info-block button:hover {
    background-color: #1f8f50;
  }
  </style>
  
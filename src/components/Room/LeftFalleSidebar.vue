<template>
    <div class="left-falle-sidebar">
      <header>
        <h2>Menu Salles</h2>
      </header>
  
      <!-- Exemples de sections : filtres, actions, etc. -->
      <section class="filters">
        <h3>Filtres</h3>
        <ul>
          <li @click="selectFilter('all')">Toutes</li>
          <li @click="selectFilter('grandes')">Grandes Salles</li>
          <li @click="selectFilter('moyennes')">Moyennes</li>
          <li @click="selectFilter('petites')">Petites</li>
        </ul>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LeftFalleSidebar',
    methods: {
      selectFilter(filter) {
        // Émet un événement vers le parent (GestionSalleManagement) si besoin
        this.$emit('filter-changed', filter);
      },
    },
  };
  </script>
  
  <style scoped>
  .left-falle-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .left-falle-sidebar header h2 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.2rem;
  }
  
  .filters h3 {
    margin-bottom: 0.5rem;
    color: #34495e;
  }
  .filters ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  .filters li {
    cursor: pointer;
    margin-bottom: 0.25rem;
    color: #2980b9;
  }
  .filters li:hover {
    text-decoration: underline;
  }
  </style>
  
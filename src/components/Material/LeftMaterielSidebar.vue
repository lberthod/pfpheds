<template>
    <div class="left-materiel-sidebar">
      <header>
        <h2>Filtrer le Matériel</h2>
      </header>
  
      <section class="filters">
        <h3>Catégories</h3>
        <ul>
          <!-- "all" => Tous les matériels -->
          <li @click="emitFilter('all')">Tous</li>
          <!-- Quelques exemples, tu peux en ajouter davantage -->
          <li @click="emitFilter('Médical')">Médical</li>
          <li @click="emitFilter('Pédagogique - Vidéo')">Vidéo</li>
          <li @click="emitFilter('Pédagogique - Audio')">Audio</li>
          <li @click="emitFilter('Pédagogique - Informatique')">Informatique</li>
        </ul>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LeftMaterielSidebar',
    methods: {
      emitFilter(filter) {
        this.$emit('filter-changed', filter);
      },
    },
  };
  </script>
  
  <style scoped>
  .left-materiel-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .left-materiel-sidebar header h2 {
    margin: 0;
    color: #2c3e50;
  }
  
  .filters h3 {
    color: #34495e;
    margin-bottom: 0.5rem;
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
  
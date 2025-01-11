<template>
    <div class="right-materiel-sidebar">
      <header>
        <h2>Outils &amp; Statistiques</h2>
      </header>
  
      <section class="stats-section">
        <h3>Statistiques</h3>
        <ul>
          <li>Total matériel : {{ totalMateriel }} pièces</li>
          <li>Matériel médical : {{ medicalCount }}</li>
          <li>Matériel pédagogique : {{ pedagoCount }}</li>
        </ul>
      </section>
  
      <section class="actions-section">
        <h3>Actions Rapides</h3>
        <button @click="importMateriel">Importer Liste</button>
        <button @click="exportMateriel">Exporter CSV</button>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RightMaterielSidebar',
    props: {
      // On peut recevoir des infos depuis parent (ex : computed stats)
      totalMateriel: {
        type: Number,
        default: 0
      },
      medicalCount: {
        type: Number,
        default: 0
      },
      pedagoCount: {
        type: Number,
        default: 0
      },
    },
    methods: {
      importMateriel() {
        alert('Import de la liste de matériel (à implémenter)');
      },
      exportMateriel() {
        alert('Export en CSV (à implémenter)');
      },
    },
  };
  </script>
  
  <style scoped>
  .right-materiel-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .right-materiel-sidebar header h2 {
    margin: 0;
    color: #2c3e50;
  }
  
  .stats-section h3,
  .actions-section h3 {
    margin-bottom: 0.5rem;
    color: #34495e;
  }
  
  .stats-section ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  .stats-section li {
    margin-bottom: 0.25rem;
  }
  
  .actions-section button {
    background-color: #16a085;
    border: none;
    color: #ffffff;
    padding: 0.4rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .actions-section button:hover {
    background-color: #138f76;
  }
  </style>
  
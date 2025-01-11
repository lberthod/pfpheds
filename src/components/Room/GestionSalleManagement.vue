<template>
    <Navbar/>
    <div class="gestion-salle-layout">
      <!-- Barre latérale gauche -->
      <aside class="sidebar-left">
        <LeftFalleSidebar />
      </aside>
  
      <!-- Contenu principal -->
      <main class="main-content">
        <header>
          <h1>Gestion des Salles</h1>
          <p>Page de type "Portfolio" pour présenter, filtrer et gérer les salles.</p>
        </header>
  
        <!-- Exemple : liste en grille, ou tout autre composant -->
        <section class="salles-grid">
          <div v-for="(salle, index) in salles" :key="index" class="salle-card">
            <h2>{{ salle.nom }}</h2>
            <p>{{ salle.description }}</p>
            <!-- Boutons d’actions, etc. -->
            <button @click="handleDetails(salle)">Voir détails</button>
          </div>
        </section>
      </main>
  
      <!-- Barre latérale droite -->
      <aside class="sidebar-right">
        <RightFalleSidebar />
      </aside>
    </div>
  </template>
  
  <script>
  import LeftFalleSidebar from './LeftFalleSidebar.vue';
  import RightFalleSidebar from './RightFalleSidebar.vue';
  import Navbar from '@/components/Utils/Navbar.vue';

  export default {
    name: 'GestionSalleManagement',
    components: {
      LeftFalleSidebar,
      RightFalleSidebar,
      Navbar
    },
    data() {
      return {
        // Exemples de salles, type "portfolio"
        salles: [
          { nom: 'Salle A', description: 'Grande salle de conférence.' },
          { nom: 'Salle B', description: 'Salle de réunion moyenne.' },
          { nom: 'Salle C', description: 'Petit espace pour workshop.' },
        ],
      };
    },
    methods: {
      handleDetails(salle) {
        // Par exemple, ouvrir un composant modal, ou naviguer vers détail
        alert(`Détails de la salle : ${salle.nom}`);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Layout global : 3 colonnes, sidebars gauche/droite et zone centrale */
  .gestion-salle-layout {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr; 
    gap: 1rem;
    min-height: 100vh;
    padding: 1rem;
  }
  
  /* Barres latérales */
  .sidebar-left,
  .sidebar-right {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 1rem;
    overflow-y: auto;
  }
  
  /* Contenu principal */
  .main-content {
    background-color: #fff;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  /* En-tête principal */
  .main-content header h1 {
    margin-top: 0;
    color: #2c3e50;
    font-size: 1.8rem;
  }
  
  /* Grille de salles */
  .salles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 1rem;
  }
  
  .salle-card {
    background-color: #fafafa;
    border-radius: 6px;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  }
  .salle-card h2 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
    color: #34495e;
  }
  .salle-card p {
    margin: 0 0 1rem;
    font-size: 0.95rem;
    color: #666;
  }
  .salle-card button {
    background-color: #2980b9;
    border: none;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  .salle-card button:hover {
    background-color: #1f6391;
  }
  </style>
  
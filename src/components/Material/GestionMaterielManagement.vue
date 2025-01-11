<template>
  <Navbar/>
    <div class="gestion-materiel-layout">
      <!-- Barre latérale gauche -->
      <aside class="sidebar-left">
        <LeftMaterielSidebar @filter-changed="handleFilterChanged" />
      </aside>
  
      <!-- Contenu principal -->
      <main class="main-content">
        <header>
          <h1>Gestion de Matériel</h1>
          <p>Liste du matériel techno-pédagogique ou médical.</p>
        </header>
  
        <!-- Liste du matériel -->
        <section class="materiel-grid">
          <div 
            v-for="(item, index) in filteredMateriel" 
            :key="index" 
            class="materiel-card"
          >
            <h2>{{ item.nom }}</h2>
            <p>{{ item.description }}</p>
            <p><strong>Catégorie :</strong> {{ item.categorie }}</p>
            <button @click="showDetails(item)">Détails</button>
          </div>
        </section>
      </main>
  
      <!-- Barre latérale droite -->
      <aside class="sidebar-right">
        <RightMaterielSidebar />
      </aside>
    </div>
  </template>
  
  <script>
  import LeftMaterielSidebar from './LeftMaterielSidebar.vue';
  import RightMaterielSidebar from './RightMaterielSidebar.vue';
  import Navbar from '@/components/Utils/Navbar.vue';

  export default {
    name: 'GestionMaterielManagement',
    components: {
      LeftMaterielSidebar,
      RightMaterielSidebar,
      Navbar
    },
    data() {
      return {
        // Liste d’exemples de matériel
        materiel: [
          {
            nom: 'Stéthoscope électronique',
            description: 'Stéthoscope numérique à transmission Bluetooth',
            categorie: 'Médical',
          },
          {
            nom: 'Caméra HD + Trépied',
            description: 'Kit vidéo pour enregistrements de cours',
            categorie: 'Pédagogique - Vidéo',
          },
          {
            nom: 'Simulateur de soins',
            description: 'Mannequin haute-fidélité pour exercices pratiques',
            categorie: 'Médical',
          },
          {
            nom: 'Micro-cravate sans fil',
            description: 'Microphone pour captation audio en salle de cours',
            categorie: 'Pédagogique - Audio',
          },
          {
            nom: 'Tablette tactile',
            description: 'Tablette pour usage e-learning et consultation',
            categorie: 'Pédagogique - Informatique',
          },
        ],
        currentFilter: 'all', // Filtre actuel
      };
    },
    computed: {
      // Filtrer la liste en fonction du filtre sélectionné
      filteredMateriel() {
        if (this.currentFilter === 'all') {
          return this.materiel;
        } 
        // Ex. si on veut filtrer par catégorie
        return this.materiel.filter(item => item.categorie === this.currentFilter);
      },
    },
    methods: {
      handleFilterChanged(filter) {
        this.currentFilter = filter;
      },
      showDetails(item) {
        // Exemple : afficher plus d’infos, ou ouvrir un modal, etc.
        alert(`Détails du matériel : ${item.nom}\nCatégorie : ${item.categorie}`);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Layout global (3 colonnes) */
  .gestion-materiel-layout {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    gap: 1rem;
    min-height: 100vh;
    padding: 1rem;
  }
  
  /* Sidebar gauche et droite */
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
  
  .main-content header h1 {
    margin: 0;
    color: #2c3e50;
  }
  
  .materiel-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
  
  /* Carte de matériel */
  .materiel-card {
    background-color: #fafafa;
    border-radius: 6px;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  }
  .materiel-card h2 {
    margin: 0 0 0.5rem;
    font-size: 1.1rem;
    color: #34495e;
  }
  .materiel-card p {
    margin: 0 0 0.5rem;
    color: #666;
  }
  .materiel-card button {
    background-color: #2980b9;
    border: none;
    color: #fff;
    padding: 0.4rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  .materiel-card button:hover {
    background-color: #1f6391;
  }
  </style>
  
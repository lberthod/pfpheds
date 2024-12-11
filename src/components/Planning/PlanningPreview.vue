<template>
            <NavBar />

    <div class="planning-preview">
      <h1>Prévisualisation du Planning</h1>
      <!-- Contenu spécifique à la prévisualisation du planning -->
    </div>
  </template>
  
  <script>
    import NavBar from '../Utils/Navbar.vue'; // Ajustez le chemin si nécessaire

  export default {
    name: 'PlanningPreview',
    components: {
    NavBar, // Enregistrement local du composant NavBar
  },
  };
  </script>
  
  <style scoped>
  .planning-preview {
    padding: 20px;
  }
  </style>
  
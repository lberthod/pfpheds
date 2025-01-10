<!-- src/components/Education/LeftSidebar.vue -->
<template>
  <aside class="left-sidebar">
    <header class="sidebar-header">
      <h2>Littératie en santé digitale</h2>
   </header>

    <nav>
      <ul>
        <li @click="selectIntro">
          <i class="pi pi-info-circle"></i>
          <span>Intro</span>
        </li>
        <li @click="selectVideo(0)">
          <i class="pi pi-play"></i>
          <span>Comment réussir la digitalisation en santé</span>
        </li>
        <li @click="selectVideo(1)">
          <i class="pi pi-chart-line"></i>
          <span>La digitalisation en santé et un historique local</span>
        </li>
        <li @click="selectVideo(2)">
          <i class="pi pi-users"></i>
          <span>Le Dossier Électronique du Patient et CARA</span>
        </li>
        <li @click="selectVideo(3)">
          <i class="pi pi-file"></i>
          <span>L'intelligence artificielle en santé</span>
        </li>
        <li @click="selectApropos">
          <i class="pi pi-info-circle"></i>
          <span>Conclusion</span>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'LeftSidebar',
  methods: {
    selectVideo(index) {
      // Émettre un événement avec l'index de la vidéo sélectionnée
      this.$emit('select-video', index);
    },
    selectApropos() {
      // Émettre un événement pour afficher le composant "À propos"
      this.$emit('select-video', 'apropos');
    },
    selectIntro() {
      // Émettre un événement pour afficher l'introduction
      this.$emit('select-video', 'intro');
    },
  },
};
</script>

<style scoped>
.left-sidebar {
  background-color: #fff;
  padding: 2rem 1.5rem;
  height: 100%;
  color: var(--text-color);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-header h2 {
  margin: 0 0 0.25rem;
  color: var(--primary-color);
}

.sidebar-header p {
  margin: 0;
  font-size: 0.9rem;
  color: #555; /* Couleur légèrement plus foncée pour le texte */
}

/* Navigation */
nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  color: #2c3e50;
  transition: background-color 0.3s, color 0.3s;
}

nav ul li:hover {
  background-color: var(--primary-color-light);
  color: #ffffff;
}

/* Icônes */
nav ul li i {
  font-size: 1.5rem;
  color: var(--primary-color);
  transition: color 0.3s;
}

nav ul li:hover i {
  color: #ffffff;
}

/* Label du menu */
nav ul li span {
  font-size: 1rem;
  font-weight: 500;
}
</style>

<template>
  <aside class="right-eportfolio-sidebar">
    <header class="sidebar-header">
      <h2>Options e-Portfolio</h2>
      <p>Paramètres & Outils</p>
    </header>

    <section class="settings-section">
      <h3>Paramètres Généraux</h3>
      <ul>
        <li>Visibilité : <strong>Privé</strong> <!-- ex. Switch ou bouton pour changer --></li>
        <li>Exporter au format PDF</li>
        <li>Partager avec un recruteur</li>
      </ul>
    </section>

    <section class="tools-section">
      <h3>Outils Intégrés</h3>
      <ul>
        <li>Rédaction & Édition de CV</li>
        <li>Suivi des candidatures</li>
        <li>Gestion des badges de compétences</li>
      </ul>
    </section>
  </aside>
</template>

<script>
export default {
  name: 'RightEportfolioSidebar',
  // props: ['visibility', 'tools'] // si besoin de props dynamiques
};
</script>

<style scoped>
.right-eportfolio-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fff;
}

.sidebar-header {
  text-align: center;
}
.sidebar-header h2 {
  margin: 0;
  font-size: 1.4rem;
  color: #2c3e50;
}
.sidebar-header p {
  margin: 0.25rem 0 0;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.settings-section,
.tools-section {
  margin-bottom: 1rem;
}

.settings-section h3,
.tools-section h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #34495e;
}

.settings-section ul,
.tools-section ul {
  list-style: disc;
  margin-left: 1.2rem;
  padding-left: 0;
}

.settings-section li,
.tools-section li {
  margin-bottom: 0.25rem;
}
</style>

<template>
  <div class="left-game-sidebar">
    <header>
      <h2>Serious Game - Infos</h2>
    </header>

    <section class="instructions">
      <h3>Scénario</h3>
      <p>Vous incarnez un infirmier. Votre patient, M. Dupont, se plaint de maux de tête et de vertiges.</p>
      <p>Complétez les étapes pour collecter le matériel, mesurer ses constantes et prendre la bonne décision.</p>
    </section>

    <section class="tips">
      <h3>Étapes Principales</h3>
      <ul>
        <li>1 : Discussion initiale</li>
        <li>2 : Récupération des outils</li>
        <li>3 : Mesure des constantes</li>
        <li>4 : Choix d’une conduite à tenir</li>
        <li>5 : Feedback final</li>
      </ul>
      <p>Collectez les objets rapidement pour gagner plus de points&nbsp;!</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LeftGameSidebar',
}
</script>

<style scoped>
.left-game-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.left-game-sidebar header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.instructions h3,
.tips h3 {
  margin-bottom: 0.5rem;
  color: #34495e;
}

p, ul, li {
  color: #2c3e50;
}

.tips ul {
  list-style: disc;
  margin-left: 1.2rem;
}
</style>

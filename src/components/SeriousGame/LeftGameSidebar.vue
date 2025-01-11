<template>
    <div class="left-game-sidebar">
      <header>
        <h2>Serious Game - Infos</h2>
      </header>
  
      <section class="instructions">
        <h3>Objectif</h3>
        <p>Déplacez votre cube (avec les flèches ↑ ↓ ← →) et collectez un maximum de pièces.</p>
        <p>Plus votre score est élevé, mieux c’est !</p>
      </section>
  
      <section class="tips">
        <h3>Conseils</h3>
        <ul>
          <li>Restez attentif à la position de la pièce.</li>
          <li>Ajustez la vitesse de déplacement (dans la barre de droite).</li>
          <li>Amusez-vous&nbsp;!</li>
        </ul>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LeftGameSidebar',
  };
  </script>
  
  <style scoped>
  p,ul,li{
    color:black;
  }
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
  
  .tips ul {
    list-style: disc;
    margin-left: 1.2rem;
  }
  </style>
  
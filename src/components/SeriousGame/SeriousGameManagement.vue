<template>
    <div class="serious-game-layout">
      <!-- Barre de navigation globale -->
      <Navbar />
  
      <!-- Layout en 3 colonnes -->
      <div class="game-container">
        <!-- Barre latérale gauche -->
        <aside class="sidebar-left">
          <LeftGameSidebar />
        </aside>
  
        <!-- Contenu principal : zone du jeu -->
        <main class="main-content">
          <h1>Serious Game 2D - Pixel Art</h1>
          <p>Déplacez le cube et collectez la pièce !</p>
  
          <!-- Canvas du jeu -->
          <canvas 
            ref="gameCanvas" 
            width="400" 
            height="300" 
            @keydown="handleKeydown" 
            tabindex="0"
          ></canvas>
        </main>
  
        <!-- Barre latérale droite -->
        <aside class="sidebar-right">
          <RightGameSidebar 
            :score="score"
            :gameSpeed="gameSpeed"
            @change-speed="updateGameSpeed"
          />
        </aside>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Utils/Navbar.vue';
  import LeftGameSidebar from './LeftGameSidebar.vue';
  import RightGameSidebar from './RightGameSidebar.vue';
  
  // Petit helper : position ou dimension random
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  export default {
    name: 'SeriousGameManagement',
    components: {
      Navbar,
      LeftGameSidebar,
      RightGameSidebar,
    },
    data() {
      return {
        // Position du joueur
        playerX: 50,
        playerY: 50,
        // Objet (pièce) à ramasser
        itemX: 200,
        itemY: 150,
        // Score
        score: 0,
        // Vitesse de déplacement
        gameSpeed: 5,
      };
    },
    mounted() {
      // Mettre le focus sur le canvas pour capter les touches
      this.$refs.gameCanvas.focus();
      this.drawGame(); 
    },
    methods: {
      handleKeydown(e) {
        switch (e.key) {
          case 'ArrowUp':
            this.playerY -= this.gameSpeed;
            break;
          case 'ArrowDown':
            this.playerY += this.gameSpeed;
            break;
          case 'ArrowLeft':
            this.playerX -= this.gameSpeed;
            break;
          case 'ArrowRight':
            this.playerX += this.gameSpeed;
            break;
        }
        // Empêcher le scroll de la page
        e.preventDefault();
  
        // Vérifier collisions limites
        if (this.playerX < 0) this.playerX = 0;
        if (this.playerY < 0) this.playerY = 0;
        if (this.playerX > 400 - 16) this.playerX = 400 - 16; // 16 = taille du sprite
        if (this.playerY > 300 - 16) this.playerY = 300 - 16;
  
        // Vérifier si on ramasse l'item
        this.checkCollect();
  
        // Redessiner
        this.drawGame();
      },
      checkCollect() {
        // Simple collision "carrée"
        const playerSize = 16;
        const itemSize = 8;
        const distX = Math.abs((this.playerX + playerSize/2) - (this.itemX + itemSize/2));
        const distY = Math.abs((this.playerY + playerSize/2) - (this.itemY + itemSize/2));
        const maxDist = (playerSize/2 + itemSize/2);
  
        if (distX < maxDist && distY < maxDist) {
          // On ramasse l'objet
          this.score++;
          // Repositionner l'item
          this.itemX = randomInt(0, 400 - itemSize);
          this.itemY = randomInt(0, 300 - itemSize);
        }
      },
      drawGame() {
        const canvas = this.$refs.gameCanvas;
        const ctx = canvas.getContext('2d');
  
        // Effacer
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        // Dessiner le fond
        ctx.fillStyle = '#DDDDDD';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
  
        // Dessiner le joueur (un carré de 16x16 px)
        ctx.fillStyle = '#3498db'; // Bleu
        ctx.fillRect(this.playerX, this.playerY, 16, 16);
  
        // Dessiner la pièce (carré 8x8 px)
        ctx.fillStyle = '#f1c40f'; // Jaune
        ctx.fillRect(this.itemX, this.itemY, 8, 8);
      },
      updateGameSpeed(newSpeed) {
        // Méthode appelée par la sidebar droite
        this.gameSpeed = newSpeed;
      },
    },
  };
  </script>
  
  <style scoped>
  .serious-game-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  /* Container principal (3 colonnes) */
  .game-container {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    gap: 1rem;
    flex: 1;
    padding: 1rem;
    background-color: #f9f9f9;
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
  
  /* Contenu principal (canvas, etc.) */
  .main-content {
    background-color: #fff;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .main-content h1 {
    margin: 0;
    color: #2c3e50;
  }
  
  canvas {
    border: 2px solid #7f8c8d;
    border-radius: 4px;
    outline: none; /* évite un contour quand on focus */
  }
  </style>
  
<template>
    <div class="right-game-sidebar">
      <header>
        <h2>Statistiques & Paramètres</h2>
      </header>
  
      <section class="score-block">
        <h3>Score Actuel</h3>
        <p class="score">{{ score }}</p>
      </section>
  
      <section class="speed-block">
        <h3>Vitesse de déplacement</h3>
        <input 
          type="range" 
          min="1" 
          max="10" 
          v-model="localSpeed"
        />
        <p>{{ localSpeed }}</p>
        <button @click="applySpeed">Appliquer</button>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RightGameSidebar',
    props: {
      score: {
        type: Number,
        default: 0,
      },
      gameSpeed: {
        type: Number,
        default: 5,
      },
    },
    data() {
      return {
        localSpeed: this.gameSpeed, // copie locale pour le <input>
      };
    },
    watch: {
      // Si la prop gameSpeed change, on met à jour la slide
      gameSpeed(newVal) {
        this.localSpeed = newVal;
      },
    },
    methods: {
      applySpeed() {
        this.$emit('change-speed', parseInt(this.localSpeed, 10));
      },
    },
  };
  </script>
  
  <style scoped>
  .right-game-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .right-game-sidebar header h2 {
    margin: 0;
    font-size: 1.2rem;
    color: #2c3e50;
  }
  
  .score-block h3,
  .speed-block h3 {
    margin-bottom: 0.5rem;
    color: #34495e;
  }
  
  .score {
    font-size: 1.8rem;
    font-weight: bold;
    color: #e74c3c;
  }
  
  input[type="range"] {
    width: 100%;
    margin-bottom: 0.25rem;
  }
  button {
    background-color: #27ae60;
    border: none;
    color: #fff;
    padding: 0.4rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #1f8f50;
  }
  </style>
  
<template>
  <div class="right-game-sidebar">
    <header>
      <h2>Navigation & Paramètres</h2>
    </header>

    <div class="step-nav-block">
      <button @click="game.goPrevStep">← Précédent</button>
      <button @click="game.goNextStep">Suivant →</button>
    </div>

    <div class="go-to-step-block">
      <label for="step-select">Aller à l’étape :</label>
      <select id="step-select" v-model="chosenStep" @change="goToSelectedStep">
        <option v-for="step in game.totalSteps" :key="step" :value="step">
          Étape {{ step }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue' // <-- Importer ref depuis Vue
import { useGameStore } from '@/stores/gameStore'

export default {
  name: 'RightGameSidebar',
  setup() {
    const game = useGameStore()

    // Valeur locale pour le <select>
    const chosenStep = ref(game.currentStep)

    // Quand on change la step dans le select
    const goToSelectedStep = () => {
      game.goToStep(chosenStep.value)
    }

    return {
      game,
      chosenStep,
      goToSelectedStep,
    }
  },
}
</script>

<style scoped>
.right-game-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step-nav-block {
  display: flex;
  gap: 0.5rem;
}

.step-nav-block button {
  background-color: #3498db;
  border: none;
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}
.step-nav-block button:hover {
  background-color: #2980b9;
}

.go-to-step-block {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

select {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.2rem 0.4rem;
}
</style>

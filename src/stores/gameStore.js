import { defineStore } from 'pinia'

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max))
}

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    /* Étapes */
    currentStep: 1,
    totalSteps: 5,

    /* Dialogue (étape 1) */
    dialogIndex: 0,
    showDialogue: true,
    dialogLinesStep1: [
      'Infirmier : Bonjour Monsieur Dupont, je suis l’infirmier. Que se passe-t-il ?',
      'M. Dupont : Bonjour… j’ai de gros maux de tête et je me sens un peu étourdi.',
      'Infirmier : D’accord, nous allons voir ça ensemble.',
    ],

    /* Score */
    score: 0,

    /* Positions sur le canvas */
    nurseX: 50,
    nurseY: 50,
    nurseSize: 16,
    nurseSpeed: 3,

    patientX: 280,
    patientY: 130,
    patientSize: 20,

    /* Items pour l’étape 2 */
    itemsList: [
      { name: 'Stéthoscope', color: '#3498db', x: 80, y: 200, width: 14, height: 14, collected: false },
      { name: 'Tensiomètre', color: '#e67e22', x: 200, y: 70, width: 14, height: 14, collected: false },
      { name: 'Thermomètre', color: '#2ecc71', x: 340, y: 240, width: 14, height: 14, collected: false },
    ],

    /* Mesures patient (étape 3) */
    measuredTension: '',
    measuredTemperature: '',
    measuredPulse: '',

    /* Étape 4 : question */
    questionData: {
      question: 'Quelle est la meilleure conduite à tenir ?',
      choices: [
        'Donner un antidouleur simple et repartir',
        'Contrôler à nouveau les constantes, prévenir le médecin',
        'Dire au patient de boire plus d’eau et se reposer',
        'Envoyer le patient directement au service d’imagerie',
      ],
    },

    /* Étape 5 : feedback */
    feedbackTitle: '',
    feedbackText: '',
  }),

  getters: {
    /* Pourcentage de progression */
    progressPercent: (state) => {
      return Math.floor((state.currentStep / state.totalSteps) * 100)
    },
  },

  actions: {
    /* Navigation simple */
    goNextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++
      }
    },
    goPrevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    goToStep(step) {
      if (step >= 1 && step <= this.totalSteps) {
        this.currentStep = step
      }
    },

    /* Réinitialiser le scénario */
    resetScenario() {
      this.currentStep = 1
      this.dialogIndex = 0
      this.showDialogue = true
      this.score = 0
      this.feedbackTitle = ''
      this.feedbackText = ''
      this.measuredTension = ''
      this.measuredTemperature = ''
      this.measuredPulse = ''
      this.nurseX = 50
      this.nurseY = 50
      this.itemsList.forEach(i => { i.collected = false })
    },

    /* Avancer dans le dialogue de l’étape 1 */
    nextDialogueLine() {
      if (this.dialogIndex < this.dialogLinesStep1.length - 1) {
        this.dialogIndex++
      } else {
        this.showDialogue = false
        // on reste sur l'étape 1 : le joueur doit bouger pour valider la "rencontre"
      }
    },
    closeDialogue() {
      this.showDialogue = false
    },

    /* Gestion du déplacement sur le canvas */
    moveNurse(direction) {
      switch (direction) {
        case 'up':
          this.nurseY -= this.nurseSpeed
          break
        case 'down':
          this.nurseY += this.nurseSpeed
          break
        case 'left':
          this.nurseX -= this.nurseSpeed
          break
        case 'right':
          this.nurseX += this.nurseSpeed
          break
      }
      // Empêcher de sortir du canvas
      this.nurseX = clamp(this.nurseX, 0, 400 - this.nurseSize)
      this.nurseY = clamp(this.nurseY, 0, 300 - this.nurseSize)
    },

    /* Vérifie la rencontre du patient (étape 1) */
    checkPatientEncounter() {
      const distX = (this.nurseX + this.nurseSize / 2) - (this.patientX + this.patientSize / 2)
      const distY = (this.nurseY + this.nurseSize / 2) - (this.patientY + this.patientSize / 2)
      const distance = Math.sqrt(distX * distX + distY * distY)
      if (distance < 25 && !this.showDialogue) {
        // On relance la box si besoin
        this.showDialogue = true
      }
    },

    /* Étape 2 : vérifier la collecte des items */
    checkItemsCollection() {
      this.itemsList.forEach(item => {
        if (!item.collected) {
          const overlapX = (this.nurseX < item.x + item.width) && (this.nurseX + this.nurseSize > item.x)
          const overlapY = (this.nurseY < item.y + item.height) && (this.nurseY + this.nurseSize > item.y)
          if (overlapX && overlapY) {
            item.collected = true
          }
        }
      })
      const allCollected = this.itemsList.every(i => i.collected)
      if (allCollected) {
        this.score += 5 // Bonus
        this.goNextStep() // => Étape 3
        // Générer des mesures (étape 3) si on le souhaite tout de suite
        this.generatePatientMeasures()
      }
    },

    /* Génération aléatoire des mesures (étape 3) */
    generatePatientMeasures() {
      const tensionSyst = 120 + Math.floor(Math.random() * 40)
      const tensionDiast = 70 + Math.floor(Math.random() * 20)
      this.measuredTension = `${tensionSyst}/${tensionDiast}`
      const temp = (36.5 + Math.random() * 2.5).toFixed(1)
      this.measuredTemperature = temp
      const pulse = 60 + Math.floor(Math.random() * 60)
      this.measuredPulse = pulse
    },

    /* Étape 4 : question */
    answerQuestion(selectedIndex) {
      if (selectedIndex === 1) {
        this.feedbackTitle = 'Bravo !'
        this.feedbackText = 'Vous avez choisi la meilleure conduite : vérifier encore les constantes et informer le médecin.'
        this.score += 10
      } else {
        this.feedbackTitle = 'Réponse incorrecte'
        this.feedbackText = 'Il est préférable de contrôler à nouveau les constantes et de prévenir un médecin.'
      }
      this.goNextStep() // => Étape 5
    },
  },
})

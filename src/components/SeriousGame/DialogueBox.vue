<template>
    <div class="dialog-overlay">
      <div class="dialog-box">
        <p>{{ currentText }}</p>
        <div class="dialog-actions">
          <button @click="nextLine" v-if="!isLastLine">Suivant</button>
          <button @click="closeDialog" v-else>Terminer</button>
        </div>
        <button class="close-button" @click="closeDialog">×</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DialogueBox',
    props: {
      dialogLines: {
        type: Array,
        default: () => [],
      },
      currentLineIndex: {
        type: Number,
        default: 0,
      },
    },
    computed: {
      currentText() {
        return this.dialogLines[this.currentLineIndex] || ''
      },
      isLastLine() {
        return this.currentLineIndex >= this.dialogLines.length - 1
      },
    },
    methods: {
      nextLine() {
        this.$emit('next-line')
      },
      closeDialog() {
        this.$emit('close-dialog')
      },
    },
  }
  </script>
  
  <style scoped>
  .dialog-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .dialog-box {
    position: relative;
    background-color: #fff;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    width: 80%;
    max-width: 400px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  }
  
  .dialog-box p {
    margin: 0;
    font-size: 1rem;
    color: #2c3e50;
    line-height: 1.5;
  }
  
  .dialog-actions {
    margin-top: 1rem;
    text-align: right;
  }
  .dialog-actions button {
    background-color: #3498db;
    border: none;
    color: #fff;
    padding: 0.4rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 0.5rem;
  }
  .dialog-actions button:hover {
    background-color: #2980b9;
  }
  
  .close-button {
    position: absolute;
    top: 8px; right: 8px;
    background: transparent;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #888;
  }
  .close-button:hover {
    color: #555;
  }
  </style>
  
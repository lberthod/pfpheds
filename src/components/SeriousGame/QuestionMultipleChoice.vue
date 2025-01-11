<template>
    <div class="question-block">
      <h2>{{ question }}</h2>
      <ul>
        <li
          v-for="(choice, index) in choices"
          :key="index"
          @click="chooseAnswer(index)"
        >
          {{ index + 1 }}. {{ choice }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'QuestionMultipleChoice',
    props: {
      question: {
        type: String,
        default: '',
      },
      choices: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      chooseAnswer(index) {
        this.$emit('answer', index)
      },
    },
  }
  </script>
  
  <style scoped>
  .question-block {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .question-block h2 {
    margin: 0;
    color: #2c3e50;
  }
  
  .question-block ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .question-block li {
    background-color: #ecf0f1;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    color: #2c3e50;
    border: 1px solid #bdc3c7;
  }
  
  .question-block li:hover {
    background-color: #bdc3c7;
  }
  </style>
  
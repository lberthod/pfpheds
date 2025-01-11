<!-- sections/Reflections/ReflectionEntry.vue -->
<template>
  <div class="reflection-entry">
    <h3>Add a New Reflection</h3>
    <textarea
      v-model="text"
      placeholder="Write your thoughts here..."
      rows="4"
    ></textarea>
    <button @click="submitReflection" :disabled="!text.trim()">
      Submit
    </button>
  </div>
</template>

<script>
export default {
  name: 'ReflectionEntry',
  emits: ['onSubmit'],
  data() {
    return {
      text: ''
    };
  },
  methods: {
    submitReflection() {
      if (!this.text.trim()) return;
      // Emit the reflection text back to the parent
      this.$emit('onSubmit', this.text.trim());
      // Clear the text after submission
      this.text = '';
    }
  }
};
</script>

<style scoped>
.reflection-entry {
  border: 1px solid #ddd;
  background-color: #fff;
  padding: 1rem;
  border-radius: 6px;
  color: #000; /* Force text to black */
  margin-bottom: 1rem;
}

.reflection-entry textarea {
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.reflection-entry button {
  background-color: #2980b9;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 1rem;
  cursor: pointer;
}

.reflection-entry button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}
</style>

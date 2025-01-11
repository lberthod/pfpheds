<!-- sections/Reflections/ReflectionList.vue -->
<template>
  <div class="reflection-list">
    <h3>My Reflections</h3>
    <ul>
      <li v-for="(refText, index) in reflections" :key="index">
        <p>{{ refText }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ReflectionList',
  props: {
    reflections: {
      type: Array,
      default: () => []
      // Example: ['Reflection #1', 'Reflection #2'...]
    }
  }
};
</script>

<style scoped>
.reflection-list {
  color: #000; /* Force text to black */
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fff;
  padding: 1rem;
}

.reflection-list h3 {
  margin: 0 0 0.5rem;
}

.reflection-list ul {
  list-style: disc;
  margin-left: 1.5rem;
  padding-left: 0;
}

.reflection-list li {
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
</style>

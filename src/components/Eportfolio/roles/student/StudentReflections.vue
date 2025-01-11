<!-- roles/student/StudentReflections.vue -->
<template>
  <div class="student-reflections">
    <h2>My Reflections</h2>
    <p>Write and review personal reflections on your practical experiences.</p>

    <!-- Use ReflectionEntry and ReflectionList -->
    <ReflectionEntry @onSubmit="addReflection" />
    <ReflectionList :reflections="reflections" />
  </div>
</template>

<script>
import ReflectionEntry from '@/components/Eportfolio/sections/Reflections/ReflectionEntry.vue';
import ReflectionList from '@/components/Eportfolio/sections/Reflections/ReflectionList.vue';

export default {
  name: 'StudentReflections',
  components: {
    ReflectionEntry,
    ReflectionList
  },
  data() {
    return {
      reflections: [
        'Learned about aseptic technique in a real-world scenario.',
        'Had an opportunity to lead a patient admission briefing today.'
      ]
    };
  },
  methods: {
    addReflection(newReflection) {
      this.reflections.push(newReflection);
    }
  }
};
</script>

<style scoped>
.student-reflections {
  padding: 1rem;
  color: #000; /* Force text to black */
}

.student-reflections h2 {
  margin-top: 0;
}
</style>

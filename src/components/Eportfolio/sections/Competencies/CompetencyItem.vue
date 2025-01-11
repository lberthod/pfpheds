<!-- sections/Competencies/CompetencyItem.vue -->
<template>
  <div class="competency-item">
    <h3>{{ competency.title }}</h3>
    <p>Status: <strong>{{ competency.status }}</strong></p>
    <p>{{ competency.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'CompetencyItem',
  props: {
    competency: {
      type: Object,
      required: true
      /*
        Example of a competency object:
        {
          title: 'Vital Signs Measurement',
          status: 'In Progress' or 'Validated',
          description: 'Ability to measure and interpret vital signs.'
        }
      */
    }
  }
};
</script>

<style scoped>
.competency-item {
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  color: #000; /* Force text to black */
}

.competency-item h3 {
  margin: 0 0 0.3rem;
  font-size: 1.2rem;
}
</style>

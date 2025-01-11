<!-- sections/Competencies/CompetencyOverview.vue -->
<template>
  <div class="competency-overview">
    <h2>Competency Overview</h2>
    <p>Review the list of competencies below:</p>

    <div class="competency-list">
      <CompetencyItem
        v-for="(comp, idx) in competencies"
        :key="idx"
        :competency="comp"
      />
    </div>
  </div>
</template>

<script>
// Import your CompetencyItem component
import CompetencyItem from './CompetencyItem.vue';

export default {
  name: 'CompetencyOverview',
  components: {
    CompetencyItem
  },
  props: {
    competencies: {
      type: Array,
      default: () => []
      /*
        Example of a competencies array:
        [
          { title: 'Vital Signs Measurement', status: 'In Progress', description: '...' },
          { title: 'Patient Communication', status: 'Validated', description: '...' }
        ]
      */
    }
  }
};
</script>

<style scoped>
.competency-overview {
  color: #000; /* Text in black */
}

.competency-list {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>

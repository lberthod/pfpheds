<!-- roles/student/StudentCompetencies.vue -->
<template>
  <div class="student-competencies">
    <h2>My Competencies</h2>
    <p>View or declare your acquired nursing competencies here.</p>

    <!-- Using CompetencyOverview with a local array of competencies -->
    <CompetencyOverview :competencies="studentCompetencies" />
  </div>
</template>

<script>
import CompetencyOverview from '@/components/Eportfolio/sections/Competencies/CompetencyOverview.vue';

export default {
  name: 'StudentCompetencies',
  components: { CompetencyOverview },
  data() {
    return {
      studentCompetencies: [
        {
          title: 'Vital Signs Measurement',
          status: 'In Progress',
          description: 'Ability to measure and interpret heart rate, blood pressure, etc.'
        },
        {
          title: 'Medication Administration',
          status: 'Validated',
          description: 'Safe and accurate medication dispensing.'
        }
      ]
    };
  }
};
</script>

<style scoped>
.student-competencies {
  padding: 1rem;
  color: #000; /* Force text to black */
}
</style>

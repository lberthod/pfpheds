<!-- roles/student/StudentPortfolioView.vue -->
<template>
  <div class="student-portfolio-view">
    <h2>My E-Portfolio</h2>
    <p>Access your Projects, Competencies, and Reflections from this main view.</p>
    <!-- Example of potential quick links or summary info -->
    <div class="portfolio-summary">
      <ul>
        <li>Projects: {{ projectCount }}</li>
        <li>Competencies validated: {{ competenciesValidated }}</li>
        <li>Reflections written: {{ reflectionsCount }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StudentPortfolioView',
  setup() {
    // Example data placeholders
    const projectCount = 5;
    const competenciesValidated = 12;
    const reflectionsCount = 7;

    return {
      projectCount,
      competenciesValidated,
      reflectionsCount,
    };
  },
};
</script>

<style scoped>
.student-portfolio-view {
  padding: 1rem;
  color: #000; /* Force text to black */
}

.portfolio-summary {
  margin-top: 1rem;
}

.portfolio-summary ul {
  list-style-type: none;
  padding-left: 0;
}
</style>

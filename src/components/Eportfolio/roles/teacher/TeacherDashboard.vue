<!-- roles/teacher/TeacherDashboard.vue -->
<template>
  <div class="teacher-dashboard">
    <h2>Teacher Dashboard</h2>
    <p>Overview of your classes, student lists, and upcoming tasks.</p>

    <section class="stats-section">
      <div class="stats-card">
        <h3>Total Students</h3>
        <p>{{ totalStudents }}</p>
      </div>

      <div class="stats-card">
        <h3>Active Pathways</h3>
        <p>{{ activePathways }}</p>
      </div>

      <div class="stats-card">
        <h3>Pending Reviews</h3>
        <p>{{ pendingReviews }}</p>
      </div>
    </section>

    <section class="quick-links">
      <h3>Quick Links</h3>
      <ul>
        <li><router-link to="/eportfolio/teacher/portfolio-review">Review Portfolios</router-link></li>
        <li><router-link to="/eportfolio/teacher/pathway-manager">Manage Pathways</router-link></li>
        <li><router-link to="/eportfolio/teacher/competency-grid">Competency Grid</router-link></li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TeacherDashboard',
  setup() {
    // Exemple de données statiques, à remplacer par des données réelles
    const totalStudents = 25;
    const activePathways = 3;
    const pendingReviews = 5;

    return {
      totalStudents,
      activePathways,
      pendingReviews,
    };
  },
};
</script>

<style scoped>
.teacher-dashboard {
  padding: 1rem;
  color: #000; /* Texte en noir */
}

.stats-section {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
}

.stats-card {
  flex: 1;
  background: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  text-align: center;
  border-radius: 8px;
}

.stats-card h3 {
  margin-bottom: 0.5rem;
}

.stats-card p {
  font-size: 1.4rem;
  color: #2980b9;
}

.quick-links h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.quick-links ul {
  list-style: none;
  padding-left: 0;
}

.quick-links li {
  margin-bottom: 0.5rem;
}
</style>

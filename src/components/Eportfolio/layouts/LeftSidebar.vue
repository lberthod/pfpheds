<template>
  <aside class="left-sidebar">
    <h2 class="sidebar-title">Menu</h2>
    <nav>
      <ul>
        <!-- Liens communs -->
        <li>
          <router-link to="/eportfolio">Home</router-link>
        </li>
        <li>
          <router-link to="/eportfolio/management">Management</router-link>
        </li>

        <!-- Etudiant -->
        <li class="section-header">Student</li>
        <li><router-link to="/eportfolio/student/dashboard">Dashboard</router-link></li>
        <li><router-link to="/eportfolio/student/portfolio">Portfolio</router-link></li>
        <li><router-link to="/eportfolio/student/projects">Projects</router-link></li>
        <li><router-link to="/eportfolio/student/competencies">Competencies</router-link></li>
        <li><router-link to="/eportfolio/student/reflections">Reflections</router-link></li>
        <li><router-link to="/eportfolio/student/pathway">Pathway</router-link></li>
        <li><router-link to="/eportfolio/student/evidence">Evidence Uploader</router-link></li>
        <li><router-link to="/eportfolio/student/certifications">Certifications</router-link></li>

        <!-- Enseignant -->
        <li class="section-header">Teacher</li>
        <li><router-link to="/eportfolio/teacher/dashboard">Dashboard</router-link></li>
        <li><router-link to="/eportfolio/teacher/portfolio-review">Review Portfolios</router-link></li>
        <li><router-link to="/eportfolio/teacher/competency-grid">Competency Grid</router-link></li>
        <li><router-link to="/eportfolio/teacher/feedback">Feedback</router-link></li>
        <li><router-link to="/eportfolio/teacher/pathway-manager">Pathway Manager</router-link></li>

        <!-- Practitioner -->
        <li class="section-header">Practitioner</li>
        <li><router-link to="/eportfolio/practitioner/dashboard">Dashboard</router-link></li>
        <li><router-link to="/eportfolio/practitioner/stage-validation">Stage Validation</router-link></li>
        <li><router-link to="/eportfolio/practitioner/feedback">Feedback</router-link></li>

        <!-- Admin -->
        <li class="section-header">Admin</li>
        <li><router-link to="/eportfolio/admin/dashboard">Dashboard</router-link></li>
        <li><router-link to="/eportfolio/admin/pathway-overview">Pathway Overview</router-link></li>
        <li><router-link to="/eportfolio/admin/global-view">Global View</router-link></li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
</script>

<style scoped>
.left-sidebar {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  color: #000; /* Texte en noir */
}

.sidebar-title {
  margin-top: 0;
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

nav ul {
  list-style-type: none;
  padding-left: 0;
}

nav li {
  margin-bottom: 0.5rem;
}

.section-header {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #000;
}
</style>

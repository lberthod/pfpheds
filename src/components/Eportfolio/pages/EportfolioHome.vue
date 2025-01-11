<!-- pages/EportfolioHome.vue -->
<template>
  <div class="eportfolio-home">
    <header class="header-section">
      <h2>Welcome to Your E-Portfolio</h2>
      <p class="subtitle">A quick overview of global statistics and helpful links</p>
    </header>

    <section class="stats-section">
      <div class="stats-card">
        <h3>Total Projects</h3>
        <p>{{ totalProjects }}</p>
      </div>

      <div class="stats-card">
        <h3>Completed Pathways</h3>
        <p>{{ completedPathways }}</p>
      </div>

      <div class="stats-card">
        <h3>Pending Feedback</h3>
        <p>{{ pendingFeedback }}</p>
      </div>
    </section>

    <section class="links-section">
      <h3>Quick Links</h3>
      <ul>
        <li><router-link to="/eportfolio/management">Manage E-Portfolio</router-link></li>
        <li><router-link to="/eportfolio/student">Student Dashboard</router-link></li>
        <li><router-link to="/eportfolio/teacher">Teacher Dashboard</router-link></li>
        <!-- ... add more links as needed -->
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'EportfolioHome',
  setup() {
    // Example reactive data
    const totalProjects = 8;           // Or fetch from store or API
    const completedPathways = 2;       // ...
    const pendingFeedback = 5;         // ...

    return {
      totalProjects,
      completedPathways,
      pendingFeedback
    };
  }
};
</script>

<style scoped>
.eportfolio-home {
  padding: 1rem;
  background-color: #fafafa;
}

.header-section h2 {
  margin: 0;
  font-size: 1.8rem;
  color: #2c3e50;
}
.subtitle {
  font-size: 1rem;
  color: #7f8c8d;
  margin-top: 0.5rem;
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

.links-section h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
.links-section ul {
  list-style: none;
  padding-left: 0;
}
.links-section li {
  margin-bottom: 0.5rem;
}
</style>

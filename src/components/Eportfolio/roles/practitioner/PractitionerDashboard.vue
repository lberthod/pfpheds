<!-- roles/practitioner/PractitionerDashboard.vue -->
<template>
  <div class="practitioner-dashboard">
    <h2>Practitioner Dashboard</h2>
    <p>
      Overview of your assigned students, upcoming evaluations, and any urgent
      alerts from clinical settings.
    </p>

    <section class="stats-section">
      <div class="stats-card">
        <h3>Total Stagiaires</h3>
        <p>{{ totalTrainees }}</p>
      </div>

      <div class="stats-card">
        <h3>Scheduled Evaluations</h3>
        <p>{{ scheduledEvaluations }}</p>
      </div>
    </section>

    <section class="trainees-list">
      <h3>Current Stagiaires</h3>
      <ul>
        <li v-for="(t, index) in trainees" :key="index">
          {{ t }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PractitionerDashboard',
  data() {
    return {
      totalTrainees: 5,
      scheduledEvaluations: 2,
      trainees: ['Alice Dupont', 'Bob Martin', 'Charlie Durand', 'Diane Leroy', 'Ethan Moreau'],
    };
  },
};
</script>

<style scoped>
.practitioner-dashboard {
  padding: 1rem;
  color: #000; /* Force text to black */
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

.trainees-list h3 {
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}

.trainees-list ul {
  list-style: none;
  padding: 0;
}
</style>

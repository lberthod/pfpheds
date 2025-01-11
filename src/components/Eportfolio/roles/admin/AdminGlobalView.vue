<!-- roles/admin/AdminGlobalView.vue -->
<template>
  <div class="admin-global-view">
    <h2>Global Institution View</h2>
    <p>Key metrics for the entire institution: promotions, success rates, etc.</p>

    <section class="metrics-section">
      <div class="metric-card" v-for="(metric, idx) in globalMetrics" :key="idx">
        <h3>{{ metric.title }}</h3>
        <p class="metric-value">{{ metric.value }}</p>
        <small>{{ metric.description }}</small>
      </div>
    </section>

    <section class="chart-area">
      <h3>Enrollment Over Time (Placeholder)</h3>
      <div class="chart-placeholder">
        <!-- Imagine a chart or graph here -->
        <p>Chart/Graph Placeholder</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AdminGlobalView',
  data() {
    return {
      globalMetrics: [
        {
          title: 'Current Promotions',
          value: 4,
          description: 'Active annual cohorts in the institution.'
        },
        {
          title: 'Overall Success Rate',
          value: '89%',
          description: 'Based on final year passing rates.'
        },
        {
          title: 'Avg Student-Teacher Ratio',
          value: '12:1',
          description: 'Institution-wide average ratio.'
        }
      ]
    };
  }
};
</script>

<style scoped>
.admin-global-view {
  padding: 1rem;
  color: #000; /* black text */
}

.metrics-section {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.metric-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  flex: 1;
  text-align: center;
}

.metric-card h3 {
  margin: 0 0 0.3rem;
  font-size: 1.1rem;
}

.metric-value {
  font-size: 1.6rem;
  color: #2980b9;
  margin-bottom: 0.4rem;
}

.chart-area {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}

.chart-placeholder {
  border: 2px dashed #ccc;
  border-radius: 6px;
  padding: 2rem;
  text-align: center;
  margin-top: 1rem;
  color: #555;
}
</style>

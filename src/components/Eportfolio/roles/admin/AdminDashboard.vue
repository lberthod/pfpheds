<!-- roles/admin/AdminDashboard.vue -->
<template>
  <div class="admin-dashboard">
    <h2>Admin Dashboard</h2>
    <p>Access key metrics about all courses, users, roles, etc.</p>

    <section class="stats-section">
      <div class="stats-card">
        <h3>Total Users</h3>
        <p>{{ totalUsers }}</p>
      </div>

      <div class="stats-card">
        <h3>Active Courses</h3>
        <p>{{ activeCourses }}</p>
      </div>

      <div class="stats-card">
        <h3>Pending Approvals</h3>
        <p>{{ pendingApprovals }}</p>
      </div>
    </section>

    <section class="quick-links">
      <h3>Quick Actions</h3>
      <ul>
        <li>
          <button @click="gotoUserManagement">Manage Users</button>
        </li>
        <li>
          <button @click="gotoPathwayOverview">View Pathways</button>
        </li>
        <li>
          <button @click="gotoGlobalView">Global Metrics</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      // Placeholder stats
      totalUsers: 120,
      activeCourses: 8,
      pendingApprovals: 3
    };
  },
  methods: {
    gotoUserManagement() {
      alert('Navigating to user management...');
      // this.$router.push({ name: 'UserList' }) // or some admin route
    },
    gotoPathwayOverview() {
      alert('Navigating to pathway overview...');
      // this.$router.push({ name: 'AdminPathwayOverview' })
    },
    gotoGlobalView() {
      alert('Navigating to global view...');
      // this.$router.push({ name: 'AdminGlobalView' })
    }
  }
};
</script>

<style scoped>
.admin-dashboard {
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
  margin-bottom: 0.4rem;
  font-size: 1.1rem;
}

.stats-card p {
  font-size: 1.4rem;
  color: #2980b9;
}

.quick-links {
  margin-top: 2rem;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
}

.quick-links h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.quick-links ul {
  list-style-type: none;
  padding-left: 0;
}

.quick-links li {
  margin-bottom: 0.8rem;
}

.quick-links button {
  background-color: #2c3e50;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.quick-links button:hover {
  background-color: #34495e;
}
</style>

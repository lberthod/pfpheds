<template>
  <div class="eportfolio-management">
    <header class="management-header">
      <h2>E-Portfolio Management</h2>
      <p class="management-subtitle">Configure global settings for your e-portfolio system.</p>
    </header>

    <section class="admin-options">
      <!-- Exemples de cartes de gestion -->
      <div class="option-card">
        <h3>Manage Roles & Users</h3>
        <p>Create, edit, or deactivate user accounts.</p>
        <button @click="goToUserManagement">Go to Users</button>
      </div>
      <div class="option-card">
        <h3>Review Projects</h3>
        <p>Approve or archive student projects.</p>
        <button @click="reviewProjects">Review</button>
      </div>
      <div class="option-card">
        <h3>Pathway Configuration</h3>
        <p>Set up new pathways or milestones.</p>
        <button @click="configurePathways">Configure</button>
      </div>
    </section>

    <!-- Maintenance Mode -->
    <section class="maintenance-section">
      <h3>Maintenance Mode</h3>
      <p>
        <input
          type="checkbox"
          id="maintenance"
          v-model="maintenanceMode"
          @change="toggleMaintenance"
        />
        <label for="maintenance">Enable Maintenance</label>
      </p>
      <p>Maintenance is <strong>{{ maintenanceMode ? 'ON' : 'OFF' }}</strong></p>
      <div v-if="loading" class="loading">Updating...</div>
      <div v-else-if="error" class="error">Error: {{ error }}</div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db, auth } from '@/firebase.js';
import { ref as dbRef, onValue, set } from 'firebase/database';

const maintenanceMode = ref(false);
const loading = ref(false);
const error = ref('');

/** Récupère la valeur initiale de "maintenance mode" */
function fetchMaintenanceSetting() {
  loading.value = true;
  const settingsRef = dbRef(db, 'eportfolio/settings/maintenance');
  onValue(settingsRef, snapshot => {
    if (snapshot.exists()) {
      maintenanceMode.value = !!snapshot.val();
    }
    loading.value = false;
  }, err => {
    error.value = err.message;
    loading.value = false;
  });
}

/** Toggle la valeur du mode maintenance dans la DB */
async function toggleMaintenance() {
  try {
    loading.value = true;
    const settingsRef = dbRef(db, 'eportfolio/settings/maintenance');
    await set(settingsRef, maintenanceMode.value);
    loading.value = false;
  } catch (err) {
    error.value = err.message;
    loading.value = false;
  }
}

// Boutons de navigation fictifs
function goToUserManagement() {
  alert('Navigating to user management...');
}
function reviewProjects() {
  alert('Navigating to project review...');
}
function configurePathways() {
  alert('Navigating to pathway configuration...');
}

onMounted(() => {
  const user = auth.currentUser;
  if (!user) {
    error.value = 'Not logged in.';
    return;
  }
  fetchMaintenanceSetting();
});
</script>

<style scoped>
.eportfolio-management {
  padding: 1rem;
  color: #000;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.management-header {
  text-align: center;
}
.management-subtitle {
  color: #7f8c8d;
  margin-top: 0.5rem;
}
.admin-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}
.option-card {
  background-color: #fafafa;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 1rem;
  text-align: center;
}
.maintenance-section {
  margin-top: 2rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
}
.loading {
  color: #555;
}
.error {
  color: red;
}
</style>

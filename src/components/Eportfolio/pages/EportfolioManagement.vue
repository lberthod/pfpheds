<!-- pages/EportfolioManagement.vue -->
<template>
  <div class="eportfolio-management">
    <header class="management-header">
      <h2>E-Portfolio Management</h2>
      <p class="management-subtitle">
        Configure and oversee global settings for your e-portfolio system.
      </p>
    </header>

    <section class="admin-options">
      <div class="option-card" v-for="(option, idx) in managementOptions" :key="idx">
        <h3>{{ option.title }}</h3>
        <p>{{ option.description }}</p>
        <button class="manage-btn" @click="option.action">
          {{ option.buttonText }}
        </button>
      </div>
    </section>

    <section class="advanced-settings">
      <h3>Advanced Settings (Example)</h3>
      <label for="maintenance">Maintenance Mode:</label>
      <input
        id="maintenance"
        type="checkbox"
        v-model="maintenanceMode"
        @change="toggleMaintenance"
      />
      <p class="maintenance-info">
        Maintenance mode is <strong>{{ maintenanceMode ? 'ENABLED' : 'DISABLED' }}</strong>.
      </p>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'EportfolioManagement',
  setup() {
    // Example state
    const maintenanceMode = ref(false);

    // Example list of management options
    const managementOptions = [
      {
        title: 'Manage Roles & Users',
        description: 'Create, edit, or deactivate user accounts and roles.',
        buttonText: 'Go to Users',
        action: () => alert('Navigating to user management page...')
      },
      {
        title: 'Review Projects',
        description: 'Approve, archive, or mass-update project statuses.',
        buttonText: 'Review',
        action: () => alert('Navigating to project review page...')
      },
      {
        title: 'Pathway Configuration',
        description: 'Set up new pathways, define milestones, or clone existing ones.',
        buttonText: 'Configure',
        action: () => alert('Navigating to pathway configuration page...')
      },
      // Add more options as needed
    ];

    const toggleMaintenance = () => {
      alert(`Maintenance mode is now: ${maintenanceMode.value ? 'ON' : 'OFF'}`);
      // Possibly make an API call or update the store
    };

    return {
      maintenanceMode,
      managementOptions,
      toggleMaintenance
    };
  }
};
</script>

<style scoped>
.eportfolio-management {
  padding: 1rem;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.management-header h2 {
  margin: 0;
  font-size: 1.8rem;
  color: #2c3e50;
}
.management-subtitle {
  margin-top: 0.5rem;
  color: #7f8c8d;
  font-size: 1rem;
}

.admin-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
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
.option-card h3 {
  margin: 0 0 0.5rem 0;
}
.manage-btn {
  margin-top: 1rem;
  background-color: #2c3e50;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.manage-btn:hover {
  background-color: #34495e;
}

.advanced-settings {
  margin-top: 2rem;
  padding: 1rem;
  border-top: 1px solid #ddd;
}
.maintenance-info {
  margin: 0.5rem 0 0;
}
</style>

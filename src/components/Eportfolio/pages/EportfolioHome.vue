<template>
  <div class="eportfolio-home">
    <header class="header-section">
      <h2>Welcome to Your E-Portfolio</h2>
      <p class="subtitle">Quick overview of your stats & helpful links</p>
    </header>

    <!-- Indicateur de chargement ou d'erreur -->
    <div v-if="loading" class="loading">Loading data...</div>
    <div v-else-if="error" class="error">Error: {{ error }}</div>
    <div v-else>
      <!-- Statistiques simples -->
      <section class="stats-section">
        <div class="stats-card">
          <h3>Total Projects</h3>
          <p>{{ totalProjects }}</p>
        </div>
        <div class="stats-card">
          <h3>Competencies</h3>
          <p>{{ totalCompetencies }}</p>
        </div>
        <div class="stats-card">
          <h3>Reflections</h3>
          <p>{{ totalReflections }}</p>
        </div>
      </section>

      <!-- Quelques liens rapides -->
      <section class="links-section">
        <h3>Quick Links</h3>
        <ul>
          <li>
            <router-link to="/eportfolio/management">Manage E-Portfolio</router-link>
          </li>
          <li>
            <router-link to="/eportfolio/student/dashboard">Student Dashboard</router-link>
          </li>
          <li>
            <router-link to="/eportfolio/teacher/dashboard">Teacher Dashboard</router-link>
          </li>
          <li>
            <router-link to="/eportfolio/practitioner/dashboard">Practitioner Dashboard</router-link>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db, auth } from '@/firebase.js';
import {
  ref as dbRef,
  get,
  child
} from 'firebase/database';

const loading = ref(false);
const error = ref('');
const totalProjects = ref(0);
const totalCompetencies = ref(0);
const totalReflections = ref(0);

/**
 * Charge un résumé : nombre de projets, compétences, réflexions
 */
async function loadHomeData() {
  const user = auth.currentUser;
  if (!user) {
    error.value = 'Not logged in.';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const rootRef = dbRef(db);
    const uid = user.uid;

    const [snapProj, snapComp, snapRefl] = await Promise.all([
      get(child(rootRef, `eportfolio/projects/${uid}`)),
      get(child(rootRef, `eportfolio/competencies/${uid}`)),
      get(child(rootRef, `eportfolio/reflections/${uid}`))
    ]);

    totalProjects.value = snapProj.exists() ? Object.keys(snapProj.val()).length : 0;
    totalCompetencies.value = snapComp.exists() ? Object.keys(snapComp.val()).length : 0;
    totalReflections.value = snapRefl.exists() ? Object.keys(snapRefl.val()).length : 0;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadHomeData();
});
</script>

<style scoped>
.eportfolio-home {
  padding: 1rem;
  background-color: #f0f2f5;
  color: #000;
}
.header-section {
  text-align: center;
  margin-bottom: 1rem;
}
.subtitle {
  color: #7f8c8d;
  margin-top: 0.5rem;
}
.loading {
  color: #555;
}
.error {
  color: red;
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

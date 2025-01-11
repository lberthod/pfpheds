<template>
            <NavBar />

    <div class="planning-view">

      <h1>Gestion de Planning</h1>
      <div class="button-container">
        <button @click="goToAdminDashboard">Dashboard Planning Admin</button>
        <button @click="goToTeacherDashboard">Dashboard Enseignant</button>
        <button @click="goToRMModule">Page RM Module</button>
        <button @click="goToPlanningPreview">Prévisualisation du Planning</button>
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  import NavBar from '../Utils/Navbar.vue'; // Ajustez le chemin si nécessaire

  export default {
    name: 'PlanningView',
    components: {
    NavBar, // Enregistrement local du composant NavBar
  },
    setup() {
      const router = useRouter();
  
      const goToAdminDashboard = () => {
        router.push({ name: 'AdminDashboard' });
      };
  
      const goToTeacherDashboard = () => {
        router.push({ name: 'TeacherDashboard' });
      };
  
      const goToRMModule = () => {
        router.push({ name: 'RMModulePage' });
      };
  
      const goToPlanningPreview = () => {
        router.push({ name: 'PlanningPreview' });
      };
  
      return {
        goToAdminDashboard,
        goToTeacherDashboard,
        goToRMModule,
        goToPlanningPreview,
      };
    },
  };
  </script>
  
  <style scoped>
  .planning-view {
    text-align: center;
    margin-top: 50px;
  }
  
  .button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .button-container button {
    margin: 10px;
    padding: 15px 30px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  
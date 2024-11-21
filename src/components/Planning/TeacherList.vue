<template>        <NavBar />

    <div class="teacher-list-display">
      <h1>Liste des Enseignants</h1>
      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Taux Horaire (€)</th>
            <th>Heures Totales</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teacher in teachers" :key="teacher.key">
            <td>{{ teacher.firstName }}</td>
            <td>{{ teacher.lastName }}</td>
            <td>{{ teacher.hourlyRate.toFixed(2) }}</td>
            <td>{{ teacher.totalHours }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { db } from '../../../firebase';
  import { onValue, ref as firebaseRef } from 'firebase/database';
  import NavBar from '../Utils/Navbar.vue'; // Ajustez le chemin si nécessaire

  export default {
    name: 'TeacherList',
    components: {
    NavBar, // Enregistrement local du composant NavBar
  },
    setup() {
      const teachers = ref([]);
  
      const loadTeachers = () => {
        const teachersRef = firebaseRef(db, 'teachers');
        onValue(teachersRef, (snapshot) => {
          const data = snapshot.val();
          const teacherList = [];
          if (data) {
            Object.keys(data).forEach((key) => {
              teacherList.push({ key, ...data[key] });
            });
          }
          teachers.value = teacherList;
        }, (error) => {
          console.error('Erreur lors de la récupération des enseignants:', error);
        });
      };
  
      onMounted(() => {
        loadTeachers();
      });
  
      return {
        teachers
      };
    }
  };
  </script>
  
  <style scoped>
  .teacher-list-display {
    padding: 30px;
    background-color: var(--background-color);
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
  }
  
  .teacher-list-display h1 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 20px;
  }
  
  .teacher-list-display table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--header-bg);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    overflow: hidden;
    color: var(--text-color);
  }
  
  .teacher-list-display th, .teacher-list-display td {
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
  }
  
  .teacher-list-display th {
    background-color: var(--primary-color);
    color: #fff;
    font-size: 1em;
  }
  
  .teacher-list-display tr:nth-child(even) {
    background-color: var(--highlight-color);
  }
  
  .teacher-list-display tr:hover {
    background-color: #2a2a2a;
  }
  </style>
  
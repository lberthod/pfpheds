<template>
            <NavBar />

    <div class="teacher-sheet">
      <h1>Feuille de {{ teacherName }}</h1>
      
      <!-- Bouton pour revenir au Dashboard Enseignant -->
      <div class="back-button-container">
        <router-link to="/" class="back-button">
          <i class="fas fa-arrow-left"></i> Retour au Dashboard
        </router-link>
      </div>
      
      <!-- Liste des cours de l'enseignant -->
      <div class="course-list">
        <h2>Cours Assignés</h2>
        <table>
          <thead>
            <tr>
              <th>Semaine</th>
              <th>Date</th>
              <th>Titre du Cours</th>
              <th>Horaire</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in teacherCourses" :key="course.key">
              <td>{{ getWeekNumber(course.date) }}</td>
              <td>{{ formatDate(course.date) }}</td>
              <td>{{ course.title }}</td>
              <td>{{ course.schedule }}</td>
              <td>
                <button @click="deleteCourse(course.key)" class="delete-button">
                  <i class="fas fa-trash-alt"></i> Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="teacherCourses.length === 0" class="no-courses">
          Aucun cours assigné pour cet enseignant cette semaine.
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { db } from '../../../firebase'; // Assurez-vous que le chemin est correct
  import { onValue, ref as firebaseRef, remove } from 'firebase/database';
  import { format, getWeek, parseISO } from 'date-fns';
  import { fr } from 'date-fns/locale';
  import NavBar from '../Utils/Navbar.vue'; // Ajustez le chemin si nécessaire

  export default {
    name: 'FeuilleEnseignant',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const teacherId = route.params.id;
  
      const teacherName = ref('');
      const teacherCourses = ref([]);
  
      // Fonction pour charger les informations de l'enseignant
      const loadTeacherInfo = () => {
        const teacherRef = firebaseRef(db, `teachers/${teacherId}`);
        onValue(teacherRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            teacherName.value = `${data.firstName} ${data.lastName}`;
          } else {
            teacherName.value = 'Enseignant Inconnu';
          }
        }, (error) => {
          console.error('Erreur lors de la récupération des informations de l\'enseignant:', error);
        });
      };
      
      // Fonction pour charger les cours de l'enseignant
      const loadTeacherCourses = () => {
        const planningRef = firebaseRef(db, 'planning');
        onValue(planningRef, (snapshot) => {
          const data = snapshot.val();
          const courses = [];
          if (data) {
            Object.keys(data).forEach((date) => {
              const dayData = data[date];
              if (dayData && typeof dayData === 'object') {
                Object.keys(dayData).forEach((courseKey) => {
                  const course = dayData[courseKey];
                  if (course.instructors && course.instructors.includes(teacherId)) {
                    courses.push({
                      key: courseKey,
                      date: date,
                      title: course.title,
                      schedule: course.schedule
                    });
                  }
                });
              }
            });
          }
          teacherCourses.value = courses;
        }, (error) => {
          console.error('Erreur lors de la récupération des cours de l\'enseignant:', error);
        });
      };
      
      // Fonction pour formater les dates
      const formatDate = (date) => {
        try {
          return format(parseISO(date), 'dd/MM/yyyy', { locale: fr });
        } catch (error) {
          console.error('Erreur lors du formatage de la date:', error);
          return date;
        }
      };
      
      // Fonction pour obtenir le numéro de la semaine
      const getWeekNumber = (date) => {
        try {
          return getWeek(parseISO(date), { weekStartsOn: 1, locale: fr });
        } catch (error) {
          console.error('Erreur lors de l\'obtention du numéro de semaine:', error);
          return '';
        }
      };
      
      // Fonction pour supprimer un cours
      const deleteCourse = (courseKey) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
          const courseRef = firebaseRef(db, `planning/${getDateFromCourseKey(courseKey)}/${courseKey}`);
          remove(courseRef)
            .then(() => {
              console.log('Cours supprimé avec succès!');
            })
            .catch((error) => {
              console.error('Erreur lors de la suppression du cours:', error);
            });
        }
      };
      
      // Fonction pour extraire la date d'un cours à partir de sa clé
      const getDateFromCourseKey = (courseKey) => {
        // Cette fonction suppose que les clés des cours sont uniques et que la date peut être trouvée
        // Dans votre structure de données Firebase, vous pourriez avoir besoin d'ajuster cette logique
        // pour associer correctement les clés de cours aux dates
        for (const date in db.planning) {
          if (db.planning[date][courseKey]) {
            return date;
          }
        }
        return '';
      };
      
      onMounted(() => {
        loadTeacherInfo();
        loadTeacherCourses();
      });
  
      return {
        teacherName,
        teacherCourses,
        formatDate,
        getWeekNumber,
        deleteCourse
      };
    }
  };
  </script>
  
  <style scoped>
  /* Palette de Couleurs Sombre */
  :root {
    --primary-color: #1e90ff;
    --secondary-color: #32cd32;
    --background-color: #121212;
    --text-color: #e0e0e0;
    --header-bg: #1f1f1f;
    --border-color: #333333;
    --highlight-color: #3a3a3a;
    --modal-bg: #1f1f1f;
    --button-hover: #1a73e8;
  }
  
  /* Styles généraux */
  .teacher-sheet {
    padding: 30px;
    background-color: var(--background-color);
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
  }
  
  h1 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 20px;
    font-size: 2em;
    font-weight: bold;
  }
  
  .back-button-container {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .back-button {
    background-color: var(--primary-color);
    color: #fff;
    padding: 8px 16px;
    border-radius: 5px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: background-color 0.3s ease;
  }
  
  .back-button:hover {
    background-color: var(--button-hover);
  }
  
  .course-list {
    width: 100%;
    overflow-x: auto;
  }
  
  .course-list h2 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 15px;
  }
  
  .course-list table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--header-bg);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    overflow: hidden;
    color: var(--text-color);
  }
  
  .course-list th, .course-list td {
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
  }
  
  .course-list th {
    background-color: var(--primary-color);
    color: #fff;
    font-size: 1em;
  }
  
  .course-list tr:nth-child(even) {
    background-color: var(--highlight-color);
  }
  
  .course-list tr:hover {
    background-color: #2a2a2a;
  }
  
  .no-courses {
    text-align: center;
    color: #bbb;
    font-style: italic;
    margin-top: 20px;
  }
  
  /* Bouton de suppression */
  .delete-button {
    background-color: #dc3545; /* Rouge pour la suppression */
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 0.8em;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: background-color 0.3s ease;
  }
  
  .delete-button:hover {
    background-color: #c82333;
  }
  
  /* Responsivité */
  @media (max-width: 768px) {
    .course-list table, .course-list th, .course-list td {
      font-size: 0.9em;
    }
  }
  </style>
  
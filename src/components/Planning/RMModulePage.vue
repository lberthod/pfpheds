<template>        <NavBar />

    <div class="rm-module-page">
      <h1>Page RM Module</h1>
      
      <!-- Sélection du Module -->
      <div class="module-selection">
        <label for="moduleSelect">Sélectionnez un module :</label>
        <select v-model="selectedModule" id="moduleSelect" class="module-select">
          <option disabled value="">-- Choisissez un module --</option>
          <option v-for="module in modules" :key="module" :value="module">
            {{ module }}
          </option>
        </select>
      </div>
      
      <!-- État de Chargement -->
      <div v-if="loading" class="loading">
        Chargement des cours...
      </div>
      
      <!-- État d'Erreur -->
      <div v-if="error" class="error">
        {{ error }}
      </div>
      
      <!-- Table des Cours -->
      <div v-if="!loading && !error && filteredCourses.length" class="courses-table">
        <table>
          <thead>
            <tr>
              <th>Titre du Cours</th>
              <th>Enseignants</th>
              <th>Date</th>
              <th>Heure de Début</th>
              <th>Heure de Fin</th>
              <th>Actions</th> <!-- Nouvelle colonne pour les actions -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in filteredCourses" :key="course.key">
              <td>{{ course.title }}</td>
              <td>{{ getInstructorsNames(course.instructors) }}</td>
              <td>{{ formatDate(course.date) }}</td>
              <td>{{ course.startTime }}</td>
              <td>{{ course.endTime }}</td>
              <td>
                <button @click="openEditModal(course)" class="edit-button">
                  <i class="fas fa-edit"></i> Éditer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Message si aucun cours n'est trouvé -->
      <div v-if="!loading && !error && selectedModule && !filteredCourses.length" class="no-courses">
        Aucun cours trouvé pour le module sélectionné.
      </div>
      
      <!-- Modal pour Éditer un Cours -->
      <div v-if="editingCourse" class="modal-overlay" @click="closeEditModal">
        <div class="modal-content" @click.stop>
          <h2>Éditer le Cours</h2>
          <form @submit.prevent="updateCourse">
            <div class="form-group">
              <label for="editModule">Module</label>
              <select 
                v-model="editModule" 
                id="editModule" 
                required 
                class="info-input"
              >
                <option disabled value="">-- Sélectionnez un module --</option>
                <option v-for="module in modules" :key="module" :value="module">
                  {{ module }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="editTitle">Titre du Cours</label>
              <input 
                v-model="editTitle" 
                type="text" 
                id="editTitle" 
                placeholder="Titre du Cours" 
                required 
                class="info-input"
              />
            </div>
            <div class="form-group">
              <label for="editInstructors">Enseignants</label>
              <select 
                v-model="editInstructors" 
                id="editInstructors" 
                multiple 
                required 
                class="info-input"
              >
                <option 
                  v-for="teacher in teachersList" 
                  :key="teacher.key" 
                  :value="teacher.key"
                >
                  {{ teacher.firstName }} {{ teacher.lastName }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="editStartTime">Heure de Début</label>
              <input 
                v-model="editStartTime" 
                type="time" 
                id="editStartTime" 
                required 
                class="info-input"
              />
            </div>
            <div class="form-group">
              <label for="editEndTime">Heure de Fin</label>
              <input 
                v-model="editEndTime" 
                type="time" 
                id="editEndTime" 
                required 
                class="info-input"
              />
            </div>
            <button type="submit" class="update-button">Mettre à Jour</button>
            <button type="button" @click="closeEditModal" class="close-button">Fermer</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { ref, computed, reactive, onMounted } from 'vue';
  import { 
    format, 
    parseISO 
  } from 'date-fns';
  import { fr } from 'date-fns/locale';
  import { db } from '../../../firebase'; // Assurez-vous que le chemin est correct
  import { onValue, ref as firebaseRef, set } from 'firebase/database';
  import NavBar from '../Utils/Navbar.vue'; // Ajustez le chemin si nécessaire

  export default {
    name: 'RMModulePage',
    components: {
    NavBar, // Enregistrement local du composant NavBar
  },
    setup() {
      // Définition des modules disponibles
      const modules = ['EBP1A', 'PV1A', 'RC1A', 'Ethique1A'];
  
      // Module sélectionné
      const selectedModule = ref('');
  
      // Liste des enseignants
      const teachersList = ref([]);
  
      // Mappage des enseignants pour faciliter l'accès par ID
      const teacherMap = computed(() => {
        const map = {};
        teachersList.value.forEach((teacher) => {
          map[teacher.key] = `${teacher.firstName} ${teacher.lastName}`;
        });
        return map;
      });
  
      // Liste complète de tous les cours
      const allCourses = ref([]);
  
      // Cours filtrés par module sélectionné
      const filteredCourses = computed(() => {
        if (!selectedModule.value) return [];
        return allCourses.value.filter(course => course.module === selectedModule.value);
      });
  
      // États de chargement et d'erreur
      const loading = ref(true);
      const error = ref('');
  
      // Fonction pour obtenir les noms des enseignants à partir de leurs IDs
      const getInstructorsNames = (instructors) => {
        return instructors.map(id => teacherMap.value[id] || 'Inconnu').join(', ');
      };
  
      // Fonction pour formater les dates
      const formatDate = (date) => {
        return format(parseISO(date), 'dd/MM/yyyy', { locale: fr });
      };
  
      // Fonction pour charger la liste des enseignants depuis Firebase
      const loadTeachers = () => {
        const teachersRefPath = firebaseRef(db, 'teachers');
        onValue(teachersRefPath, (snapshot) => {
          const data = snapshot.val();
          const list = [];
          if (data) {
            Object.keys(data).forEach((key) => {
              list.push({ key, ...data[key] });
            });
          }
          teachersList.value = list;
        }, (error) => {
          console.error('Erreur lors de la récupération des enseignants:', error);
          error.value = 'Erreur lors de la récupération des enseignants.';
        });
      };
  
      // Fonction pour charger la liste des cours depuis Firebase
      const loadCourses = () => {
        const planningRefPath = firebaseRef(db, 'planning');
        onValue(planningRefPath, (snapshot) => {
          const data = snapshot.val();
          const courses = [];
          if (data) {
            Object.keys(data).forEach((date) => {
              const dayData = data[date];
              if (dayData && typeof dayData === 'object') {
                Object.keys(dayData).forEach((courseKey) => {
                  const course = dayData[courseKey];
                  courses.push({
                    key: courseKey,
                    ...course,
                    date // Inclure la date du jour
                  });
                });
              }
            });
          }
          allCourses.value = courses;
          loading.value = false;
        }, (error) => {
          console.error('Erreur lors de la récupération des cours:', error);
          error.value = 'Erreur lors de la récupération des cours.';
          loading.value = false;
        });
      };
  
      // Chargement initial des données
      onMounted(() => {
        loadTeachers();
        loadCourses();
      });
  
      // Propriétés pour l'édition d'un cours
      const editingCourse = ref(null); // Objet du cours en cours d'édition
      const editModule = ref('');
      const editTitle = ref('');
      const editInstructors = ref([]);
      const editStartTime = ref('');
      const editEndTime = ref('');
  
      // Fonction pour ouvrir la modal d'édition
      const openEditModal = (course) => {
        editingCourse.value = course;
        editModule.value = course.module || '';
        editTitle.value = course.title || '';
        editInstructors.value = course.instructors ? [...course.instructors] : [];
        editStartTime.value = course.startTime || '';
        editEndTime.value = course.endTime || '';
      };
  
      // Fonction pour fermer la modal d'édition
      const closeEditModal = () => {
        editingCourse.value = null;
        editModule.value = '';
        editTitle.value = '';
        editInstructors.value = [];
        editStartTime.value = '';
        editEndTime.value = '';
      };
  
      // Fonction pour mettre à jour un cours existant
      const updateCourse = () => {
        if (
          !editingCourse.value ||
          !editModule.value ||
          !editTitle.value.trim() ||
          editInstructors.value.length === 0 ||
          !editStartTime.value ||
          !editEndTime.value
        ) {
          alert('Veuillez remplir tous les champs et sélectionner au moins un enseignant.');
          return;
        }
  
        const { date, key } = editingCourse.value;
  
        const updatedCourse = {
          module: editModule.value,
          title: editTitle.value.trim(),
          instructors: editInstructors.value,
          startTime: editStartTime.value,
          endTime: editEndTime.value,
          date: date // Assurez-vous que la date est incluse
        };
  
        // Référence à l'entrée spécifique dans Firebase
        const courseRef = firebaseRef(db, `planning/${date}/${key}`);
  
        set(courseRef, updatedCourse)
          .then(() => {
            console.log('Cours mis à jour avec succès!');
            closeEditModal();
          })
          .catch((error) => {
            console.error('Erreur lors de la mise à jour du cours:', error);
            alert('Erreur lors de la mise à jour du cours. Veuillez réessayer.');
          });
      };
  
      return {
        modules,
        selectedModule,
        teachersList,
        teacherMap,
        allCourses,
        filteredCourses,
        loading,
        error,
        getInstructorsNames,
        formatDate,
        editingCourse,
        editModule,
        editTitle,
        editInstructors,
        editStartTime,
        editEndTime,
        openEditModal,
        closeEditModal,
        updateCourse
      };
    }
  };
  </script>
  <style scoped>
  .rm-module-page {
    padding: 20px;
    background-color: var(--background-color);
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
    color: var(--text-color);
  }
  
  h1 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 20px;
  }
  
  .module-selection {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .module-selection label {
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .module-select {
    width: 200px;
    padding: 8px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: var(--header-bg);
    color: var(--text-color);
  }
  
  .courses-table {
    overflow-x: auto;
  }
  
  .courses-table table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--header-bg);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    overflow: hidden;
    color: var(--text-color);
  }
  
  .courses-table th,
  .courses-table td {
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
  }
  
  .courses-table th {
    background-color: var(--primary-color);
    color: #fff;
    font-size: 1em;
  }
  
  .courses-table tr:nth-child(even) {
    background-color: var(--highlight-color);
  }
  
  .courses-table tr:hover {
    background-color: #2a2a2a;
  }
  
  .loading,
  .error,
  .no-courses {
    text-align: center;
    margin-top: 20px;
    font-size: 1.1em;
  }
  
  .loading {
    color: var(--secondary-color);
  }
  
  .error {
    color: #dc3545; /* Rouge pour les erreurs */
  }
  
  .no-courses {
    color: #bbb;
    font-style: italic;
  }
  
  .edit-button {
    background-color: var(--primary-color);
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
  
  .edit-button:hover {
    background-color: var(--button-hover);
  }
  
  /* Styles généraux des modals */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: var(--modal-bg);
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
    text-align: center;
    color: var(--text-color);
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .info-input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: var(--header-bg);
    color: var(--text-color);
  }
  
  .update-button {
    background-color: var(--secondary-color);
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin-top: 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .update-button:hover {
    background-color: #28a745; /* Couleur plus foncée */
  }
  
  .close-button {
    background-color: var(--primary-color);
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s ease;
  }
  
  .close-button:hover {
    background-color: var(--button-hover); /* Couleur plus foncée */
  }
  
  /* Responsivité */
  @media (max-width: 768px) {
    .module-selection {
      width: 100%;
      padding: 0 10px;
    }
  
    .module-select {
      width: 100%;
    }
  
    .courses-table table {
      font-size: 0.9em;
    }
  
    .courses-table th,
    .courses-table td {
      padding: 10px;
    }
  }
  </style>
  
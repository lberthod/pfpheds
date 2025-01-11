<template>        <NavBar />

    <div class="teacher-dashboard">
      <h1 class="title">Dashboard Enseignant</h1>
  
      <!-- Formulaire pour créer un enseignant -->
      <form @submit.prevent="addTeacher" class="teacher-form">
        <div class="form-group">
          <label for="firstName">Prénom</label>
          <input 
            v-model="newTeacher.firstName" 
            type="text" 
            id="firstName" 
            placeholder="Prénom" 
            required 
          />
        </div>
        <div class="form-group">
          <label for="lastName">Nom</label>
          <input 
            v-model="newTeacher.lastName" 
            type="text" 
            id="lastName" 
            placeholder="Nom" 
            required 
          />
        </div>
        <div class="form-group">
          <label for="hourlyRate">Taux Horaire (€)</label>
          <input 
            v-model.number="newTeacher.hourlyRate" 
            type="number" 
            id="hourlyRate" 
            placeholder="Taux Horaire" 
            required 
            min="0" 
            step="0.01"
          />
        </div>
        <div class="form-group">
          <label for="totalHours">Heures Totales</label>
          <input 
            v-model.number="newTeacher.totalHours" 
            type="number" 
            id="totalHours" 
            placeholder="Heures Totales" 
            required 
            min="0" 
          />
        </div>
        <button type="submit" class="add-button">Ajouter Enseignant</button>
      </form>
  
      <!-- Liste des enseignants -->
      <div class="teacher-list">
        <h2>Liste des Enseignants</h2>
        <table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Taux Horaire (€)</th>
              <th>Heures Totales</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="teacher in teachers" :key="teacher.key">
              <td>
                <router-link :to="{ name: 'FeuilleEnseignant', params: { id: teacher.key } }">
                  {{ teacher.firstName }}
                </router-link>
              </td>
              <td>
                <router-link :to="{ name: 'FeuilleEnseignant', params: { id: teacher.key } }">
                  {{ teacher.lastName }}
                </router-link>
              </td>
              <td>{{ teacher.hourlyRate.toFixed(2) }}</td>
              <td>{{ teacher.totalHours }}</td>
              <td>
                <button @click="openEditModal(teacher)" class="edit-button">
                  <i class="fas fa-edit"></i> Éditer
                </button>
                <button @click="deleteTeacher(teacher.key)" class="delete-button">
                  <i class="fas fa-trash-alt"></i> Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal pour éditer un enseignant -->
      <div v-if="editingTeacher" class="modal-overlay" @click="closeEditModal">
        <div class="modal-content" @click.stop>
          <h2>Éditer Enseignant</h2>
          <form @submit.prevent="updateTeacher" class="teacher-form">
            <div class="form-group">
              <label for="editFirstName">Prénom</label>
              <input 
                v-model="editingTeacher.firstName" 
                type="text" 
                id="editFirstName" 
                placeholder="Prénom" 
                required 
              />
            </div>
            <div class="form-group">
              <label for="editLastName">Nom</label>
              <input 
                v-model="editingTeacher.lastName" 
                type="text" 
                id="editLastName" 
                placeholder="Nom" 
                required 
              />
            </div>
            <div class="form-group">
              <label for="editHourlyRate">Taux Horaire (€)</label>
              <input 
                v-model.number="editingTeacher.hourlyRate" 
                type="number" 
                id="editHourlyRate" 
                placeholder="Taux Horaire" 
                required 
                min="0" 
                step="0.01"
              />
            </div>
            <div class="form-group">
              <label for="editTotalHours">Heures Totales</label>
              <input 
                v-model.number="editingTeacher.totalHours" 
                type="number" 
                id="editTotalHours" 
                placeholder="Heures Totales" 
                required 
                min="0" 
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
  import { ref, reactive, onMounted } from 'vue';
  import { db } from '../../../firebase'; // Assurez-vous que le chemin est correct
  import { 
    onValue, 
    ref as firebaseRef, 
    push, 
    set, 
    remove 
  } from 'firebase/database';
  import NavBar from '../Utils/Navbar.vue'; // Ajustez le chemin si nécessaire

  export default {
    name: 'TeacherDashboard',
    components: {
    NavBar, // Enregistrement local du composant NavBar
  },
    setup() {
      // Réactif pour le nouveau enseignant
      const newTeacher = reactive({
        firstName: '',
        lastName: '',
        hourlyRate: 0,
        totalHours: 0
      });
  
      // Réactif pour les enseignants
      const teachers = ref([]);
  
      // Réactif pour l'édition
      const editingTeacher = ref(null);
  
      // Fonction pour ajouter un enseignant
      const addTeacher = () => {
        const teacherData = {
          firstName: newTeacher.firstName,
          lastName: newTeacher.lastName,
          hourlyRate: newTeacher.hourlyRate,
          totalHours: newTeacher.totalHours
        };
  
        const teachersRef = firebaseRef(db, 'teachers');
        push(teachersRef, teacherData)
          .then(() => {
            console.log('Enseignant ajouté avec succès!');
            // Réinitialiser le formulaire
            newTeacher.firstName = '';
            newTeacher.lastName = '';
            newTeacher.hourlyRate = 0;
            newTeacher.totalHours = 0;
          })
          .catch((error) => {
            console.error('Erreur lors de l\'ajout de l\'enseignant:', error);
          });
      };
  
      // Fonction pour charger les enseignants
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
  
      // Fonction pour ouvrir la modal d'édition
      const openEditModal = (teacher) => {
        // Créer une copie pour éviter les modifications directes
        editingTeacher.value = { ...teacher };
      };
  
      // Fonction pour fermer la modal d'édition
      const closeEditModal = () => {
        editingTeacher.value = null;
      };
  
      // Fonction pour mettre à jour un enseignant
      const updateTeacher = () => {
        if (editingTeacher.value && editingTeacher.value.key) {
          const teacherKey = editingTeacher.value.key;
          const updatedData = {
            firstName: editingTeacher.value.firstName,
            lastName: editingTeacher.value.lastName,
            hourlyRate: editingTeacher.value.hourlyRate,
            totalHours: editingTeacher.value.totalHours
          };
  
          const teacherRef = firebaseRef(db, `teachers/${teacherKey}`);
          set(teacherRef, updatedData)
            .then(() => {
              console.log('Enseignant mis à jour avec succès!');
              closeEditModal();
            })
            .catch((error) => {
              console.error('Erreur lors de la mise à jour de l\'enseignant:', error);
            });
        }
      };
  
      // Fonction pour supprimer un enseignant
      const deleteTeacher = (key) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet enseignant?')) {
          const teacherRef = firebaseRef(db, `teachers/${key}`);
          remove(teacherRef)
            .then(() => {
              console.log('Enseignant supprimé avec succès!');
            })
            .catch((error) => {
              console.error('Erreur lors de la suppression de l\'enseignant:', error);
            });
        }
      };
  
      onMounted(() => {
        loadTeachers();
      });
  
      return {
        newTeacher,
        teachers,
        addTeacher,
        editingTeacher,
        openEditModal,
        closeEditModal,
        updateTeacher,
        deleteTeacher
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
  .teacher-dashboard {
    padding: 30px;
    background-color: var(--background-color);
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
  }
  
  .title {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 30px;
    font-size: 2em;
    font-weight: bold;
  }
  
  .teacher-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    width: 80%;
    max-width: 400px;
  }
  
  .form-group label {
    margin-bottom: 5px;
    color: var(--text-color);
  }
  
  .form-group input {
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: var(--header-bg);
    color: var(--text-color);
  }
  
  .add-button, .update-button {
    background-color: var(--secondary-color);
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .add-button:hover, .update-button:hover {
    background-color: #28a745;
  }
  
  .teacher-list {
    width: 100%;
    overflow-x: auto;
  }
  
  .teacher-list h2 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 15px;
  }
  
  .teacher-list table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--header-bg);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    overflow: hidden;
    color: var(--text-color);
  }
  
  .teacher-list th, .teacher-list td {
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
  }
  
  .teacher-list th {
    background-color: var(--primary-color);
    color: #fff;
    font-size: 1em;
  }
  
  .teacher-list tr:nth-child(even) {
    background-color: var(--highlight-color);
  }
  
  .teacher-list tr:hover {
    background-color: #2a2a2a;
  }
  
  .edit-button, .delete-button {
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
    margin: 2px;
    transition: background-color 0.3s ease;
  }
  
  .edit-button:hover {
    background-color: var(--button-hover);
  }
  
  .delete-button {
    background-color: #dc3545;
  }
  
  .delete-button:hover {
    background-color: #c82333;
  }
  
  /* Modal Styles */
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
  
  .close-button {
    background-color: var(--primary-color);
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease;
  }
  
  .close-button:hover {
    background-color: var(--button-hover);
  }
  
  /* Responsivité */
  @media (max-width: 768px) {
    .teacher-form {
      width: 100%;
    }
  
    .form-group {
      width: 100%;
    }
  
    .teacher-list table, .teacher-list th, .teacher-list td {
      font-size: 0.9em;
    }
  
    .teacher-list tr:hover {
      background-color: #2a2a2a;
    }
  
    .edit-button, .delete-button {
      font-size: 0.7em;
      padding: 3px 6px;
    }
  }
  </style>
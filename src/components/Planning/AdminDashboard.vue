<template>
    <NavBar />

<div class="admin-dashboard">
<h1 class="title">Dashboard Planning Admin</h1>

<!-- Navigation des semaines -->
<div class="week-navigation">
<button @click="goToPreviousWeek" :disabled="isFirstWeek" class="nav-button">
  <i class="fas fa-chevron-left"></i> Précédente
</button>
<span class="week-info">
  Semaine {{ currentWeekNumber }}: {{ formatDate(weekStart) }} - {{ formatDate(weekEnd) }}
</span>
<button @click="goToNextWeek" :disabled="isLastWeek" class="nav-button">
  Suivante <i class="fas fa-chevron-right"></i>
</button>
</div>

<!-- Tableau du planning hebdomadaire -->
<div class="table-responsive">
<table class="week-table">
  <thead>
    <tr>
      <th>Jour</th>
      <th>Date</th>
      <th>Mois</th>
      <th>Module</th> <!-- Nouvelle colonne pour le module -->
      <th>Informations</th>
    </tr>
  </thead>
  <tbody>
    <tr 
      v-for="day in currentWeekDays" 
      :key="day.date" 
      :class="{ 'current-day': isToday(day.date) }"
    >
      <td>{{ day.name }}</td>
      <td>{{ day.day }}</td>
      <td>{{ day.month }}</td>
      <td>{{ day.module }}</td> <!-- Affichage du module -->
      <td class="info-cell">
        <div v-if="day.info.length" class="info-list">
          <div v-for="(info, index) in day.info" :key="info.key" class="info-entry">
            <p><strong>Enseignants:</strong> {{ getInstructorsNames(info.instructors) }}</p>
            <p><strong>Titre du Cours:</strong> {{ info.title }}</p>
            <p><strong>Heure de Début:</strong> {{ info.startTime }}</p>
            <p><strong>Heure de Fin:</strong> {{ info.endTime }}</p>
            <button @click.stop="openEditModal(day.date, info)" class="edit-button">
              <i class="fas fa-edit"></i> Éditer
            </button>
            <button @click.stop="deleteInfo(day.date, info.key)" class="delete-button">
              <i class="fas fa-trash-alt"></i> Supprimer
            </button>
          </div>
        </div>
        <div v-else class="no-info">Aucune</div>
        <button @click="openModal(day)" class="add-info-button">
          <i class="fas fa-plus"></i> Ajouter
        </button>
      </td>
    </tr>
  </tbody>
</table>
</div>

<!-- Modal pour ajouter des informations -->
<div v-if="selectedDay" class="modal-overlay" @click="closeModal">
<div class="modal-content" @click.stop>
  <h2>Ajouter Informations pour {{ selectedDay.name }} {{ selectedDay.day }} {{ selectedDay.month }}</h2>
  <form @submit.prevent="addInfo">
    <div class="form-group">
      <label for="selectInstructors">Enseignants</label>
      <select 
        v-model="selectedInstructors" 
        id="selectInstructors" 
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
      <label for="newModule">Module</label>
      <select 
        v-model="newModule" 
        id="newModule" 
        required 
        class="info-input"
      >
        <option disabled value="">Sélectionnez un module</option>
        <option v-for="module in modules" :key="module" :value="module">
          {{ module }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="newTitle">Titre du Cours</label>
      <input 
        v-model="newTitle" 
        type="text" 
        id="newTitle" 
        placeholder="Titre du Cours" 
        required 
        class="info-input"
      />
    </div>
    <div class="form-group">
      <label for="newStartTime">Heure de Début</label>
      <input 
        v-model="newStartTime" 
        type="time" 
        id="newStartTime" 
        required 
        class="info-input"
      />
    </div>
    <div class="form-group">
      <label for="newEndTime">Heure de Fin</label>
      <input 
        v-model="newEndTime" 
        type="time" 
        id="newEndTime" 
        required 
        class="info-input"
      />
    </div>
    <button type="submit" class="add-button">Ajouter</button>
  </form>
  <button @click="closeModal" class="close-button">Fermer</button>
</div>
</div>

<!-- Modal pour éditer des informations -->
<div v-if="editingEntry" class="modal-overlay" @click="closeEditModal">
<div class="modal-content" @click.stop>
  <h2>Éditer Informations pour {{ getInstructorsNames(editingEntry.instructors) }}</h2>
  <form @submit.prevent="updateInfo" class="teacher-form">
    <div class="form-group">
      <label for="editSelectInstructors">Enseignants</label>
      <select 
        v-model="editSelectedInstructors" 
        id="editSelectInstructors" 
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
      <label for="editModule">Module</label>
      <select 
        v-model="editModule" 
        id="editModule" 
        required 
        class="info-input"
      >
        <option disabled value="">Sélectionnez un module</option>
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
startOfWeek, 
addWeeks, 
addDays,
getWeek, 
format, 
isAfter, 
parseISO, 
isSameDay
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { db } from '../../../firebase'; // Assurez-vous que le chemin est correct
import { onValue, ref as firebaseRef, push, set, remove } from 'firebase/database';
import NavBar from '../Utils/Navbar.vue'; // Ajustez le chemin si nécessaire

export default {
name: 'AdminDashboard',
components: {
NavBar, // Enregistrement local du composant NavBar
},
setup() {
// Définition des modules disponibles
const modules = ['EBP1A', 'PV1A', 'RC1A', 'Ethique1A'];

// Configuration des limites de la période
const startSemester = parseISO('2025-09-01'); // Ajustez selon la date réelle de début
const endSemester = parseISO('2026-09-30'); // Ajustez selon la date réelle de fin

// Initialisation de la semaine actuelle à la semaine du début du semestre
const semesterStartWeek = startOfWeek(startSemester, { weekStartsOn: 1, locale: fr });
const semesterEndWeek = startOfWeek(endSemester, { weekStartsOn: 1, locale: fr });

const currentWeekDate = ref(semesterStartWeek);

// Calcul du numéro de la semaine actuelle
const currentWeekNumber = computed(() => getWeek(currentWeekDate.value, { weekStartsOn: 1, locale: fr }));

// Vérifie si on est à la première semaine du semestre
const isFirstWeek = computed(() => {
return currentWeekDate.value.getTime() === semesterStartWeek.getTime();
});

// Vérifie si on est à la dernière semaine du semestre
const isLastWeek = computed(() => {
return currentWeekDate.value.getTime() === semesterEndWeek.getTime();
});

// Fonctions pour naviguer entre les semaines
const goToPreviousWeek = () => {
if (!isFirstWeek.value) {
  currentWeekDate.value = addWeeks(currentWeekDate.value, -1);
}
};

const goToNextWeek = () => {
if (!isLastWeek.value) {
  currentWeekDate.value = addWeeks(currentWeekDate.value, 1);
}
};

// Calcul des dates de début et de fin de la semaine actuelle
const weekStart = computed(() => startOfWeek(currentWeekDate.value, { weekStartsOn: 1, locale: fr }));
const weekEnd = computed(() => addDays(weekStart.value, 6)); // Fin de la semaine (dimanche si semaine commence le lundi)

// Réactif pour stocker les informations des jours depuis Firebase
const dayInfos = reactive({});

// Réactif pour stocker la liste des enseignants
const teachersList = ref([]);

// Génère les jours de la semaine actuelle
const currentWeekDays = computed(() => {
const days = [];
for (let i = 0; i < 7; i++) {
  const dayDate = addDays(weekStart.value, i);
  const formattedDate = format(dayDate, 'yyyy-MM-dd');
  days.push({
    name: format(dayDate, 'EEEE', { locale: fr }),
    day: format(dayDate, 'dd', { locale: fr }),
    month: format(dayDate, 'MMMM', { locale: fr }),
    date: formattedDate, // Propriété 'date' ajoutée
    module: getModuleForDate(formattedDate), // Récupère le module si défini
    info: Array.isArray(dayInfos[formattedDate]) ? [...dayInfos[formattedDate]] : [] // Assure que c'est un tableau
  });
}
return days;
});

// Fonction pour récupérer le module pour une date donnée (optionnel)
// Si vous souhaitez assigner des modules spécifiques à des jours, implémentez cette fonction
const getModuleForDate = (date) => {
// Exemple : assigner un module aléatoire ou basé sur une logique spécifique
// Ici, nous assignons "EBP1A" pour toutes les dates, ajustez selon vos besoins
return 'EBP1A';
};

// Fonction pour vérifier si une date est aujourd'hui
const isToday = (date) => {
if (!date) return false;
try {
  const parsedDate = parseISO(date);
  return isSameDay(new Date(), parsedDate);
} catch (error) {
  console.error('Erreur lors de l\'analyse de la date:', error);
  return false;
}
};

// Gestion des modals
const selectedDay = ref(null);
const newTitle = ref('');
const newModule = ref(''); // Nouveau ref pour le module
const newStartTime = ref(''); // Nouvelle variable pour l'heure de début
const newEndTime = ref('');   // Nouvelle variable pour l'heure de fin
const selectedInstructors = ref([]); // Variable pour la sélection multiple d'enseignants

// Variables pour l'édition
const editingEntry = ref(null);
const editTitle = ref('');
const editModule = ref(''); // Nouveau ref pour le module en édition
const editStartTime = ref(''); // Variable pour l'heure de début en édition
const editEndTime = ref('');   // Variable pour l'heure de fin en édition
const editSelectedInstructors = ref([]); // Variable pour la sélection multiple d'enseignants en édition

// Fonction pour ouvrir la modal d'ajout
const openModal = (day) => {
selectedDay.value = day;
newTitle.value = '';
newModule.value = '';
newStartTime.value = '';
newEndTime.value = '';
selectedInstructors.value = []; // Réinitialiser la sélection
};

// Fonction pour fermer la modal d'ajout
const closeModal = () => {
selectedDay.value = null;
newTitle.value = '';
newModule.value = '';
newStartTime.value = '';
newEndTime.value = '';
selectedInstructors.value = [];
};

// Fonction pour ouvrir la modal d'édition
const openEditModal = (date, info) => {
editingEntry.value = { date, key: info.key, instructors: info.instructors };
editTitle.value = info.title;
editModule.value = info.module || ''; // Initialiser le module
editStartTime.value = info.startTime; // Initialiser l'heure de début
editEndTime.value = info.endTime;     // Initialiser l'heure de fin
editSelectedInstructors.value = [...info.instructors]; // Réinitialiser la sélection d'enseignants
};

// Fonction pour fermer la modal d'édition
const closeEditModal = () => {
editingEntry.value = null;
editTitle.value = '';
editModule.value = '';
editStartTime.value = '';
editEndTime.value = '';
editSelectedInstructors.value = [];
};

// Fonction pour ajouter une nouvelle information
const addInfo = () => {
if (
  selectedInstructors.value.length > 0 &&
  newTitle.value.trim() &&
  newModule.value &&
  newStartTime.value &&
  newEndTime.value &&
  selectedDay.value
) {
  const formattedDate = selectedDay.value.date;
  const newInfoEntry = {
    instructors: selectedInstructors.value, // Tableau des IDs des enseignants
    title: newTitle.value.trim(),
    module: newModule.value, // Module sélectionné
    startTime: newStartTime.value, // Heure de début
    endTime: newEndTime.value      // Heure de fin
  };
  
  // Push une nouvelle entrée dans la table "planning"
  const planningRef = firebaseRef(db, `planning/${formattedDate}`);
  push(planningRef, newInfoEntry)
    .then(() => {
      console.log('Information ajoutée avec succès!');
      selectedDay.value = null;
      newTitle.value = '';
      newModule.value = '';
      newStartTime.value = '';
      newEndTime.value = '';
      selectedInstructors.value = [];
    })
    .catch((error) => {
      console.error('Erreur lors de l\'ajout de l\'information:', error);
    });
} else {
  alert('Veuillez remplir tous les champs, sélectionner un module et au moins un enseignant.');
}
};

// Fonction pour mettre à jour une information existante
const updateInfo = () => {
if (
  editingEntry.value &&
  editSelectedInstructors.value.length > 0 &&
  editTitle.value.trim() &&
  editModule.value &&
  editStartTime.value &&
  editEndTime.value
) {
  const { date, key } = editingEntry.value;
  const updatedInfo = {
    instructors: editSelectedInstructors.value, // Tableau des IDs des enseignants
    title: editTitle.value.trim(),
    module: editModule.value, // Module sélectionné
    startTime: editStartTime.value, // Heure de début mise à jour
    endTime: editEndTime.value      // Heure de fin mise à jour
  };
  
  // Mettre à jour l'entrée spécifique dans Firebase
  const entryRef = firebaseRef(db, `planning/${date}/${key}`);
  set(entryRef, updatedInfo)
    .then(() => {
      console.log('Information mise à jour avec succès!');
      closeEditModal();
    })
    .catch((error) => {
      console.error('Erreur lors de la mise à jour de l\'information:', error);
    });
} else {
  alert('Veuillez remplir tous les champs, sélectionner un module et au moins un enseignant.');
}
};

// Fonction pour supprimer une information existante
const deleteInfo = (date, key) => {
if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
  const entryRef = firebaseRef(db, `planning/${date}/${key}`);
  remove(entryRef)
    .then(() => {
      console.log('Information supprimée avec succès!');
    })
    .catch((error) => {
      console.error('Erreur lors de la suppression de l\'information:', error);
    });
}
};

// Fonction pour charger les données de planning depuis Firebase
const loadPlanningData = () => {
const planningRef = firebaseRef(db, 'planning');
onValue(planningRef, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    Object.keys(data).forEach((date) => {
      const dayData = data[date];
      if (dayData && typeof dayData === 'object') {
        dayInfos[date] = Object.entries(dayData).map(([key, value]) => ({
          key,
          ...value
        }));
      } else {
        dayInfos[date] = [];
      }
    });
  }
}, (error) => {
  console.error('Erreur lors de la récupération des données de planning:', error);
});
};

// Fonction pour charger la liste des enseignants depuis Firebase
const loadTeachers = () => {
const teachersRef = firebaseRef(db, 'teachers');
onValue(teachersRef, (snapshot) => {
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
});
};

// Fonction pour formater les dates
const formatDate = (date) => {
return format(new Date(date), 'dd/MM/yyyy', { locale: fr });
};

// Fonction pour obtenir le numéro de la semaine
const getWeekNumber = (date) => {
return getWeek(parseISO(date), { weekStartsOn: 1, locale: fr });
};

// Fonction pour obtenir les noms des enseignants à partir de leurs IDs
const getInstructorsNames = (instructors) => {
return instructors.map(id => teacherMap.value[id]).join(', ');
};

onMounted(() => {
loadPlanningData();
loadTeachers();
});

// Fait correspondre l'ID de l'enseignant avec son nom complet
const teacherMap = computed(() => {
const map = {};
teachersList.value.forEach((teacher) => {
  map[teacher.key] = `${teacher.firstName} ${teacher.lastName}`;
});
return map;
});

return {
modules, // Expose la liste des modules
currentWeekNumber,
goToPreviousWeek,
goToNextWeek,
isFirstWeek,
isLastWeek,
weekStart,
weekEnd,
currentWeekDays,
formatDate,      
getWeekNumber,  
isToday,
selectedDay,
openModal,
closeModal,
addInfo,
newTitle,
newModule, // Expose le module pour l'ajout
newStartTime,
newEndTime,
selectedInstructors,         
editingEntry,
editTitle,
editModule, // Expose le module pour l'édition
editStartTime,
editEndTime,
editSelectedInstructors,    
openEditModal,
closeEditModal,
updateInfo,
deleteInfo,                  
teachersList,                
teacherMap,                  
getInstructorsNames          
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
.admin-dashboard {
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

.week-navigation {
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 25px;
flex-wrap: wrap;
gap: 10px;
}

.nav-button {
background-color: var(--primary-color);
color: #fff;
border: none;
padding: 10px 20px;
border-radius: 5px;
cursor: pointer;
display: flex;
align-items: center;
font-size: 14px;
transition: background-color 0.3s ease;
}

.nav-button:hover:not(:disabled) {
background-color: var(--button-hover); /* Couleur plus foncée */
}

.nav-button:disabled {
background-color: #555555;
cursor: not-allowed;
opacity: 0.7;
}

.week-info {
font-size: 1.1em;
font-weight: 500;
color: var(--text-color);
}

.table-responsive {
overflow-x: auto;
}

.week-table {
width: 100%;
border-collapse: collapse;
background-color: var(--header-bg);
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
border-radius: 8px;
overflow: hidden;
color: var(--text-color);
}

.week-table th,
.week-table td {
padding: 15px;
text-align: center;
border-bottom: 1px solid var(--border-color);
}

.week-table th {
background-color: var(--primary-color);
color: #fff;
font-size: 1em;
}

.week-table tr:nth-child(even) {
background-color: var(--highlight-color);
}

.week-table tr:hover {
background-color: #2a2a2a;
}

.current-day {
background-color: var(--primary-color);
font-weight: bold;
}

.info-badge {
display: inline-block;
background-color: var(--secondary-color);
color: #fff;
padding: 5px 10px;
border-radius: 15px;
font-size: 0.9em;
margin: 2px;
}

.no-info {
color: #bbb;
font-style: italic;
}

.info-cell {
cursor: pointer;
position: relative;
}

.info-list {
display: flex;
flex-direction: column;
align-items: center;
}

.info-entry {
background-color: var(--highlight-color);
padding: 10px;
border-radius: 5px;
margin-bottom: 5px;
width: 90%;
text-align: left;
position: relative;
}

.info-entry p {
margin: 2px 0;
}

.edit-button,
.delete-button,
.add-info-button {
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
margin-top: 5px;
}

.edit-button:hover,
.delete-button:hover,
.add-info-button:hover {
background-color: var(--button-hover);
}

.delete-button {
background-color: #dc3545; /* Rouge pour la suppression */
}

.delete-button:hover {
background-color: #c82333;
}

.add-info-button {
margin-top: 10px;
background-color: var(--secondary-color);
}

.add-info-button:hover {
background-color: #28a745;
}

/* Styles pour les inputs de type time et select */
.info-input {
width: 100%;
padding: 10px;
margin-top: 10px;
border: 1px solid var(--border-color);
border-radius: 5px;
background-color: var(--header-bg);
color: var(--text-color);
}

.info-input select {
background-color: var(--header-bg);
color: var(--text-color);
}

.info-input[type="time"] {
padding: 8px;
border: 1px solid var(--border-color);
border-radius: 5px;
background-color: var(--header-bg);
color: var(--text-color);
}

/* Boutons d'ajout et de mise à jour */
.add-button,
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

.add-button:hover,
.update-button:hover {
background-color: #28a745; /* Couleur plus foncée */
}

.update-button {
background-color: var(--primary-color);
}

.update-button:hover {
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
background-color: var(--button-hover); /* Couleur plus foncée */
}

/* Responsivité */
@media (max-width: 768px) {
.week-navigation {
flex-direction: column;
}

.week-info {
margin-top: 10px;
}

.week-table th,
.week-table td {
padding: 10px;
font-size: 0.9em;
}

.title {
font-size: 1.5em;
}

.info-input {
width: 100%;
}

.info-entry {
width: 100%;
}

.edit-button,
.delete-button {
margin-top: 5px;
}

.add-info-button {
margin-top: 10px;
}
}
</style>

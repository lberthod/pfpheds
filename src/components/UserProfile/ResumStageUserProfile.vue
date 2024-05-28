<template>
  <div>
    <div class="grid">
      <div class="col-12">
        <div class="card">
          <h5>Profil de l'utilisateur</h5>
          <div v-if="userProfile">
            <p><strong>Nom :</strong> {{ userProfile.Nom }}</p>
            <p><strong>Prénom :</strong> {{ userProfile.Prenom }}</p>
            <p><strong>Classe :</strong> {{ userProfile.Classe }}</p>
            <p><strong>E-Mail :</strong> {{ userProfile.Mail }}</p>
            <h5>Détails</h5>
            <table class="details-table">
              <thead>
                <tr>
                  <th>FR</th>
                  <th>ALL</th>
                  <th>AMBU</th>
                  <th>MSQ</th>
                  <th>SYSINT</th>
                  <th>NEUROGER</th>
                  <th>REA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td :class="getClass(userProfile.FR)">{{ formatValue(userProfile.FR) }}</td>
                  <td :class="getClass(userProfile.ALL)">{{ formatValue(userProfile.ALL) }}</td>
                  <td :class="getClass(userProfile.AMBU)">{{ formatValue(userProfile.AMBU) }}</td>
                  <td :class="getClass(userProfile.MSQ)">{{ formatValue(userProfile.MSQ) }}</td>
                  <td :class="getClass(userProfile.SYSINT)">{{ formatValue(userProfile.SYSINT) }}</td>
                  <td :class="getClass(userProfile.NEUROGER)">{{ formatValue(userProfile.NEUROGER) }}</td>
                  <td :class="getClass(userProfile.REA)">{{ formatValue(userProfile.REA) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <p>Chargement des données du profil...</p>
          </div>
        </div>
        <div class="card">
          <h5>Stages</h5>
          <DataTable
            :value="stages"
            :paginator="true"
            :rows="10"
            dataKey="id"
            :rowHover="true"
            :loading="loading"
            showGridlines
          >
            <template #header>
              <div class="flex justify-content-between flex-column sm:flex-row">
                <span class="p-input-icon-left">
                  <InputText v-model="globalFilter" placeholder="Recherche" style="width: 100%" />
                </span>
              </div>
            </template>
            <template #empty> Pas de stages disponibles. </template>
            <template #loading> Chargement des données des stages. Veuillez patienter. </template>
            <Column field="Nom" header="Nom" style="min-width: 12rem"></Column>
            <Column field="Lieu" header="Lieu" style="min-width: 12rem"></Column>
            <Column field="Langue" header="Langue" style="min-width: 12rem"></Column>
            <Column field="Secteur" header="Secteur" style="min-width: 12rem" :body="secteurTemplate"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import { getDatabase, ref as dbRef, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const stages = ref([]);
const userProfile = ref(null);
const loading = ref(true);
const globalFilter = ref('');

const fetchStages = async () => {
  const db = getDatabase();
  const stagesRef = dbRef(db, 'stages');
  const snapshot = await get(stagesRef);
  if (snapshot.exists()) {
    stages.value = Object.keys(snapshot.val()).map(key => ({
      id: key,
      ...snapshot.val()[key]
    }));
  } else {
    stages.value = [];
  }
  loading.value = false;
};

const fetchUserProfile = async (email) => {
  const db = getDatabase();
  const studentsRef = dbRef(db, 'students');
  const snapshot = await get(studentsRef);
  if (snapshot.exists()) {
    const studentsData = snapshot.val();
    for (const classKey in studentsData) {
      for (const studentKey in studentsData[classKey]) {
        const student = studentsData[classKey][studentKey];
        if (student.Mail && student.Mail.toLowerCase() === email.toLowerCase()) {
          userProfile.value = {
            id: studentKey,
            Classe: classKey,
            ...student
          };
          // Ajouter les informations de PFP1_info et PFP2_info dans stages
          if (student.PFP1_info) {
            stages.value.push({
              id: `PFP1-${studentKey}`,
              ...student.PFP1_info,
              Secteur: getSecteurs(student.PFP1_info)
            });
          }
          if (student.PFP2_info) {
            stages.value.push({
              id: `PFP2-${studentKey}`,
              ...student.PFP2_info,
              Secteur: getSecteurs(student.PFP2_info)
            });
          }
          return;
        }
      }
    }
  }
  userProfile.value = null;
};

const getSecteurs = (info) => {
  const secteurs = [];
  if (info.NEUROGER === 1) secteurs.push('Neuroger');
  if (info.REHAB === 1) secteurs.push('Rehab');
  // Ajoutez ici d'autres secteurs si nécessaire
  return secteurs.join(', ');
};

const secteurTemplate = (rowData) => {
  return rowData.Secteur;
};

const getClass = (value) => {
  return value >= 1 ? 'text-green-500' : 'text-red-500';
};

const formatValue = (value) => {
  return value >= 1 ? `✔️ ${value}` : `❌ ${value}`;
};

onMounted(async () => {
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await fetchUserProfile(user.email);
    } else {
      userProfile.value = null;
    }
  });
  await fetchStages();
});
</script>

<style scoped>
.details-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.details-table th,
.details-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.details-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.text-green-500 {
  color: green;
  font-weight: bold;
}

.text-red-500 {
  color: red;
  font-weight: bold;
}
</style>

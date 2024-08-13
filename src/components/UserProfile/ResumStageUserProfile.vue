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
            <DataTable :value="[userProfile]" tableStyle="min-width: 50rem">
              <Column field="FR" header="FR" :body="formatColumn('FR')"></Column>
              <Column field="ALL" header="ALL" :body="formatColumn('ALL')"></Column>
              <Column field="AMBU" header="AMBU" :body="formatColumn('AMBU')"></Column>
              <Column field="AIGU" header="AIGU" :body="formatColumn('AIGU')"></Column>
              <Column field="MSQ" header="MSQ" :body="formatColumn('MSQ')"></Column>
              <Column field="SYSINT" header="SYSINT" :body="formatColumn('SYSINT')"></Column>
              <Column field="NEUROGER" header="NEUROGER" :body="formatColumn('NEUROGER')"></Column>
              <Column field="REHAB" header="REHAB" :body="formatColumn('REHAB')"></Column>
            </DataTable>
          </div>
          <div v-else>
            <p>Chargement des données du profil...</p>
          </div>
        </div>

        <!-- Ajouter le tableau des stages ici -->
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
            tableStyle="min-width: 50rem"
          >
            <template #header>
              <div class="flex justify-content-between flex-column sm:flex-row">
                <span class="p-input-icon-left">
                  <InputText v-model="globalFilter" placeholder="Recherche" style="width: 100%"/>
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
    console.log('Stages fetched:', stages.value);
  } else {
    stages.value = [];
    console.log('No stages found');
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
          console.log('User profile fetched:', userProfile.value);
          addPFPInfoToStages(student, studentKey);
          return;
        }
      }
    }
  }
  userProfile.value = null;
  console.log('User profile not found');
};

const addPFPInfoToStages = (student, studentKey) => {
  const pfpInfos = ['PFP1_info', 'PFP2_info', 'PFP3_info', 'PFP4_info'];
  pfpInfos.forEach((pfp) => {
    if (student[pfp]) {
      stages.value.push({
        id: `${pfp}-${studentKey}`,
        ...student[pfp],
        Secteur: getSecteurs(student[pfp])
      });
      console.log(`Added ${pfp} to stages`, student[pfp]);
    }
  });
  console.log('Stages after adding PFP info:', stages.value);
};

const getSecteurs = (info) => {
  const secteurs = [];
  if (info.NEUROGER === 1) secteurs.push('NEUROGER');
  if (info.REHAB === 1) secteurs.push('REHAB');
  if (info.AIGU === 1) secteurs.push('AIGU');
  if (info.MSQ === 1) secteurs.push('MSQ');
  if (info.SYSINT === 1) secteurs.push('SYSINT');
  // Ajoutez ici d'autres secteurs si nécessaire
  return secteurs.join(', ');
};

const secteurTemplate = (rowData) => {
  return rowData.Secteur;
};

const getClass = (value) => {
  return value >= 1 ? 'text-green-500' : 'text-red-500';
};

const formatColumn = (field) => {
  return (rowData) => {
    const value = rowData[field];
    return `<span class="${getClass(value)}">${formatValue(value)}</span>`;
  };
};

const formatValue = (value) => {
  return value >= 1 ? `✔️ ${value}` : `❌ ${value}`;
};

onMounted(async () => {
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await fetchUserProfile(user.email);
      await fetchStages();
    } else {
      userProfile.value = null;
    }
  });
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

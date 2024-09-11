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
            <p><strong>Répondant.e HES :</strong> {{ userProfile.ReponsantHES }}</p>
            <p><strong>Remarque :</strong> {{ userProfile.Remarque }}</p>
            <h5>Détails</h5>
            <DataTable :value="[userProfile]" tableStyle="min-width: 50rem">
              <Column field="fr" header="FR" :body="formatColumn('FR')"></Column>
              <Column field="all" header="ALL" :body="formatColumn('ALL')"></Column>
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

        <!-- Tableau unique pour les stages -->
        <div class="card mt-4">
          <h5>Stages Précédents</h5>
          <DataTable :value="stages" :rows="10" dataKey="id" :rowHover="true" :loading="loading"
            showGridlines tableStyle="min-width: 50rem">
            <template #empty> Pas de stages disponibles. </template>
            <template #loading> Chargement des données des stages. Veuillez patienter. </template>
            <Column field="NomPlace" header="Institution" style="min-width: 12rem"></Column>
            <Column field="Lieu" header="Lieu" style="min-width: 12rem"></Column>
            <Column field="Langue" header="Langue" style="min-width: 12rem"></Column>
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
import {ref as dbRef, get } from "firebase/database";
import {  onAuthStateChanged } from "firebase/auth";
import { db, auth } from '../../../../firebase.js';

const stages = ref([]);
const userProfile = ref(null);
const loading = ref(true);
const globalFilter = ref('');

const fetchUserProfile = async (email) => {
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
          console.log('Profil utilisateur récupéré :', userProfile.value);
          addAllPFPInfoToStages(student, studentKey);
          return;
        }
      }
    }
  }
  userProfile.value = null;
  console.log('Profil utilisateur non trouvé');
};





const addAllPFPInfoToStages = async (student, studentKey) => {
  const pfpInfos = ['PFP1_info', 'PFP2_info', 'PFP3_info', 'PFP4_info'];

  for (const pfp of pfpInfos) {
    if (student[pfp]) {
      let idPlace = student[pfp].institutionId;

      if (!idPlace) {
        console.error("IDPlace est manquant pour", pfp);
        continue;
      }

      // Référence de l'institution
      const institutionRef = dbRef(db, `institutions/${idPlace}`);
      console.log("Okkko");

      try {
        const snapshot = await get(institutionRef);
        if (snapshot.exists()) {
          const institutionData = snapshot.val();
          console.log("Okkk1");
          stages.value.push({
            id: `${pfp}-${studentKey}`,
            NomPlace:  (institutionData.Name || 'N/A'),
            Lieu: institutionData.Lieu || 'N/A',
            Langue: institutionData.Langue || 'N/A',
          });
        } else {
          console.log("Pas de données disponibles pour l'IDPlace:", idPlace);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'institution:", error);
      }
    }
  }

  console.log('Stages après ajout des infos PFP :', stages.value);
};

const getSecteurs = (info) => {
  const secteurs = [];
  if (info.NEUROGER === 1) secteurs.push('NEUROGER');
  if (info.REHAB === 1) secteurs.push('REHAB');
  if (info.AIGU === 1) secteurs.push('AIGU');
  if (info.MSQ === 1) secteurs.push('MSQ');
  if (info.SYSINT === 1) secteurs.push('SYSINT');
  if (info.AMBU === 1) secteurs.push('AMBU');
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
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await fetchUserProfile(user.email);
      loading.value = false;
    } else {
      userProfile.value = null;
      loading.value = false;
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

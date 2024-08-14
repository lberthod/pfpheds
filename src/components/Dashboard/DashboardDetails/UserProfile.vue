<template>
  <div>
    <div class="grid">
      <div class="col-12">
        <div class="card">
          <div v-if="userProfile">
            <p><strong>Nom :</strong> {{ userProfile.Nom }}</p>
            <p><strong>Prénom :</strong> {{ userProfile.Prenom }}</p>
            <p><strong>Classe :</strong> {{ userProfile.Classe }}</p>
            <h5>Détails des critères :</h5>
            <DataTable :value="criteria" tableStyle="min-width: 50rem">
              <Column v-for="col of criteriaColumns" :key="col.field" :field="col.field" :header="col.header"></Column>
            </DataTable>
          </div>
          <div v-else>
            <p>Chargement des données du profil ...</p>
          </div>
        </div>

        <!-- DataTable pour les stages -->
        <div class="card mt-4">
          <h5>Stages</h5>
          <DataTable :value="stages" tableStyle="min-width: 50rem">
            <Column field="Nom" header="Nom"></Column>
            <Column field="Lieu" header="Lieu"></Column>
            <Column field="Langue" header="Langue"></Column>
            <Column field="Secteur" header="Secteur"></Column>
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
import { getDatabase, ref as dbRef, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const stages = ref([]);
const userProfile = ref(null);
const criteria = ref([]);
const loading = ref(true);

const criteriaColumns = ref([
  { field: 'FR', header: 'FR' },
  { field: 'ALL', header: 'ALL' },
  { field: 'AMBU', header: 'AMBU' },
  { field: 'MSQ', header: 'MSQ' },
  { field: 'SYSINT', header: 'SYSINT' },
  { field: 'NEUROGER', header: 'NEUROGER' },
  { field: 'REHAB', header: 'REHAB' },
  { field: 'AIGU', header: 'AIGU' }
]);

const stagesColumns = ref([
  { field: 'Nom', header: 'Nom' },
  { field: 'Lieu', header: 'Lieu' },
  { field: 'Langue', header: 'Langue' },
  { field: 'Secteur', header: 'Secteur' }
]);

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

          criteria.value = [
            {
              FR: student.FR,
              ALL: student.ALL,
              AMBU: student.AMBU,
              MSQ: student.MSQ,
              SYSINT: student.SYSINT,
              NEUROGER: student.NEUROGER,
              REHAB: student.REHAB,
              AIGU: student.AIGU
            }
          ];

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
  if (info.NEUROGER === 1) secteurs.push('NEUROGER');
  if (info.REHAB === 1) secteurs.push('REHAB');
  if (info.AIGU === 1) secteurs.push('AIGU');
  if (info.MSQ === 1) secteurs.push('MSQ');
  if (info.AMBU === 1) secteurs.push('AMBU');
  if (info.SYSINT === 1) secteurs.push('SYSINT');

  return secteurs.join(', ');
};

const criteriaTemplate = (rowData) => {
  const validCriteria = [];

  if (rowData.FR === '1') validCriteria.push('FR');
  if (rowData.ALL === '1') validCriteria.push('ALL');
  if (rowData.AIGU) validCriteria.push('AIGU');
  if (rowData.REHAB) validCriteria.push('REHAB');
  if (rowData.MSQ) validCriteria.push('MSQ');
  if (rowData.SYSINT) validCriteria.push('SYSINT');
  if (rowData.NEUROGER) validCriteria.push('NEUROGER');
  if (rowData.AMBU) validCriteria.push('AMBU');

  return validCriteria.join(', ');
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
  margin-top: 1rem;
  width: 100%;
}

.mt-4 {
  margin-top: 1.5rem;
}
</style>

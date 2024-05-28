<template>
  <div class="container py-5">
    <div class="text-center mb-4">
      <h1 class="mb-3">Validation de la répartition</h1>
      <div>
        <label class="form-label">Classe : B22</label> <br>
        <label class="form-label">PFP : PFP2</label> <br>
        <label class="form-label">Année académique : 23</label> <br>
      </div>
    </div>

    <DataTable :value="stages" responsiveLayout="scroll">
      <template #header>
        <div class="table-header">Liste des répartitions</div>
      </template>
      <Column field="id" header="ETUDIANT" />
      <Column field="institution" header="Institution" />
      <Column field="canton" header="Secteur" />
      <Column field="lieu" header="Praticien Formateur" />
      <Column field="lieu" header="Cas particulier" />
    </DataTable>

    <div class="d-flex justify-content-center mt-4">
      <Button @click="createPFP" label="Valider PFP" class="p-button-primary" />
    </div>
  </div>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, get } from "firebase/database";
import { ref as vueRef, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

export default {
  name: 'Validation',
  components: {
    DataTable,
    Column,
    Button
  },
  setup() {
    const stages = vueRef([]);

    const fetchStages = async () => {
      try {
        const studentName = "nom_de_l_etudiant"; // Remplacez par le nom de l'étudiant concerné
        const votationRef = ref(db, `votation/23/PFP2/${studentName}`);
        const snapshot = await get(votationRef);
        if (snapshot.exists()) {
          stages.value = Object.values(snapshot.val().choices);
          console.log("Stages récupérés :", stages.value);
        } else {
          console.error(`Aucun stage trouvé pour votation/23/PFP2/${studentName}`);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des stages:', error);
      }
    };

    const createPFP = () => {
      // Ajouter la logique pour valider PFP ici
    };

    onMounted(() => {
      fetchStages();
    });

    return {
      stages,
      createPFP
    };
  }
};
</script>

<style scoped>
.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-top: 20px;
}

.table-header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #0056b3;
}
</style>

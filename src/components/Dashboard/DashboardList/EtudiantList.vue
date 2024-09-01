<template>
  <div>
    <Navbar />
    <div class="filter-menu">
      <DataTable
        :value="filteredEtudiants"
        :paginator="true"
        :rows="10"
        dataKey="id"
        :rowHover="true"
        v-model:filters="filters"
        filterDisplay="menu"
        :loading="loading"
        :globalFilterFields="['Nom', 'Prenom', 'Classe', 'Mail']"
        showGridlines
      >
        <template #header>
          <div class="flex justify-content-between flex-column sm:flex-row">
            <Button label="Ajouter un étudiant" icon="pi pi-plus" class="mb-2 mr-2" @click="goToEtudiantForm" />
            <span class="p-input-icon-left">
              <InputText v-model="globalFilter" placeholder="Recherche" style="width: 100%" />
            </span>
          </div>
        </template>
        <template #empty> Aucun étudiant trouvé. </template>
        <template #loading> Chargement des données des étudiants. Veuillez patienter. </template>

        <Column field="Nom" header="Nom" style="min-width: 12rem" class="text-center" />
        <Column field="Prenom" header="Prénom" style="min-width: 12rem" class="text-center" />
        <Column field="Classe" header="Classe" style="min-width: 8rem" class="text-center">
          <template #filter="{ filterModel }">
            <Dropdown :options="classeOptions" v-model="filterModel.value" class="p-column-filter" placeholder="Rechercher par classe" />
          </template>
        </Column>
        <Column field="Mail" header="Email" style="min-width: 16rem" class="text-center" />

        <!-- Colonne pour indiquer si l'étudiant est un SAE -->
        <Column field="Cas_Particulier" header="SAE" style="min-width: 8rem" class="text-center">
          <template #body="{ data }">
            <input type="checkbox" :checked="data.Cas_Particulier" disabled />
          </template>
          <template #filter="{ filterModel }">
            <TriStateCheckbox v-model="filterModel.value" />
          </template>
        </Column>

        <Column header="Actions" style="min-width: 12rem" class="text-center">
          <template #body="{ data }">
            <Button label="Détails" class="mb-2 mr-2" @click="goToEtudiantDetails(data.id)" />
            <Button label="Modifier" class="mb-2 mr-2" @click="goToEtudiantFormModif(data.id)" />
            <Button label="Supprimer" class="mb-2 mr-2" @click="deleteStudent(data.id)" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref as dbRef, get, set } from "firebase/database";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import Dropdown from 'primevue/dropdown';
import Navbar from '@/components/Utils/Navbar.vue';

export default {
  name: "EtudiantList",
  components: {
    DataTable,
    Column,
    InputText,
    Button,
    TriStateCheckbox,
    Dropdown,
    Navbar
  },
  data() {
    return {
      etudiants: [],
      filters: {
        'Classe': { value: '', matchMode: 'equals' }, // Priorité à ba23
      },
      loading: true,
      globalFilter: '',
      classeOptions: ['ba21', 'ba22', 'ba23']  // Ajout des options de classe
    };
  },
  computed: {
    filteredEtudiants() {
      return this.etudiants.filter(etudiant => {
        const matchesClass = this.filters['Classe'].value ? this.filters['Classe'].value.includes(etudiant.Classe) : true;
        const searchLower = this.globalFilter.toLowerCase();

        const matchesSearch =
          (etudiant.Nom ? etudiant.Nom.toLowerCase().includes(searchLower) : false)
          || (etudiant.Prenom ? etudiant.Prenom.toLowerCase().includes(searchLower) : false)
          || (etudiant.Classe ? etudiant.Classe.toLowerCase().includes(searchLower) : false)
          || (etudiant.Mail ? etudiant.Mail.toLowerCase().includes(searchLower) : false);

        return matchesClass && matchesSearch;
      });
    }
  },
  async mounted() {
    await this.fetchEtudiants();
  },
  methods: {
    async fetchEtudiants() {
      try {
        const db = getDatabase();
        const classes = ['ba23', 'ba22', 'ba21']; // Priorité aux ba23
        const studentsData = [];

        for (const classKey of classes) {
          const classRef = dbRef(db, `students/${classKey}`);
          const snapshot = await get(classRef);
          if (snapshot.exists()) {
            const classData = snapshot.val();
            for (const studentKey in classData) {
              const student = {
                id: studentKey,
                Classe: classKey,
                ...classData[studentKey]
              };
              studentsData.push(student);
            }
          }
        }
        this.etudiants = studentsData;
        this.loading = false;
      } catch (error) {
        console.error('Erreur de récupération des données', error);
      }
    },
    async deleteStudent(etuId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
        try {
          const db = getDatabase();
          const studentRef = dbRef(db, `students/${etuId}`);
          await set(studentRef, null);
          await this.fetchEtudiants(); // Re-fetch students after deletion
        } catch (error) {
          console.error('Erreur de suppression de l’étudiant', error);
        }
      }
    },
    goToEtudiantForm() {
      this.$router.push({ name: 'EtudiantForm' });
    },
    goToEtudiantDetails(etuId) {
      this.$router.push({ name: 'EtudiantDetails', params: { id: etuId } });
    },
    goToEtudiantFormModif(etuId) {
      this.$router.push({ name: 'EtudiantFormModif', params: { etuId } });
    }
  }
};
</script>

<style scoped>
.filter-menu {
  padding: 20px;
}
</style>

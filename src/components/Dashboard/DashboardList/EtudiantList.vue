<template>
  <div>
    <Navbar />
    <div class="filter-menu">
      <DataTable
        :value="filteredEtudiants"
        :paginator="true"
        :rows="100"
        dataKey="id"
        :rowHover="true"
        v-model:filters="filters"
        filterDisplay="menu"
        :loading="loading"
        :globalFilterFields="['Nom', 'Prenom', 'Classe', 'Responsable', 'Email', 'validationMessage']"
        showGridlines
      >
        <template #header>
          <div class="flex justify-content-between flex-column sm:flex-row">
            <Button label="Ajouter un étudiant" icon="pi pi-plus" class="mb-2 mr-2" @click="goToEtudiantForm" />
            <IconField iconPosition="left">
              <InputIcon class="pi pi-search" />
              <InputText v-model="globalFilter" placeholder="Recherche" style="width: 100%" />
            </IconField>
          </div>
        </template>
        <template #empty> Aucun étudiant trouvé. </template>
        <template #loading> Chargement des données des étudiants. Veuillez patienter. </template>
        <Column field="Nom" header="Nom" style="min-width: 12rem" class="text-center">
          <template #body="{ data }">
            {{ data.Nom }}
          </template>
          <template #filter="{ filterModel }">
            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Rechercher par nom" />
          </template>
        </Column>
        <Column field="Prenom" header="Prénom" style="min-width: 12rem" class="text-center">
          <template #body="{ data }">
            {{ data.Prenom }}
          </template>
          <template #filter="{ filterModel }">
            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Rechercher par prénom" />
          </template>
        </Column>
        <Column field="Classe" header="Classe" style="min-width: 12rem" class="text-center">
          <template #body="{ data }">
            {{ data.Classe }}
          </template>
          <template #filter="{ filterModel }">
            <Dropdown :options="classeOptions" v-model="filterModel.value" class="p-column-filter" placeholder="Rechercher par classe" />
          </template>
          <template #filterclear="{ filterCallback }">
            <Button type="button" icon="pi pi-times" @click="filterCallback()" severity="secondary"></Button>
          </template>
          <template #filterapply="{ filterCallback }">
            <Button type="button" icon="pi pi-check" @click="filterCallback()" severity="success"></Button>
          </template>
        </Column>

        <Column field="SAE" header="SAE" style="min-width: 8rem" class="text-center">
          <template #body="{ data }">
            <input type="checkbox" :checked="data.SAE" disabled />
          </template>
          <template #filter="{ filterModel }">
            <TriStateCheckbox v-model="filterModel.value" />
          </template>
        </Column>
        <Column field="validationMessage" header="Validation" style="min-width: 12rem" class="text-center">
          <template #body="{ data }">
            {{ data.validationMessage }}
          </template>
        </Column>
        <Column header="Action" style="min-width: 12rem" class="text-center">
          <template #body="{ data }">
            <Button label="Details" class="mb-2 mr-2" @click="goToEtudiantDetails(data.id)" />
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
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
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
    IconField,
    InputIcon,
    TriStateCheckbox,
    Dropdown,
    Navbar
  },
  data() {
    return {
      etudiants: [],
      filters: {
        'Nom': { value: null, matchMode: 'contains' },
        'Prenom': { value: null, matchMode: 'contains' },
        'Classe': { value: "ba22", matchMode: 'equals' },
        'Responsable': { value: null, matchMode: 'contains' },
        'Email': { value: null, matchMode: 'contains' },
        'SAE': { value: null, matchMode: 'equals' }
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
          || (etudiant.Prenom ? etudiant.Prenom.toLowerCase().includes(searchLower) : false);

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
        const classes = ['ba21', 'ba22', 'ba23'];
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
              student.validationMessage = this.getValidationMessage(student);
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
    getValidationMessage(student) {
      const { FR, ALL, AMBU, MSQ, SYSINT, NEUROGER, REA } = student;
      let missingFields = [];
      let languageIssue = null;

      if (FR == "0" && ALL == "0" && AMBU == "0" && MSQ == "0" && SYSINT == "0" && NEUROGER == "0" && REA == "0") {
        return "Toutes les options sont disponibles";
      }

      if (FR == "0") languageIssue = "besoin langue FR";
      if (ALL == "0") languageIssue = "besoin langue ALL";
      if (AMBU == "0") missingFields.push("AMBU");
      if (MSQ == "0") missingFields.push("MSQ");
      if (SYSINT == "0") missingFields.push("SYSINT");
      if (NEUROGER == "0") missingFields.push("NEUROGER");
      if (REA == "0") missingFields.push("REA");

      if (languageIssue) {
        return languageIssue;
      } else if (missingFields.length > 0) {
        return `manque ${missingFields.join(", ")}`;
      } else {
        return "Tout validé";
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
    clearFilter() {
      this.filters = {
        'Nom': { value: null, matchMode: 'contains' },
        'Prenom': { value: null, matchMode: 'contains' },
        'Classe': { value: null, matchMode: 'equals' },
        'Responsable': { value: null, matchMode: 'contains' },
        'Email': { value: null, matchMode: 'contains' },
        'SAE': { value: null, matchMode: 'equals' }
      };
      this.globalFilter = '';
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

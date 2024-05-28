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
        :globalFilterFields="['Nom', 'Prenom', 'Classe', 'Responsable', 'Email']"
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
            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Rechercher par classe" />
          </template>
          <template #filterclear="{ filterCallback }">
            <Button type="button" icon="pi pi-times" @click="filterCallback()" severity="secondary"></Button>
          </template>
          <template #filterapply="{ filterCallback }">
            <Button type="button" icon="pi pi-check" @click="filterCallback()" severity="success"></Button>
          </template>
        </Column>
        <Column field="Responsable" header="Responsable de Stage" style="min-width: 12rem" class="text-center">
          <template #body="{ data }">
            <span v-if="data.Responsable && data.Responsable.Prenom && data.Responsable.Nom">
              {{ data.Responsable.Prenom }} {{ data.Responsable.Nom }}
            </span>
            <span v-else>
              Associé à un responsable
            </span>
          </template>
          <template #filter="{ filterModel }">
            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Rechercher par responsable de stage" />
          </template>
        </Column>
        <Column field="Email" header="E-Mail" style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.Email }}
          </template>
          <template #filter="{ filterModel }">
            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Rechercher par e-mail" />
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
import { db } from '../../../../firebase.js';
import { ref, onValue, set } from "firebase/database";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import Navbar from '@/components/Utils/Navbar.vue'

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
    Navbar
  },
  data() {
    return {
      etudiants: [],
      filters: {},
      loading: true,
      globalFilter: '',
    };
  },
  computed: {
    filteredEtudiants() {
      return this.etudiants.filter(etudiant => {
        const matchesClass = this.filters['Classe'] ? this.filters['Classe'].value.includes(etudiant.Classe) : true;
        const searchLower = this.globalFilter.toLowerCase();

        const matchesSearch =
          (etudiant.Nom ? etudiant.Nom.toLowerCase().includes(searchLower) : false)
          || (etudiant.Prenom ? etudiant.Prenom.toLowerCase().includes(searchLower) : false);

        return matchesClass && matchesSearch;
      });
    }
  },
  async mounted() {
    try {
      const starCountRef = ref(db, 'etudiants/');
      onValue(starCountRef, (snapshot) => {
        const studentsData = snapshot.val();
        if (studentsData) {
          this.etudiants = Object.keys(studentsData).map(key => ({
            id: key,
            ...studentsData[key]
          }));
        }
        this.loading = false;
      });
    } catch (error) {
      console.error('Erreur de récupération des données', error);
    }
  },
  methods: {
    async deleteStudent(etuId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
        try {
          const studentRef = ref(db, 'etudiants/' + etuId);
          await set(studentRef, null);
        } catch (error) {
          console.error('Erreur de suppression de l’étudiant', error);
        }
      }
    },
    clearFilter() {
      this.filters = {};
      this.globalFilter = '';
    },
    goToEtudiantForm() {
      console.log("Navigating to EtudiantForm");
      this.$router.push({ name: 'EtudiantForm' });
    },
    goToEtudiantDetails(etuId) {
      console.log("Navigating to EtudiantDetails with ID:", etuId);
      this.$router.push({ name: 'EtudiantDetails', params: { id: etuId } });
    },
    goToEtudiantFormModif(etuId) {
      console.log("Navigating to EtudiantFormModif with ID:", etuId);
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

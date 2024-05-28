<template>
  <div>
    <Navbar />
    <div class="filter-menu">
      <DataTable
        :value="filteredEnseignants"
        :paginator="true"
        :rows="10"
        dataKey="id"
        :rowHover="true"
        v-model:filters="filters"
        filterDisplay="menu"
        :loading="loading"
        :globalFilterFields="['Nom', 'Prenom', 'Email']"
        showGridlines
      >
        <template #header>
          <div class="flex justify-content-between flex-column sm:flex-row">
            <Button label="Ajouter un enseignant" icon="pi pi-plus" class="mb-2 mr-2" @click="goToEnseignantForm" />
            <IconField iconPosition="left">
              <InputIcon class="pi pi-search" />
              <InputText v-model="globalFilter" placeholder="Recherche" style="width: 100%" />
            </IconField>
          </div>
        </template>
        <template #empty> Aucun enseignant trouvé. </template>
        <template #loading> Chargement des données des enseignants. Veuillez patienter. </template>
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
        <Column field="Email" header="Email" style="min-width: 12rem" class="text-center">
          <template #body="{ data }">
            {{ data.Email }}
          </template>
          <template #filter="{ filterModel }">
            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Rechercher par email" />
          </template>
        </Column>
        <Column header="Action" style="min-width: 12rem" class="text-center">
          <template #body="{ data }">
            <Button label="Modifier" class="mb-2 mr-2" @click="goToEnseignantFormModif(data.id)" />
            <Button label="Supprimer" class="mb-2 mr-2" @click="deleteEnseignant(data.id)" />
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
import Navbar from '@/components/Utils/Navbar.vue';

export default {
  name: "EnseignantList",
  components: {
    DataTable,
    Column,
    InputText,
    Button,
    IconField,
    InputIcon,
    Navbar
  },
  data() {
    return {
      enseignants: [],
      filters: {},
      loading: true,
      globalFilter: '',
      search: '',
    };
  },
  computed: {
    filteredEnseignants() {
      const searchLower = this.globalFilter.toLowerCase();
      return this.enseignants.filter(enseignant => {
        return enseignant.Nom.toLowerCase().includes(searchLower)
          || enseignant.Prenom.toLowerCase().includes(searchLower)
          || enseignant.Email.toLowerCase().includes(searchLower);
      });
    }
  },
  async mounted() {
    try {
      const enseignantsRef = ref(db, 'enseignants/');
      onValue(enseignantsRef, (snapshot) => {
        const enseignantsData = snapshot.val();
        if (enseignantsData) {
          this.enseignants = Object.keys(enseignantsData).map(key => ({
            id: key,
            ...enseignantsData[key]
          }));
        }
        this.loading = false;
      });
    } catch (error) {
      console.error('Erreur de récupération des données des enseignants', error);
    }
  },
  methods: {
    async deleteEnseignant(enseignantId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet enseignant ?')) {
        try {
          const enseignantRef = ref(db, 'enseignants/' + enseignantId);
          await set(enseignantRef, null);
        } catch (error) {
          console.error('Erreur de suppression de l’enseignant', error);
        }
      }
    },
    goToEnseignantFormModif(enseignantId) {
      this.$router.push({ name: 'EnseignentFormModif', params: { enseignantId } });
    },
    goToEnseignantForm() {
      this.$router.push({ name: 'EnseignentForm' });
    },
    goToAdminDashboard() {
      this.$router.push({ name: 'AdminDashboard' });
    },
    clearFilter() {
      this.filters = {};
      this.globalFilter = '';
    }
  }
};
</script>

<style scoped>
.filter-menu {
  padding: 20px;
}
</style>

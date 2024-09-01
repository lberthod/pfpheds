<template>
  <div>
    <Navbar />
    <div class="filter-menu">
      <DataTable
        :value="filteredInstitutions"
        :paginator="true"
        :rows="10"
        dataKey="key"
        :rowHover="true"
        v-model:filters="filters"
        filterDisplay="menu"
        :loading="loading"
        :globalFilterFields="['Name', 'Street', 'Lieu', 'Canton', 'key']"
        showGridlines
      >
        <template #header>
          <div class="flex justify-content-between flex-column sm:flex-row">
            <Button label="Ajouter une institution" icon="pi pi-plus" class="mb-2 mr-2" @click="goToInstitutionForm" />
            <IconField iconPosition="left">
              <InputIcon class="pi pi-search" />
              <InputText v-model="globalFilter" placeholder="Recherche" style="width: 100%" />
            </IconField>
          </div>
        </template>
        <template #empty> Aucun institution trouvée. </template>
        <template #loading> Chargement des données des institutions. Veuillez patienter. </template>
        <Column field="key" header="ID" style="min-width: 6rem" class="text-center">
          <template #body="{ data }">
            {{ data.key }}
          </template>
          <template #filter="{ filterModel }">
            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="ID" />
          </template>
        </Column>
        <Column field="Name" header="Nom de l'institution" style="min-width: 12rem" class="text-center">
          <template #body="{ data }">
            {{ data.Name }}
          </template>
          <template #filter="{ filterModel }">
            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Rechercher par nom" />
          </template>
        </Column>
        <Column field="Street" header="Rue" style="min-width: 12rem" class="text-center">
          <template #body="{ data }">
            {{ data.Street }}
          </template>
          <template #filter="{ filterModel }">
            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Rechercher par rue" />
          </template>
        </Column>
        <Column field="Lieu" header="Lieu" style="min-width: 12rem" class="text-center">
          <template #body="{ data }">
            {{ data.Lieu }}
          </template>
          <template #filter="{ filterModel }">
            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Rechercher par lieu" />
          </template>
        </Column>
        <Column field="Canton" header="Canton" style="min-width: 12rem" class="text-center">
          <template #body="{ data }">
            {{ data.Canton }}
          </template>
          <template #filter="{ filterModel }">
            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Rechercher par canton" />
          </template>
        </Column>

        <Column field="Accord Cadre" header="Accord Cadre" style="min-width: 12rem" class="text-center">
        <template #body="{ data }">
          {{ data.AccordCadre }}
        </template>
        <template #filter="{ filterModel }">
          <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Rechercher par date" />
        </template>
        </Column>

        <Column header="Action" style="min-width: 12rem" class="text-center">
          <template #body="{ data }">
            <Button label="Détails" class="mb-2 mr-2" @click="goToDetails(data.key)" />
            <Button label="Modifier" class="mb-2 mr-2" @click="goToInstitutionFormModif(data.key)" />
            <Button label="Supprimer" class="mb-2 mr-2" @click="supprimerInstitution(data.key)" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, onValue, remove } from "firebase/database";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Navbar from '@/components/Utils/Navbar.vue';

export default {
  name: "InstitutionList",
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
      institutions: [],
      filters: {},
      loading: true,
      globalFilter: '',
    };
  },
  computed: {
    filteredInstitutions() {
      const searchLower = this.globalFilter.toLowerCase();
      return this.institutions.filter(institution => {
        const matchesSearch =
          (institution.Name ? institution.Name.toLowerCase().includes(searchLower) : false) ||
          (institution.Street ? institution.Street.toLowerCase().includes(searchLower) : false) ||
          (institution.Lieu ? institution.Lieu.toLowerCase().includes(searchLower) : false) ||
          (institution.Canton && typeof institution.Canton === 'string' ? institution.Canton.toLowerCase().includes(searchLower) : false) ||
          (institution.URL ? institution.URL.toLowerCase().includes(searchLower) : false) ||
          (institution.key ? institution.key.toLowerCase().includes(searchLower) : false);

        return matchesSearch;
      });
    }
  },
  async mounted() {
    try {
      const institutionsRef = ref(db, 'institutions/');
      onValue(institutionsRef, (snapshot) => {
        const data = snapshot.val();
        this.institutions = data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
        this.loading = false;
      });
    } catch (error) {
      console.error('Erreur de récupération des données', error);
    }
  },
  methods: {
    supprimerInstitution(institutionId) {
      if (!institutionId) {
        alert("ID de l'institution est manquant ou incorrect.");
        return;
      }

      if (window.confirm("Êtes-vous sûr de vouloir supprimer cette institution ?")) {
        const instRef = ref(db, 'institutions/' + institutionId);
        remove(instRef)
          .then(() => {
            alert("L'institution a été supprimée avec succès.");
            this.fetchInstitutions();
          })
          .catch((error) => {
            console.error("Erreur lors de la suppression de l'institution:", error);
            alert("Une erreur est survenue lors de la suppression de l'institution.");
          });
      }
    },
    goToInstitutionForm() {
      this.$router.push({ name: 'InstitutionForm' });
    },
    goToInstitutionFormModif(id) {
      this.$router.push({ name: 'InstitutionFormModif', params: { id } });
    },
    goToAdminDashboard() {
      this.$router.push({ name: 'AdminDashboard' });
    },
    goToDetails(id) {
      if (id) {
        this.$router.push({ name: 'InstitutionView', params: { id: id } });
      } else {
        console.error("ID is undefined for this institution.");
      }
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

<template>
  <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
    <div class="text-center">
      <h1 class="text-5xl font-bold mb-4">Nouvel étudiant</h1>
    </div>
    <form @submit.prevent="addStudent" class="p-fluid grid">
      <div class="field mb-4 col-6">
        <label for="prenom" class="block text-xl mb-2">Prénom</label>
        <InputText id="prenom" v-model="prenom" required class="w-full" />
      </div>
      <div class="field mb-4 col-6">
        <label for="nom" class="block text-xl mb-2">Nom</label>
        <InputText id="nom" v-model="nom" required class="w-full" />
      </div>
      <div class="field mb-4 col-6">
        <label for="classe" class="block text-xl mb-2">Classe</label>
        <InputText id="classe" v-model="classe" required class="w-full" />
      </div>
      <div class="field mb-4 col-6">
        <label for="email" class="block text-xl mb-2">Email</label>
        <InputText id="email" v-model="email" required type="email" class="w-full" />
      </div>
      <div class="field mb-4 col-6">
        <label for="responsable" class="block text-xl mb-2">Responsable de stage</label>
        <Dropdown id="responsable" v-model="responsable" :options="enseignants" optionLabel="Nom" placeholder="Sélectionner un responsable" class="w-full" />
      </div>
      <div class="text-center mt-5 col-12">
        <Button type="submit" label="Ajouter" class="p-button-primary w-full lg:w-auto" />
      </div>
    </form>
  </div>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, get, set } from "firebase/database";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';

export default {
  name: 'EtudiantForm',
  components: {
    InputText,
    Button,
    Dropdown
  },
  data() {
    return {
      prenom: '',
      nom: '',
      classe: '',
      email: '',
      responsable: null,
      enseignants: []
    };
  },
  async mounted() {
    await this.fetchEnseignants();
  },
  methods: {
    async fetchEnseignants() {
      try {
        const enseignantsRef = ref(db, 'enseignants/');
        const snapshot = await get(enseignantsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          this.enseignants = Object.keys(data).map(key => ({
            ...data[key],
            id: key
          }));
        }
      } catch (error) {
        console.error('Erreur de chargement des enseignants', error);
      }
    },
    async addStudent() {
      try {
        const studentsRef = ref(db, 'etudiants/');

        const snapshot = await get(studentsRef);
        const studentsData = snapshot.val();

        const studentCount = studentsData ? Object.keys(studentsData).length : 0;
        const newStudentId = 'student' + (studentCount + 1);

        const newStudentRef = ref(db, 'etudiants/' + newStudentId);
        await set(newStudentRef, {
          Prenom: this.prenom,
          Nom: this.nom,
          Classe: this.classe,
          Email: this.email,
          Responsable: this.responsable
        });

        this.prenom = '';
        this.nom = '';
        this.classe = '';
        this.email = '';
        this.responsable = null;

        this.$router.push({ name: 'EtudiantList' });
      } catch (error) {
        console.error('Erreur d’ajout de l’étudiant', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>

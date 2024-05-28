<template>
  <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
    <div class="text-center">
      <h1 class="text-5xl font-bold mb-4">Modifier les enseignants</h1>
    </div>
    <form @submit.prevent="updateEnseignant" class="p-fluid gird">
      <div class="field mb-4 col-6">
        <label for="prenom" class="block text-xl mb-2">Prénom</label>
        <InputText id="prenom" v-model="prenom" required class="w-full" />
      </div>
      <div class="field mb-4 col-6">
        <label for="nom" class="block text-xl mb-2">Nom</label>
        <InputText id="nom" v-model="nom" required class="w-full" />
      </div>
      <div class="field mb-4 col-12">
        <label for="email" class="block text-xl mb-2">Email</label>
        <InputText id="email" v-model="email" required type="email" class="w-full" />
      </div>
      <div class="field mb-4 col-6">
        <label for="role" class="block text-xl mb-2">Role</label>
        <InputText id="role" v-model="role" class="w-full" />
      </div>
      <div class="field mb-4 col-6">
        <label for="institution" class="block text-xl mb-2">Institution</label>
        <InputText id="institution" v-model="institution" class="w-full" />
      </div>
      <div class="text-center mt-5 col-12">
        <Button type="submit" label="Mettre à jour" class="p-button-primary w-full lg:w-auto" />
      </div>
    </form>
  </div>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, get, set } from "firebase/database";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
  name: 'EnseignantFormModif',
  components: {
    InputText,
    Button
  },
  props: {
    enseignantId: String // Assurez-vous que ce nom correspond à celui passé en prop
  },
  data() {
    return {
      prenom: '',
      nom: '',
      role: '',
      email: '',
      institution: '',
    };
  },
  async mounted() {
    if (this.enseignantId) {
      try {
        const enseignantRef = ref(db, 'enseignants/' + this.enseignantId);
        const snapshot = await get(enseignantRef);
        if (snapshot.exists()) {
          const enseignantData = snapshot.val();
          this.prenom = enseignantData.Prenom || '';
          this.nom = enseignantData.Nom || '';
          this.role = enseignantData.Role || '';
          this.email = enseignantData.Email || '';
          this.institution = enseignantData.Institution || '';
        } else {
          console.error('Enseignant non trouvé');
        }
      } catch (error) {
        console.error('Erreur de chargement des données de l’enseignant', error);
      }
    } else {
      console.error('Aucun ID d’enseignant fourni');
    }
  },
  methods: {
    async updateEnseignant() {
      if (confirm('Êtes-vous sûr de vouloir mettre à jour cet enseignant ?')) {
        try {
          const enseignantRef = ref(db, 'enseignants/' + this.enseignantId);
          await set(enseignantRef, {
            Prenom: this.prenom,
            Nom: this.nom,
            Role: this.role,
            Email: this.email,
            Institution: this.institution,
          });

          // Rediriger vers la liste des enseignants
          this.$router.push({ name: 'EnseignantList' }); // Assurez-vous que la route est correcte
        } catch (error) {
          console.error('Erreur de mise à jour de l’enseignant', error);
        }
      }
    }
  }
};
</script>

<style scoped>

</style>

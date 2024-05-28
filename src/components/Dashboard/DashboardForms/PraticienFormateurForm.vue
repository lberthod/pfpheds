<template>
  <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
    <section class="text-white text-center py-5 rounded-lg mb-5">
      <h1 class="text-5xl font-bold">Nouveau praticien formateur</h1>
    </section>

    <div class="card p-4 shadow-lg">
      <form @submit.prevent="addNewPraticienFormateur" class="p-fluid grid">
        <div class="p-field col-6">
          <label for="prenom">Prénom</label>
          <InputText id="prenom" v-model="prenom" required />
        </div>
        <div class="p-field col-6">
          <label for="nom">Nom</label>
          <InputText id="nom" v-model="nom" required />
        </div>
        <div class="p-field col-6">
          <label for="email">Email</label>
          <InputText id="email" v-model="email" required />
        </div>
        <Button type="submit" label="Ajouter" class="p-button-primary" />
      </form>
    </div>
  </div>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, get, set } from "firebase/database";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

export default {
  name: 'PraticienFormateurForm',
  components: {
    InputText,
    Button
  },
  data() {
    return {
      prenom: '',
      nom: '',
      email: '',
    };
  },
  methods: {
    async addNewPraticienFormateur() {
      try {
        const praticiensFormateursRef = ref(db, 'praticiensFormateurs'); // Assurez-vous que cette référence est correcte

        // Obtenir les données actuelles pour compter le nombre de praticiens formateurs
        const snapshot = await get(praticiensFormateursRef);
        const praticiensFormateursData = snapshot.val();
        const nextPraticienFormateurId = praticiensFormateursData ? Object.keys(praticiensFormateursData).length + 1 : 1;

        // Création d'un nouveau praticien formateur avec un identifiant séquentiel
        const newPraticienFormateurRef = ref(db, 'praticiensFormateurs/' + nextPraticienFormateurId);
        await set(newPraticienFormateurRef, {
          Prenom: this.prenom,
          Nom: this.nom,
          Email: this.email,
        });

        // Réinitialiser les champs du formulaire
        this.prenom = '';
        this.nom = '';
        this.email = '';

        // Rediriger vers la liste des praticiens formateurs
        // Assurez-vous que la route 'PraticienFormateurList' est correctement définie dans votre routeur
        this.$router.push({ name: 'PraticienFormateurList' });
      } catch (error) {
        console.error('Erreur d’ajout du nouveau praticien formateur', error);
      }
    }
  }
};
</script>

<style scoped>

</style>

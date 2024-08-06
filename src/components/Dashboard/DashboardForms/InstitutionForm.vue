<template>
  <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
    <section class="text-white text-center py-5 rounded-lg">
      <h1 class="text-5xl font-bold">Soumettre une nouvelle institution</h1>
    </section>

    <section class="mt-5">
      <div class="text-center mb-5">
        <p>Utilisez cette interface pour ajouter une nouvelle institution au portail. Une fois que vous avez terminé, l'institution sera examinée pour la qualité. Si approuvée, elle apparaîtra dans la liste et vous serez informé par e-mail.</p>
      </div>

      <div class="card p-4">
        <Steps :model="steps" :activeIndex="activeIndex" class="mb-5" />
        <div class="p-fluid">
          <form @submit.prevent="envoyerDonnees">
            <div v-if="activeIndex === 0">
              <h4>Détail de l'institution</h4>
              <Divider />
              <div class="grid formgrid">
                <div class="field col-12">
                  <label for="name">Nom</label>
                  <InputText id="name" v-model="institution.Name" class="w-full" />
                </div>
                <div class="field col-12">
                  <label for="cyberlearn">Cyberlearn</label>
                  <InputText id="cyberlearn" v-model="institution.Cyberlearn" class="w-full" />
                </div>
                <div class="field col-6">
                  <label for="lieu">Lieu</label>
                  <InputText id="lieu" v-model="institution.Lieu" class="w-full" />
                </div>
                <div class="field col-6">
                  <label for="canton">Canton</label>
                  <Dropdown id="canton" v-model="institution.Canton" :options="cantons" optionLabel="name" optionValue="name" class="w-full" />
                </div>
                <div class="field col-6">
                  <label for="street">Rue</label>
                  <InputText id="street" v-model="institution.Street" class="w-full" />
                </div>
                <div class="field col-3">
                  <label for="latitude">Latitude</label>
                  <InputText id="latitude" v-model="institution.Latitude" class="w-full" placeholder="Ex: 48.8566" />
                </div>
                <div class="field col-3">
                  <label for="longitude">Longitude</label>
                  <InputText id="longitude" v-model="institution.Longitude" class="w-full" placeholder="Ex: 2.3522" />
                </div>
                <div class="field col-12">
                  <label for="url">URL</label>
                  <InputText id="url" v-model="institution.URL" class="w-full" />
                </div>
              </div>
            </div>

            <div v-if="activeIndex === 1">
              <h4>Informations supplémentaires</h4>
              <Divider />
              <div class="grid formgrid">
                <div class="field col-8">
                  <label for="nomResponsablePhysio">Nom Responsable Physio</label>
                  <InputText id="nomResponsablePhysio" v-model="institution.NomResponsablePhysio" class="w-full" />
                </div>
                <div class="field col-4">
                  <label for="language">Langue</label>
                  <Dropdown id="language" v-model="institution.Langue" :options="languages" class="w-full" />
                </div>
                <div class="field col-4">
                  <label for="phoneResponsablePhysio">Téléphone Responsable Physio</label>
                  <InputText id="phoneResponsablePhysio" v-model="institution.PhoneResponsablePhysio" class="w-full" />
                </div>
                <div class="field col-4">
                  <label for="emailResponsablePhysio">Email Responsable Physio</label>
                  <InputText id="emailResponsablePhysio" v-model="institution.EmailResponsablePhysio" type="email" class="w-full" />
                </div>
              </div>
            </div>

            <div v-if="activeIndex === 2">
              <h4>Médias de l'institution</h4>
              <Divider />
              <div class="text-center">
                <div class="border-2 border-dashed surface-border rounded-lg p-5 mb-3">
                  <i class="pi pi-image text-5xl"></i>
                  <h6 class="mt-2">Téléchargez l'image de l'institution ici, ou <a href="#!" class="text-primary">Parcourir</a></h6>
                  <input type="file" accept="image/*" class="hidden" @change="onFileChange" />
                  <p class="mt-2">Seulement JPG, JPEG et PNG. Dimensions suggérées: 600px * 450px.</p>
                </div>
                <Button type="button" label="Supprimer l'image" class="p-button-danger mt-2" icon="pi pi-trash" />
              </div>
              <div class="field mt-4">
                <label for="imageUrl">URL de l'image</label>
                <InputText id="imageUrl" v-model="institution.ImageURL" class="w-full" />
              </div>
            </div>

            <div v-if="activeIndex === 3">
              <h4>Description</h4>
              <Divider />
              <div class="field">
                <label for="description">Description du lieu</label>
                <Textarea id="description" v-model="institution.Description" rows="5" class="w-full" placeholder="Entrez la description du lieu ici..."></Textarea>
              </div>
            </div>

            <div class="flex justify-content-between mt-5">
              <Button v-if="activeIndex > 0" type="button" label="Précédent" class="p-button-secondary" @click="goToPrevStep" />
              <Button v-if="activeIndex < steps.length - 1" type="button" label="Suivant" class="p-button-primary ml-auto" @click="goToNextStep" />
              <Button v-if="activeIndex === steps.length - 1" type="submit" label="Envoyer" class="p-button-primary ml-auto" />
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, onValue, set, update } from "firebase/database";
import { watch } from 'vue';
import Steps from 'primevue/steps';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Divider from 'primevue/divider';

export default {
  name: 'InstitutionForm',
  components: {
    Steps,
    InputText,
    Textarea,
    Dropdown,
    Button,
    Divider
  },
  data() {
    return {
      activeIndex: 0,
      institution: {
        Cyberlearn: '',
        Name: '',
        Lieu: '',
        Canton: '',
        Description: '',
        Street: '',
        URL: '',
        Latitude: '',
        Longitude: '',
        Langue: '',
        ImageURL: '',
        NomResponsablePhysio: '',
        PhoneResponsablePhysio: '',
        EmailResponsablePhysio: '',
      },
      cantons: [
        { code: 'Argovie', name: 'AG' },
        { code: 'Appenzell Rhodes-Intérieures', name: 'AI' },
        { code: 'Appenzell Rhodes-Extérieures', name: 'AR' },
        { code: 'Bâle-Campagne', name: 'BL' },
        { code: 'Bâle-Ville', name: 'BS' },
        { code: 'Berne', name: 'BE' },
        { code: 'Fribourg', name: 'FR' },
        { code: 'Genève', name: 'GE' },
        { code: 'Glaris', name: 'GL' },
        { code: 'Grisons', name: 'GR' },
        { code: 'Jura', name: 'JU' },
        { code: 'Lucerne', name: 'LU' },
        { code: 'Neuchâtel', name: 'NE' },
        { code: 'Nidwald', name: 'NW' },
        { code: 'Obwald', name: 'OW' },
        { code: 'Saint-Gall', name: 'SG' },
        { code: 'Schaffhouse', name: 'SH' },
        { code: 'Schwytz', name: 'SZ' },
        { code: 'Soleure', name: 'SO' },
        { code: 'Tessin', name: 'TI' },
        { code: 'Thurgovie', name: 'TG' },
        { code: 'Uri', name: 'UR' },
        { code: 'Valais', name: 'VS' },
        { code: 'Vaud', name: 'VD' },
        { code: 'Zoug', name: 'ZG' },
        { code: 'Zurich', name: 'ZH' },
        { code: 'Etranger', name: 'Etranger' }
      ],
      languages: [
        { label: 'Allemand', value: 'Allemand' },
        { label: 'Français', value: 'Français' },
        { label: 'Bilingue', value: 'Bilingue' }
      ],
      steps: [
        { label: 'Détail de l\'institution' },
        { label: 'Informations supplémentaires' },
        { label: 'Médias de l\'institution' },
        { label: 'Description' }
      ]
    };
  },
  mounted() {
    const instId = this.$route.params.instSlug;
    const instRef = ref(db, 'institutions/' + instId);

    onValue(instRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        Object.assign(this.institution, data);
      } else {
        console.error('Institution does not exist');
      }
    }, {
      onlyOnce: true,
    });

    const placedestageRef = ref(db, 'placedestage/' + this.$route.params.instSlug);

    onValue(placedestageRef, (snapshot) => {
      if (snapshot.exists()) {
        const allPlacedestage = snapshot.val();
        const matchedPlacedestage = Object.values(allPlacedestage).filter(
          placedestage => placedestage.idInstitution === this.$route.params.instSlug
        );
        this.placedestages = matchedPlacedestage;
      } else {
        console.error('Pas de place de stages disponibles');
        this.placedestages = [];
      }
    });

    watch(() => this.institution, async (newVal) => {
      try {
        await set(instRef, newVal);
      } catch (error) {
        console.error('Error updating institution:', error);
      }
    }, { deep: true });
  },
  methods: {
    goToNextStep() {
      if (this.activeIndex < this.steps.length - 1) {
        this.activeIndex++;
      }
    },
    goToPrevStep() {
      if (this.activeIndex > 0) {
        this.activeIndex--;
      }
    },
    async envoyerDonnees() {
      try {
        const stageRef = ref(db, 'placedestage/' + this.$route.params.instSlug);
        const newStageData = {};
        for (const stage of this.institution.stages) {
          newStageData[stage.id] = stage;
        }
        await update(stageRef, newStageData);
        this.institution.stages = [];
        this.$router.push({ name: 'InstitutionList' });
      } catch (error) {
        console.error('Erreur lors de l’envoi des données de stage:', error);
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.institution.ImageURL = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
};
</script>

<style scoped>

</style>

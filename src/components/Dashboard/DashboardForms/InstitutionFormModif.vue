<template>
  <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
    <section class="text-center py-5 rounded-lg mb-5 text-white">
      <h1 class="text-5xl font-bold">Modifier l'institution</h1>
    </section>

    <div class="grid">
      <div class="col-12 lg:col-12">
        <div class="card p-4 shadow-lg">
          <h1 class="mb-4">{{ institution.Name }}</h1>
          <div class="flex align-items-center mb-4">
            <h2 class="me-3 mb-0">{{ institution.Lieu }}</h2>
            <Badge :value="institution.Canton" class="p-mr-2 p-ml-auto" />
          </div>

          <div class="p-fluid grid">
            <div class="col-12 md:col-6">
              <div class="p-field">
                <label for="name">Nom</label>
                <InputText id="name" v-model="institution.Name" />
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="p-field">
                <label for="cyberlearn">Cyberlearn</label>
                <InputGroup>
                  <InputGroupAddon>www</InputGroupAddon>
                <InputText id="cyberlearn" v-model="institution.Cyberlearn" />
                </InputGroup>
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="p-field">
                <label for="lieu">Lieu</label>
                <InputText id="lieu" v-model="institution.Lieu" />
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="p-field">
                <label for="canton">Canton</label>
                <Dropdown id="canton" v-model="institution.Canton" :options="cantons" optionLabel="name" optionValue="name" class="w-full" />
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="p-field">
                <label for="street">Rue</label>
                <InputText id="street" v-model="institution.Street" />
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="p-field">
                <label for="url">URL</label>
                <InputGroup>
                  <InputGroupAddon>www</InputGroupAddon>
                  <InputText id="url" v-model="institution.URL" placeholder="Site Web" />
                </InputGroup>
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="p-field">
                <label for="key">ID</label>
                <InputText id="key" v-model="institution.key" />
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="p-field">
                <label for="categorie">Catégorie</label>
                <Dropdown id="categorie" v-model="institution.Categorie" :options="categories" optionLabel="label" optionValue="value" class="w-full" />
              </div>
            </div>

            <div class="col-12 md:col-12">
              <div class="p-field">
                <label for="remarque">Description</label>
                <Textarea id="remarque" v-model="institution.Description" />
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="p-field">
                <label for="convention">Convention</label>
                <Calendar id="convention" v-model="institution.Convention" dateFormat="yy-mm-dd" />
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="p-field">
                <label for="accordCadre">Accord Cadre</label>
                <Calendar id="accordCadre" v-model="institution.AccordCadre" dateFormat="yy-mm-dd" />
              </div>
            </div>
            <div class="col-12 md:col-12">
              <div class="p-field">
                <label for="remarque">Remarque convention / accord cadre</label>
                <Textarea id="remarque" v-model="institution.Remarque" />
              </div>
            </div>

            <div class="col-12">
              <div v-for="(stage, index) in institution.stages" :key="stage.id" class="p-mb-4 stage-form">
                <h2>Place de stage</h2>
                <div class="grid">
                  <div class="col-12 md:col-6">
                    <div class="p-field">
                      <label>Nom de la place</label>
                      <InputText v-model="stage.Sector" />
                    </div>
                  </div>
                  <div class="col-12 md:col-6">
                    <div class="p-field">
                      <label>Praticien.ne Formateur.trice</label>
                      <Dropdown v-model="stage.NpmPractitionerTrainers" :options="availablePractitioners" optionLabel="fullName" optionValue="fullName" multiple placeholder="Sélectionner des praticiens" class="w-full" />
                    </div>
                  </div>
                  <div class="col-12 md:col-4">
                    <div class="p-field-checkbox">
                      <Checkbox v-model="stage.AIGU" />
                      <label>AIGU</label>
                    </div>
                  </div>
                  <div class="col-12 md:col-4">
                    <div class="p-field-checkbox">
                      <Checkbox v-model="stage.AMBU" />
                      <label>AMBU</label>
                    </div>
                  </div>
                  <div class="col-12 md:col-4">
                    <div class="p-field-checkbox">
                      <Checkbox v-model="stage.MSQ" />
                      <label>MSQ</label>
                    </div>
                  </div>
                  <div class="col-12 md:col-4">
                    <div class="p-field-checkbox">
                      <Checkbox v-model="stage.NEUROGER" />
                      <label>NEURO / GER</label>
                    </div>
                  </div>
                  <div class="col-12 md:col-4">
                    <div class="p-field-checkbox">
                      <Checkbox v-model="stage.SYSINT" />
                      <label>SYSINT</label>
                    </div>
                  </div>
                  <div class="col-12 md:col-4">
                    <div class="p-field-checkbox">
                      <Checkbox v-model="stage.REA" />
                      <label>REHAB</label>
                    </div>
                  </div>
                </div>
                <Button label="Supprimer" class="p-button-danger mt-3 btn-small" @click="supprimerStage(stage.id)" />
              </div>
            </div>

            <div class="col-12">
              <Button label="Ajouter une place de stage" class="p-button-primary mt-3 btn-small" @click="toggleStageForm" />
            </div>

            <div class="col-12" v-if="showStageForm">
              <div class="p-mb-4 stage-form">
                <h2>Nouvelle place de stage</h2>
                <div class="grid">
                  <div class="col-12 md:col-6">
                    <div class="p-field">
                      <label>Nom de la place</label>
                      <InputText v-model="newStage.Sector" />
                    </div>
                  </div>
                  <div class="col-12 md:col-6">
                    <div class="p-field">
                      <label>Praticien.ne Formateur.trice</label>
                      <MultiSelect  v-model="newStage.NpmPractitionerTrainers" :options="availablePractitioners" optionLabel="fullName" optionValue="fullName" multiple placeholder="Sélectionner des praticiens" class="w-full" />
                    </div>
                  </div>
                  <div class="col-12 md:col-4">
                    <div class="p-field-checkbox">
                      <Checkbox v-model="newStage.AIGU" />
                      <label>AIGU</label>
                    </div>
                  </div>
                  <div class="col-12 md:col-4">
                    <div class="p-field-checkbox">
                      <Checkbox v-model="newStage.AMBU" />
                      <label>AMBU</label>
                    </div>
                  </div>
                  <div class="col-12 md:col-4">
                    <div class="p-field-checkbox">
                      <Checkbox v-model="newStage.MSQ" />
                      <label>MSQ</label>
                    </div>
                  </div>
                  <div class="col-12 md:col-4">
                    <div class="p-field-checkbox">
                      <Checkbox v-model="newStage.NEUROGER" />
                      <label>NEURO / GER</label>
                    </div>
                  </div>
                  <div class="col-12 md:col-4">
                    <div class="p-field-checkbox">
                      <Checkbox v-model="newStage.SYSINT" />
                      <label>SYSINT</label>
                    </div>
                  </div>
                  <div class="col-12 md:col-4">
                    <div class="p-field-checkbox">
                      <Checkbox v-model="newStage.REA" />
                      <label>REHAB</label>
                    </div>
                  </div>
                </div>
                <Button label="Ajouter" class="p-button-primary mt-3 btn-small" @click="ajouterPlaceDeStage" />
              </div>
            </div>

            <div class="col-12">
              <Button label="Envoyer les Données de Stage" class="p-button-success mt-3 btn-small" @click="envoyerDonnees" />
              <Button label="Mettre à jour l'institution" class="p-button-warning mt-3 btn-small" @click="updateInstitution" />
              <Button label="Retour" class="p-button-secondary mt-3 btn-small" @click="goBack" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, onValue, set, remove } from "firebase/database";
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Badge from 'primevue/badge';
import Calendar from 'primevue/calendar';
import Textarea from 'primevue/textarea';

export default {
  name: 'InstitutionFormModif',
  components: {
    InputText,
    Dropdown,
    Checkbox,
    Button,
    Badge,
    Calendar,
    Textarea
  },
  data() {
    return {
      institution: {
        Cyberlearn: '',
        Name: '',
        Lieu: '',
        Canton: '',
        Description: '',
        Street: '',
        URL: '',
        Categorie: '',
        Convention: null, // Initialize as null
        AccordCadre: null, // Initialize as null
        Remarque: '',
        Latitude: '',
        Longitude: '',
        Langue: '',
        AIGU: false,
        REA: false,
        AMBU: false,
        MSQ: false,
        NEUROGER: false,
        SYSINT: false,
        PraticiensFormateurs: [],
        stages: [],
        key: ''
      },
      newStage: {
        Sector: '',
        NpmPractitionerTrainers: [],
        AIGU: false,
        AMBU: false,
        MSQ: false,
        NEUROGER: false,
        REA: false,
        SYSINT: false,
        active: true,
        idInstitution: '',
      },
      showStageForm: false,
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
      categories: [
        { label: 'Institution valaisanne', value: 'Institution valaisanne' },
        { label: 'Cabinet privé valaisan', value: 'Cabinet privé valaisan' },
        { label: 'Institution hors canton', value: 'Institution hors canton' },
        { label: 'Cabinet privé hors canton', value: 'Cabinet privé hors canton' },
        { label: 'Institution étrangère', value: 'Institution étrangère' }
      ],

      languages: ['Allemand', 'Français', 'Bilingue'],
      availablePractitioners: [],
      selectedPractitioner: null
    };
  },
  methods: {
    chargerStages() {
      const stagesRef = ref(db, `/placedestage/${this.$route.params.id}`);
      onValue(stagesRef, (snapshot) => {
        if (snapshot.exists()) {
          this.institution.stages = Object.values(snapshot.val());
        } else {
          console.error('Pas de stages trouvés');
        }
      });
    },
    supprimerStage(stageId) {
      const stageRef = ref(db, `/placedestage/${this.$route.params.id}/${stageId}`);
      remove(stageRef)
        .then(() => {
          this.institution.stages = this.institution.stages.filter(stage => stage.id !== stageId);
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression:', error);
        });
    },
    async envoyerDonnees() {
      if (this.validateFormData()) {
        try {
          const stageRef = ref(db, 'placedestage/' + this.$route.params.id + "/");
          await set(stageRef, this.institution.stages);
          alert('Les données de stage ont été envoyées avec succès.');
        } catch (error) {
          console.error('Erreur lors de l’envoi des données de stage:', error);
        }
      }
    },
    async updateInstitution() {
      try {
        const instRef = ref(db, 'institutions/' + this.$route.params.id);
        const institutionData = {
          ...this.institution,
          Convention: this.institution.Convention ? this.convertToDateOnly(this.institution.Convention) : null,
          AccordCadre: this.institution.AccordCadre ? this.convertToDateOnly(this.institution.AccordCadre) : null
        };
        await set(instRef, institutionData);
        alert('Les données de l\'institution ont été mises à jour avec succès.');
      } catch (error) {
        console.error('Erreur lors de la mise à jour des données de l\'institution:', error);
      }
    },
    convertToDateOnly(date) {
      const offset = date.getTimezoneOffset();
      const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
      return adjustedDate.toISOString().split('T')[0];
    },
    ajouterPlaceDeStage() {
      const newStage = {
        ...this.newStage,
        id: `stage-${Date.now()}`,
        idInstitution: this.$route.params.id,
      };
      this.institution.stages.push(newStage);
      this.resetNewStageForm();
      this.showStageForm = false;
    },
    resetNewStageForm() {
      this.newStage = {
        Sector: '',
        NpmPractitionerTrainers: [],
        AIGU: false,
        AMBU: false,
        MSQ: false,
        NEUROGER: false,
        REA: false,
        SYSINT: false,
        active: true,
        idInstitution: '',
      };
    },
    toggleStageForm() {
      this.showStageForm = !this.showStageForm;
    },
    validateFormData() {
      return true; // Ajoutez votre logique de validation ici
    },
    addSelectedPractitioner() {
      const practitioner = this.availablePractitioners.find(p => p.id === this.selectedPractitioner);
      if (practitioner) {
        this.institution.PraticiensFormateurs.push({
          Nom: practitioner.Nom,
          Prenom: practitioner.Prenom,
          Mail: practitioner.Mail
        });
        this.selectedPractitioner = null; // Réinitialiser la sélection
      }
    },
    removePractitioner(index) {
      this.institution.PraticiensFormateurs.splice(index, 1);
    },
    updatePractitioner(index, field, value) {
      this.$set(this.institution.PraticiensFormateurs[index], field, value);
    },
    loadPractitioners() {
      const practitionersRef = ref(db, 'praticiensFormateurs');
      onValue(practitionersRef, (snapshot) => {
        if (snapshot.exists()) {
          const practitioners = Object.keys(snapshot.val()).map(key => ({
            id: key,
            ...snapshot.val()[key],
            fullName: `${snapshot.val()[key].Prenom.trim()} ${snapshot.val()[key].Nom}`
          }));
          this.availablePractitioners = practitioners;
        } else {
          console.error('Pas de praticiens trouvés');
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    const instId = this.$route.params.id;
    const instRef = ref(db, 'institutions/' + instId);
    onValue(instRef, (snapshot) => {
      if (snapshot.exists()) {
        this.institution = {
          ...snapshot.val(),
          Convention: snapshot.val().Convention ? new Date(snapshot.val().Convention + 'T00:00:00') : null,
          AccordCadre: snapshot.val().AccordCadre ? new Date(snapshot.val().AccordCadre + 'T00:00:00') : null
        };
      } else {
        console.error('Institution does not exist');
      }
    });
    this.chargerStages();
    this.loadPractitioners();
  }
};
</script>

<style scoped>
.practitioner-form, .stage-form {
  border: 1px solid #e0e0e0;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
}

.btn-small {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
}
</style>

<template>
  <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
    <section class="text-white text-center py-5 rounded-lg mb-5">
      <h1 class="text-5xl font-bold">Modifier l'institution</h1>
    </section>

    <div class="grid">
      <!-- Main content START -->
      <div class="col-12 lg:col-12">
        <div class="card p-4 shadow-lg">
          <h1 class="mb-4">{{ institution.Name }}</h1>
          <div class="flex align-items-center mb-4">
            <h2 class="me-3 mb-0">{{ institution.Lieu }}</h2>
            <Badge :value="institution.Canton" class="p-mr-2 p-ml-auto" />
          </div>

          <div class="p-fluid">
            <div class="p-field">
              <label for="name">Nom</label>
              <InputText id="name" v-model="institution.Name" />
            </div>
            <div class="p-field">
              <label for="cyberlearn">Cyberlearn</label>
              <InputText id="cyberlearn" v-model="institution.Cyberlearn" />
            </div>
            <div class="p-field">
              <label for="lieu">Lieu</label>
              <InputText id="lieu" v-model="institution.Lieu" />
            </div>
            <div class="p-field">
              <label for="canton">Canton</label>
              <Dropdown id="canton" v-model="institution.Canton" :options="cantons" optionLabel="name" class="w-full" />
            </div>
            <div class="p-field">
              <label for="street">Rue</label>
              <InputText id="street" v-model="institution.Street" />
            </div>
            <div class="p-field">
              <label for="url">URL</label>
              <InputText id="url" v-model="institution.URL" />
            </div>

            <!-- Section Critères -->
            <div class="grid mt-3 mb-3">
              <div class="p-field-checkbox">
                <Checkbox v-model="institution.AMBU" />
                <label for="ambu">AMBU</label>
              </div>
              <div class="p-field-checkbox">
                <Checkbox v-model="institution.MSQ" />
                <label for="msq">MSQ</label>
              </div>
              <div class="p-field-checkbox">
                <Checkbox v-model="institution.NEUROGER" />
                <label for="neuroger">NEURO_GER</label>
              </div>
              <div class="p-field-checkbox">
                <Checkbox v-model="institution.AIGU" />
                <label for="aigu">AIGU</label>
              </div>
              <div class="p-field-checkbox">
                <Checkbox v-model="institution.SYSINT" />
                <label for="sysint">SYS_INT</label>
              </div>
            </div>

            <!-- Section pour les Praticiens Formateurs -->
            <div class="p-field">
              <label>Praticiens Formateurs</label>
              <div v-for="(practitioner, index) in institution.PraticiensFormateurs" :key="index" class="p-mb-3">
                <div class="p-field">
                  <label>Nom</label>
                  <InputText v-model="practitioner.Nom" @input="updatePractitioner(index, 'Nom', $event.target.value)" />
                </div>
                <div class="p-field">
                  <label>Prénom</label>
                  <InputText v-model="practitioner.Prenom" @input="updatePractitioner(index, 'Prenom', $event.target.value)" />
                </div>
                <div class="p-field">
                  <label>Email</label>
                  <InputText v-model="practitioner.Mail" type="email" @input="updatePractitioner(index, 'Mail', $event.target.value)" />
                </div>
                <Button label="Supprimer" class="p-button-danger mt-2" @click="removePractitioner(index)" />
              </div>
              <Dropdown v-model="selectedPractitioner" :options="availablePractitioners" optionLabel="fullName" placeholder="Sélectionner un praticien" class="w-full" />
              <Button label="Ajouter un Praticien Formateur" class="p-button-primary mt-2" @click="addSelectedPractitioner" />
            </div>

            <div v-for="(stage, index) in stages" :key="stage.id" class="p-mb-4">
              <h2>Place de stage</h2>
              <div class="p-field">
                <label>Secteur</label>
                <InputText v-model="stage.Sector" @change="updateStage(stage, 'Sector', $event.target.value)" />
              </div>
              <div class="p-field">
                <label>Praticien Formateur</label>
                <InputText v-model="stage.NpmPractitionerTrainer" @change="updateStage(stage, 'NpmPractitionerTrainer', $event.target.value)" />
              </div>

              <div class="p-field-checkbox">
                <Checkbox v-model="stage.AIGU" @change="updateStage(stage, 'AIGU', stage.AIGU)" />
                <label>AIGU</label>
              </div>
              <div class="p-field-checkbox">
                <Checkbox v-model="stage.AMBU" @change="updateStage(stage, 'AMBU', stage.AMBU)" />
                <label>AMBU</label>
              </div>
              <div class="p-field-checkbox">
                <Checkbox v-model="stage.MSQ" @change="updateStage(stage, 'MSQ', stage.MSQ)" />
                <label>MSQ</label>
              </div>
              <div class="p-field-checkbox">
                <Checkbox v-model="stage.NEUROGER" @change="updateStage(stage, 'NEUROGER', stage.NEUROGER)" />
                <label>NEURO_GER</label>
              </div>
              <div class="p-field-checkbox">
                <Checkbox v-model="stage.SYSINT" @change="updateStage(stage, 'SYSINT', stage.SYSINT)" />
                <label>SYS_INT</label>
              </div>
              <div class="p-field-checkbox">
                <Checkbox v-model="stage.active" @change="updateStage(stage, 'active', stage.active)" />
                <label>Active</label>
              </div>
              <Button label="Supprimer" class="p-button-danger mt-3" @click="supprimerStage(stage.id)" />
            </div>

            <Button label="Ajouter une place de stage" class="p-button-primary mt-3" @click="ajouterPlaceDeStage" />
            <Button label="Envoyer les Données de Stage" class="p-button-success mt-3" @click="envoyerDonnees" />
            <Button label="Mettre à jour l'institution" class="p-button-warning mt-3" @click="updateInstitution" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../../../firebase.js';
import { ref, onValue, set, remove } from "firebase/database";
import { watch } from 'vue';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Badge from 'primevue/badge';

export default {
  name: 'InstitutionFormModif',
  components: {
    InputText,
    Dropdown,
    Checkbox,
    Button,
    Badge
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
      },
      stages: [],
      cantons: [
        { code: 'AG', name: 'Argovie' },
        { code: 'AI', name: 'Appenzell Rhodes-Intérieures' },
        // ... autres cantons ...
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
          this.stages = Object.values(snapshot.val());
        } else {
          console.error('Pas de stages trouvés');
        }
      });
    },
    supprimerStage(stageId) {
      const stageRef = ref(db, `/placedestage/${this.$route.params.id}/${stageId}`);
      remove(stageRef)
        .then(() => {
          this.stages = this.stages.filter(stage => stage.id !== stageId);
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression:', error);
        });
    },
    updateStage(stage, field, value) {
      stage[field] = value;
      const stageRef = ref(db, `placedestage/${stage.idInstitution}/${stage.id}`);
      set(stageRef, stage)
        .then(() => {
          console.log(`Stage ${field} mis à jour avec succès`);
        })
        .catch((error) => {
          console.error('Erreur lors de la mise à jour:', error);
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
        await set(instRef, this.institution);
        alert('Les données de l\'institution ont été mises à jour avec succès.');
      } catch (error) {
        console.error('Erreur lors de la mise à jour des données de l\'institution:', error);
      }
    },
    ajouterPlaceDeStage() {
      const newStage = {
        id: `stage-${Date.now()}`,
        Sector: '',
        NpmPractitionerTrainer: '',
        AIGU: false,
        AMBU: false,
        MSQ: false,
        NEUROGER: false,
        REA: false,
        SYSINT: false,
        active: true,
        idInstitution: this.$route.params.id,
      };
      const stageRef = ref(db, `placedestage/${this.$route.params.id}/${newStage.id}`);
      set(stageRef, newStage)
        .then(() => {
          this.stages.push(newStage);
        })
        .catch((error) => {
          console.error('Erreur lors de l\'ajout du stage:', error);
        });
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
      const practitionersRef = ref(db, 'PraticiensFormateurs');
      onValue(practitionersRef, (snapshot) => {
        if (snapshot.exists()) {
          const practitioners = Object.values(snapshot.val()).map((practitioner, index) => ({
            id: index + 1,
            Nom: practitioner.Nom,
            Prenom: practitioner.Prenom.trim(),
            Mail: practitioner.Mail,
            fullName: `${practitioner.Prenom.trim()} ${practitioner.Nom}`
          }));
          this.availablePractitioners = practitioners;
        } else {
          console.error('Pas de praticiens trouvés');
        }
      });
    }
  },
  mounted() {
    const instId = this.$route.params.id;
    const instRef = ref(db, 'institutions/' + instId);
    onValue(instRef, (snapshot) => {
      if (snapshot.exists()) {
        this.institution = snapshot.val();
      } else {
        console.error('Institution does not exist');
      }
    });
    this.chargerStages();
    this.loadPractitioners(); // Charger les praticiens formateurs depuis Firebase lors du montage du composant
    watch(() => this.institution, async (newVal) => {
      try {
        await set(ref(db, 'institutions/' + instId), newVal);
      } catch (error) {
        console.error('Error updating institution:', error);
      }
    }, { deep: true });
  }
};
</script>

<style scoped>
/* Ajoutez ici votre style personnalisé */
</style>

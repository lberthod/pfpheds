<template>
  <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
    <section class="text-center py-5 rounded-lg mb-5 bg-primary text-white">
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
                <InputText id="cyberlearn" v-model="institution.Cyberlearn" />
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
                <Dropdown id="canton" v-model="institution.Canton" :options="cantons" optionLabel="name" class="w-full" />
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
                <InputText id="url" v-model="institution.URL" />
              </div>
            </div>

            <!-- Section Critères -->
            <div class="col-12 mt-3 mb-3">
              <div class="grid">
                <div class="col-12 md:col-6 lg:col-4">
                  <div class="p-field-checkbox">
                    <Checkbox v-model="institution.AMBU" />
                    <label for="ambu">AMBU</label>
                  </div>
                </div>
                <div class="col-12 md:col-6 lg:col-4">
                  <div class="p-field-checkbox">
                    <Checkbox v-model="institution.MSQ" />
                    <label for="msq">MSQ</label>
                  </div>
                </div>
                <div class="col-12 md:col-6 lg:col-4">
                  <div class="p-field-checkbox">
                    <Checkbox v-model="institution.NEUROGER" />
                    <label for="neuroger">NEURO_GER</label>
                  </div>
                </div>
                <div class="col-12 md:col-6 lg:col-4">
                  <div class="p-field-checkbox">
                    <Checkbox v-model="institution.AIGU" />
                    <label for="aigu">AIGU</label>
                  </div>
                </div>
                <div class="col-12 md:col-6 lg:col-4">
                  <div class="p-field-checkbox">
                    <Checkbox v-model="institution.SYSINT" />
                    <label for="sysint">SYS_INT</label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section pour les Praticiens Formateurs -->
            <div class="col-12">
              <div class="p-field">
                <label>Praticiens Formateurs</label>
                <div v-for="(practitioner, index) in institution.PraticiensFormateurs" :key="index" class="p-mb-3 practitioner-form">
                  <div class="grid">
                    <div class="col-12 md:col-4">
                      <div class="p-field">
                        <label>Nom</label>
                        <InputText v-model="practitioner.Nom" />
                      </div>
                    </div>
                    <div class="col-12 md:col-4">
                      <div class="p-field">
                        <label>Prénom</label>
                        <InputText v-model="practitioner.Prenom" />
                      </div>
                    </div>
                    <div class="col-12 md:col-4">
                      <div class="p-field">
                        <label>Email</label>
                        <InputText v-model="practitioner.Mail" type="email" />
                      </div>
                    </div>
                  </div>
                  <Button label="Supprimer" class="p-button-danger mt-2 btn-small" @click="removePractitioner(index)" />
                </div>
                <Dropdown v-model="selectedPractitioner" :options="availablePractitioners" optionLabel="fullName" placeholder="Sélectionner un praticien" class="w-full" />
                <Button label="Ajouter un Praticien Formateur" class="p-button-primary mt-2 btn-small" @click="addSelectedPractitioner" />
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
                      <InputText v-model="stage.NpmPractitionerTrainer" />
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
              <Button label="Ajouter une place de stage" class="p-button-primary mt-3 btn-small" @click="ajouterPlaceDeStage" />
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
      this.institution.stages.push(newStage);
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
        this.institution = snapshot.val();
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
.bg-primary {
  background-color: #007bff;
}

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

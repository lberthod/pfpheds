<template>
  <div>
    <Navbar />
    <div class="page-title">
      <h1>Management Votation</h1>
    </div>
    <div class="container mt-4">
      <div class="filter-menu mb-3">
        <div class="classes-checkboxes text-center mb-3">
          <label><input type="checkbox" value="ba23" v-model="selectedClasses"> BA23</label>
          <label><input type="checkbox" value="ba22" v-model="selectedClasses"> BA22</label>
          <label><input type="checkbox" value="ba21" v-model="selectedClasses"> BA21</label>
          <label><input type="checkbox" value="PRO" v-model="selectedClasses"> PRO</label>
        </div>
        <div class="pfp-selection text-center mb-3">
          <select v-model="selectedPFP" class="form-select w-50 mx-auto" @change="fetchStudentsData">
            <option disabled value="">Sélectionnez un PFP</option>
            <option value="PFP1A">PFP1A</option>
            <option value="PFP1B">PFP1B</option>
            <option value="PFP2">PFP2</option>
            <option value="PFP3">PFP3</option>
            <option value="PFP4">PFP4</option>
          </select>
        </div>
        <div class="text-center mb-3">
          <input v-model="search" placeholder="Recherche par nom ou prénom"
            class="form-control search-input w-50 mx-auto">
        </div>
      </div>

      <div v-if="selectedPFP && selectedClasses.length > 0" class="table-responsive">
        <table class="table table-striped align-middle p-4 mb-0 table-hover w-100 text-center">
          <thead>
            <tr>
              <th scope="col" class="border-0 rounded-start">Nom</th>
              <th scope="col" class="border-0">Prénom</th>
              <th scope="col" class="border-0">SAE</th>
              <th scope="col" class="border-0">Lesé</th>
              <th scope="col" class="border-0">Cas particulier</th>
              <th scope="col" class="border-0">Remarque</th>
              <th scope="col" class="border-0">Place de stage</th>
              <th scope="col" class="border-0">MSQ</th>
              <th scope="col" class="border-0">SYSINT</th>
              <th scope="col" class="border-0">NEUROGER</th>
              <th scope="col" class="border-0">AIGU</th>
              <th scope="col" class="border-0">REHAB</th>
              <th scope="col" class="border-0">AMBU</th>
              <th scope="col" class="border-0">FR</th>
              <th scope="col" class="border-0 rounded-end">ALL</th>
              <th scope="col" class="border-0 rounded-end">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="etudiant in filteredEtudiants" :key="etudiant.IDStudent">
              <td>{{ etudiant.Nom }}</td>
              <td>{{ etudiant.Prenom }}</td>
              <td><input type="checkbox" v-model="etudiant.SAE" @change="updateStudent(etudiant, 'SAE', etudiant.SAE)"
                  :disabled="etudiant.validated"></td>
              <td><input type="checkbox" v-model="etudiant.Lese"
                  @change="updateStudent(etudiant, 'Lese', etudiant.Lese)" :disabled="etudiant.validated"></td>
              <td><input type="checkbox" v-model="etudiant.CasParticulier"
                  @change="updateStudent(etudiant, 'CasParticulier', etudiant.CasParticulier)"
                  :disabled="etudiant.validated"></td>
              <td><input type="text" v-model="etudiant.Remarque"
                  @change="updateStudent(etudiant, 'Remarque', etudiant.Remarque)" :disabled="etudiant.validated"></td>
              <td>
                <select v-model="etudiant.PFPinfo[selectedPFP].PlaceDeStage" @change="handlePlaceChange(etudiant)"
                  :disabled="etudiant.validated">
                  <option disabled value="">Sélectionnez une place de stage</option>
                  <option v-for="place in places" :key="place.IDENTIFIANT" :value="place.NomP"
                    :disabled="isPlaceTaken(place)">{{ place.NomP }}</option>
                </select>
              </td>


              <td :class="getClass(etudiant.MSQ)">{{ etudiant.MSQ }}</td>
              <td :class="getClass(etudiant.SYSINT)">{{ etudiant.SYSINT }}</td>
              <td :class="getClass(etudiant.NEUROGER)">{{ etudiant.NEUROGER }}</td>
              <td :class="getClass(etudiant.AIGU)">{{ etudiant.AIGU }}</td>
              <td :class="getClass(etudiant.REHAB)">{{ etudiant.REHAB }}</td>
              <td :class="getClass(etudiant.AMBU)">{{ etudiant.AMBU }}</td>
              <td :class="getClass(etudiant.FR)">{{ etudiant.FR }}</td>
              <td :class="getClass(etudiant.ALL)">{{ etudiant.ALL }}</td>
              <td>
                <button class="btn btn-sm btn-success me-1 mb-1 mb-md-0" @click="validateStudent(etudiant)">{{
                  etudiant.validated ? 'Dévalider' : 'Valider' }}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="selectedPFP && selectedClasses.length > 0" class="mt-3 text-center">
        <button class="btn btn-primary me-2" @click="createVotation('lese')">Créer votation pour Lesé</button>
        <button class="btn btn-primary" @click="createVotation()">Créer votation</button>
      </div>

      <div class="mt-4 text-center">
        <h4>Total des étudiants: {{ filteredEtudiants.length }}</h4>
        <h4>Total SAE: {{ totalSAE }}</h4>
        <h4>Total Lesé: {{ totalLese }}</h4>
        <h4>Total Cas Particulier: {{ totalCasParticulier }}</h4>
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from '@/components/Utils/Navbar.vue';
import { db } from '../../../../firebase.js';
import { ref, onValue, set, update } from "firebase/database";

export default {
  name: "VotationManagement",
  components: {
    Navbar
  },
  data() {
    return {
      etudiants: [],
      selectedClasses: [],
      search: '',
      selectedPFP: '',
      places: [],
      loading: true,
      globalFilter: ''
    };
  },
  computed: {
    filteredEtudiants() {
      if (!Array.isArray(this.etudiants)) {
        return [];
      }

      return this.etudiants
        .filter(etudiant => {
          const matchesClass = this.selectedClasses.includes(etudiant.Classe);
          const searchLower = this.search.toLowerCase();
          const matchesSearch = (etudiant.Nom ? etudiant.Nom.toLowerCase().includes(searchLower) : false) || (etudiant.Prenom ? etudiant.Prenom.toLowerCase().includes(searchLower) : false);
          return matchesClass && matchesSearch;
        })
        .sort((a, b) => a.Nom.localeCompare(b.Nom));
    },
    totalSAE() {
      return this.filteredEtudiants.filter(etudiant => etudiant.SAE).length;
    },
    totalLese() {
      return this.filteredEtudiants.filter(etudiant => etudiant.Lese).length;
    },
    totalCasParticulier() {
      return this.filteredEtudiants.filter(etudiant => etudiant.CasParticulier).length;
    }
  },
  watch: {
    selectedClasses(newClasses) {
      this.fetchStudentsData();
    },
    selectedPFP(newPFP) {
      this.fetchStudentsData();
    }
  },
  methods: {
    async fetchStudentsData() {
      if (!this.selectedPFP || this.selectedClasses.length === 0) return;

      this.etudiants = [];
      this.loading = true;

      for (const classe of this.selectedClasses) {
        const starCountRef = ref(db, `students/${classe}`);
        onValue(starCountRef, (snapshot) => {
          const studentsData = snapshot.val();
          if (studentsData) {
            const transformedData = Object.keys(studentsData).map(key => {
              let etudiant = studentsData[key];
              let pfpInfo = etudiant.PFPinfo ? etudiant.PFPinfo[this.selectedPFP] : {};
              return {
                IDStudent: key,
                Classe: classe,
                Nom: etudiant.Nom || '',
                Prenom: etudiant.Prenom || '',
                MSQ: etudiant.MSQ || '',
                SYSINT: etudiant.SYSINT || '',
                NEUROGER: etudiant.NEUROGER || '',
                AIGU: etudiant.AIGU || '',
                AMBU: etudiant.AMBU || '',
                REHAB: etudiant.REHAB || '',
                FR: etudiant.FR || '',
                ALL: etudiant.ALL || '',
                SAE: etudiant.SAE || false,
                Lese: etudiant.Lese || false,
                CasParticulier: etudiant.CasParticulier || false,
                Remarque: etudiant.Remarque || '',
                validated: etudiant.validated || false,
                PFPinfo: {
                  [this.selectedPFP]: {
                    PlaceDeStage: pfpInfo.PlaceDeStage || '',
                  }
                }
              };
            });
            this.etudiants = [...this.etudiants.filter(etudiant => etudiant.Classe !== classe), ...transformedData];
          }
        });
      }
      this.loading = false;
    },

    async fetchPlacesData() {
      const placesRef = ref(db, 'PFP4-B22');
      onValue(placesRef, (snapshot) => {
        const placesData = snapshot.val();
        if (placesData) {
          this.places = Object.keys(placesData).map(key => ({
            IDENTIFIANT: key,
            Nom: placesData[key].NomPlace,
            Domaine: placesData[key].Domaine,
            NomP: placesData[key].NomPlace + " - " + placesData[key].Domaine + "-" + key,
            takenBy: placesData[key].takenBy || null
          }));
        }
      });
    },

    updateStudent(etudiant, key, value) {
      if (['SAE', 'Lese', 'CasParticulier', 'Remarque', 'validated'].includes(key)) {
        etudiant[key] = value;
      } else {
        etudiant.PFPinfo[this.selectedPFP][key] = value;
      }

      const studentRef = ref(db, `students/${etudiant.Classe}/${etudiant.IDStudent}`);
      if (['SAE', 'Lese', 'CasParticulier', 'Remarque', 'validated'].includes(key)) {
        update(studentRef, { [key]: value });
      } else {
        update(studentRef, { [`PFPinfo/${this.selectedPFP}/${key}`]: value });
      }
    },

    async handlePlaceChange(etudiant) {
      const placeDeStage = etudiant.PFPinfo[this.selectedPFP].PlaceDeStage;

      // Liberer l'ancienne place
      const oldPlace = this.places.find(place => place.takenBy === etudiant.IDStudent);
      if (oldPlace) {
        oldPlace.takenBy = null;
        update(ref(db, `PFP4-B22/${oldPlace.IDENTIFIANT}`), { takenBy: null });
      }

      // Affecter la nouvelle place
      const newPlace = this.places.find(place => place.NomP === placeDeStage);
      if (newPlace) {
        newPlace.takenBy = etudiant.IDStudent;
        update(ref(db, `PFP4-B22/${newPlace.IDENTIFIANT}`), { takenBy: etudiant.IDStudent });
      }

      this.updateStudent(etudiant, 'PlaceDeStage', placeDeStage);
    },

    async validateStudent(etudiant) {
      etudiant.validated = !etudiant.validated;
      this.updateStudent(etudiant, 'validated', etudiant.validated);

      if (etudiant.validated && etudiant.PFPinfo[this.selectedPFP].PlaceDeStage) {
        const newPlace = this.places.find(place => place.NomP === etudiant.PFPinfo[this.selectedPFP].PlaceDeStage);
        if (newPlace) {
          newPlace.takenBy = etudiant.IDStudent;
          update(ref(db, `PFP4-B22/${newPlace.IDENTIFIANT}`), { takenBy: etudiant.IDStudent });
        }
      } else {
        const oldPlace = this.places.find(place => place.takenBy === etudiant.IDStudent);
        if (oldPlace) {
          oldPlace.takenBy = null;
          update(ref(db, `PFP4-B22/${oldPlace.IDENTIFIANT}`), { takenBy: null });
        }
      }
    },

    async deleteStudent(studentId, classe) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
        try {
          const studentRef = ref(db, `students/${classe}/${studentId}`);
          await set(studentRef, null);
          this.etudiants = this.etudiants.filter(student => student.IDStudent !== studentId);
        } catch (error) {
          console.error('Erreur de suppression de l’étudiant', error);
        }
      }
    },

    createVotation(type) {
      if (type === 'lese') {
        this.$router.push({ name: 'VotationLese', params: { selectedClass: this.selectedClasses, selectedPFP: this.selectedPFP } });
      } else {
        alert(`Votation créée pour ${type || 'les stages'}`);
      }
    },

    isPlaceTaken(place) {
      return place.takenBy;
    },

    getClass(value) {
      return {
        'bg-success': value === '1' || value === '2',
        'bg-danger': value === '0',
      };
    }
  },
  async mounted() {
    this.fetchStudentsData();
    this.fetchPlacesData();
  }
};
</script>



<style>
.bg-success {
  background-color: green !important;
  color: white;
}

.bg-danger {
  background-color: red !important;
  color: white;
}

option[disabled] {
  color: gray;
  background-color: lightgray;
}
</style>

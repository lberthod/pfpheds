<template>
  <div class="container-fluid mt-4">
    <div class="search-elements mb-3">
      <div class="class-selection text-center mb-3">
        <select v-model="selectedClass" class="form-select" @change="fetchStudentsData">
          <option disabled value="">Sélectionnez une classe</option>
          <option value="ba23">BA23</option>
          <option value="ba22">BA22</option>
          <option value="ba21">BA21</option>
          <option value="PRO">PRO</option>
        </select>
      </div>
      <div class="pfp-selection text-center mb-3">
        <select v-model="selectedPFP" class="form-select" @change="fetchStudentsData">
          <option disabled value="">Sélectionnez un PFP</option>
          <option value="PFP1A">PFP1A</option>
          <option value="PFP1B">PFP1B</option>
          <option value="PFP2">PFP2</option>
          <option value="PFP3">PFP3</option>
          <option value="PFP4">PFP4</option>
        </select>
      </div>
      <div class="text-center mb-3">
        <input v-model="search" placeholder="Recherche par nom ou prénom" class="form-control search-input">
      </div>
    </div>

    <div v-if="currentStudent && selectedPFP && selectedClass" class="table-responsive">
      <h3 class="mb-3">Profil de l'étudiant connecté</h3>
      <table class="table table-dark-gray align-middle p-4 mb-0 table-hover w-100 text-center">
        <thead>
          <tr>
            <th scope="col" class="border-0 rounded-start">Nom</th>
            <th scope="col" class="border-0">Prénom</th>
            <th scope="col" class="border-0">Classe</th>
            <th scope="col" class="border-0">Responsable stage</th>
            <th scope="col" class="border-0">E-Mail</th>
            <th scope="col" class="border-0">Remarque</th>
            <th scope="col" class="border-0">Place Sélectionnée</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ currentStudent.Nom }}</td>
            <td>{{ currentStudent.Prenom }}</td>
            <td>{{ currentStudent.Classe }}</td>
            <td>{{ currentStudent.responsableDeStage }}</td>
            <td>{{ currentStudent.Email }}</td>
            <td>{{ currentStudent.PFPinfo[selectedPFP]?.Remarque }}</td>
            <td>{{ currentStudent.PFPinfo[selectedPFP]?.selectedStageName }}</td>
          </tr>
        </tbody>
      </table>

      <div class="mt-4">
        <h4>Details</h4>
        <p>FR: {{ currentStudent.FR }}</p>
        <p>ALL: {{ currentStudent.ALL }}</p>
        <p>AMBU: {{ currentStudent.AMBU }}</p>
        <p>MSQ: {{ currentStudent.MSQ }}</p>
        <p>SYSINT: {{ currentStudent.SYSINT }}</p>
        <p>Neuroger: {{ currentStudent.NEUROGER }}</p>
        <p>REA: {{ currentStudent.REA }}</p>
      </div>

      <div v-if="validationMessage" class="mt-4">
        <h4>Validation</h4>
        <p>{{ validationMessage }}</p>
      </div>
    </div>

    <div v-if="selectedPFP && selectedClass" class="table-responsive mt-4">
      <h3 class="mb-3">Toutes les places de stages</h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Institution</th>
            <th>Canton</th>
            <th>Lieu</th>
            <th>Secteur</th>
            <th>FR</th>
            <th>ALL</th>
            <th>AIGU</th>
            <th>REA</th>
            <th>MSQ</th>
            <th>SYSINT</th>
            <th>Neuroger</th>
            <th>AMBU</th>
            <th>Choisir</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stage, index) in filteredStages" :key="index" :class="{'text-danger': !isStageSelectable(stage)}">
            <td>{{ stage.Institution }}</td>
            <td>{{ stage.Canton }}</td>
            <td>{{ stage.Lieu }}</td>
            <td>{{ stage.domaine }}</td>
            <td v-if="stage.FR == '1'">&#9989;</td>
            <td v-else>&#10060;</td>
            <td v-if="stage.ALL == '1'">&#9989;</td>
            <td v-else>&#10060;</td>
            <td v-if="stage.AIGU != ''">&#9989;</td>
            <td v-else>&#10060;</td>
            <td v-if="stage.REA == ''">&#9989;</td>
            <td v-else>&#10060;</td>
            <td v-if="stage.MSQ != ''">&#9989;</td>
            <td v-else>&#10060;</td>
            <td v-if="stage.SYSINT !=  ''">&#9989;</td>
            <td v-else>&#10060;</td>
            <td v-if="stage.NEUROGER !=  ''">&#9989;</td>
            <td v-else>&#10060;</td>
            <td v-if="stage.AMBU !=  ''">&#9989;</td>
            <td v-else>&#10060;</td>
            <td>
              <input type="radio" :name="'stage-selection'" :disabled="!isStageSelectable(stage)" @change="selectStage(stage)">
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-center mt-4">
      <button class="btn btn-primary" @click="submitVotes">Voter</button>
    </div>

    <div class="mt-4">
      <h4>Total des étudiants Lesé: {{ filteredEtudiants.length }}</h4>
    </div>
  </div>
</template>

<script>
import { db, auth } from '../../../../firebase.js';
import { ref, onValue, set, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "VotationLese",
  data() {
    return {
      etudiants: [],
      selectedClass: 'BA22',
      search: '',
      selectedPFP: 'PFP3',
      stages: [],
      selectedStage: null,
      currentStudent: null,
      currentUserEmail: null,
      validationMessage: null,
      missingFields: [],
      languageIssue: null
    };
  },
  computed: {
    filteredEtudiants() {
      return this.etudiants.filter(etudiant => {
        const matchesClass = etudiant.Classe === this.selectedClass;
        const matchesLese = etudiant.PFPinfo && etudiant.PFPinfo[this.selectedPFP] && etudiant.PFPinfo[this.selectedPFP].Lese;
        const searchLower = this.search.toLowerCase();
        const matchesSearch = (etudiant.Nom ? etudiant.Nom.toLowerCase().includes(searchLower) : false) || (etudiant.Prenom ? etudiant.Prenom.toLowerCase().includes(searchLower) : false);
        return matchesClass && matchesLese && matchesSearch;
      });
    },
    filteredStages() {
      return this.stages.filter(stage => {
        if (this.languageIssue) {
          if (this.languageIssue === 'besoin langue FR' && stage.FR === '1') {
            return true;
          }
          if (this.languageIssue === 'besoin langue ALL' && stage.ALL === '1') {
            return true;
          }
          return false;
        }

        if (this.missingFields.length > 0) {
          return this.missingFields.some(field => stage[field] === 'X');
        }

        return true;
      });
    }
  },
  methods: {
  async fetchStudentsData() {
    if (!this.selectedPFP || !this.selectedClass) return;

    this.etudiants = [];
    const starCountRef = ref(db, `students/${this.selectedClass}`);
    onValue(starCountRef, (snapshot) => {
      const studentsData = snapshot.val();
      if (studentsData) {
        const transformedData = Object.keys(studentsData).map(key => ({
          id: key,
          Classe: this.selectedClass,
          PFPinfo: {},
          ...studentsData[key]
        }));
        this.etudiants = transformedData;
        this.findCurrentStudent();
      }
    });
  },
  async fetchStagesData() {
    const dbRef = ref(db, '/PFP3');
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        this.stages = Object.values(snapshot.val());
      } else {
        console.log("No stages data available");
      }
    }, (error) => {
      console.error("Error fetching stages data:", error);
    });
  },
  updateStudent(etudiant) {
    const studentRef = ref(db, `students/${etudiant.Classe}/${etudiant.id}`);
    set(studentRef, etudiant);
  },
  selectStage(stage) {
    this.selectedStage = stage;
    for (const etudiant of this.filteredEtudiants) {
      if (!etudiant.PFPinfo[this.selectedPFP]) {
        etudiant.PFPinfo[this.selectedPFP] = {};
      }
      etudiant.PFPinfo[this.selectedPFP].selectedStageName = `${stage.Institution} - ${stage.Lieu}`;
      etudiant.PFPinfo[this.selectedPFP].selectedStageId = stage.id;
      this.updateStudent(etudiant);
    }
  },
  async submitVotes() {
    if (this.selectedStage && this.currentStudent) {
      const {  id } = this.currentStudent;

      // Ensure all required fields are present
      if (id) {
        const stageRef = ref(db, `PFP3/${this.selectedStage.id}`);
        console.log("Selected Stage:", this.selectedStage);
        console.log("Current Student:", this.selectedStage.Lieu);
        console.log("Submitting votes..." + id);
        await set(stageRef, {
     
          
          studentId: id,
        });
        alert("Votes enregistrés avec succès!");
      } else {
        alert("Erreur: Informations de l'étudiant manquantes.");
      }
    } else {
      alert("Veuillez sélectionner une place de stage.");
    }
  },
  async findCurrentStudent() {
    if (this.currentUserEmail) {
      const dbRef = ref(db, 'students');
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const studentsData = snapshot.val();
        for (const classKey in studentsData) {
          for (const studentKey in studentsData[classKey]) {
            const student = studentsData[classKey][studentKey];
            if (student.Mail && student.Mail.toLowerCase() === this.currentUserEmail.toLowerCase()) {
              this.currentStudent = {
                id: studentKey,
                Classe: classKey,
                ...student
              };
              this.checkValidation();
              console.log("Current User Email:", this.currentUserEmail);
              console.log("Matching Student:", this.currentStudent);
              return;
            }
          }
        }
      }
      console.log("No matching student found.");
    }
  },
  checkValidation() {
    if (!this.currentStudent) return;

    const { FR, ALL, AMBU, MSQ, SYSINT, NEUROGER, REA } = this.currentStudent;

    this.missingFields = [];
    this.languageIssue = null;

    if (FR == "0" && ALL == "0" && AMBU == "0" && MSQ == "0" && SYSINT == "0" && NEUROGER == "0" && REA == "0") {
      // All fields are 0, all checkboxes usable
      this.validationMessage = "Toutes les options sont disponibles";
      return;
    }

    if (FR == "0") this.languageIssue = "besoin langue FR";
    if (ALL == "0") this.languageIssue = "besoin langue ALL";
    if (AMBU == "0") this.missingFields.push("AMBU");
    if (MSQ == "0") this.missingFields.push("MSQ");
    if (SYSINT == "0") this.missingFields.push("SYSINT");
    if (NEUROGER == "0") this.missingFields.push("NEUROGER");
    if (REA == "0") this.missingFields.push("REA");

    if (this.languageIssue) {
      this.validationMessage = this.languageIssue;
    } else if (this.missingFields.length > 0) {
      this.validationMessage = `manque ${this.missingFields.join(", ")}`;
    } else {
      this.validationMessage = "Tout validé";
    }
  },
  isStageSelectable(stage) {
    if (this.languageIssue) {
      if (this.languageIssue === 'besoin langue FR' && stage.FR === '1') {
        return true;
      }
      if (this.languageIssue === 'besoin langue ALL' && stage.ALL === '1') {
        return true;
      }
      return false;
    }

    if (this.missingFields.length > 0) {
      return this.missingFields.some(field => stage[field] === 'X');
    }

    return true;
  }
},
async mounted() {
  this.fetchStudentsData();
  this.fetchStagesData();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      this.currentUserEmail = user.email;
      this.findCurrentStudent();
    } else {
      this.currentUserEmail = null;
      this.currentStudent = null;
    }
  });
}
};
</script>

<style scoped>
.search-elements {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.class-selection select {
  margin-right: 15px;
  cursor: pointer;
}

.search-bar {
  position: relative;
  margin-top: 10px;
}

.search-input {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.pfp-selection select {
  width: 50%;
}

.table-dark-gray {
  background-color: #343a40;
  color: #fff;
}

.table-dark-gray th, .table-dark-gray td {
  border-color: #454d55;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.btn-danger-soft {
  color: #e55353;
  background-color: rgba(229, 83, 83, 0.1);
}

.btn-danger-soft:hover {
  background-color: rgba(229, 83, 83, 0.2);
}

.text-danger {
  color: red !important;
}

.mt-3 {
  margin-top: 1rem !important;
}

.mt-4 {
  margin-top: 1.5rem !important;
}
</style>

<template>
  <div>
    <Navbar />
    <UserProfile />
    <div class="container-fluid mt-4">

      <div v-if="currentStudent && selectedPFP && selectedClass" class="table-responsive mt-4">
        <div v-if="validationMessage" class="mt-4 text-center">
          <h4>Validation</h4>
          <p> A besoin de : {{ validationMessage }}</p>
        </div>
      </div>
      <div v-if="selectedPFP && selectedClass" class="table-responsive mt-4">
        <div class="d-flex justify-content-center">
          <h3 class="mb-3 text-center">Toutes les places de stages</h3>
          <table class="table table-striped align-middle mb-0 table-hover w-100 text-center">
            <thead>
              <tr>
                <th>Institutions</th>
                <th>Lieux</th>
                <th>Secteurs</th>
                <th>FR</th>
                <th>ALL</th>
                <th>AIGU</th>
                <th>REHAB</th>
                <th>MSQ</th>
                <th>SYSINT</th>
                <th>Neuroger</th>
                <th>AMBU</th>
                <th>Choisir</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(stage, index) in filteredStages" :key="index">
                <td>{{ stage.NomPlace }}</td>
                <td>{{ stage.Lieu }}</td>
                <td>{{ stage.Domaine }}</td>
                <td v-if="stage.FR == '1'">&#9989;</td>
                <td v-else>&#10060;</td>
                <td v-if="stage.ALL == '1'">&#9989;</td>
                <td v-else>&#10060;</td>
                <td v-if="stage.AIGU != ''">&#9989;</td>
                <td v-else>&#10060;</td>
                <td v-if="stage.REHAB != ''">&#9989;</td>
                <td v-else>&#10060;</td>
                <td v-if="stage.MSQ != ''">&#9989;</td>
                <td v-else>&#10060;</td>
                <td v-if="stage.SYSINT != ''">&#9989;</td>
                <td v-else>&#10060;</td>
                <td v-if="stage.NEUROGER != ''">&#9989;</td>
                <td v-else>&#10060;</td>
                <td v-if="stage.AMBU != ''">&#9989;</td>
                <td v-else>&#10060;</td>
                <td>
                  <input type="radio" :name="'stage-selection'" @change="selectStage(stage)">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Section to display voting result -->
      <div v-if="voteResult" class="mt-4 text-center">
        <h4>Choix du   Vote</h4>
        <p>Stage Sélectionné : {{ voteResult.selectedStageName }}</p>
        <p>Lieu : {{ voteResult.selectedStageLieu }}</p>
        <p>Domaine : {{ voteResult.selectedStageDomaine }}</p>
      </div>

      <div class="mt-4 text-center">
        <button class="btn btn-primary" @click="submitVotes">Voter</button>
      </div>
      <br> <br> <br> <br>
    </div>
  </div>
</template>
<script>
import { db, auth } from '../../../../firebase.js';
import { ref, onValue, set, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from '@/components/Utils/Navbar.vue';
import UserProfile from './UserProfile.vue'

export default {
  name: "VotationLese",
  components: {
    Navbar,
    UserProfile
  },
  data() {
    return {
      etudiants: [],
      selectedClass: 'BA22',
      search: '',
      selectedPFP: 'PFP4',
      stages: [],
      selectedStage: null,
      currentStudent: null,
      currentUserEmail: null,
      validationMessage: null,
      missingFields: [],
      languageIssue: null,
      pfp1: [],
      pfp2: [],
      voteResult: null, // Added data property to store vote result
    };
  },
  computed: {
    filteredStages() {
      return this.stages.filter(stage => this.isStageVisible(stage));
    }
  },

  methods: {
    async submitVotes() {
      console.log("start");
      if (this.selectedStage && this.currentStudent) {
        const { id } = this.currentStudent;
        if (id) {
          const votationRef = ref(db, `votation_lese/${id}`);

          console.log("Selected Stage:", this.selectedStage);
          console.log("Current Student:", this.currentStudent);
          console.log("Submitting votes..." + id);
          const votationData = {
            studentId: id,
            studentName: this.currentStudent.Nom,
            studentFirstName: this.currentStudent.Prenom,
            selectedStageName: this.selectedStage.NomPlace,
            selectedStageLieu: this.selectedStage.Lieu,
            selectedStageDomaine: this.selectedStage.Domaine,
            selectedStageDetails: {
              FR: this.selectedStage.FR,
              ALL: this.selectedStage.ALL,
              AIGU: this.selectedStage.AIGU,
              REHAB: this.selectedStage.REHAB,
              MSQ: this.selectedStage.MSQ,
              SYSINT: this.selectedStage.SYSINT,
              NEUROGER: this.selectedStage.NEUROGER,
              AMBU: this.selectedStage.AMBU
            }
          };

          await set(votationRef, votationData);
          console.log("Votes enregistrés avec succès!");

          // Update voteResult data property
          this.voteResult = votationData;
        } else {
          alert("Erreur: Informations de l'étudiant manquantes.");
        }
      } else {
        alert("Veuillez sélectionner une place de stage.");
      }
    },

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
      const dbRef = ref(db, '/PFP4-B22');
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
      for (const etudiant of this.etudiants) {
        if (!etudiant.PFPinfo[this.selectedPFP]) {
          etudiant.PFPinfo[this.selectedPFP] = {};
        }
        etudiant.PFPinfo[this.selectedPFP].selectedStageName = `${stage.NomPlace} - ${stage.Lieu}`;
        etudiant.PFPinfo[this.selectedPFP].selectedStageId = stage.id;
        this.updateStudent(etudiant);
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
                this.pfp1 = this.currentStudent.PFP1_info.IDA;
                this.pfp2 = this.currentStudent.PFP2_info.IDA;
                await this.fetchVoteResult(this.currentStudent.id); // Fetch the vote result when the student is found
                return;
              }
            }
          }
        }
        console.log("No matching student found.");
      }
    },
    async fetchVoteResult(studentId) {
      const votationRef = ref(db, `votation_lese/${studentId}`);
      const snapshot = await get(votationRef);
      if (snapshot.exists()) {
        this.voteResult = snapshot.val();
      }
    },
    checkValidation() {
      if (!this.currentStudent) return;

      const { FR, ALL, AMBU, MSQ, SYSINT, NEUROGER, REHAB, AIGU } = this.currentStudent;

      this.missingFields = [];
      this.languageIssue = null;

      if (FR == "0" && ALL == "0" && AMBU == "0" && MSQ == "0" && SYSINT == "0" && NEUROGER == "0" && REHAB == "0" && AIGU == "0") {
        // All fields are 0, all checkboxes usable
        this.validationMessage = "Toutes les options sont disponibles";
        return;
      }

      if (FR == "0") this.languageIssue = "FR";
      if (ALL == "0") this.languageIssue = "ALL";

      if (AMBU == "0") this.missingFields.push("AMBU");
      if (MSQ == "0") this.missingFields.push("MSQ");
      if (AIGU == "0") this.missingFields.push("AIGU");
      if (SYSINT == "0") this.missingFields.push("SYSINT");
      if (NEUROGER == "0") this.missingFields.push("NEUROGER");
      if (REHAB == "0") this.missingFields.push("REHAB");

      if (this.languageIssue) {
        this.validationMessage = this.languageIssue;
      } else if (this.missingFields.length > 0) {
        this.validationMessage = `manque ${this.missingFields.join(", ")}`;
      } else {
        this.validationMessage = "Tout validé";
      }
    },
    isStageVisible(stage) {
      // Check if the stage is already taken by another student
      if (stage.takenBy) {
        return false;
      }

      if (this.pfp1 == stage.Identifiant || this.pfp2 == stage.Identifiant) {
        return false;
      }

      if (this.languageIssue) {
        if (this.languageIssue === 'FR' && stage.FR === 'true') {
          return true;
        }
        if (this.languageIssue == 'ALL' && stage.ALL === true) {
          return true;
        }
        return false;
      }

      if (this.missingFields.length > 0) {
        return this.missingFields.some(field => stage[field] === '1');
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

.class-selection select,
.pfp-selection select,
.search-input {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.table-dark-gray {
  background-color: #343a40;
  color: #fff;
}

.table-dark-gray th,
.table-dark-gray td {
  border-color: #454d55;
}

.table-striped th,
.table-striped td {
  text-align: center;
  vertical-align: middle;
}

.table-responsive {
  overflow-x: auto;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  margin-top: 10px;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.text-center {
  text-align: center;
}

.mt-3 {
  margin-top: 1rem !important;
}

.mt-4 {
  margin-top: 1.5rem !important;
}

.text-danger {
  color: red !important;
}

.table-responsive {
  display: flex;
  justify-content: center;
}

.table-striped {
  width: 80%;
  margin: 0 auto;
}
</style>

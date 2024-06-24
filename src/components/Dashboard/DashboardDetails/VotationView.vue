<template>
  <div>
    <Navbar />
    <UserProfile />
    <div class="container-fluid mt-4">
      <div v-if="currentStudent && selectedPFP && selectedClass" class="table-responsive mt-4">
        <div v-if="validationMessage" class="mt-4 text-center">
          <h4>Validation</h4>
          <p>A besoin de : {{ validationMessage }}</p>
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
                <th>Choix 1</th>
                <th>Choix 2</th>
                <th>Choix 3</th>
                <th>Choix 4</th>
                <th>Choix 5</th>
                <th>Total Étudiants</th>
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
                <td v-for="choice in [1, 2, 3, 4, 5]" :key="choice">
                  <input type="checkbox" :checked="isSelected(stage, choice)" :disabled="isNonSelectable(stage, choice)"
                    @change="selectStage(stage, choice, index)" class="checkbox-choice">
                </td>
                <td>{{ getTotalStudents(stage) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="selectedStages.length > 0" class="mt-4 text-center">
        <h4>Stages sélectionnés</h4>
        <ul>
          <li v-for="choice in [1, 2, 3, 4, 5]" :key="choice">
            Choix {{ choice }}:
            <span v-if="selectedStages[choice - 1]">
              {{ selectedStages[choice - 1].name }} ({{ selectedStages[choice - 1].lieu }})
            </span>
            <span v-else>Aucun</span>
          </li>
        </ul>
      </div>

      <div class="mt-4 text-center">
        <button class="btn btn-primary" @click="submitVotes">Voter</button>
      </div>
      <br /><br /><br /><br />
    </div>
  </div>
</template>

<script>
import { db, auth } from '../../../../firebase.js';
import { ref, onValue, set, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from '@/components/Utils/Navbar.vue';
import UserProfile from './UserProfile.vue';

export default {
  name: "VotationView",
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
      selectedStages: Array(5).fill(null),
      currentStudent: null,
      currentUserEmail: null,
      validationMessage: null,
      missingFields: [],
      languageIssue: null,
      pfp1: [],
      pfp2: [],
      voteResult: null,
      choiceTable: []
    };
  },
  computed: {
    filteredStages() {
      return this.stages.filter(stage => this.isStageVisible(stage));
    },
    totalChecked() {
      return this.selectedStages.filter(stage => stage !== null).length;
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
      const dbRef = ref(db, '/PFP4-B22');
      onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          this.stages = Object.values(snapshot.val());
          this.initializeChoiceTable();
        } else {
          console.log("No stages data available");
        }
      }, (error) => {
        console.error("Error fetching stages data:", error);
      });
    },

    initializeChoiceTable() {
      this.choiceTable = this.stages.map(stage => ({
        id: stage.IDENTIFIANT,
        choices: Array(5).fill(0)
      }));
    },

    updateStudent(etudiant) {
      const studentRef = ref(db, `students/${etudiant.Classe}/${etudiant.id}`);
      set(studentRef, etudiant);
    },

    selectStage(stage, choice, stageIndex) {
      const isCurrentlyChecked = this.isSelected(stage, choice);

      if (!isCurrentlyChecked) {
        if (this.totalChecked >= 5) {
          console.log("Vous ne pouvez pas sélectionner plus de 5 stages.");
          return;
        }

        if (this.selectedStages[choice - 1] !== null) {
          console.log("Vous avez déjà sélectionné un stage pour ce choix.");
          return;
        }

        console.log(`Vous avez sélectionné le stage ${stage.NomPlace} pour le choix ${choice}.`);

        this.selectedStages[choice - 1] = {
          id: stage.IDENTIFIANT,
          name: stage.NomPlace,
          lieu: stage.Lieu,
          domaine: stage.Domaine,
          choice: choice
        };

        this.choiceTable[stageIndex].choices[choice - 1] = 1;
      } else {
        this.selectedStages[choice - 1] = null;
        this.choiceTable[stageIndex].choices[choice - 1] = 0;
      }

      console.log(this.choiceTable);

      this.updateVotationDB(
        this.currentStudent.id,
        this.currentStudent.Nom,
        this.currentStudent.Prenom,
        this.selectedStages
      );
    },

    async updateVotationDB(studentId, studentName, studentFirstName, selectedStages) {
      if (studentId) {
        const votationRef = ref(db, `votationPFP4-B33/${studentId}`);
        const votationData = {
          studentId: studentId,
          studentName: studentName,
          studentFirstName: studentFirstName,
          selectedStages: selectedStages.map(stage => ({
            selectedStageName: stage.name,
            selectedStageLieu: stage.lieu,
            selectedStageDomaine: stage.domaine,
            choice: stage.choice
          }))
        };

        await set(votationRef, votationData);
        console.log("Votation data updated successfully!");
      } else {
        console.log("Erreur: Informations de l'étudiant manquantes.");
      }
    },

    isSelected(stage, choice) {
      return (
        this.selectedStages[choice - 1] &&
        this.selectedStages[choice - 1].id === stage.IDENTIFIANT &&
        this.selectedStages[choice - 1].choice === choice
      );
    },

    isNonSelectable(stage, choice) {
      const stageIndex = this.stages.findIndex(s => s.IDENTIFIANT === stage.IDENTIFIANT);
      return this.choiceTable[stageIndex].choices[choice - 1] === 1;
    },
    getTotalStudents(stage) {
      return this.etudiants.filter(student => student.selectedStages && student.selectedStages.some(s => s.id === stage.IDENTIFIANT)).length;
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
                this.pfp1 = this.currentStudent.PFP1_info.IDA;
                this.pfp2 = this.currentStudent.PFP2_info.IDA;
                await this.fetchVoteResult(this.currentStudent.id);
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
      if (stage.takenBy) {
        return false;
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

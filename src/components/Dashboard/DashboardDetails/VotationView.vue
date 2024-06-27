<template>
  <div>
    <Navbar />
    <UserProfile />
    <div class="container-fluid mt-4">
      <div v-if="currentStudent && selectedPFP && selectedClass" class="table-responsive mt-4">
        <div v-if="validationMessage" class="mt-4 text-center">
        </div>
      </div>
      <div v-if="selectedPFP && selectedClass" class="table-responsive mt-4">
        <div class="d-flex justify-content-center">
          <div v-if="filteredStages.length > 0" class="table-responsive mt-4">
            <div class="d-flex justify-content-center">
              <h3 class="mb-3 text-center">Places de stages validant vos critères manquants : {{ validationMessage[0]}}
              </h3>
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
                    <th>Priorité 1</th>
                    <th>Priorité 2</th>
                    <th>Priorité 3</th>
                    <th>Priorité 4</th>
                    <th>Priorité 5</th>
                    <th>Nbr choix 1</th>
                    <th>Nbr choix 2</th>
                    <th>Nbr choix 3</th>
                    <th>Nbr choix 4</th>
                    <th>Nbr choix 5</th>
                    <th>Total étudiant.e.s</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(stage, index) in sortedFilteredStages" :key="index">
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
                      <input type="checkbox" :checked="isSelected(stage, choice)"
                        :disabled="isNonSelectable(stage.NomPlace, choice - 1) || hasVoted"
                        @change="selectStage(stage, choice)" class="checkbox-choice">
                    </td>
                    <td>{{ getVoteCount(stage.NomPlace, 1) }}</td>
                    <td>{{ getVoteCount(stage.NomPlace, 2) }}</td>
                    <td>{{ getVoteCount(stage.NomPlace, 3) }}</td>
                    <td>{{ getVoteCount(stage.NomPlace, 4) }}</td>
                    <td>{{ getVoteCount(stage.NomPlace, 5) }}</td>
                    <td>{{ getTotalVotes(stage.NomPlace) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-else>
            <p class="mt-4">Aucun stage disponible validant tous vos critères manquants</p>
          </div>
        </div>
        <div v-if="allStages.length > 0 && validationMessage[0]!=='Tout validé'" class="table-responsive mt-4">
          <div class="d-flex justify-content-center">
            <h3 class="mb-3 text-center">Places de stages validant au minimum un critère manquant</h3>
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
                  <th>Priorité 1</th>
                  <th>Priorité 2</th>
                  <th>Priorité 3</th>
                  <th>Priorité 4</th>
                  <th>Priorité 5</th>
                  <th>Nbr choix 1</th>
                  <th>Nbr choix 2</th>
                  <th>Nbr choix 3</th>
                  <th>Nbr choix 4</th>
                  <th>Nbr choix 5</th>
                  <th>Total étudiant.e.s</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(stage, index) in allStages" :key="index">
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
                    <input type="checkbox" :checked="isSelected(stage, choice)"
                      :disabled="isNonSelectable(stage.NomPlace, choice - 1) || hasVoted"
                      @change="selectStage(stage, choice)" class="checkbox-choice">
                  </td>
                  <td>{{ getVoteCount(stage.NomPlace, 1) }}</td>
                  <td>{{ getVoteCount(stage.NomPlace, 2) }}</td>
                  <td>{{ getVoteCount(stage.NomPlace, 3) }}</td>
                  <td>{{ getVoteCount(stage.NomPlace, 4) }}</td>
                  <td>{{ getVoteCount(stage.NomPlace, 5) }}</td>
                  <td>{{ getTotalVotes(stage.NomPlace) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="selectedStages.length > 0" class="mt-4 text-center">
          <h4>Stages sélectionnés</h4>
          <ul>
            <div v-if="hasVoted">
              <li v-for="choice in [1, 2, 3, 4, 5]" :key="choice">
                Choix {{ choice }}:
                <span v-if="selectedStages[choice - 1]">

                  <span v-if="selectedStages[choice - 1].selectedStageName">

                    {{ selectedStages[choice - 1].selectedStageName }} ({{ selectedStages[choice - 1].selectedStageLieu
                    }})

                  </span>
                  <span v-if="selectedStages[choice - 1].NomPlace">

                    {{ selectedStages[choice - 1].NomPlace }}

                  </span>
                </span>
                <span v-else>Aucun</span>
              </li>
            </div>
            <div v-if="hasVoted == false">
              <li v-for="choice in [1, 2, 3, 4, 5]" :key="choice">
                Choix {{ choice }}:
                <span v-if="selectedStages[choice - 1]">
                  {{ selectedStages[choice - 1].NomPlace }}
                </span>
                <span v-else>Aucun</span>
              </li>
            </div>
          </ul>
        </div>
        <div class="mt-4 text-center">
          <button class="btn btn-primary" @click="submitVotes" v-if="!hasVoted">Voter</button>
          <button class="btn btn-warning" @click="resetVotes" v-if="hasVoted">Réinitialiser</button>
          <div v-if="showAlert" class="alert alert-success mt-3">Merci pour votre votation, elle a été prise en compte.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from '../../../../firebase.js';
import { ref, onValue, get, remove, update } from "firebase/database";
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
      section1: [],
      etudiants: [],
      selectedClass: 'BA22',
      search: '',
      selectedPFP: 'PFP4',
      stages: [],
      places: {},
      selectedStages: Array(5).fill(null),
      currentStudent: null,
      currentUserEmail: null,
      validationMessage: null,
      missingFields: [],
      languageIssue: null,
      pfp1: [],
      pfp2: [],
      voteResult: null,
      hasVoted: false,
      showAlert: false,
      voteCounts: {} // Initialiser voteCounts ici
    };
  },
  computed: {
    filteredStages() {
      const criteria = this.getValidationCriteria();
      console.log("ici cri: CXXX333 :  " +criteria);

      return this.stages.filter(stage => {
        if (stage.takenBy) {
          return false; // Ne pas inclure les stages qui ont déjà été pris
        }
        if(criteria === "Tout validé"){
          return true;
        }else{
          for (let criterion of criteria) {
          console.log("ICI CXXX333 - " +criterion);

          if (stage[criterion] !== '1' && stage[criterion] !== true) {
            return false;
          }
        }
        }
       
        return true;
      });
    },
    sortedFilteredStages() {
      return [...this.filteredStages].sort((a, b) => b.priority - a.priority);
    },
    allStages() {
      let filteredStages = this.stages;
      if (this.languageIssue === "ALL") {
        console.log("ICI all");

        filteredStages = filteredStages.filter(stage => stage.ALL == '1');
      } else if (this.languageIssue === "FR") {
      console.log("ICI fr");
        filteredStages = filteredStages.filter(stage => stage.FR == '1');
      }
      else{
        console.log("ICI all");
        filteredStages = filteredStages.filter(stage => stage.ALL == '1');
      }
      return filteredStages.filter(stage => !stage.takenBy); // Ne pas inclure les stages qui ont déjà été pris
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
          this.initializePlaces();
          this.assignPriorities();
          this.logVoteResults(); // Appel de la nouvelle méthode
        } else {
          console.log("No stages data available");
        }
      }, (error) => {
        console.error("Error fetching stages data:", error);
      });
    },

    initializePlaces() {
      this.places = {};

      this.stages.forEach(stage => {
        this.places[stage.NomPlace] = Array(5).fill(0);
      });
    },

    assignPriorities() {
      this.stages.forEach(stage => {
        stage.priority = this.getValidationCriteria().every(criterion => stage[criterion] === '1' || stage[criterion] === true);
      });
    },

    getValidationCriteria() {
      if (!this.validationMessage || this.validationMessage.length === 0) return [];
      const criteriaString = this.validationMessage[0];
      let criteria = [];
      if (criteriaString.includes('ALL')) {
        criteria = criteriaString.replace('ALL + manque ', '').split(', ');
      } else if (criteriaString.includes('FR')) {
        criteria = criteriaString.replace('FR + manque ', '').split(', ');
      }
      else{
        console.log("ici --" + criteriaString);
        if(criteriaString === "Tout validé"){
          return "Tout validé";
        }
        criteria = criteriaString.replace('', '').split(', ');
      }
      return criteria.map(c => c.trim());
    },


    updateStudent(etudiant) {
      const studentRef = ref(db, `students/${etudiant.Classe}/${etudiant.id}`);
      update(studentRef, etudiant);
    },

    disableAnother(stageName, choice) {
      Object.keys(this.places).forEach(name => {
        if (name !== stageName && this.places[name]) {
          this.places[name][choice] = (this.places[name][choice] || 0) - 1;
        }
      });

      for (let i = 0; i < 5; i++) {
        if (i !== choice && this.places[stageName]) {
          this.places[stageName][i] = (this.places[stageName][i] || 0) - 1;
        }
      }
    },

    activateAnother(stageName, choice) {
      Object.keys(this.places).forEach(name => {
        if (name !== stageName && this.places[name] && this.places[name][choice] < 0) {
          this.places[name][choice] += 1;
        }
      });

      for (let i = 0; i < 5; i++) {
        if (i !== choice && this.places[stageName] && this.places[stageName][i] < 0) {
          this.places[stageName][i] += 1;
        }
      }
    },

    selectStage(stage, choice) {
      const isCurrentlyChecked = this.isSelected(stage, choice);

      if (!this.places[stage.NomPlace]) {
        this.places[stage.NomPlace] = Array(5).fill(0);
      }

      if (isCurrentlyChecked) {
        this.places[stage.NomPlace][choice - 1] = 0;
        this.activateAnother(stage.NomPlace, choice - 1);
      } else {
        if (this.isNonSelectable(stage.NomPlace, choice - 1)) {
          return;
        }
        this.places[stage.NomPlace][choice - 1] = 1;
        this.disableAnother(stage.NomPlace, choice - 1);
      }

      this.selectedStages[choice - 1] = isCurrentlyChecked ? null : { ...stage, choice };

      this.updateVotationDB(
        this.currentStudent.id,
        this.currentStudent.Nom,
        this.currentStudent.Prenom,
        this.selectedStages
      );
    },

    async updateVotationDB(studentId, studentName, studentFirstName, selectedStages) {
      if (studentId) {
        const votationRef = ref(db, `votationPFP4-B22/${studentId}`);
        const votationData = {
          studentId: studentId,
          studentName: studentName,
          studentFirstName: studentFirstName,
          selectedStages: selectedStages.map(stage => ({
            selectedStageName: stage ? stage.NomPlace : null,
            selectedStageLieu: stage ? stage.Lieu : null,
            selectedStageDomaine: stage ? stage.Domaine : null,
            choice: stage ? stage.choice : null
          }))
        };

        await update(votationRef, votationData);

        // Update the total number of students for each selected stage
      }
    },

    isSelected(stage, choice) {
      return (
        this.selectedStages[choice - 1] &&
        this.selectedStages[choice - 1].IDENTIFIANT === stage.IDENTIFIANT &&
        this.selectedStages[choice - 1].choice === choice
      );
    },

    isNonSelectable(stageName, choice) {
      return this.places[stageName] && this.places[stageName][choice] < 0;
    },

    getTotalStudents(stage) {
      return this.etudiants.filter(student => student.selectedStages && student.selectedStages.some(s => s.IDENTIFIANT === stage.IDENTIFIANT)).length;
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
      }
    },

    async fetchVoteResult(studentId) {
      const votationRef = ref(db, `votationPFP4-B22/${studentId}`);
      const snapshot = await get(votationRef);
      if (snapshot.exists()) {
        console.log("HAS RESULTT");
        const votationData = snapshot.val();
        console.log(votationData);
        this.voteResult = votationData;
        this.selectedStages = votationData.selectedStages.map(stage => ({
          ...stage,
          IDENTIFIANT: this.stages.find(s => s.NomPlace === stage.selectedStageName).IDENTIFIANT
        }));
        console.log(this.selectedStages[1]);

        this.hasVoted = true;
      }
    },

    checkValidation() {
      if (!this.currentStudent) return;

      const { FR, ALL, AMBU, MSQ, SYSINT, NEUROGER, REHAB, AIGU } = this.currentStudent;

      this.missingFields = [];
      this.languageIssue = null;
      this.section2 = [];
      this.section3 = [];
      let messages = [];

      if (FR == "0" && ALL == "0" && AMBU == "0" && MSQ == "0" && SYSINT == "0" && NEUROGER == "0" && REHAB == "0" && AIGU == "0") {
        this.validationMessage = ["Toutes les options sont disponibles"];
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

      if (this.languageIssue === "ALL") {
        messages.push(`ALL, ${this.missingFields.join(", ")}`);
        this.section1 = [`ALL, ${this.missingFields.join(", ")}`];

        if (this.missingFields.length > 1) {
          for (let i = 0; i < this.missingFields.length; i++) {
            const combination = this.missingFields.filter((_, index) => index !== i).join(", ");
            messages.push(`ALL, ${combination}`);
            this.section2.push(`ALL, ${combination}`);
          }
        } else {
          messages.push(`ALL, ${this.missingFields.join(", ")}`);
          this.section2.push(`ALL, ${this.missingFields.join(", ")}`);
        }

        messages.push("ALL");
        this.section3 = ["ALL"];
      }

      if (this.languageIssue === "FR") {
        messages.push(`FR, ${this.missingFields.join(", ")}`);
        this.section1 = [`FR, ${this.missingFields.join(", ")}`];

        if (this.missingFields.length > 1) {
          for (let i = 0; i < this.missingFields.length; i++) {
            const combination = this.missingFields.filter((_, index) => index !== i).join(", ");
            messages.push(`FR, ${combination}`);
            this.section2.push(`FR, ${combination}`);
          }
        } else {
          messages.push(`FR, ${this.missingFields.join(", ")}`);
          this.section2.push(`FR, ${this.missingFields.join(", ")}`);
        }

        messages.push("FR");
        this.section3 = ["FR"];
      } else {
        if (this.languageIssue) {
          messages.push(this.languageIssue);
        }

        if (this.missingFields.length > 0) {
          messages.push(`${this.missingFields.join(", ")}`);
        } else {
          console.log("ok tout va");
          messages.push("Tout validé");
        }
      }

      this.validationMessage = messages;
    },

    isStageVisible(stage, criteria) {
      if (stage.takenBy) {
        return false;
      }
      if (!criteria || criteria.length === 0) {
        return true;
      }
      for (let criterion of criteria) {
        if (stage[criterion] !== '1') {
          return false;
        }
      }
      return true;
    },

    async resetVotes() {
      if (this.currentStudent) {
        const votationRef = ref(db, `votationPFP4-B22/${this.currentStudent.id}`);
        await remove(votationRef);
        this.selectedStages = Array(5).fill(null);
        this.hasVoted = false;
        this.showAlert = false;
      }
    },

    submitVotes() {
      // Mettre à jour la base de données avec les informations de vote
      this.updateVotationDB(
        this.currentStudent.id,
        this.currentStudent.Nom,
        this.currentStudent.Prenom,
        this.selectedStages
      );

      // Afficher le message de remerciement
      this.showAlert = true;

      // Désactiver la modification des votes après la soumission
      this.hasVoted = true;

      setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    },

    async logVoteResults() {
      const votationRef = ref(db, 'votationPFP4-B22');
      const snapshot = await get(votationRef);

      if (snapshot.exists()) {
        const votationData = snapshot.val();
        const voteCounts = {};

        for (const studentId in votationData) {
          const votation = votationData[studentId];
          if (votation && votation.selectedStages) {
            votation.selectedStages.forEach(stage => {
              if (stage && stage.selectedStageName) {
                const stageName = stage.selectedStageName;
                const choice = stage.choice;

                if (!voteCounts[stageName]) {
                  voteCounts[stageName] = { choix: Array(5).fill(0), total: 0 };
                }

                if (choice) {
                  voteCounts[stageName].choix[choice - 1] += 1;
                  voteCounts[stageName].total += 1;
                }
              }
            });
          }
        }

        // Log results in a detailed manner
        for (const [place, counts] of Object.entries(voteCounts)) {
          console.log(`Vote Results for ${place}:`);
          counts.choix.forEach((count, index) => {
            console.log(`  Choix ${index + 1}: ${count} étudiant(s)`);
          });
          console.log(`  Total: ${counts.total} étudiant(s)`);
        }

        // Store vote counts for use in template
        this.voteCounts = voteCounts;
      } else {
        console.log("No votation data available");
      }
    },

    getVoteCount(placeName, choice) {
      const placeVotes = this.voteCounts[placeName];
      return placeVotes ? placeVotes.choix[choice - 1] : 0;
    },

    getTotalVotes(placeName) {
      const placeVotes = this.voteCounts[placeName];
      return placeVotes ? placeVotes.total : 0;
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
.table-responsive {
  text-align: center;
}

th,
td {
  text-align: center;
  vertical-align: middle;
}

.checkbox-choice {
  margin: auto;
  display: block;
}
</style>

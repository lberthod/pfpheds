<template>
  <div>
    <Navbar />
    <UserProfile />
    <div class="container-fluid mt-4">
      <div v-if="currentStudent && selectedPFP && selectedClass" class="table-responsive mt-4">
        <div v-if="validationMessage" class="mt-4 text-center">
          <h4>Validation</h4>
          <p>A besoin de : {{ validationMessage.join(" - ") }}</p>
          <p>A besoin en prio : {{ validationMessage[0] }}</p>
        </div>
      </div>
      <div v-if="selectedPFP && selectedClass" class="table-responsive mt-4">
        <div class="d-flex justify-content-center">
          <h3 class="mb-3 text-center">Toutes les places de stages</h3>
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
                      <input type="checkbox" :checked="isSelected(stage, choice)"
                        :disabled="isNonSelectable(stage.NomPlace, choice - 1)"
                        @change="selectStage(stage, choice, { ID: stage.IDENTIFIANT })" class="checkbox-choice">
                    </td>



                    <td>{{ getTotalStudents(stage) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Section 1 -->
          <div v-if="getPlacesForValidationMessage().length">
            <h4 class="mt-4">Section 1</h4>
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
                <tr v-for="(stage, index) in getPlacesForValidationMessage()" :key="index">
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
                      :disabled="isNonSelectable(stage.NomPlace, choice - 1)"
                      @change="selectStage(stage, choice, { ID: stage.IDENTIFIANT })" class="checkbox-choice">
                  </td>
                  <td>{{ getTotalStudents(stage) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Les autres sections... -->
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
      section1: [],

      etudiants: [],
      selectedClass: 'BA22',
      search: '',
      selectedPFP: 'PFP4',
      stages: [],
      places: [], // Initialisation du tableau de places
      selectedStages: Array(5).fill(null), // Ajoutez cette propriété pour stocker les choix sélectionnés
      currentStudent: null,
      currentUserEmail: null,
      validationMessage: null,
      missingFields: [],
      languageIssue: null,
      pfp1: [],
      pfp2: [],
      voteResult: null,
    };
  },
  computed: {
    filteredStages() {
      return this.stages.filter(stage => this.isStageVisible(stage));
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
          this.initializePlaces(); // Initialiser le tableau des places après avoir récupéré les données
        } else {
          console.log("No stages data available");
        }
      }, (error) => {
        console.error("Error fetching stages data:", error);
      });
    },

    initializePlaces() {
      this.places = {};

      this.filteredStages.forEach(stage => {
        this.places[stage.NomPlace] = Array(5).fill(0);
      });

      console.log(this.places);
    },

    getPlacesForValidationMessage() {
      if (!this.validationMessage || this.validationMessage.length === 0) return [];

      const criteriaString = this.validationMessage[0];
      const criteria = criteriaString.replace('ALL + manque ', '').split(', ').map(c => c.trim());
      console.log(criteria);

      return this.filteredStages.filter(stage =>
        criteria.every(field => stage[field] === '1')
      );
    },


    updateStudent(etudiant) {
      const studentRef = ref(db, `students/${etudiant.Classe}/${etudiant.id}`);
      set(studentRef, etudiant);
    },

    disableAnother(stageName, choice) {
      // Désactiver toutes les autres options pour le choix défini
      Object.keys(this.places).forEach(name => {
        if (name !== stageName && this.places[name]) {
          this.places[name][choice] = (this.places[name][choice] || 0) - 1;
        }
      });

      // Désactiver toutes les autres options dans les autres choix pour la place définie
      for (let i = 0; i < 5; i++) {
        if (i !== choice && this.places[stageName]) {
          this.places[stageName][i] = (this.places[stageName][i] || 0) - 1;
        }
      }
    },
    activateAnother(stageName, choice) {
      // Activer toutes les autres options pour le choix défini
      Object.keys(this.places).forEach(name => {
        if (name !== stageName && this.places[name] && this.places[name][choice] < 0) {
          this.places[name][choice] += 1;
        }
      });

      // Activer toutes les autres options dans les autres choix pour la place définie
      for (let i = 0; i < 5; i++) {
        if (i !== choice && this.places[stageName] && this.places[stageName][i] < 0) {
          this.places[stageName][i] += 1;
        }
      }
    }
    ,

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
          console.log("Cette case est interdite et ne peut pas être sélectionnée.");
          return;
        }
        this.places[stage.NomPlace][choice - 1] = 1;
        this.disableAnother(stage.NomPlace, choice - 1);
      }

      this.selectedStages[choice - 1] = isCurrentlyChecked ? null : { ...stage, choice };

      console.log("Tableau des places:", this.places);
      console.log(`Élément modifié: Place ${stage.NomPlace}, Choix ${choice}`);

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
            selectedStageName: stage ? stage.NomPlace : null,
            selectedStageLieu: stage ? stage.Lieu : null,
            selectedStageDomaine: stage ? stage.Domaine : null,
            choice: stage ? stage.choice : null
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
    isNonSelectable(stageName, choice) {
      return this.places[stageName] && this.places[stageName][choice] < 0;
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
        // Message 1: ALL + tous les critères manquants
        messages.push(`ALL, ${this.missingFields.join(", ")}`);
        this.section1 = [`ALL, ${this.missingFields.join(", ")}`];

        // Message 2: ALL + toutes les combinaisons de critères manquants moins 1
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

        // Message 3: Uniquement ALL
        messages.push("ALL");
        this.section3 = ["ALL"];
      } else {
        if (this.languageIssue) {
          messages.push(this.languageIssue);
        }

        if (this.missingFields.length > 0) {
          messages.push(`manque ${this.missingFields.join(", ")}`);
        } else {
          messages.push("Tout validé");
        }
      }

      this.validationMessage = messages;
    }

    ,


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

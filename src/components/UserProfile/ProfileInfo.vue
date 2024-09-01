<template>
  <div class="filter-menu">
    <div class="p-fluid p-pt-4 p-pb-4">
      <div class="surface-card p-4 shadow-2 border-round">
        <div class="row">
          <div class="text-900 font-medium text-xl mb-3 col-4">Profile</div>
        </div>
        <div class="grid formgrid p-fluid">
          <div class="field mb-4 col-4">
            <label for="prenom" class="font-medium">Prénom</label>
            <InputText id="prenom" v-model="user.prenom" type="text" readonly />
          </div>
          <div class="field mb-4 col-4">
            <label for="nom" class="font-medium">Nom</label>
            <InputText id="nom" v-model="user.nom" type="text" readonly />
          </div>
          <div class="surface-100 mb-3 col-12" style="height:2px"></div>
          <div class="field mb-4 col-12 md:col-6">
            <label for="bio" class="font-medium">Bio</label>
            <Textarea id="bio" v-model="user.bio" :rows="5" :autoResize="true"></Textarea>
          </div>
          <div class="field mb-4 col-12 md:col-6">
            <label for="avatar" class="font-medium">Avatar</label>
            <div class="flex align-items-center">
              <img :src="user.photoURL" class="mr-4" />
              <FileUpload mode="basic" name="avatar" url="./upload.php" accept="image/*" :maxFileSize="1000000" class="p-button-outlined p-button-plain" chooseLabel="Upload Image"></FileUpload>
            </div>
          </div>
          <div class="surface-100 mb-3 col-12" style="height:2px"></div>
          <div class="field mb-4 col-12 md:col-6">
            <label for="email" class="font-medium">Email</label>
            <InputText id="email" v-model="user.email" readonly />
          </div>
          <div class="field mb-4 col-12 md:col-6">
            <label for="city" class="font-medium">Ville</label>
            <InputText id="city" v-model="user.ville" type="text" />
          </div>
          <div class="surface-100 mb-3 col-12" style="height:2px"></div>
          <div class="col-12">
            <Button label="Sauvegarder" class="w-auto mt-3" @click="saveProfile"></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref as dbRef, get, set } from "firebase/database";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';

// User data state
const user = ref({
  uid: '',
  prenom: '',
  nom: '',
  bio: '',
  photoURL: '',
  email: '',
  canton: '',
  ville: ''
});

const currentStudent = ref(null);
const selectedPFP = ref('PFP1'); // exemple, cela devrait être défini dynamiquement
const validationMessage = ref(null);
const studentId = ref(null); // Assurez-vous de définir cela à partir des paramètres de route ou autrement

// Fetch user profile data from Firebase
const fetchUserProfile = async (email) => {
  const db = getDatabase();
  const studentsRef = dbRef(db, 'students');
  const snapshot = await get(studentsRef);
  if (snapshot.exists()) {
    const studentsData = snapshot.val();
    for (const classKey in studentsData) {
      for (const studentKey in studentsData[classKey]) {
        const student = studentsData[classKey][studentKey];
        if (student.Mail && student.Mail.toLowerCase() === email.toLowerCase()) {
          user.value = {
            ...user.value,
            uid: studentKey,
            prenom: student.Prenom,
            nom: student.Nom,
            email: student.Mail,
            canton: student.Canton,
            ville: student.Ville,
            bio: student.Bio || '',
            photoURL: student.photoURL || ''
          };
          return;
        }
      }
    }
  }
};

// Save user profile data to Firebase
const saveProfile = async () => {
  const db = getDatabase();
  const userRef = dbRef(db, `students/${user.value.uid}`);
  await set(userRef, {
    Prenom: user.value.prenom,
    Nom: user.value.nom,
    Mail: user.value.email,
    Canton: user.value.canton,
    Ville: user.value.ville,
    Bio: user.value.bio,
    photoURL: user.value.photoURL
  });
  alert('Profil mis à jour avec succès');
};

// Firebase Authentication state change handler
onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, async (authUser) => {
    if (authUser) {
      await fetchUserProfile(authUser.email);
    } else {
      user.value = {};
    }
  });
});

// Fetch student data from Firebase
const fetchStudentData = async (studentId) => {
  try {
    const db = getDatabase();
    const dbRef = dbRef(db, `students`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const studentsData = snapshot.val();
      for (const classKey in studentsData) {
        if (studentsData[classKey][studentId]) {
          currentStudent.value = {
            id: studentId,
            Classe: classKey,
            ...studentsData[classKey][studentId]
          };
          checkValidation();
          return;
        }
      }
    }
  } catch (error) {
    console.error('Erreur de récupération des données', error);
  }
};

// Secteur details
const secteurDetails = (info) => {
  return {
    "FR": info.FR,
    "ALL": info.ALL,
    "AMBU": info.AMBU,
    "AIGU": info.AIGU,
    "MSQ": info.MSQ,
    "SYSINT": info.SYSINT,
    "NEUROGER": info.NEUROGER,
    "REHAB": info.REHAB,
  };
};

// Get other secteurs
const getOtherSecteurs = (info) => {
  const excludedKeys = ['ID', 'IDA', 'Lieu', 'Nom', 'Langue'];
  return Object.keys(info)
    .filter(key => !excludedKeys.includes(key))
    .map(key => key + ': ' + info[key])
    .join(', ');
};

// Check validation
const checkValidation = () => {
  if (!currentStudent.value) return;
  const { FR, ALL, AMBU, MSQ, AIGU, SYSINT, NEUROGER, REHAB } = currentStudent.value;
  console.log("FR + " + FR);
  this.missingFields = [];
  this.languageIssue = null;

  if (FR == "0" && ALL == "0" && AMBU == "0" && MSQ == "0" && SYSINT == "0" && AIGU == "0" && NEUROGER == "0" && REHAB == "0") {
    validationMessage.value = "Toutes les options sont disponibles";
    return;
  }

  if (FR == "0") this.languageIssue = "besoin langue FR";
  if (ALL == "0") this.languageIssue = "besoin langue ALL";
  if (AMBU == "0") this.missingFields.push("AMBU");
  if (MSQ == "0") this.missingFields.push("MSQ");
  if (AIGU == "0") this.missingFields.push("AIGU");
  if (SYSINT == "0") this.missingFields.push("SYSINT");
  if (NEUROGER == "0") this.missingFields.push("NEUROGER");
  if (REHAB == "0") this.missingFields.push("REHAB");

  if (this.languageIssue) {
    validationMessage.value = this.languageIssue;
  } else if (this.missingFields.length > 0) {
    validationMessage.value = `manque ${this.missingFields.join(", ")}`;
  } else {
    validationMessage.value = "Tout validé";
  }
};

// Go back to the student list
const goBack = () => {
  this.$router.push({ name: 'EtudiantList' });
};
</script>

<style scoped>
.p-fluid {
  padding: 20px;
}

.table-dark-gray {
  background-color: #343a40;
  color: #fff;
}

.table-dark-gray th,
.table-dark-gray td {
  border-color: #454d55;
}

.text-danger {
  color: red !important;
}

.text-green-500 {
  color: green !important;
}

.text-red-500 {
  color: red !important;
}

.p-table {
  width: 100%;
  border-collapse: collapse;
}

.p-table th,
.p-table td {
  border: 1px solid #ccc;
  padding: 8px;
}

.p-table th {
  background-color: #f4f4f4;
}

.pi-check-circle {
  color: green;
}

.pi-times-circle {
  color: red;
}
</style>

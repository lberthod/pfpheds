<template>
  <div>
    <div class="surface-card p-4 shadow-2 border-round">
      <div class="row">
        <div class="text-900 font-medium text-xl mb-3 col-4">Profile</div>
      </div>
      <div class="grid formgrid p-fluid">

        <div class="field mb-4 col-4">
          <label for="prenom" class="font-medium">Prénom</label>
          <InputText id="prenom" v-model="user.prenom" type="text" />
        </div>
        <div class="field mb-4 col-4">
          <label for="nom" class="font-medium">Nom</label>
          <InputText id="nom" v-model="user.nom" type="text" />
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
          <InputText id="email" v-model="user.email" />
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref as dbRef, get, set } from "firebase/database";
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';

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

onMounted(async () => {
  const auth = getAuth();
  onAuthStateChanged(auth, async (authUser) => {
    if (authUser) {
      await fetchUserProfile(authUser.email);
    } else {
      user.value = {};
    }
  });
});
</script>

<style scoped>
/* Ajoutez des styles spécifiques pour ce composant ici */
</style>

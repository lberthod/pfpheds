<template>
  <div class="relative overflow-hidden flex flex-column justify-content-center">
    <div class="bg-circle opacity-50" :style="{ top: '-200px', left: '-700px' }"></div>
    <div class="bg-circle hidden lg:flex" :style="{ top: '50px', right: '-800px', transform: 'rotate(60deg)' }"></div>
    <div class="landing-wrapper">
      <div class="flex align-items-center justify-content-between relative lg:static py-6 px-4 mx-0 md:px-7 lg:px-8 lg:py-6 lg:mx-8">
        <a class="cursor-pointer" @click="navigateTo('/')">
          <img src="/public/assets/images/FR-DE_HEdS.png" alt="Logo" class="h-3 w-2" />
        </a>

        <i class="pi pi-bars text-4xl cursor-pointer block md:hidden text-700"></i>
        <div class="align-items-center flex-grow-1 hidden md:flex absolute md:static w-full md:px-0 z-3 shadow-2 md:shadow-none fadein" :class="{ hidden: isHidden }" :style="{ top: '80px', right: '0%' }">
          <ul class="list-none p-3 md:p-0 m-0 ml-auto flex md:align-items-center select-none flex-column md:flex-row cursor-pointer surface-card md:surface-ground">
            <li><a @click="navigateTo('/')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">Accueil</a></li>
       

            <li v-if="!user"><a @click="navigateTo('/sign_in')">
              <Button type="button" label="Se Connecter" class="m-0 mt-3 md:mt-0 md:ml-5"></Button>
              </a>
            </li>
            <li  v-if="user"      ><a @click="navigateTo('/votation')" class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">Votation</a></li>

            <li v-if="user"><a @click="logout">
              <Button type="button" label="Déconnexion" class="m-0 mt-3 md:mt-0 md:ml-5"></Button>
            </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const router = useRouter();
const user = ref(null);

const navigateTo = (path) => {
  router.push(path);
};

const auth = getAuth();
onAuthStateChanged(auth, (u) => {
  user.value = u;
});

const logout = async () => {
  try {
    await signOut(auth);
    navigateTo('/');
  } catch (error) {
    console.error('Erreur de déconnexion:', error);
  }
};
</script>
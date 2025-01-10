<!-- Fichier : src/components/Education/EducationsManagement.vue -->
<template>
  <Navbar />

  <div class="education-page">
    <!-- Barre latérale gauche -->
    <leftisdebarpedago class="left-sidebar" />

    <!-- Contenu principal : Liste de capsules + Navbar en haut si besoin -->
    <div class="educations-management">

      <header>
        <h1>Gestion des Capsules</h1>
        <p>Sélectionnez une capsule pour accéder à son contenu.</p>
      </header>

      <section class="capsules-list">
        <div v-for="(capsule, index) in capsules" :key="capsule.id" class="capsule-item">
          <!-- Exemple : la première capsule envoie vers EducationView -->
          <template v-if="index === 0">
            <router-link :to="{ name: 'digital-health-view' }" class="capsule-link">
              <strong>{{ capsule.title }}</strong>
              <span class="capsule-description">{{ capsule.description }}</span>
            </router-link>
          </template>

          <template v-if="index === 0">
            <router-link :to="{ name: 'tb-capsules' }" class="capsule-link">
              <strong>{{ capsule.title }}</strong>
              <span class="capsule-description">{{ capsule.description }}</span>
            </router-link>
          </template>
          <!-- Les autres capsules (exemple inactif pour la démonstration) -->
          <template v-else>
            <div class="capsule-link disabled">
              <strong>{{ capsule.title }}</strong>
              <span class="capsule-description">{{ capsule.description }}</span>
            </div>
          </template>
        </div>
      </section>
    </div>

    <!-- Barre latérale droite -->
    <rightsidebarepedago class="right-sidebar" />
  </div>
</template>

<script>
import Navbar from '@/components/Utils/Navbar.vue';
// Adapte ici le chemin vers tes barres latérales
import leftisdebarpedago from './Leftisdebarpedago.vue';
import rightsidebarepedago from './Rightsidebarepedago.vue';

export default {
  name: 'EducationManagement',
  components: {
    Navbar,
    leftisdebarpedago,
    rightsidebarepedago,
  },
  data() {
    return {
      capsules: [
        {
          id: 1,
          title: 'Digital Health & e-Learning',
          description: 'Introduction aux modules de formation',
        },
        {
          id: 2,
          title: 'Capsule IA',
          description: 'Utilisation de l’IA en milieu clinique',
        },
        {
          id: 3,
          title: 'Analyse Big Data',
          description: 'Les enjeux de la data en santé',
        },
        // Ajoute autant de capsules que nécessaire
      ],
    };
  },
};
</script>

<style scoped>
/* ---------------------------------------- */
/* Layout global en 3 colonnes :            */
/* Sidebar gauche, contenu, sidebar droite. */
/* ---------------------------------------- */
.education-page {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  /* à adapter selon ta préférence */
  gap: 1rem;
  min-height: 100vh;
  /* pour un layout pleine hauteur si besoin */
  padding: 1rem;
}

/* Ajuste la scrollbar sur barres latérales si besoin */
.left-sidebar,
.right-sidebar {
  overflow-y: auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* ---------------------------------------- */
/* Zone centrale - le composant principal   */
/* ---------------------------------------- */
.educations-management {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Navbar tout en haut si besoin, sinon le laisser où il est habituellement */
nav {
  margin-bottom: 1rem;
}

header {
  text-align: center;
}

header h1 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

header p {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 1.5rem;
}

/* ---------------------------------------- */
/* Liste des capsules : 3 colonnes, format carré */
/* ---------------------------------------- */
.capsules-list {
  /* Grille responsive en 3 colonnes minimum (adapte si souhaité) */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* 200px est la largeur min d’une capsule, 1fr pour s’adapter */
  grid-gap: 1rem;
}

.capsule-item {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  /* Rendre la capsule plus ou moins carrée */
  aspect-ratio: 1 / 1;
  /* supporté par la plupart des navigateurs récents */
  display: flex;
  /* pour centrer le contenu (optionnel) */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  transition: background-color 0.2s;
}

/* Si aspect-ratio n’est pas bien supporté, 
   on peut simuler un carré en forçant height = width (via JS ou technique %). */

.capsule-item:hover {
  background-color: #f8f8f8;
}

.capsule-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* centrer le texte au milieu du carré */
  justify-content: center;
  text-decoration: none;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

.capsule-link strong {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  text-align: center;
}

.capsule-description {
  font-size: 0.9rem;
  color: #7f8c8d;
  text-align: center;
  padding: 0 0.5rem;
}

.capsule-link:hover {
  text-decoration: underline;
}

/* Capsules inactives / désactivées */
.disabled {
  pointer-events: none;
  opacity: 0.6;
}
</style>

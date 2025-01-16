<template>
  <div class="not-authorized">
    <h2>Accès Refusé</h2>
    <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
    <router-link to="/eportfolio">Retour à l'accueil</router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-authorized {
  padding: 2rem;
  text-align: center;
  color: #000;
}

.not-authorized h2 {
  color: #e74c3c;
  margin-bottom: 1rem;
}

.not-authorized a {
  color: #007acc;
  text-decoration: none;
  font-weight: bold;
}

.not-authorized a:hover {
  text-decoration: underline;
}
</style>

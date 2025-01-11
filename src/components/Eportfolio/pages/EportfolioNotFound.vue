<!-- pages/EportfolioNotFound.vue -->
<template>
  <div class="eportfolio-notfound">
    <h2>404 - Page Not Found</h2>
    <p>
      Sorry, the page you requested does not exist in the e-portfolio module.
    </p>
    <router-link to="/eportfolio" class="back-link">
      Return to E-Portfolio Home
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'EportfolioNotFound',
};
</script>

<style scoped>
.eportfolio-notfound {
  text-align: center;
  padding: 2rem 1rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.eportfolio-notfound h2 {
  margin-bottom: 1rem;
  color: #e74c3c;
}
.back-link {
  display: inline-block;
  margin-top: 1rem;
  text-decoration: none;
  color: #007acc;
}
.back-link:hover {
  text-decoration: underline;
}
</style>

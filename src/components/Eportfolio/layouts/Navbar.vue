<!-- layouts/Navbar.vue -->
<template>
  <header class="navbar">
    <div class="logo-area">
      <h1>E-Portfolio</h1>
    </div>
    <nav class="nav-links">
      <!-- Example nav items -->
      <ul>
        <li><router-link to="/eportfolio">Dashboard</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <!-- Add global or role-based links if needed -->
      </ul>
    </nav>
    <div class="user-area">
      <!-- Example user info / login status -->
      <span>Signed in as <strong>Username</strong></span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2c3e50;
  color: #fff;
  padding: 0.5rem 1rem;
}

.logo-area h1 {
  font-size: 1.2rem;
  margin: 0;
}

.nav-links ul {
  display: flex;
  list-style: none;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin: 0;
}

.nav-links a {
  text-decoration: none;
  color: #fff;
  font-weight: 500;
}

.nav-links a:hover {
  text-decoration: underline;
}

.user-area {
  font-size: 0.9rem;
}
</style>

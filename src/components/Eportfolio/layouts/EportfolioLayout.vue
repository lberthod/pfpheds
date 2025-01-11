<!-- layouts/EportfolioLayout.vue -->
<template>
  <Navbar/>
  <div class="eportfolio-layout">
    <!-- Top navbar -->
    <NavBar />

    <!-- Main content area: left sidebar, page content, right sidebar -->
    <div class="content-area">
      <LeftSidebar class="left-sidebar" />

      <!-- Router-view: Where child pages (EportfolioHome, EportfolioManagement, etc.) will be displayed -->
      <main class="center-content">
        <router-view />
      </main>

      <RightSidebar class="right-sidebar" />
    </div>

    <!-- Optional footer -->
    <footer class="footer-area">
      <p>© 2023 - E-Portfolio Layout</p>
    </footer>
  </div>
</template>

<script>
import NavBar from './Navbar.vue';
import Navbar from '@/components/Utils/Navbar.vue';
import LeftSidebar from './LeftSidebar.vue';
import RightSidebar from './RightSidebar.vue';

export default {
  name: 'EportfolioLayout',
  components: {
    NavBar,
    LeftSidebar,
    RightSidebar,
    Navbar
  }
};
</script>
<style scoped>
.eportfolio-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f9f9f9; /* or #fff, as you prefer */
}

.content-area {
  flex: 1; /* Expand to fill remaining vertical space */
  display: grid;
  grid-template-columns: 220px 1fr 220px; /* Adjust sidebars' width as needed */
  gap: 1rem;
  padding: 1rem;
}

.center-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  /* Force text to be black */
  color: #000;
}

.footer-area {
  text-align: center;
  padding: 1rem;
  background-color: #efefef;
  /* Force text to be black */
  color: #000;
}
</style>
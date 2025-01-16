<template>
  <aside class="right-sidebar">
    <h2 class="sidebar-title">Notifications</h2>
    <section class="notification-block">
      <p>No new notifications.</p>
      <!-- Ou un v-for si on veut lister des notifs stockées en DB -->
    </section>

    <h2 class="sidebar-title">Settings</h2>
    <section class="settings-block">
      <p>Some quick user settings or account preferences, etc.</p>
      <button @click="showAlert">Example Action</button>
    </section>
  </aside>
</template>

<script setup>
function showAlert() {
  alert('Settings action triggered!');
}
</script>

<style scoped>
.right-sidebar {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  color: #000;
}

.sidebar-title {
  margin-top: 0;
  font-size: 1.2rem;
}

.notification-block,
.settings-block {
  margin-bottom: 1rem;
  background-color: #fafafa;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #eee;
}
</style>

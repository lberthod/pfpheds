<!-- layouts/RightSidebar.vue -->
<template>
  <aside class="right-sidebar">
    <h2 class="sidebar-title">Notifications</h2>
    <section class="notification-block">
      <p>No new notifications.</p>
      <!-- You can render a list of actual notifications or messages here -->
    </section>

    <h2 class="sidebar-title">Settings</h2>
    <section class="settings-block">
      <p>Some quick user settings or links to account preferences, etc.</p>
      <button @click="showAlert">Example Action</button>
    </section>
  </aside>
</template>

<script>
export default {
  name: 'RightSidebar',
  setup() {
    const showAlert = () => {
      alert('Settings action triggered!');
    };

    return { showAlert };
  },
};
</script>

<style scoped>
.right-sidebar {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  /* Force text to be black */
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

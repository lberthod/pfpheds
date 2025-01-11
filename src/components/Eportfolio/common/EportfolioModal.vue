<!-- common/EportfolioModal.vue -->
<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <header class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="$emit('close')">×</button>
      </header>

      <section class="modal-body">
        <!-- Use a slot to inject custom content -->
        <slot />
      </section>

      <footer class="modal-footer">
        <button @click="$emit('close')" class="cancel-btn">Cancel</button>
        <button @click="confirmAction" class="confirm-btn">Confirm</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EportfolioModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Modal Title'
    }
  },
  emits: ['close', 'confirm'],
  methods: {
    confirmAction() {
      // Emit a custom event to the parent
      this.$emit('confirm');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background-color: #fff;
  color: #000; /* Text in black */
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f5f5f5;
}

.close-btn {
  background: none;
  border: none;
  color: #000;
  font-size: 1.2rem;
  cursor: pointer;
}

.modal-body {
  padding: 1rem;
  color: #000; /* Force text to black */
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f5f5f5;
}

.cancel-btn,
.confirm-btn {
  background-color: #ddd;
  color: #000;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.confirm-btn {
  background-color: #2c3e50;
  color: #fff;
}
</style>

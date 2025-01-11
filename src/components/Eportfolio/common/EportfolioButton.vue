<!-- common/EportfolioButton.vue -->
<template>
  <button
    class="eportfolio-button"
    :class="buttonClass"
    :type="type"
    @click="$emit('click')"
  >
    <!-- Pass content via default slot -->
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  name: 'EportfolioButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    variant: {
      type: String,
      default: 'primary' 
      // e.g. 'primary', 'secondary', 'danger'
    }
  },
  computed: {
    buttonClass() {
      switch (this.variant) {
        case 'primary':
          return 'primary-btn';
        case 'secondary':
          return 'secondary-btn';
        case 'danger':
          return 'danger-btn';
        default:
          return 'primary-btn';
      }
    }
  },
  emits: ['click']
};
</script>

<style scoped>
.eportfolio-button {
  font-size: 1rem;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  color: #fff;
}

/* Variants */
.primary-btn {
  background-color: #2c3e50;
}

.primary-btn:hover {
  background-color: #34495e;
}

.secondary-btn {
  background-color: #7f8c8d;
}

.secondary-btn:hover {
  background-color: #95a5a6;
}

.danger-btn {
  background-color: #e74c3c;
}

.danger-btn:hover {
  background-color: #c0392b;
}
</style>

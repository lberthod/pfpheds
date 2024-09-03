<!-- src/components/Social/InfiniteScroll.vue -->
<template>
    <div>
      <slot></slot> <!-- Affiche les posts passés à ce composant -->
      <div v-if="loading" class="loading-spinner">Chargement...</div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InfiniteScroll',
    props: {
      loading: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
      onScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
  
        if (scrollTop + windowHeight >= documentHeight - 50 && !this.loading) {
          this.$emit('load-more');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .loading-spinner {
    text-align: center;
    padding: 20px;
    font-size: 16px;
    color: #888;
  }
  </style>
  
<!-- src/components/Eportfolio/ProjectCard.vue -->
<template>
  <div class="project-card">
    <!-- Affichage de l'image si elle est disponible -->
    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="Illustration du projet"
      class="project-image"
    />
    <div class="project-content">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <div class="tags">
        <span
          v-for="(tag, index) in tags"
          :key="index"
          class="tag"
        >
          #{{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    tags: {
      type: Array,
      default: () => [],
    },
    imageUrl: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
.project-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.project-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.project-content {
  padding: 0.8rem;
}

.project-content h3 {
  margin: 0 0 0.5rem;
  color: #2c3e50;
}

.project-content p {
  font-size: 0.9rem;
  color: #7f8c8d;
}

.tags {
  margin-top: 0.5rem;
}

.tag {
  display: inline-block;
  background-color: #ecf0f1;
  color: #34495e;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-right: 0.4rem;
}
</style>

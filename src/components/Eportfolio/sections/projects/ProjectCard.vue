<!-- sections/Projects/ProjectCard.vue -->
<template>
  <div class="project-card">
    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="Project Illustration"
      class="project-image"
    />
    <div class="project-content">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: null
    }
  }
};
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  color: #000; /* Force text to black */
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
}

.project-content p {
  font-size: 0.9rem;
  line-height: 1.4;
  color: #000; /* Text in black */
}
</style>

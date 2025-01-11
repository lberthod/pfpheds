<template>
    <div class="portfolio-block">
      <h2>Mes Projets</h2>
      <p>Listez ou présentez ici vos projets réalisés.</p>
      <!-- Exemple d'utilisation d'un composant ProjectCard -->
      <ProjectCard
        v-for="(project, index) in projects"
        :key="index"
        :title="project.title"
        :description="project.description"
        :tags="project.tags"
        :imageUrl="project.imageUrl"
      />
    </div>
  </template>
  
  <script>
  import ProjectCard from './ProjectCard.vue';
  
  // On crée une constante "projectImage" avec new URL() pour pointer vers l’image externe
  const projectImage = new URL(
    'https://cdn.pixabay.com/photo/2022/08/19/13/31/woman-7396948_1280.jpg',
    import.meta.url
  ).href;
  
  export default {
    name: 'MyProjectsSection',
    components: {
      ProjectCard,
    },
    data() {
      return {
        projects: [
          {
            title: 'Site Web Personnel',
            description: 'Développement d’un site vitrine en Vue 3...',
            tags: ['vue', 'frontend', 'design'],
            // On utilise la variable projectImage ci-dessus
            imageUrl: projectImage,
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Styles locaux si nécessaire */
  </style>
  
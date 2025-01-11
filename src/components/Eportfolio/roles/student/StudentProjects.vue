<!-- roles/student/StudentProjects.vue -->
<template>
  <div class="student-projects">
    <h2>My Projects</h2>
    <p>Create, edit, or view your personal projects here.</p>

    <div class="actions">
      <button @click="createNewProject">Create New Project</button>
    </div>

    <!-- Use ProjectList from sections/Projects -->
    <ProjectList :projects="myProjects" />
  </div>
</template>

<script>
import ProjectList from '@/components/Eportfolio/sections/Projects/ProjectList.vue';

export default {
  name: 'StudentProjects',
  components: {
    ProjectList
  },
  data() {
    return {
      myProjects: [
        {
          title: 'Nursing Care Plan',
          description: 'Care plan for geriatric ward patients.',
          imageUrl:
            'https://cdn.pixabay.com/photo/2020/04/07/19/17/hospital-5014832_1280.jpg'
        },
        {
          title: 'Community Health Initiative',
          description: 'A study on local community clinics...',
          imageUrl: null
        },
        {
          title: 'Pediatric Day',
          description: 'Project focusing on pediatric nursing activities.',
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/08/06/09/23/teddy-bear-2596116_1280.jpg'
        },
        {
          title: 'Pharmacology Basics',
          description: 'Overview of common medications in ICU...',
          imageUrl: null
        }
      ]
    };
  },
  methods: {
    createNewProject() {
      alert('Open a modal or navigate to project creation form.');
    }
  }
};
</script>

<style scoped>
.student-projects {
  padding: 1rem;
  color: #000; /* Force text to black */
}

.actions {
  margin-bottom: 1rem;
}

.actions button {
  background-color: #2c3e50;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.actions button:hover {
  background-color: #34495e;
}
</style>

<!-- sections/Projects/ProjectList.vue -->
<template>
  <div class="project-list">
    <h2>All Projects</h2>

    <!-- Optional filter input (placeholder) -->
    <div class="filter-bar">
      <label>Search:</label>
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Filter by title..."
        @input="applyFilter"
      />
    </div>

    <!-- Display list of ProjectCards -->
    <div class="projects-grid">
      <ProjectCard
        v-for="(project, index) in filteredProjects"
        :key="index"
        :title="project.title"
        :description="project.description"
        :imageUrl="project.imageUrl"
      />
    </div>

    <!-- Placeholder for pagination (if needed) -->
    <div class="pagination">
      <button @click="prevPage" :disabled="page <= 1">Previous</button>
      <span>Page {{ page }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page >= totalPages">Next</button>
    </div>
  </div>
</template>

<script>
// Import your ProjectCard component:
import ProjectCard from './ProjectCard.vue';

export default {
  name: 'ProjectList',
  components: { ProjectCard },
  props: {
    projects: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchTerm: '',
      page: 1,
      itemsPerPage: 3 // example: show 3 items per page
    };
  },
  computed: {
    filteredProjects() {
      const lowerSearch = this.searchTerm.toLowerCase().trim();

      // 1) Filter by search term
      let results = this.projects.filter(p =>
        p.title.toLowerCase().includes(lowerSearch)
      );

      // 2) Apply pagination
      const startIndex = (this.page - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return results.slice(startIndex, endIndex);
    },
    totalPages() {
      // total pages based on filtered results
      const lowerSearch = this.searchTerm.toLowerCase().trim();
      const totalFiltered = this.projects.filter(p =>
        p.title.toLowerCase().includes(lowerSearch)
      ).length;
      return Math.ceil(totalFiltered / this.itemsPerPage);
    }
  },
  methods: {
    applyFilter() {
      // Reset to page 1 whenever we change the filter
      this.page = 1;
    },
    prevPage() {
      if (this.page > 1) this.page--;
    },
    nextPage() {
      if (this.page < this.totalPages) this.page++;
    }
  }
};
</script>

<style scoped>
.project-list {
  color: #000; /* Force text to black */
}

.filter-bar {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.filter-bar label {
  margin-right: 0.5rem;
}

.filter-bar input {
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

/* Basic pagination style */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 0.9rem;
}

.pagination button {
  padding: 0.4rem 0.8rem;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

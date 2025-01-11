<!-- sections/Pathways/PathwayList.vue -->
<template>
  <div class="pathway-list">
    <h2>All Pathways</h2>

    <!-- Example filter/search bar -->
    <div class="filter-bar">
      <label>Search:</label>
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Filter by name..."
        @input="resetPage"
      />
    </div>

    <div class="pathway-items">
      <div
        v-for="(path, idx) in paginatedPathways"
        :key="idx"
        class="pathway-item"
        @click="goToDetail(path)"
      >
        <h3>{{ path.name }}</h3>
        <p>{{ path.description }}</p>
      </div>
    </div>

    <!-- Pagination (placeholder) -->
    <div class="pagination">
      <button @click="prevPage" :disabled="page <= 1">Prev</button>
      <span>Page {{ page }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page >= totalPages">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PathwayList',
  data() {
    return {
      pathways: [
        { name: 'Basic Nursing Skills', description: 'Foundational nursing procedures.' },
        { name: 'Advanced Clinical Practice', description: 'Advanced patient management.' },
        { name: 'Pediatrics Pathway', description: 'Child care specialization.' },
        { name: 'Geriatrics Focus', description: 'Elderly patient care best practices.' },
        // ... add more for demo
      ],
      searchTerm: '',
      page: 1,
      itemsPerPage: 3
    };
  },
  computed: {
    filteredPathways() {
      const lowerSearch = this.searchTerm.toLowerCase().trim();
      return this.pathways.filter(p =>
        p.name.toLowerCase().includes(lowerSearch)
      );
    },
    totalPages() {
      return Math.ceil(this.filteredPathways.length / this.itemsPerPage);
    },
    paginatedPathways() {
      const startIndex = (this.page - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredPathways.slice(startIndex, endIndex);
    }
  },
  methods: {
    resetPage() {
      this.page = 1;
    },
    prevPage() {
      if (this.page > 1) this.page--;
    },
    nextPage() {
      if (this.page < this.totalPages) this.page++;
    },
    goToDetail(path) {
      // Example: navigate to PathwayDetail route
      alert(`Navigating to detail for: ${path.name}`);
      // e.g. this.$router.push({ name: 'PathwayDetail', params: { id: path.id } })
    }
  }
};
</script>

<style scoped>
.pathway-list {
  padding: 1rem;
  color: #000; /* text in black */
}

.filter-bar {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-bar input {
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.pathway-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.pathway-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.8rem;
  cursor: pointer;
}

.pathway-item:hover {
  background-color: #f9f9f9;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>

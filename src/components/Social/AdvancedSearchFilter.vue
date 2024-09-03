<template>
  <div class="advanced-search-filter">
    <!-- Search input for general query -->
    <input 
      v-model="searchQuery" 
      placeholder="Rechercher..." 
      @input="applyFilters" 
      class="form-control mb-2"
    />

    <!-- Buttons for filtering by hashtag -->
    <div class="filter-buttons mb-2">
      <!-- "ALL" button to reset all filters -->
      <button 
        class="btn btn-outline-dark" 
        @click="clearFilters"
        :class="{ active: isActive('all', '') }"
      >
        ALL
      </button>

      <button 
        class="btn btn-outline-primary" 
        @click="setFilter('hashtag', 'BA23')"
        :class="{ active: isActive('hashtag', 'BA23') }"
      >
        #BA23
      </button>

      <button 
        class="btn btn-outline-primary" 
        @click="setFilter('hashtag', 'BA24')"
        :class="{ active: isActive('hashtag', 'BA24') }"
      >
        #BA24
      </button>
      
      <!-- Buttons for filtering by mention group -->
      <button 
        class="btn btn-outline-secondary" 
        @click="setFilter('mention', 'BA23')"
        :class="{ active: isActive('mention', 'BA23') }"
      >
        @BA23
      </button>

      <button 
        class="btn btn-outline-secondary" 
        @click="setFilter('mention', 'BA24')"
        :class="{ active: isActive('mention', 'BA24') }"
      >
        @BA24
      </button>
    </div>

    <!-- Sorting option dropdown -->
    <select 
      v-model="sortOrder" 
      @change="applyFilters" 
      class="form-select mb-2"
    >
      <option value="newest">Les plus récents</option>
      <option value="oldest">Les plus anciens</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'AdvancedSearchFilter',
  data() {
    return {
      searchQuery: '',
      filterType: 'all',
      filterValue: '',
      sortOrder: 'newest'
    };
  },
  methods: {
    setFilter(type, value) {
      // Update filter type and value, then apply filters
      this.filterType = type;
      this.filterValue = value;
      this.applyFilters();
    },
    clearFilters() {
      // Reset filters to show all posts
      this.filterType = 'all';
      this.filterValue = '';
      this.applyFilters();
    },
    applyFilters() {
      // Emit the filter options back to the parent component
      this.$emit('filter-posts', {
        query: this.searchQuery,
        type: this.filterType,
        value: this.filterValue,
        order: this.sortOrder
      });
    },
    isActive(type, value) {
      // Determine if a filter button should be active
      return this.filterType === type && this.filterValue === value;
    }
  }
};
</script>

<style scoped>
.advanced-search-filter {
  margin-bottom: 20px;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.btn.active {
  background-color: #007bff;
  color: white;
}
</style>

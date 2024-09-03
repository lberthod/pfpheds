<!-- src/components/Social/AdvancedSearchFilter.vue -->
<template>
    <div class="advanced-search-filter">
      <input v-model="searchQuery" placeholder="Rechercher..." @input="applyFilters" class="form-control mb-2"/>
  
      <div class="filter-buttons mb-2">
        <!-- Boutons pour filtrer par hashtag -->
        <button 
          class="btn btn-outline-primary" 
          @click="setFilter('hashtag', 'BA23')"
          :class="{ active: isActive('hashtag', 'BA23') }"
        >#BA23</button>
  
        <button 
          class="btn btn-outline-primary" 
          @click="setFilter('hashtag', 'BA24')"
          :class="{ active: isActive('hashtag', 'BA24') }"
        >#BA24</button>
        
        <!-- Boutons pour filtrer par mention -->
        <button 
          class="btn btn-outline-secondary" 
          @click="setFilter('mention', 'BA23')"
          :class="{ active: isActive('mention', 'BA23') }"
        >@BA23</button>
  
        <button 
          class="btn btn-outline-secondary" 
          @click="setFilter('mention', 'BA24')"
          :class="{ active: isActive('mention', 'BA24') }"
        >@BA24</button>
      </div>
  
      <select v-model="sortOrder" @change="applyFilters" class="form-select mb-2">
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
        this.filterType = type;
        this.filterValue = value;
        this.applyFilters();
      },
      applyFilters() {
        this.$emit('filter-posts', {
          query: this.searchQuery,
          type: this.filterType,
          value: this.filterValue,
          order: this.sortOrder
        });
      },
      isActive(type, value) {
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
  
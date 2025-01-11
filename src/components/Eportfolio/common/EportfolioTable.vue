<!-- common/EportfolioTable.vue -->
<template>
  <div class="eportfolio-table-wrapper">
    <!-- Optional search/filter input -->
    <div class="table-filter" v-if="filterEnabled">
      <label>Search:</label>
      <input v-model="searchTerm" type="text" @input="resetPage" />
    </div>

    <table class="eportfolio-table">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            @click="sortBy(col.key)"
            :class="{ sortable: col.sortable }"
          >
            {{ col.label }}
            <!-- display a sort indicator if col.sortable -->
            <span v-if="col.sortable" class="sort-indicator">
              <span v-if="sortKey === col.key && sortAsc">▲</span>
              <span v-else-if="sortKey === col.key && !sortAsc">▼</span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in paginatedRows" :key="index">
          <td v-for="col in columns" :key="col.key">
            {{ row[col.key] }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination controls -->
    <div v-if="paginationEnabled" class="table-pagination">
      <button @click="prevPage" :disabled="page <= 1">Prev</button>
      <span>Page {{ page }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page >= totalPages">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EportfolioTable',
  props: {
    columns: {
      type: Array,
      default: () => []
      /*
        Example:
        columns: [
          { key: 'id', label: 'ID', sortable: true },
          { key: 'name', label: 'Name', sortable: false },
          ...
        ]
      */
    },
    rows: {
      type: Array,
      default: () => []
    },
    filterEnabled: {
      type: Boolean,
      default: false
    },
    paginationEnabled: {
      type: Boolean,
      default: false
    },
    itemsPerPage: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      searchTerm: '',
      sortKey: null,
      sortAsc: true,
      page: 1
    };
  },
  computed: {
    filteredRows() {
      if (!this.filterEnabled || !this.searchTerm.trim()) {
        return this.rows;
      }
      const lowerSearch = this.searchTerm.toLowerCase();
      // simplistic filter across all columns
      return this.rows.filter(row =>
        Object.values(row)
          .join(' ')
          .toLowerCase()
          .includes(lowerSearch)
      );
    },
    sortedRows() {
      if (!this.sortKey) {
        return this.filteredRows;
      }
      return [...this.filteredRows].sort((a, b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        if (valA < valB) return this.sortAsc ? -1 : 1;
        if (valA > valB) return this.sortAsc ? 1 : -1;
        return 0;
      });
    },
    paginatedRows() {
      if (!this.paginationEnabled) return this.sortedRows;
      const startIndex = (this.page - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.sortedRows.slice(startIndex, endIndex);
    },
    totalPages() {
      if (!this.paginationEnabled) return 1;
      return Math.ceil(this.sortedRows.length / this.itemsPerPage);
    }
  },
  methods: {
    sortBy(key) {
      // if not sortable, do nothing
      const col = this.columns.find(c => c.key === key);
      if (!col || !col.sortable) return;

      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }
    },
    resetPage() {
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
.eportfolio-table-wrapper {
  color: #000; /* black text */
  width: 100%;
}

.table-filter {
  margin-bottom: 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.eportfolio-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 0.5rem;
}

.eportfolio-table thead {
  background-color: #f5f5f5;
}

.eportfolio-table th,
.eportfolio-table td {
  border: 1px solid #ddd;
  padding: 0.6rem;
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.sort-indicator {
  margin-left: 0.3rem;
  color: #888;
}

.table-pagination {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.table-pagination button {
  background-color: #ddd;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
}
</style>

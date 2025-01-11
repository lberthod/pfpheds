<!-- roles/admin/AdminPathwayOverview.vue -->
<template>
  <div class="admin-pathway-overview">
    <h2>All Pathways Overview</h2>
    <p>Manage or supervise existing training pathways across the institution.</p>

    <section class="pathway-table">
      <h3>List of Pathways</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Participants</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(path, idx) in pathways" :key="idx">
            <td>{{ path.name }}</td>
            <td>{{ path.participants }} students</td>
            <td>{{ path.status }}</td>
            <td>
              <button @click="editPathway(path)">Edit</button>
              <button @click="archivePathway(path)">Archive</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AdminPathwayOverview',
  data() {
    return {
      pathways: [
        {
          name: 'Basic Nursing Skills',
          participants: 32,
          status: 'Active'
        },
        {
          name: 'Advanced Clinical Practice',
          participants: 14,
          status: 'Active'
        },
        {
          name: 'Pediatrics Focus',
          participants: 25,
          status: 'Archived'
        }
      ]
    };
  },
  methods: {
    editPathway(path) {
      alert(`Editing pathway: ${path.name}`);
      // e.g. navigate to a PathwayCreationForm with existing data
    },
    archivePathway(path) {
      alert(`Archiving pathway: ${path.name}`);
      // e.g. set path.status = 'Archived' in store/API
    }
  }
};
</script>

<style scoped>
.admin-pathway-overview {
  padding: 1rem;
  color: #000; /* black text */
}

.pathway-table {
  margin-top: 1rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}

.pathway-table table {
  width: 100%;
  border-collapse: collapse;
}

.pathway-table th,
.pathway-table td {
  border: 1px solid #ddd;
  padding: 0.6rem;
  text-align: left;
}

button {
  background-color: #2980b9;
  color: #fff;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  cursor: pointer;
}

button:hover {
  background-color: #1f6391;
}
</style>

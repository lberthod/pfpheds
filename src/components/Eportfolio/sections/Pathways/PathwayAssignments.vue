<!-- sections/Pathways/PathwayAssignments.vue -->
<template>
  <div class="pathway-assignments">
    <h2>Assignments for {{ pathwayName }}</h2>

    <div class="assignments-list">
      <div
        v-for="(assign, idx) in assignments"
        :key="idx"
        class="assignment-item"
      >
        <h3>{{ assign.title }}</h3>
        <p>Due: {{ assign.dueDate }}</p>
        <p>{{ assign.instructions }}</p>

        <button @click="markComplete(idx)" :disabled="assign.completed">
          {{ assign.completed ? 'Completed' : 'Mark as Complete' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PathwayAssignments',
  props: {
    pathwayName: {
      type: String,
      default: 'Untitled Pathway'
    }
  },
  data() {
    return {
      // Example placeholder array
      assignments: [
        {
          title: 'Case Study',
          dueDate: '2023-10-01',
          instructions: 'Analyze a real-life nursing case scenario...',
          completed: false
        },
        {
          title: 'Peer Review',
          dueDate: '2023-10-05',
          instructions: 'Review a colleague’s practical performance...',
          completed: false
        }
      ]
    };
  },
  methods: {
    markComplete(index) {
      this.assignments[index].completed = true;
      alert(`Assignment "${this.assignments[index].title}" marked as complete!`);
      // Real logic might save to a store or call an API
    }
  }
};
</script>

<style scoped>
.pathway-assignments {
  padding: 1rem;
  color: #000; /* black text */
}

.assignments-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.assignment-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.8rem;
}

.assignment-item h3 {
  margin: 0 0 0.3rem;
}

.assignment-item button {
  background-color: #2980b9;
  color: #fff;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.assignment-item button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}
</style>

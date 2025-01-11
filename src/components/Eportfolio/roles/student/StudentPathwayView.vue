<!-- roles/student/StudentPathwayView.vue -->
<template>
  <div class="student-pathway-view">
    <h2>My Training Pathway</h2>
    <p>Track assigned pathway tasks or projects. Submit deliverables to meet deadlines.</p>

    <!-- Example usage of PathwayAssignments or AssignmentSubmission from sections/Pathways -->
    <!--
    <PathwayAssignments :assignments="assignedTasks" />
    <AssignmentSubmission :assignments="assignedTasks" />
    -->

    <div class="pathway-assignments" v-if="assignedTasks.length > 0">
      <h3>Assigned Tasks</h3>
      <ul>
        <li v-for="(task, idx) in assignedTasks" :key="idx">
          {{ task.title }} - Due: {{ task.dueDate }}
        </li>
      </ul>
    </div>
    <p v-else>No assigned tasks yet.</p>

    <div class="submission-block" v-if="showSubmissionForm">
      <h3>Submit Your Work</h3>
      <label>Task Title</label>
      <select v-model="selectedTask">
        <option disabled value="">--Select Task--</option>
        <option v-for="(task, idx) in assignedTasks" :key="idx" :value="task.title">
          {{ task.title }}
        </option>
      </select>

      <label>Upload File</label>
      <input type="file" @change="onFileChange" />

      <button @click="submitAssignment">Submit</button>
    </div>
  </div>
</template>

<script>import { ref } from 'vue';

export default {
  name: 'StudentPathwayView',
  setup() {
    const assignedTasks = [
      { title: 'Clinical Case Study', dueDate: '2023-10-01' },
      { title: 'Research Report', dueDate: '2023-10-15' },
    ];

    const showSubmissionForm = ref(true);
    const selectedTask = ref('');
    const file = ref(null);

    const onFileChange = (event) => {
      file.value = event.target.files[0];
    };

    const submitAssignment = () => {
      if (!selectedTask.value || !file.value) {
        alert('Please select a task and a file to upload.');
        return;
      }
      alert(`Submitting ${file.value.name} for ${selectedTask.value}`);
      // Real submission logic goes here
    };

    return {
      assignedTasks,
      showSubmissionForm,
      selectedTask,
      file,
      onFileChange,
      submitAssignment,
    };
  },
};
</script>

<style scoped>
.student-pathway-view {
  padding: 1rem;
  color: #000; /* Force text to black */
}

.pathway-assignments {
  margin-top: 1rem;
}

.submission-block {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 6px;
}

.submission-block label {
  display: block;
  margin: 0.5rem 0 0.25rem;
}
</style>

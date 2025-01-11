<!-- sections/Pathways/AssignmentSubmission.vue -->
<template>
  <div class="assignment-submission">
    <h2>Submit Your Work</h2>
    <p>Select an assignment, attach your file, and add optional notes.</p>

    <div class="submission-form">
      <label for="assignment-select">Assignment:</label>
      <select id="assignment-select" v-model="selectedAssignment">
        <option disabled value="">--Choose--</option>
        <option
          v-for="(assign, idx) in assignments"
          :key="idx"
          :value="assign.title"
        >
          {{ assign.title }}
        </option>
      </select>

      <label for="file-upload">Upload File:</label>
      <input type="file" id="file-upload" @change="onFileChange" />

      <label for="notes">Notes:</label>
      <textarea id="notes" v-model="notes"></textarea>

      <button @click="submitWork" :disabled="!selectedAssignment || !file">
        Submit
      </button>
    </div>

    <!-- Basic display of submissions (optional) -->
    <div class="submission-history" v-if="submissions.length > 0">
      <h3>Submission History</h3>
      <ul>
        <li v-for="(sub, idx) in submissions" :key="idx">
          <strong>{{ sub.assignment }}</strong> - {{ sub.fileName }} 
          <br />
          <small>{{ sub.notes }}</small>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssignmentSubmission',
  data() {
    return {
      assignments: [
        { title: 'Case Study' },
        { title: 'Peer Review' }
      ],
      selectedAssignment: '',
      file: null,
      notes: '',
      submissions: []
    };
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0];
    },
    submitWork() {
      if (!this.selectedAssignment || !this.file) return;

      const newSubmission = {
        assignment: this.selectedAssignment,
        fileName: this.file.name,
        notes: this.notes
      };
      this.submissions.push(newSubmission);

      alert(`Submitted file: ${this.file.name} for ${this.selectedAssignment}`);

      // Reset fields
      this.selectedAssignment = '';
      this.file = null;
      this.notes = '';
      // e.g. call an API or emit event to parent
    }
  }
};
</script>

<style scoped>
.assignment-submission {
  padding: 1rem;
  color: #000; /* black text */
}

.submission-form {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-top: 0.5rem;
  font-weight: bold;
}

select,
input[type="file"],
textarea {
  width: 100%;
  margin-top: 0.3rem;
  margin-bottom: 0.8rem;
  padding: 0.5rem;
  border-radius: 4px;
}

button {
  background-color: #2c3e50;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.submission-history {
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 1rem;
}

.submission-history h3 {
  margin-top: 0;
}

.submission-history ul {
  list-style-type: none;
  padding-left: 0;
}
</style>

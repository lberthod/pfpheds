<!-- roles/practitioner/PractitionerFeedback.vue -->
<template>
  <div class="practitioner-feedback">
    <h2>Clinical Feedback</h2>
    <p>Provide direct comments or evaluations on a trainee's clinical performance.</p>

    <div class="feedback-form">
      <label for="trainee-select">Select Trainee:</label>
      <select id="trainee-select" v-model="selectedTrainee">
        <option disabled value="">--Select Trainee--</option>
        <option v-for="(t, index) in trainees" :key="index" :value="t">
          {{ t }}
        </option>
      </select>

      <label for="feedback-notes">Feedback Notes:</label>
      <textarea
        id="feedback-notes"
        v-model="feedbackNotes"
        placeholder="Write your clinical observations, suggestions..."
        :disabled="!selectedTrainee"
      ></textarea>

      <button @click="submitFeedback" :disabled="!feedbackNotes">
        Send Feedback
      </button>
    </div>

    <div class="feedback-history" v-if="feedbackHistory.length > 0">
      <h3>Feedback History</h3>
      <ul>
        <li v-for="(fh, index) in feedbackHistory" :key="index">
          <strong>Trainee:</strong> {{ fh.trainee }}<br />
          <small>{{ fh.notes }}</small>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PractitionerFeedback',
  data() {
    return {
      trainees: ['Alice Dupont', 'Bob Martin', 'Charlie Durand'],
      selectedTrainee: '',
      feedbackNotes: '',
      feedbackHistory: [],
    };
  },
  methods: {
    submitFeedback() {
      if (!this.selectedTrainee || !this.feedbackNotes.trim()) return;

      const record = {
        trainee: this.selectedTrainee,
        notes: this.feedbackNotes.trim(),
      };
      this.feedbackHistory.push(record);

      // Reset
      this.feedbackNotes = '';
      alert(`Feedback submitted for ${this.selectedTrainee}.`);
    },
  },
};
</script>

<style scoped>
.practitioner-feedback {
  padding: 1rem;
  color: #000; /* Force text to black */
}

.feedback-form {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.feedback-form label {
  display: block;
  margin: 0.5rem 0 0.25rem;
}

.feedback-form select,
.feedback-form textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.feedback-form button {
  padding: 0.5rem 1rem;
  background-color: #2980b9;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.feedback-form button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.feedback-history h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.feedback-history ul {
  list-style-type: none;
  padding: 0;
}

.feedback-history li {
  background-color: #fafafa;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>

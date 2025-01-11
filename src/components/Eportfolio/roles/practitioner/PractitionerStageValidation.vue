<!-- roles/practitioner/PractitionerStageValidation.vue -->
<template>
  <div class="practitioner-stage-validation">
    <h2>Stage Validation</h2>
    <p>Validate clinical competencies and procedures for each trainee in real-world settings.</p>

    <div class="validation-form">
      <label for="trainee-select">Select Trainee:</label>
      <select id="trainee-select" v-model="selectedTrainee">
        <option disabled value="">--Select--</option>
        <option v-for="(t, index) in trainees" :key="index" :value="t">{{ t }}</option>
      </select>

      <label for="competency-select">Select Competency:</label>
      <select id="competency-select" v-model="selectedCompetency" :disabled="!selectedTrainee">
        <option disabled value="">--Select Competency--</option>
        <option v-for="(c, index) in competencies" :key="index" :value="c">{{ c }}</option>
      </select>

      <label for="validation-notes">Validation Notes:</label>
      <textarea
        id="validation-notes"
        v-model="validationNotes"
        placeholder="Describe how the trainee performed, any observations..."
        :disabled="!selectedCompetency"
      ></textarea>

      <button @click="submitValidation" :disabled="!validationNotes">
        Validate Competency
      </button>
    </div>

    <div class="validation-results" v-if="validations.length > 0">
      <h3>Previous Validations</h3>
      <ul>
        <li v-for="(v, index) in validations" :key="index">
          Trainee: <strong>{{ v.trainee }}</strong> - 
          Competency: <em>{{ v.competency }}</em>  
          <br />
          <small>{{ v.notes }}</small>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PractitionerStageValidation',
  data() {
    return {
      trainees: ['Alice Dupont', 'Bob Martin', 'Charlie Durand'],
      competencies: [
        'Vital Signs Measurement',
        'Medication Administration',
        'Aseptic Technique',
      ],
      selectedTrainee: '',
      selectedCompetency: '',
      validationNotes: '',
      validations: [],
    };
  },
  methods: {
    submitValidation() {
      if (!this.selectedTrainee || !this.selectedCompetency || !this.validationNotes.trim()) return;

      const newValidation = {
        trainee: this.selectedTrainee,
        competency: this.selectedCompetency,
        notes: this.validationNotes.trim(),
      };
      this.validations.push(newValidation);

      // Reset fields
      this.selectedCompetency = '';
      this.validationNotes = '';
      alert(`Validation recorded for ${this.selectedTrainee}: ${newValidation.competency}`);
    },
  },
};
</script>

<style scoped>
.practitioner-stage-validation {
  padding: 1rem;
  color: #000; /* Force text to black */
}

.validation-form {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.validation-form label {
  display: block;
  margin: 0.5rem 0 0.25rem;
}

.validation-form select,
.validation-form textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.validation-form button {
  padding: 0.5rem 1rem;
  background-color: #2980b9;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.validation-form button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.validation-results h3 {
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}

.validation-results ul {
  list-style-type: none;
  padding: 0;
}

.validation-results li {
  background-color: #fafafa;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>

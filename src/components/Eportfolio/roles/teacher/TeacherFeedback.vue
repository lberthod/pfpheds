<!-- roles/teacher/TeacherFeedback.vue -->
<template>
  <div class="teacher-feedback">
    <h2>Provide Feedback to Students</h2>
    <p>Select a student and a competency to provide detailed feedback.</p>

    <div class="feedback-form">
      <label for="student-select">Select Student:</label>
      <select id="student-select" v-model="selectedStudent">
        <option disabled value="">--Select Student--</option>
        <option v-for="(student, index) in students" :key="index" :value="student.id">
          {{ student.name }}
        </option>
      </select>

      <label for="competency-select">Select Competency:</label>
      <select id="competency-select" v-model="selectedCompetency" :disabled="!selectedStudent">
        <option disabled value="">--Select Competency--</option>
        <option v-for="(comp, index) in getCompetencies(selectedStudent)" :key="index" :value="comp">
          {{ comp }}
        </option>
      </select>

      <label for="feedback-text">Feedback:</label>
      <textarea id="feedback-text" v-model="feedbackText" placeholder="Enter your feedback here..."
        :disabled="!selectedCompetency"></textarea>

      <button @click="submitFeedback" :disabled="!feedbackText">Submit Feedback</button>
    </div>

    <div class="submitted-feedback" v-if="feedbackList.length > 0">
      <h3>Submitted Feedback</h3>
      <ul>
        <li v-for="(feedback, index) in feedbackList" :key="index">
          <strong>{{ feedback.studentName }}</strong> - <em>{{ feedback.competency }}</em>: {{ feedback.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>import { ref } from 'vue'
export default {
  name: 'TeacherFeedback',
  setup() {
    const students = ref([
      { id: 1, name: 'Alice Dupont' },
      { id: 2, name: 'Bob Martin' },
      { id: 3, name: 'Charlie Durand' },
      // Ajoutez d'autres étudiants ici
    ]);

    const selectedStudent = ref('');
    const selectedCompetency = ref('');
    const feedbackText = ref('');
    const feedbackList = ref([]);

    const getCompetencies = (studentId) => {
      // Exemple statique de compétences, à remplacer par des données réelles
      const competencies = {
        1: ['Vital Signs Measurement', 'Patient Communication'],
        2: ['Medication Administration', 'Clinical Documentation'],
        3: ['Wound Care', 'Patient Education'],
      };
      return competencies[studentId] || [];
    };

    const submitFeedback = () => {
      if (!selectedStudent.value || !selectedCompetency.value || !feedbackText.value.trim()) return;

      const student = students.value.find(s => s.id === selectedStudent.value);
      const newFeedback = {
        studentName: student ? student.name : 'Unknown',
        competency: selectedCompetency.value,
        text: feedbackText.value.trim(),
      };
      feedbackList.value.push(newFeedback);

      // Réinitialiser les champs
      selectedCompetency.value = '';
      feedbackText.value = '';

      alert('Feedback submitted successfully.');
    };

    return {
      students,
      selectedStudent,
      selectedCompetency,
      feedbackText,
      feedbackList,
      getCompetencies,
      submitFeedback,
    };
  },
};
</script>

<style scoped>
.teacher-feedback {
  padding: 1rem;
  color: #000;
  /* Texte en noir */
}

.feedback-form {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.feedback-form label {
  display: block;
  margin: 0.5rem 0 0.25rem;
}

.feedback-form select,
.feedback-form textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
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

.submitted-feedback ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.submitted-feedback li {
  margin-bottom: 0.5rem;
}
</style>

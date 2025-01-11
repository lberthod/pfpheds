<!-- roles/teacher/TeacherPortfolioReview.vue -->
<template>
  <div class="teacher-portfolio-review">
    <h2>Review Student Portfolios</h2>
    <p>Select a student to review their portfolio, add comments, and validate competencies.</p>

    <div class="student-selection">
      <label for="student-select">Choose a student:</label>
      <select id="student-select" v-model="selectedStudent">
        <option disabled value="">--Select Student--</option>
        <option v-for="(student, index) in students" :key="index" :value="student.id">
          {{ student.name }}
        </option>
      </select>
    </div>

    <div v-if="selectedStudent" class="portfolio-details">
      <h3>{{ getStudentName(selectedStudent) }}'s Portfolio</h3>
      <!-- Placeholder for portfolio content -->
      <p>Projects, Competencies, Reflections...</p>

      <div class="actions">
        <button @click="addComment">Add Comment</button>
        <button @click="validatePortfolio">Validate Portfolio</button>
      </div>
    </div>
    <p v-else>Select a student to view their portfolio.</p>
  </div>
</template>

<script>import { ref } from 'vue';

export default {
  name: 'TeacherPortfolioReview',
  setup() {
    const selectedStudent = ref('');
    const students = [
      { id: 1, name: 'Alice Dupont' },
      { id: 2, name: 'Bob Martin' },
      { id: 3, name: 'Charlie Durand' },
      // Ajoutez d'autres étudiants ici
    ];

    const getStudentName = (id) => {
      const student = students.find((s) => s.id === id);
      return student ? student.name : 'Unknown';
    };

    const addComment = () => {
      alert(`Adding comment to ${getStudentName(selectedStudent.value)}'s portfolio.`);
      // Implémentez la logique d'ajout de commentaire ici
    };

    const validatePortfolio = () => {
      alert(`Validating ${getStudentName(selectedStudent.value)}'s portfolio.`);
      // Implémentez la logique de validation ici
    };

    return {
      selectedStudent,
      students,
      getStudentName,
      addComment,
      validatePortfolio,
    };
  },
};
</script>

<style scoped>
.teacher-portfolio-review {
  padding: 1rem;
  color: #000;
  /* Texte en noir */
}

.student-selection {
  margin-bottom: 1rem;
}

.student-selection select {
  padding: 0.5rem;
  margin-left: 0.5rem;
}

.portfolio-details {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
}

.actions {
  margin-top: 1rem;
}

.actions button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #2980b9;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.actions button:hover {
  background-color: #1f6391;
}
</style>

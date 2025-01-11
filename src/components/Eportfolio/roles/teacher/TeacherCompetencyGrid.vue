<!-- roles/teacher/TeacherCompetencyGrid.vue -->
<template>
  <div class="teacher-competency-grid">
    <h2>Competency Grid</h2>
    <p>Validate and evaluate the competencies of your students.</p>

    <table class="competency-table">
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Competency</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in competencyData" :key="index">
          <td>{{ item.studentName }}</td>
          <td>{{ item.competency }}</td>
          <td>{{ item.status }}</td>
          <td>
            <button @click="validateCompetency(index)">Validate</button>
            <button @click="provideFeedback(index)">Feedback</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>import { ref } from 'vue'

export default {
  name: 'TeacherCompetencyGrid',
  setup() {
    const competencyData = ref([
      { studentName: 'Alice Dupont', competency: 'Vital Signs Measurement', status: 'Pending' },
      { studentName: 'Bob Martin', competency: 'Patient Communication', status: 'Validated' },
      { studentName: 'Charlie Durand', competency: 'Medication Administration', status: 'Pending' },
      // Ajoutez d'autres données ici
    ]);

    const validateCompetency = (index) => {
      competencyData.value[index].status = 'Validated';
      alert(`Competency "${competencyData.value[index].competency}" for ${competencyData.value[index].studentName} has been validated.`);
      // Implémentez la logique de validation ici (ex. mise à jour du backend)
    };

    const provideFeedback = (index) => {
      alert(`Providing feedback for ${competencyData.value[index].studentName}'s competency "${competencyData.value[index].competency}".`);
      // Implémentez la logique de feedback ici (ex. ouvrir une modale de feedback)
    };

    return {
      competencyData,
      validateCompetency,
      provideFeedback,
    };
  },
};
</script>

<style scoped>
.teacher-competency-grid {
  padding: 1rem;
  color: #000; /* Texte en noir */
}

.competency-table {
  width: 100%;
  border-collapse: collapse;
}

.competency-table th,
.competency-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

.competency-table th {
  background-color: #f2f2f2;
}

.competency-table button {
  margin-right: 0.5rem;
  padding: 0.3rem 0.6rem;
  background-color: #27ae60;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.competency-table button:hover {
  background-color: #1e8449;
}
</style>

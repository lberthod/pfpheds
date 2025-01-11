<!-- sections/Pathways/PathwayCreationForm.vue -->
<template>
  <div class="pathway-creation-form">
    <h2>{{ editingMode ? 'Edit Pathway' : 'Create New Pathway' }}</h2>

    <form @submit.prevent="savePathway">
      <label for="name">Name:</label>
      <input id="name" v-model="formData.name" required />

      <label for="description">Description:</label>
      <textarea id="description" v-model="formData.description"></textarea>

      <label for="objectives">Objectives (comma-separated):</label>
      <input
        id="objectives"
        v-model="objectivesString"
        placeholder="Objective1, Objective2"
      />

      <button type="submit">
        {{ editingMode ? 'Update' : 'Create' }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PathwayCreationForm',
  props: {
    editingMode: {
      type: Boolean,
      default: false
    },
    existingData: {
      type: Object,
      default: null
      /*
        Example of existingData:
        {
          name: "Basic Nursing Skills",
          description: "...",
          objectives: ["Vital signs measurement", "Medication administration"]
        }
      */
    }
  },
  data() {
    return {
      formData: {
        name: '',
        description: ''
      },
      objectivesString: ''
    };
  },
  mounted() {
    if (this.editingMode && this.existingData) {
      this.formData.name = this.existingData.name;
      this.formData.description = this.existingData.description;
      if (this.existingData.objectives) {
        this.objectivesString = this.existingData.objectives.join(', ');
      }
    }
  },
  methods: {
    savePathway() {
      // Convert comma-separated objectives into array
      const objectivesArray = this.objectivesString
        .split(',')
        .map(obj => obj.trim())
        .filter(obj => obj !== '');

      // Construct final object
      const newPathway = {
        name: this.formData.name,
        description: this.formData.description,
        objectives: objectivesArray
      };

      if (this.editingMode) {
        alert(`Pathway updated: ${newPathway.name}`);
      } else {
        alert(`New pathway created: ${newPathway.name}`);
      }

      // In a real app, you might:
      // this.$emit('onSave', newPathway);
      // or call an API/store action.
    }
  }
};
</script>

<style scoped>
.pathway-creation-form {
  padding: 1rem;
  color: #000; /* black text */
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

label {
  font-weight: bold;
}

input,
textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #2c3e50;
  color: #fff;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>

<!-- roles/student/StudentEvidenceUploader.vue -->
<template>
  <div class="student-evidence-uploader">
    <h2>Upload Evidence</h2>
    <p>Attach documents, images, or media as proof of your achievements.</p>

    <div class="upload-block">
      <label>Select File</label>
      <input type="file" @change="onFileChange" />

      <label>Description</label>
      <textarea v-model="description" placeholder="Optional: describe your file"></textarea>

      <button @click="uploadEvidence">Upload</button>
    </div>

    <div class="uploaded-files" v-if="uploadedItems.length > 0">
      <h3>Previously Uploaded Items</h3>
      <ul>
        <li v-for="(item, idx) in uploadedItems" :key="idx">
          {{ item.fileName }} - {{ item.description || 'No description' }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>import { ref } from 'vue';

export default {
  name: 'StudentEvidenceUploader',
  setup() {
    const file = ref(null);
    const description = ref('');
    const uploadedItems = ref([]);

    const onFileChange = (event) => {
      file.value = event.target.files[0];
    };

    const uploadEvidence = () => {
      if (!file.value) {
        alert('Please select a file first.');
        return;
      }
      const newItem = {
        fileName: file.value.name,
        description: description.value,
      };
      uploadedItems.value.push(newItem);

      // Reset
      file.value = null;
      description.value = '';
      alert(`File "${newItem.fileName}" uploaded!`);
    };

    return {
      file,
      description,
      uploadedItems,
      onFileChange,
      uploadEvidence,
    };
  },
};
</script>

<style scoped>
.student-evidence-uploader {
  padding: 1rem;
  color: #000; /* Force text to black */
}

.upload-block {
  margin-bottom: 2rem;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 6px;
}

.upload-block label {
  display: block;
  margin: 0.5rem 0 0.25rem;
}

.uploaded-files ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}
</style>

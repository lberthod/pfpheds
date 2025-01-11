<!-- roles/teacher/TeacherPathwayManager.vue -->
<template>
  <div class="teacher-pathway-manager">
    <h2>Pathway Manager</h2>
    <!-- 1) Show list of all pathways -->
    <PathwayList />

    <button @click="toggleCreation">
      {{ showCreation ? 'Hide Creation Form' : 'New Pathway' }}
    </button>

    <PathwayCreationForm
      v-if="showCreation"
      @onSave="handleNewPathway"
    />

    <!-- For demonstration: a detail section that might show after selecting a path from the list -->
    <!-- Or you could navigate to a separate route for detail. -->
    <PathwayDetail v-if="showDetail" />

    <PathwayAssignments pathwayName="Basic Nursing Skills" />
  </div>
</template>

<script>
import PathwayList from '@/components/Eportfolio/sections/Pathways/PathwayList.vue';
import PathwayCreationForm from '@/components/Eportfolio/sections/Pathways/PathwayCreationForm.vue';
import PathwayDetail from '@/components/Eportfolio/sections/Pathways/PathwayDetail.vue';
import PathwayAssignments from '@/components/Eportfolio/sections/Pathways/PathwayAssignments.vue';

export default {
  name: 'TeacherPathwayManager',
  components: {
    PathwayList,
    PathwayCreationForm,
    PathwayDetail,
    PathwayAssignments
  },
  data() {
    return {
      showCreation: false,
      showDetail: false
    };
  },
  methods: {
    toggleCreation() {
      this.showCreation = !this.showCreation;
    },
    handleNewPathway(newPathway) {
      // Real logic would push to store or API
      alert(`Teacher created a new Pathway: ${newPathway.name}`);
      this.showCreation = false;
    }
  }
};
</script>

<style scoped>
.teacher-pathway-manager {
  padding: 1rem;
  color: #000; /* black text */
}

button {
  background-color: #2980b9;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
}
</style>

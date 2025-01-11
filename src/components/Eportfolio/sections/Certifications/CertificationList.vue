<!-- sections/Certifications/CertificationList.vue -->
<template>
  <div class="certification-list">
    <h2>My Certifications</h2>
    <div class="certifications-grid">
      <CertificationCard
        v-for="(cert, idx) in certifications"
        :key="idx"
        :title="cert.title"
        :issuer="cert.issuer"
        :date="cert.date"
        :level="cert.level"
        :description="cert.description"
      />
    </div>
  </div>
</template>

<script>
import CertificationCard from './CertificationCard.vue';

export default {
  name: 'CertificationList',
  components: { CertificationCard },
  props: {
    certifications: {
      type: Array,
      default: () => []
      /*
        Example array of objects:
        [
          {
            title: "Basic First Aid",
            issuer: "Red Cross",
            date: "2023-02-10",
            level: "Silver",
            description: "Basic training in first aid and CPR."
          },
          ...
        ]
      */
    }
  }
};
</script>

<style scoped>
.certification-list {
  color: #000; /* Force text to black */
}

.certification-list h2 {
  margin-bottom: 0.5rem;
}

.certifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
</style>

<!-- sections/Certifications/CertificationCard.vue -->
<template>
  <div class="certification-card">
    <div class="badge-area">
      <!-- Example: Star or badge icon to give a "gamified" feeling -->
      <img
        src="https://cdn.pixabay.com/photo/2012/04/02/16/07/star-24805_1280.png"
        alt="Badge Icon"
        class="badge-icon"
      />
    </div>

    <div class="info-area">
      <h3 class="cert-title">{{ title }}</h3>
      <p class="cert-issuer">Issuer: {{ issuer }}</p>
      <p class="cert-date">Date Obtained: {{ date }}</p>

      <div class="level-area" v-if="level">
        <span class="level-label">Level: </span>
        <span class="level-value">{{ level }}</span>
      </div>

      <p class="cert-description" v-if="description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CertificationCard',
  props: {
    title: {
      type: String,
      required: true
    },
    issuer: {
      type: String,
      default: 'Unknown Issuer'
    },
    date: {
      type: String,
      default: 'N/A'
    },
    level: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.certification-card {
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 0.8rem;
  margin-bottom: 1rem;
  color: #000; /* Force text to black */
  position: relative;
  overflow: hidden;
}

/* Just a subtle background gradient for a "gamification" vibe */
.certification-card::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(135deg, #f0f4c3 0%, #ffd54f 100%);
  opacity: 0.4;
  pointer-events: none;
}

.badge-area {
  margin-right: 1rem;
}

.badge-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.info-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.cert-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
}

.cert-issuer,
.cert-date {
  font-size: 0.9rem;
  color: #555;
}

.level-area {
  margin-top: 0.3rem;
  background-color: #ffeb3b;
  border-radius: 4px;
  padding: 0.2rem 0.4rem;
  width: fit-content;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.level-label {
  font-weight: bold;
}

.level-value {
  color: #000;
}

.cert-description {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
}
</style>

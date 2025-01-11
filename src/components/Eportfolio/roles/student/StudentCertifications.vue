<!-- roles/student/StudentCertifications.vue -->
<template>
    <div class="student-certifications">
      <h2>My Certifications (Gamified)</h2>
      <p>Show off your achievements and progress levels!</p>
  
      <!-- Pass an array of certification objects to CertificationList -->
      <CertificationList :certifications="myCerts" />
    </div>
  </template>
  
  <script>
  import CertificationList from '@/components/Eportfolio/sections/Certifications/CertificationList.vue';
  
  export default {
    name: 'StudentCertifications',
    components: {
      CertificationList
    },
    data() {
      return {
        myCerts: [
          {
            title: 'Basic First Aid',
            issuer: 'Red Cross',
            date: '2023-02-10',
            level: 'Bronze',
            description: 'Initial training in first aid and CPR.'
          },
          {
            title: 'Advanced Life Support',
            issuer: 'Nursing Association',
            date: '2023-05-22',
            level: 'Gold',
            description: 'Advanced resuscitation techniques for critical care.'
          },
          {
            title: 'Pediatric Care Certification',
            issuer: 'Child Health Board',
            date: '2023-08-01',
            level: 'Silver',
            description: 'Specialized training in pediatric nursing.'
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .student-certifications {
    padding: 1rem;
    color: #000; /* Force text to black */
  }
  
  .student-certifications h2 {
    margin: 0 0 0.5rem;
  }
  </style>
  
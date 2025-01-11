<!-- sections/Pathways/PathwayDetail.vue -->
<template>
  <div class="pathway-detail">
    <h2>{{ pathway.name }}</h2>
    <p>{{ pathway.description }}</p>

    <section class="objectives">
      <h3>Objectives</h3>
      <ul>
        <li v-for="(obj, index) in pathway.objectives" :key="index">
          {{ obj }}
        </li>
      </ul>
    </section>

    <section class="milestones">
      <h3>Milestones</h3>
      <ul>
        <li v-for="(mile, index) in pathway.milestones" :key="index">
          <strong>{{ mile.title }}</strong> - due: {{ mile.dueDate }}
        </li>
      </ul>
    </section>

    <section class="deadlines">
      <h3>Key Deadlines</h3>
      <ul>
        <li v-for="(deadline, index) in pathway.deadlines" :key="index">
          {{ deadline.description }}: {{ deadline.date }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PathwayDetail',
  data() {
    return {
      // Example placeholder for a single pathway's data
      pathway: {
        name: 'Basic Nursing Skills',
        description: 'Foundational skills every nurse must master.',
        objectives: [
          'Master vital signs measurement',
          'Demonstrate safe medication administration'
        ],
        milestones: [
          { title: 'Initial Skills Demo', dueDate: '2023-09-01' },
          { title: 'Peer Review & Feedback', dueDate: '2023-09-15' }
        ],
        deadlines: [
          { description: 'Final Assessment', date: '2023-10-01' }
        ]
      }
    };
  },
  // You might also accept a prop or use route params to fetch the correct pathway data
};
</script>

<style scoped>
.pathway-detail {
  padding: 1rem;
  color: #000; /* black text */
}

h2 {
  margin-bottom: 0.5rem;
}

.objectives,
.milestones,
.deadlines {
  margin-top: 1.5rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.8rem;
}

ul {
  list-style: disc;
  margin-left: 1.5rem;
  padding-left: 0;
}
</style>

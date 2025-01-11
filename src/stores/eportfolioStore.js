// store/eportfolioStore.js
import { defineStore } from 'pinia';

export const useEportfolioStore = defineStore('eportfolioStore', {
  state: () => ({
    // Example data
    projects: [],
    competencies: [],
    reflections: [],
  }),
  actions: {
    addProject(project) {
      this.projects.push(project);
    },
    addReflection(text) {
      this.reflections.push(text);
    },
    // etc.
  },
});

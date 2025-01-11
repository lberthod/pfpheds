// store/pathwayStore.js
import { defineStore } from 'pinia';

export const usePathwayStore = defineStore('pathwayStore', {
  state: () => ({
    pathways: [],
  }),
  actions: {
    createPathway(pathway) {
      this.pathways.push(pathway);
    },
    // etc.
  },
});

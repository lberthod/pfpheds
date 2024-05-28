<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue'

const { layoutConfig } = useLayout();
layoutConfig.menuMode.value = 'slim';

const darkMode = computed(() => {
  return layoutConfig.colorScheme.value !== 'light';
});

</script>

<template>
  <div id="app">

    <router-view/>

  </div>
</template>



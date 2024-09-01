<script setup>
import { ref, watch, computed } from 'vue';
import { usePrimeVue } from 'primevue/config';
import { useLayout } from '@/layout/composables/layout';

defineProps({
  simple: {
    type: Boolean,
    default: false
  }
});

const $primevue = usePrimeVue();


const { layoutConfig, layoutState, onConfigSidebarToggle } = useLayout();
const colorScheme = ref(layoutConfig.colorScheme.value);
const componentThemes = ref([
  { name: 'indigo', color: '#6366F1' },
  { name: 'blue', color: '#3B82F6' },
  { name: 'purple', color: '#8B5CF6' },
  { name: 'teal', color: '#14B8A6' },
  { name: 'cyan', color: '#06b6d4' },
  { name: 'green', color: '#10b981' },
  { name: 'orange', color: '#F3C300' },
  { name: 'pink', color: '#d946ef' }
]);

watch(layoutConfig.menuMode, (newVal) => {
  if (newVal === 'static') {
    layoutState.staticMenuDesktopInactive.value = false;
  }
});

const onConfigButtonClick = () => {
  onConfigSidebarToggle();
};
const changeColorScheme = (colorScheme) => {
  const themeLink = document.getElementById('theme-link');
  const themeLinkHref = themeLink.getAttribute('href');
  const currentColorScheme = 'theme-' + layoutConfig.colorScheme.value.toString();
  const newColorScheme = 'theme-' + colorScheme;
  const newHref = themeLinkHref.replace(currentColorScheme, newColorScheme);

  replaceLink(themeLink, newHref, () => {
    layoutConfig.colorScheme.value = colorScheme;
  });
};
const changeTheme = (theme) => {
  const themeLink = document.getElementById('theme-link');
  const themeHref = themeLink.getAttribute('href');
  const newHref = themeHref.replace(layoutConfig.theme.value, theme);

  replaceLink(themeLink, newHref, () => {
    layoutConfig.theme.value = theme;
  });
};
const replaceLink = (linkElement, href, onComplete) => {
  if (!linkElement || !href) {
    return;
  }

  const id = linkElement.getAttribute('id');
  const cloneLinkElement = linkElement.cloneNode(true);

  cloneLinkElement.setAttribute('href', href);
  cloneLinkElement.setAttribute('id', id + '-clone');

  linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

  cloneLinkElement.addEventListener('load', () => {
    linkElement.remove();

    const element = document.getElementById(id); // re-check
    element && element.remove();

    cloneLinkElement.setAttribute('id', id);
    onComplete && onComplete();
  });
};


</script>

<template>
  <button class="layout-config-button config-link" type="button" @click="onConfigButtonClick()">
    <i class="pi pi-cog"></i>
  </button>

  <Sidebar v-model:visible="layoutState.configSidebarVisible.value" position="right" class="layout-config-sidebar w-20rem" :pt="{
        closeButton: 'ml-auto'
    }">
    <h5>Couleurs</h5>
    <div class="flex flex-wrap row-gap-3">
      <div v-for="(theme, i) in componentThemes" :key="i" class="w-3">
        <Button
          :autoFocus="layoutConfig.theme === theme.name"
          class="cursor-pointer p-link w-2rem h-2rem border-circle flex flex-shrink-0 align-items-center justify-content-center p-0"
          @click="() => changeTheme(theme.name)"
          :style="{ 'background-color': theme.color, 'border-color': theme.color }"
        >
          <i v-if="theme.name === layoutConfig.theme.value" class="pi pi-check text-white"></i>
        </Button>
      </div>
    </div>

    <h5>Thèmes</h5>
    <div class="field-radiobutton flex-1">
      <RadioButton v-model="colorScheme" name="colorScheme" value="light" @change="() => changeColorScheme('light')" inputId="outlined_input"></RadioButton>
      <label for="outlined_input">Clair</label>
    </div>


    <div class="field-radiobutton flex-1">
      <RadioButton v-model="colorScheme" name="colorScheme" value="dim" @change="() => changeColorScheme('dim')" inputId="filled_input"></RadioButton>
      <label for="filled_input">Sombre</label>
    </div>
  </Sidebar>
</template>

<style lang="scss" scoped></style>

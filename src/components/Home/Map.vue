<template>
  <Navbar />
  <FiltreMap />
  <AppDarkAndLightMode />
  <Footer />
</template>


<script>

import { defineComponent } from 'vue'
import FiltreMap from '@/components/Filters/FiltreMap.vue'
import AppDarkAndLightMode from '@/layout/AppDarkAndLightMode.vue'
import Navbar from '@/components/Utils/Navbar.vue'
import Footer from '@/components/Utils/Footer.vue'

export default defineComponent({
  components: { Navbar, AppDarkAndLightMode, Footer, FiltreMap }
})
</script>

<style scoped>
</style>

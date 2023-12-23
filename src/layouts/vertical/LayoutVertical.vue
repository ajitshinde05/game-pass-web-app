<template>
  <layout-vertical>
    <router-view />

    <template #navbar="{ toggleVerticalMenuActive }">
      <navbar />
    </template>

    <!-- <app-customizer
      v-if="showCustomizer"
      slot="customizer"
    /> -->
  </layout-vertical>
</template>

<script>
  import LayoutVertical from '@core/layouts/layout-vertical/LayoutVertical.vue';
  // import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue'
  // import { $themeConfig } from '@themeConfig'
  import Navbar from '../components/Navbar.vue';
  // import Footer from '../components/Footer.vue'

  export default {
    components: {
      // AppCustomizer,
      LayoutVertical,
      Navbar,
      // Footer,
    },
    data() {
      return {
        // showCustomizer: $themeConfig.layout.customizer,
      };
    },
  };
</script>

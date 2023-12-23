<template #navbar="{ toggleVerticalMenuActive }">
  <navbar :toggle-vertical-menu-active="toggleVerticalMenuActive" />
</template>

<!-- <app-customizer
      v-if="showCustomizer"
      slot="customizer"
    /> -->

<script>
  import LayoutHorizontal from '@core/layouts/layout-horizontal/LayoutHorizontal.vue';
  // import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue'
  // import { $themeConfig } from '@themeConfig'
  import AppNavbarHorizontalLayoutBrand from '@core/layouts/components/app-navbar/AppNavbarHorizontalLayoutBrand.vue';
  import Navbar from '../components/Navbar.vue';
  import Footer from '../components/Footer.vue';

  export default {
    components: {
      LayoutHorizontal,
      // AppCustomizer,
      Navbar,
      AppNavbarHorizontalLayoutBrand,
      Footer,
    },
    data() {
      return {
        // showCustomizer: $themeConfig.layout.customizer,
      };
    },
  };
</script>

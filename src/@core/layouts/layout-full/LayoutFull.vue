<template>
  <div :class="contentWidth === 'boxed' ? 'container p-0' : null">
    <!-- <LocaleSelect
      class="lang"
      style="
        top: 0px !important ;
        right: 0px !important;
        position: absolute !important;
      "
    ></LocaleSelect> -->

    <router-view />
  </div>
</template>

<script>
  import useAppConfig from '@core/app-config/useAppConfig';
  // import LocaleSelect from '@/layouts/components/LocaleSelect.vue';

  export default {
    components: {
      // LocaleSelect,
    },

    setup() {
      const { contentWidth } = useAppConfig();
      return { contentWidth };
    },
  };
</script>

<template>
  <b-badge
    v-if="status === 'COMPLETED'"
    class="light-success mr-2"
    variant="light-success"
  >
    {{ $t('TxCostReportPage.Statuses')[status] }}
  </b-badge>
  <b-badge
    v-else-if="status === 'PENDING'"
    class="light-warning mr-2"
    variant="light-warning"
  >
    {{ $t('TxCostReportPage.Statuses')[status] }}
  </b-badge>
  <b-badge
    v-else-if="status === 'HOLD'"
    class="light-warning mr-2"
    variant="light-warning"
  >
    {{ $t('TxCostReportPage.Statuses')[status] }}
  </b-badge>
  <b-badge
    v-else-if="status === 'FAILED'"
    class="light-warning mr-2"
    variant="light-danger"
  >
    {{ $t('TxCostReportPage.Statuses')[status] }}
  </b-badge>
</template>

<script>
  import { BBadge } from 'bootstrap-vue';

  export default {
    components: {
      BBadge,
    },
    props: {
      status: {
        type: String,
        required: false,
        default: () => {},
      },
    },
  };
</script>
<style lang="scss">
  @import '@core/scss/vue/pages/page-pricing.scss';
</style>

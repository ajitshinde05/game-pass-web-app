<template>
  <div>
    <b-card-code :title="$t('BalanceReport.Title')">
      <!-- Form -->
      <BalanceReportForm
        class="mb-3 mt-2"
        @success="onBalanceReportGenerated($event)"
      />

      <!-- Request Details -->
      <BalanceReportRequestDetails
        v-model="isRequestDetailsShown"
        :request-details="requestDetails"
      />

      <!-- Requests History -->
      <BalanceReportHistory ref="balanceHistory" />
    </b-card-code>
  </div>
</template>

<script>
  import BCardCode from '@core/components/b-card-code/BCardCode.vue';
  import BalanceReportHistory from './BalanceReportHistory.vue';
  import BalanceReportForm from './BalanceReportForm.vue';
  import BalanceReportRequestDetails from './BalanceReportRequestDetails.vue';

  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

  export default {
    components: {
      BalanceReportHistory,
      BalanceReportForm,
      BalanceReportRequestDetails,
      BCardCode,
    },

    data() {
      return {
        isRequestDetailsShown: false,
        requestDetails: null,
      };
    },

    methods: {
      onBalanceReportGenerated(details) {
        this.displayBalanceDetails(details);

        this.$refs.balanceHistory.fetchBalanceRequestsHistory(true);
      },
      displayBalanceDetails(details) {
        this.requestDetails = details;
        this.isRequestDetailsShown = true;
      },
    },
  };
</script>

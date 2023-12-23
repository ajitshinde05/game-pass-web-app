<template>
  <div>
    <b-overlay :show="isTableLoading" opacity="0.6" spinner-variant="primary">
      <h3 class="mb-2">{{ $t('BalanceReportHistory.Title') }}</h3>
      <vue-good-table
        :columns="columns"
        :compact-mode="['xs', 'sm'].includes(currentBreakPoint)"
        :rows="balanceRequestsHistory"
        :search-options="{
          enabled: false,
        }"
        :sort-options="{
          enabled: false,
          multipleColumns: true,
        }"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'status'">
            <ShowStatus :status="props.row.status"></ShowStatus>
          </span>

          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
        <template #emptystate>
          <div class="d-flex justify-content-center" style="height: 23px">
            {{ isTableLoading ? '' : $t('BalanceReportHistory.NoData') }}
          </div>
        </template>
      </vue-good-table>
    </b-overlay>

    <div class="d-flex justify-content-end mt-2">
      <b-button
        ref="button"
        :disabled="isTableLoading || isLoadMoreBtnDisabled"
        variant="primary"
        @click="fetchBalanceRequestsHistory()"
      >
        <span class="text-nowrap">
          {{ $t('BalanceReportHistory.LoadMoreBtn') }}
        </span>
      </b-button>
    </div>
  </div>
</template>
<script>
  import { VueGoodTable } from 'vue-good-table';
  import { BOverlay, BButton } from 'bootstrap-vue';
  import ShowStatus from '@/layouts/components/ShowStatus.vue';
  import moment from 'moment';
  import APIService from '@/libs/api/api';
  import { mapGetters } from 'vuex';

  const ROWS_TO_LOAD = 5;

  export default {
    components: {
      VueGoodTable,
      BButton,
      ShowStatus,
      BOverlay,
    },

    data() {
      return {
        balanceRequestsHistory: [],
        isTableLoading: false,

        isLoadMoreBtnDisabled: false,

        pagination: {
          rowsShown: 0,
          rowsToLoad: ROWS_TO_LOAD,
        },
      };
    },

    computed: {
      ...mapGetters({ currentBreakPoint: 'app/currentBreakPoint' }),
      columns() {
        return [
          {
            label: 'ID',
            field: 'id',
            tdClass: 'text-center',
            thClass: 'text-center',
          },
          {
            label: this.$t('BalanceReportHistory.Columns.Coin'),
            field: 'coinType',
            tdClass: 'text-center',
            thClass: 'text-center',
          },
          {
            label: this.$t('BalanceReportHistory.Columns.RequestTime'),
            field: 'createdTime',
            formatFn: this.normalizeDate,
            tdClass: 'text-center',
            thClass: 'text-center',
          },
          {
            label: this.$t('BalanceReportHistory.Columns.SpentRPs'),
            field: 'requestData.requestPoint',
            formatFn: (value) => `${value} RPs`,
            tdClass: 'text-center',
            thClass: 'text-center',
          },
          {
            label: this.$t('BalanceReportHistory.Columns.Status'),
            field: 'status',
            tdClass: 'text-center',
            thClass: 'text-center',
          },
        ];
      },
    },
    created() {
      this.fetchBalanceRequestsHistory();
    },
    methods: {
      normalizeDate(date) {
        return moment(`${date}Z`).format('MMM DD YYYY, HH:mm:ss');
      },
      /**
       * Fetches the balance request history and updates the component state.
       *
       * @param {boolean} fetchFresh - if true, fetches from start and resets pagination
       */
      async fetchBalanceRequestsHistory(fetchFresh) {
        try {
          this.isTableLoading = true;

          // if fetching from start then reset pagination and load more button state
          if (fetchFresh) {
            this.resetPagination();
            this.isLoadMoreBtnDisabled = false;
          }

          const response = await new APIService().api(
            { method: 'GET', url: 'report/requests?reportType=WALLET_BALANCE' },
            {
              page: this.pagination.rowsShown / this.pagination.rowsToLoad,
              size: this.pagination.rowsToLoad,
            },
            {},
          );
          if (response.result.errors) {
            return;
          }

          if (
            response.requests.length === 0 ||
            response.requests.length < this.pagination.rowsToLoad
          ) {
            this.isLoadMoreBtnDisabled = true;
          }

          // If fetching from start then override existing array with new values,
          // do not clear array because it will cause massive layout shift
          if (fetchFresh) {
            this.balanceRequestsHistory = response.requests;
          } else {
            this.balanceRequestsHistory = this.balanceRequestsHistory.concat(
              response.requests,
            );
          }

          // update pagination
          this.pagination.rowsShown += this.pagination.rowsToLoad;
        } finally {
          this.isTableLoading = false;
        }
      },
      resetPagination() {
        this.pagination = {
          rowsShown: 0,
          rowsToLoad: ROWS_TO_LOAD,
        };
      },
    },
  };
</script>

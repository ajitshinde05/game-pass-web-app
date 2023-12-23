<template>
  <div>
    <b-card-code :title="$t('PaymentHistoryPage.Title')">
      <div class="mb-2">
        <b-row class="justify-content-end">
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <feather-icon
                id="RefreshCwIcon"
                icon="RefreshCwIcon"
                size="24"
                class="mr-2 cursor-pointer"
                @click="getReport(1)"
              />
              <b-tooltip target="RefreshCwIcon" triggers="hover">
                {{ $t('PaymentHistoryPage.RefreshBtn') }}
              </b-tooltip>
            </div>
          </b-col>
        </b-row>
      </div>

      <!-- table -->
      <vue-good-table
        :columns="columns"
        :rows="reportRequest"
        class="good-aline-table"
        :search-options="{
          enabled: true,
          externalQuery: searchTerm,
        }"
        :sort-options="{
          enabled: true,
          multipleColumns: true,
        }"
      >
        <template slot="table-row" slot-scope="props">
          <div
            v-if="props.column.field === 'id'"
            class="text-nowrap table-address-col text"
          >
            <span
              v-b-tooltip
              :title="props.row.id"
              variant="outline-success"
              class="text-nowrap d-inline-block text-truncate"
              style="max-width: 100px"
            >
              {{ props.row.id }}
            </span>
          </div>
          <div
            v-if="props.column.field === 'payAddress'"
            class="text-nowrap table-address-col text"
          >
            <span
              v-b-tooltip
              :title="props.row.payAddress"
              variant="outline-success"
              class="text-nowrap d-inline-block text-truncate"
              style="max-width: 100px"
            >
              {{ props.row.payAddress }}
            </span>
          </div>
          <div
            v-if="props.column.field === 'planName'"
            class="text-nowrap text"
          >
            <span
              variant="outline-success"
              class="text-nowrap d-inline-block text-truncate"
              style="max-width: 100px"
            >
              {{ props.row.planName }}
            </span>
          </div>
          <div
            v-if="props.column.field === 'payAmount'"
            class="text-nowrap text"
          >
            <span class="text-nowrap d-inline-block text-truncate">
              {{ props.row.payAmount }}
            </span>
          </div>
          <div v-if="props.column.field === 'payTxId'" class="text-nowrap text">
            <span
              v-b-tooltip
              :title="props.row.payTxId"
              variant="outline-success"
              class="text-nowrap d-inline-block text-truncate"
              style="max-width: 100px"
            >
              {{ props.row.payTxId || 'NULL' }}
            </span>
          </div>
          <div
            v-if="props.column.field === 'creditValue'"
            class="text-nowrap text"
          >
            <span class="text-nowrap">{{ props.row.requestPoint }}</span>
          </div>
          <div v-if="props.column.field === 'status'" class="text-nowrap text">
            <b-badge
              v-if="props.row.status === 'COMPLETED'"
              class="light-success mr-2"
              variant="light-success"
            >
              {{ $t('PaymentHistoryPage.Statuses')[props.row.status] }}
            </b-badge>
            <b-badge
              v-else-if="props.row.status === 'PENDING'"
              class="light-warning mr-2 cursor-pointer"
              variant="light-warning"
              @click="goToAccount(props.row)"
            >
              {{ $t('PaymentHistoryPage.Statuses')[props.row.status] }}
            </b-badge>
            <b-badge
              v-else-if="props.row.status === 'EXPIRED'"
              class="light-warning mr-2"
              variant="light-danger"
            >
              {{ $t('PaymentHistoryPage.Statuses')[props.row.status] }}
            </b-badge>
          </div>
          <div
            v-if="props.column.field === 'createdTime'"
            class="text-nowrap text"
          >
            <span class="text-nowrap">{{ moment(props.row.createdTime) }}</span>
          </div>
        </template>
      </vue-good-table>
      <template>
        <div class="d-flex justify-content-end">
          <b-overlay
            :show="isLoading"
            rounded
            opacity="0.6"
            spinner-small
            spinner-variant="primary"
            class="d-inline-block"
            @hidden="onHidden"
          >
            <b-button
              v-show="showLoadMore"
              ref="button"
              :disabled="isLoading"
              variant="primary"
              class="mt-2 align-items-center"
              @click="loadMore"
            >
              <span class="text-nowrap d-none d-sm-inline">
                {{ $t('BalanceReportHistory.LoadMoreBtn') }}
              </span>

              <feather-icon
                icon="ChevronDownIcon"
                size="16"
                class="ml-0 mr-sm-50"
              />
            </b-button>
          </b-overlay>
        </div>
      </template>
      <!-- <template #code>
        {{ codeColumnSearch }}
      </template> -->
    </b-card-code>
    <Loader :show="isLoading" />
  </div>
</template>

<script>
  import BCardCode from '@core/components/b-card-code/BCardCode.vue';
  import {
    BButton,
    BBadge,
    BOverlay,
    BTooltip,
    BRow,
    BCol,
    VBTooltip,
  } from 'bootstrap-vue';
  import { VueGoodTable } from 'vue-good-table';
  import store from '@/store/index';
  import APIService from '@/libs/api/api';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
  import moment from 'moment';
  import Loader from '@/layouts/components/Loader.vue';

  export default {
    components: {
      BCardCode,
      VueGoodTable,
      BButton,
      BBadge,
      BOverlay,
      BTooltip,
      Loader,
      BRow,
      BCol,
    },
    directives: {
      'v-b-tooltip': VBTooltip,
    },
    data() {
      return {
        c1: null,
        reportId: null,
        coinType: null,
        address: null,
        status: null,
        startTime: null,
        endTime: null,
        perPage: 10,
        currentPage: 0,
        isLoading: false,
        showLoadMore: false,
        coinTypes: [],
        options: ['COMPLETED', 'PENDING'],
        filter: false,
        rangeDate: null,
        lang: this.$route.params.lang,
        searchTerm: '',
        reportRequest: [],
      };
    },
    computed: {
      columns() {
        return [
          {
            label: this.$t('PaymentHistoryPage.Columns.TransactionID'),
            field: 'id',
          },
          {
            label: this.$t('PaymentHistoryPage.Columns.PayAddress'),
            field: 'payAddress',
          },
          {
            label: this.$t('PaymentHistoryPage.Columns.Plan'),
            styleClass: 'table-address-col',
            field: 'planName',
          },
          {
            label: this.$t('PaymentHistoryPage.Columns.PayAmount'),
            field: 'payAmount',
          },
          {
            label: this.$t('PaymentHistoryPage.Columns.PayTxId'),
            field: 'payTxId',
          },
          {
            label: this.$t('PaymentHistoryPage.Columns.RequestPoints'),
            field: 'creditValue',
          },
          {
            label: this.$t('PaymentHistoryPage.Columns.Status'),
            field: 'status',
          },
          {
            label: this.$t('PaymentHistoryPage.Columns.CreatedTime'),
            field: 'createdTime',
          },
        ];
      },
      statusVariant() {
        const statusColor = {
          /* eslint-disable key-spacing */
          Current: 'light-primary',
          Professional: 'light-success',
          Rejected: 'light-danger',
          Resigned: 'light-warning',
          Applied: 'light-info',
          /* eslint-enable key-spacing */
        };

        return (status) => statusColor[status];
      },
      direction() {
        if (store.state.appConfig.isRTL) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.dir = true;
          return this.dir;
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = false;
        return this.dir;
      },
    },
    watch: {
      perPage() {
        if (!this.perPage) {
          this.perPage = 10;
        }
        this.getReport();
      },
    },
    mounted() {
      this.getCoinTypes();
      this.getReport();
    },
    methods: {
      onClose() {
        this.$bvModal.hide('modal-sm-remove');
      },
      moment(date) {
        return moment(date).format('MMM DD YYYY, HH:mm:ss');
      },
      toggleFilter() {
        this.$bvModal.show('modal-sm-remove');
        this.filter = true;
      },
      goToAccount(props) {
        this.$router.push({
          name: 'payment',
          params: { id: props.id, lang: this.lang || undefined },
        });
      },

      onHidden() {
        this.$refs.button.focus();
      },
      loadMore() {
        this.currentPage += 1;
        this.getReport();
      },
      async getCoinTypes() {
        const res = await new APIService().api(
          { method: 'GET', url: 'report/refdata' },
          {},
          {},
        );

        if (
          res &&
          res.result &&
          res.result.errors &&
          res.result.errors[0].message
        ) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: res.result.errors[0].message,
              icon: 'EditIcon',
              variant: 'danger',
            },
          });
          return;
        }

        this.coinTypes = res.supportedCoinTypes;
      },
      async getReport(params) {
        this.isLoading = true;

        const size = params
          ? (this.currentPage + 1) * this.perPage
          : this.perPage;
        const res = await new APIService().api(
          { method: 'GET', url: 'payment/txs' },
          {
            page: this.currentPage,
            size,
          },
          {},
        );
        if (res && res.txs) {
          if (res.txs.length) {
            if (params) {
              if (res.txs.length < size - 1) {
                this.showLoadMore = false;
              } else {
                this.showLoadMore = true;
              }
              this.reportRequest = res.txs;
            } else this.reportRequest = this.reportRequest.concat(res.txs);
            // this.reportRequest = this.reportRequest.concat(res.txs);
          } else if (this.currentPage === 0 && !res.txs.length) {
            this.showLoadMore = false;
            this.reportRequest = [];
          } else {
            this.showLoadMore = false;
          }
          if (res.txs.length && res.txs.length === size) {
            this.showLoadMore = true;
          } else if (res.txs.length && res.txs.length < size) {
            this.showLoadMore = false;
          }
        } else if (
          res &&
          res.result &&
          res.result.errors &&
          res.result.errors[0].message
        ) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: res.result.errors[0].message,
              icon: 'EditIcon',
              variant: 'danger',
            },
          });
        }
        this.isLoading = false;
      },
    },
  };
</script>
<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-good-table.scss';
  @import '@core/scss/vue/pages/all-pages.scss';
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

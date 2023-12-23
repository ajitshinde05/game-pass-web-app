<template>
  <div>
    <b-card-code :title="$t('TxCostReportPage.Title')">
      <div class="mb-2 mt-1">
        <!-- Table Top -->
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
                {{ $t('TxCostReportPage.Refresh') }}
              </b-tooltip>

              <feather-icon
                id="FilterIcon"
                icon="FilterIcon"
                size="24"
                class="mr-2 cursor-pointer"
                :class="showClearFilter ? 'fill-filer-color' : null"
                @click="toggleFilter"
              />
              <b-tooltip target="FilterIcon" triggers="hover">
                {{ $t('TxCostReportPage.Search') }}
              </b-tooltip>
              <b-img
                v-show="showClearFilter"
                id="ClearFilter"
                src="@/assets/images/icons/clearFilter.svg"
                class="mr-2 cursor-pointer clear-filter"
                :class="showClearFilter ? 'fill-filer-color' : null"
                @click="resetFilter(1)"
              />

              <b-tooltip target="ClearFilter" triggers="hover">
                {{ $t('TxCostReportPage.ClearSearch') }}
              </b-tooltip>
              <b-button
                class="ReportButton"
                variant="primary"
                @click="addReport()"
              >
                <feather-icon icon="PlusIcon" size="16" class="mr-0 mr-sm-50" />
                <span class="text-nowrap d-none d-sm-inline">
                  {{ $t('TxCostReportPage.GenerateReportButton') }}
                </span>
              </b-button>
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
          <div v-if="props.column.field === 'id'" class="text-nowrap text">
            <span class="text-nowrap .text-{colorName}">
              {{ props.row.id }}
            </span>
          </div>
          <div
            v-if="props.column.field === 'coinType'"
            class="text-nowrap text"
          >
            <span class="text-nowrap">{{ props.row.coinType }}</span>
          </div>

          <div
            v-if="props.column.field === 'createdTime'"
            class="text-nowrap text"
          >
            <span class="text-nowrap">{{ moment(props.row.createdTime) }}</span>
          </div>
          <div
            v-if="props.column.field === 'requestData.requestPoint'"
            class="text-nowrap text"
          >
            <span class="text-nowrap">
              {{ props.row.requestData.requestPoint }}
            </span>
          </div>
          <div v-if="props.column.field === 'status'" class="text-nowrap text">
            <ShowStatus :status="props.row.status" />
            <feather-icon
              v-show="
                props.row.status === 'COMPLETED' || props.row.status === 'HOLD'
              "
              icon="DownloadIcon"
              size="16"
              class="mr-0 mr-sm-50 cursor-pointer"
              @click="downloadReport(props.row)"
            />
          </div>
        </template>
        <div slot="emptystate" class="d-flex justify-content-center">
          {{ $t('TxCostReportPage.NoData') }}
        </div>
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
                {{ $t('TxCostReportPage.LoadMore') }}
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
    <b-modal
      id="modal-sm-remove"
      v-model="filter"
      centered
      size="sm"
      modal-class="no-header-modal no-footer-modal"
      no-close-on-esc
      no-close-on-backdrop
      ok-only
      ok-title="Search"
      hide-footer
      @close="closeFilter()"
    >
      <b-card-text>
        <div class="new-invite-title d-flex justify-content-center">
          <h2 class="font-weight-bold">
            {{ $t('TxCostReportFilterModal.Title') }}
          </h2>
        </div>
        <div>
          <b-form-group
            class="font-weight-bold"
            :label="$t('TxCostReportFilterModal.ReportIdLabel')"
            label-for="reportId"
          >
            <b-form-input
              v-model="reportId"
              name="reportId"
              :placeholder="$t('TxCostReportFilterModal.ReportIdPlaceholder')"
            />
          </b-form-group>
          <b-form-group
            class="font-weight-bold"
            :label="$t('TxCostReportFilterModal.CoinTypeLabel')"
            label-for="coinType"
          >
            <v-select
              v-model="coinType"
              name="coinType"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="Coin Type"
              :options="coinTypes"
              :placeholder="$t('TxCostReportFilterModal.CoinTypePlaceholder')"
            />
          </b-form-group>
          <!-- <b-form-group class="font-weight-bold" label="Address">
            <b-form-input id="address" name="address" v-model="address" />
          </b-form-group> -->
          <b-form-group
            class="font-weight-bold"
            label-for="startTime"
            :label="$t('TxCostReportFilterModal.StartTimeLabel')"
          >
            <vue-ctk-date-time-picker
              v-model="startTime"
              name="startTime"
              :label="$t('TxCostReportFilterModal.StartTimePlaceholder')"
              :format="'YYYY-MM-DD HH:mm'"
              :formatted="'DD/MM/YYYY HH:mm'"
              no-label
              color="#7367f0"
              button-color="#7367f0"
              :max-date="new Date().toDateString()"
            />
          </b-form-group>

          <b-form-group
            class="font-weight-bold"
            label-for="endTime"
            :label="$t('TxCostReportFilterModal.EndTimeLabel')"
          >
            <vue-ctk-date-time-picker
              v-model="endTime"
              name="endTime"
              :label="$t('TxCostReportFilterModal.EndTimePlaceholder')"
              :format="'YYYY-MM-DD HH:mm'"
              :formatted="'DD/MM/YYYY HH:mm'"
              no-label
              color="#7367f0"
              button-color="#7367f0"
              :max-date="new Date().toDateString()"
            />
          </b-form-group>
          <b-form-group
            class="font-weight-bold"
            :label="$t('TxCostReportFilterModal.StatusLabel')"
            label-for="status"
          >
            <v-select
              v-model="status"
              name="status"
              :placeholder="$t('TxCostReportFilterModal.StatusPlaceholder')"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="statusOptions"
              :get-option-label="
                (option) => {
                  return $t('TxCostReportFilterModal.StatusOptions')[
                    option.value
                  ];
                }
              "
            />
          </b-form-group>
          <div class="d-flex justify-content-center mb-1">
            <b-button
              ref="button"
              variant="primary"
              class="mt-2 align-items-center"
              @click="addFilter"
            >
              {{ $t('TxCostReportPage.Search') }}
            </b-button>
            <b-button
              ref="button"
              :disabled="isLoading || checkedAnyFilter()"
              variant="outline-secondary"
              class="mt-2 ml-2 align-items-center"
              @click="resetFilter"
            >
              {{ $t('TxCostReportPage.Reset') }}
            </b-button>
          </div>
        </div>
      </b-card-text>
    </b-modal>
    <AreYouSureModal
      :confirmationObject="confirmationObject"
      :on-are-you-sure-modal-close="onAreYouSureModalClose"
      :on-action="onAction"
      :is-loading="isLoading"
    />
    <Loader :show="isLoading" />
  </div>
</template>

<script>
  import BCardCode from '@core/components/b-card-code/BCardCode.vue';

  import Loader from '@/layouts/components/Loader.vue';

  import ShowStatus from '@/layouts/components/ShowStatus.vue';
  import {
    BButton,
    BFormGroup,
    BFormInput,
    BOverlay,
    BCardText,
    BRow,
    BCol,
    BTooltip,
    BImg,
  } from 'bootstrap-vue';
  import { VueGoodTable } from 'vue-good-table';
  import store from '@/store/index';
  import APIService from '@/libs/api/api';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
  import moment from 'moment';
  import vSelect from 'vue-select';
  import copyToClipboard from '@/utils/clipboard';
  import AreYouSureModal from '@/layouts/components/AreYouSureModal.vue';

  import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
  import tracking from '@/utils/tracking';
  import { mapState, mapMutations } from 'vuex';

  export default {
    components: {
      BCardCode,
      VueGoodTable,
      BButton,
      BFormGroup,
      BFormInput,
      BOverlay,
      BCardText,
      vSelect,
      BRow,
      BCol,
      VueCtkDateTimePicker,
      BTooltip,
      BImg,
      Loader,
      ShowStatus,
      AreYouSureModal,
    },

    data() {
      return {
        timeStr: ['hour', 'min', 'sec'],
        c1: null,
        reportId: null,
        coinType: null,
        address: null,
        status: null,
        statusOptions: [
          {
            value: 'COMPLETED',
          },
          {
            value: 'PENDING',
          },
          {
            value: 'HOLD',
          },
          {
            value: 'FAILED',
          },
        ],
        startTime: null,
        endTime: null,
        perPage: 10,
        currentPage: 0,
        isLoading: false,
        showLoadMore: false,
        coinTypes: [],

        filter: false,
        rangeDate: null,
        showClearFilter: false,
        searchTerm: '',
        reportRequest: [],
        confirmationObject: {
          title: '',
          message: '',
          button: '',
          id: '',
        },
        lang: this.$route.params.lang,
      };
    },
    computed: {
      columns() {
        return [
          {
            label: this.$t('TxCostReportPage.TableColumns.ReportId'),
            field: 'id',
          },
          {
            label: this.$t('TxCostReportPage.TableColumns.Coin'),
            field: 'coinType',
          },
          {
            label: this.$t('TxCostReportPage.TableColumns.RequestTime'),
            field: 'createdTime',
            type: 'date',
            dateInputFormat: "yyyy-MM-dd'T'HH:mm:ss", // expects 2018-03-16
            dateOutputFormat: 'MM dd yyyy', // outputs Mar 16th 2018
            filterable: true,
          },
          {
            label: this.$t('TxCostReportPage.TableColumns.SpentRPs'),
            field: 'requestData.requestPoint',
          },
          {
            label: this.$t('TxCostReportPage.TableColumns.Status'),
            field: 'status',
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
      ...mapState('user', ['requestPointBalance']),
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
      ...mapMutations('user', ['setRequestPointBalance']),
      addReport() {
        tracking('NEW_REPORT', {});
        this.$router.push({
          name: 'generate-tx-cost-report',
          params: { lang: this.lang || undefined },
        });
      },
      closeFilter() {
        if (!this.showClearFilter) {
          this.resetFilter(1);
        }
      },
      resetFilter(params) {
        this.reportId = null;
        this.coinType = null;
        this.address = null;
        this.status = null;
        this.startTime = null;
        this.endTime = null;
        this.showClearFilter = false;
        if (params === 1) {
          this.currentPage = 0;
          this.reportRequest = [];
          this.getReport();
        }
      },
      checkedAnyFilter() {
        if (
          this.reportId ||
          this.coinType ||
          this.address ||
          this.status ||
          this.startTime ||
          this.endTime
        )
          return false;
        return true;
      },
      moment(date) {
        return moment(`${date}Z`).format('MMM DD YYYY, HH:mm:ss');
      },
      async copyURL(props) {
        await copyToClipboard.apply(this, [`${props}`]);
      },
      onClose() {
        this.$bvModal.hide('modal-sm-remove');
      },
      async onAction(props) {
        if (props.button === this.$t('ConfirMationModule.Buy')) {
          this.$router.push({
            name: 'pricing',
            params: { lang: this.lang || undefined },
          });
        } else if (props.button === this.$t('ConfirMationModule.Download')) {
          this.download(props.id, 1);
        }
        this.onAreYouSureModalClose();
      },
      onAreYouSureModalClose() {
        this.$bvModal.hide('modal-sm-confirmation-module');
        this.confirmationObject = {
          title: '',
          message: '',
          button: '',
          id: '',
        };
      },
      toggleFilter() {
        this.$bvModal.show('modal-sm-remove');
        this.filter = true;
      },

      addFilter() {
        this.currentPage = 0;
        this.showClearFilter = true;

        this.reportRequest = [];
        this.filter = false;
        this.getReport();
      },

      onHidden() {
        if (this.showLoadMore && !!this.currentPage) {
          this.$refs.button.focus();
        }
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
        if (res && res.supportedCoinTypes) {
          this.coinTypes = res.supportedCoinTypes;
        }
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
        }
      },
      async getReport(params) {
        this.isLoading = true;
        const size = params
          ? (this.currentPage + 1) * this.perPage
          : this.perPage;
        if (this.currentPage === 0) {
          this.reportRequest = [];
        }
        const res = await new APIService().api(
          { method: 'GET', url: 'report/requests' },
          {
            page: params ? 0 : this.currentPage,
            size,
            reportId: this.reportId || undefined,
            coinType: this.coinType || undefined,
            address: this.address || undefined,
            status: this.status || undefined,
            startTime: this.startTime
              ? new Date(this.startTime).toISOString().split('.')[0]
              : undefined,
            endTime: this.endTime
              ? new Date(this.endTime).toISOString().split('.')[0]
              : undefined,
          },
          {},
        );
        if (res && res.requests) {
          if (res.requests.length) {
            if (params) {
              if (res.requests.length < size - 1) {
                this.showLoadMore = false;
              } else {
                this.showLoadMore = true;
              }
              this.reportRequest = res.requests;
            } else this.reportRequest = this.reportRequest.concat(res.requests);
          } else if (this.currentPage === 0 && !res.requests.length) {
            this.showLoadMore = false;
            this.reportRequest = [];
          } else {
            this.showLoadMore = false;
          }
          if (res.requests.length && res.requests.length === size) {
            this.showLoadMore = true;
          } else if (res.requests.length && res.requests.length < size) {
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
        // eslint-disable-next-line no-unused-expressions
        params && this.getRequestPointBalance();
        this.isLoading = false;
      },
      async download(id, checkRPs) {
        const res = await new APIService().api(
          { method: 'post', url: `report/createToken` },
          { reportId: id },
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
        } else if (res && res.token) {
          tracking('DOWNLOAD', { reportId: id });
          window.location.href = `${process.env.VUE_APP_API}report/downloadByToken/${res.token}`;
          // eslint-disable-next-line no-unused-expressions
          checkRPs && this.getReport(1);
        }
      },
      async downloadReport(props) {
        if (props.status === 'HOLD') {
          if (this.requestPointBalance < props.requestData.extraRP) {
            this.confirmationObject = {
              title: this.$t('ConfirMationModule.InsufficientRP'),
              message: `This report require ${props.requestData.extraRP} more RP's to download. Please buy RP's`,
              button: this.$t('ConfirMationModule.Buy'),
              id: props.id,
            };
          } else {
            this.confirmationObject = {
              title: this.$t('ConfirMationModule.AreYouSure'),
              message: `This report require ${props.requestData.extraRP} more RP's to download`,
              button: this.$t('ConfirMationModule.Download'),
              id: props.id,
            };
          }
          this.$bvModal.show('modal-sm-confirmation-module');
        } else {
          this.download(props.id);
        }
      },
      async getRequestPointBalance() {
        const res = await new APIService().api(
          { method: 'GET', url: 'user/requestPointBalance' },
          {},
          {},
        );
        if (res && res.requestPointBalance) {
          this.setRequestPointBalance(res.requestPointBalance);
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

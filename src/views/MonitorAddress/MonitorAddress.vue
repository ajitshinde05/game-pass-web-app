<template>
  <div>
    <b-card-code :title="$t('MonitorAddress.Title')">
      <validation-observer ref="formValidator" #default="{ handleSubmit }">
        <b-form
          class="mb-1 mt-1"
          @submit.prevent="handleSubmit(getMonitorAddresses)"
        >
          <div
            class="d-flex align-items-start w-100 mt-1"
            :class="{ 'flex-column': ['xs', 'sm'].includes(currentBreakPoint) }"
          >
            <validation-provider
              #default="{ errors }"
              class="w-100 mr-1"
              name="address"
              tag="div"
              rules="required"
            >
              <b-form-input
                id="basicInput"
                v-model="address"
                name="address"
                :placeholder="$t('MonitorAddress.SearchFiledPlaceholder')"
                class="w-70 mr-1"
                @keydown.enter="searchTransaction"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>

            <b-button
              variant="primary"
              block
              type="submit"
              class="ReportButton"
            >
              <feather-icon icon="SearchIcon" size="16" class="mr-0" />
              <span class="text-wrap d-none d-sm-inline">
                {{ $t('MonitorAddress.SearchBtn') }}
              </span>
            </b-button>
            <b-button
              variant="primary"
              style="margin-left: 8px"
              @click="addMonitorAddress()"
              class="ReportButton"
            >
              <!-- <feather-icon icon="PlusIcon" size="16" class="mr-0" /> -->
              <span class="text-nowrap d-none d-sm-inline">
                {{ $t('MonitorAddress.AddAddress') }}
              </span>
            </b-button>
          </div>
        </b-form>
      </validation-observer>

      <!-- table -->
      <vue-good-table
        :columns="columns"
        :rows="Addresses"
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
            v-if="props.column.field === 'coinType'"
            class="text-nowrap text"
          >
            <span class="text-nowrap">{{ props.row.coinType }}</span>
          </div>

          <div
            v-if="props.column.field === 'address'"
            class="d-flex align-items-center justify-content-center text-nowrap table-address-col text"
          >
            <span
              b-tooltip.hover
              :title="props.row.address"
              variant="outline-success"
              class="text-nowrap d-inline-block text-truncate max-width-address margin-right-6px"
            >
              {{ props.row.address }}
            </span>
            <feather-icon
              icon="CopyIcon"
              size="20"
              class="cursor-pointer"
              @click="copyURL(props.row.address)"
            />
          </div>

          <div
            v-if="props.column.field === 'notificationConfig.url'"
            class="d-flex align-items-center justify-content-center text-nowrap table-address-col text"
          >
            <span
              b-tooltip.hover
              :title="props.row.notificationConfig.url"
              variant="outline-success"
              class="text-nowrap d-inline-block text-truncate max-width-address margin-right-6px"
            >
              {{ props.row.notificationConfig.url }}
            </span>
            <feather-icon
              icon="CopyIcon"
              size="20"
              class="cursor-pointer"
              @click="copyURL(props.row.notificationConfig.url)"
            />
          </div>
          <div v-if="props.column.field === 'action'" class="text-nowrap text">
            <feather-icon
              icon="EditIcon"
              size="16"
              variant="primary"
              class="mr-0 mr-sm-50 cursor-pointer primary-color"
              @click="editAddress(props.row)"
            />
            <feather-icon
              icon="Trash2Icon"
              size="16"
              variant="danger"
              class="mr-0 mr-sm-50 cursor-pointer danger-color"
              @click="deleteAddress(props.row)"
            />
          </div>
        </template>
        <div slot="emptystate" class="d-flex justify-content-center">
          {{ $t('MonitorAddress.NoData') }}
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
                {{ $t('MonitorAddress.LoadMore') }}
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
    </b-card-code>

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
    BForm,
  } from 'bootstrap-vue';
  import { VueGoodTable } from 'vue-good-table';

  import APIService from '@/libs/api/api';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';

  import AreYouSureModal from '@/layouts/components/AreYouSureModal.vue';
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
  import { mapState, mapMutations, mapGetters } from 'vuex';
  import { ValidationProvider, ValidationObserver } from 'vee-validate';
  import { required } from '@validations';
  import copyToClipboard from '@/utils/clipboard';

  export default {
    components: {
      BCardCode,
      VueGoodTable,
      BButton,
      BFormGroup,
      BFormInput,
      BOverlay,
      BCardText,
      BRow,
      BCol,
      BTooltip,
      BImg,
      Loader,
      ShowStatus,
      AreYouSureModal,
      ValidationProvider,
      ValidationObserver,
      BForm,
    },

    data() {
      return {
        coinTypes: [],
        filter: false,
        rangeDate: null,
        searchTerm: '',
        Addresses: [],
        showLoadMore: false,
        isLoading: false,
        perPage: 10,
        currentPage: 0,
        address: '',
        lang: this.$route.params.lang,
        required,
      };
    },
    computed: {
      columns() {
        return [
          {
            label: this.$t('MonitorAddress.TableColumns.Coin'),
            field: 'coinType',
          },
          {
            label: this.$t('MonitorAddress.TableColumns.Address'),
            field: 'address',
          },
          {
            label: this.$t('MonitorAddress.TableColumns.Url'),
            field: 'notificationConfig.url',
          },

          {
            label: this.$t('MonitorAddress.TableColumns.Action'),
            field: 'action',
          },
        ];
      },
    },
    watch: {
      perPage() {
        if (!this.perPage) {
          this.perPage = 10;
        }
        this.getMonitorAddresses();
      },
    },
    mounted() {
      this.getCoinTypes();
      this.getMonitorAddresses();
    },
    methods: {
      ...mapGetters({ currentBreakPoint: 'app/currentBreakPoint' }),
      ...mapMutations('user', ['setRequestPointBalance']),
      onHidden() {
        if (this.showLoadMore) {
          this.$refs.button.focus();
        }
      },
      addMonitorAddress() {
        this.$router.push({
          name: 'add-monitor-address',
          params: { lang: this.lang || undefined },
        });
      },
      loadMore() {
        this.currentPage += 1;
        this.getMonitorAddresses();
      },
      async getCoinTypes() {
        const res = await new APIService().api(
          { method: 'GET', url: 'report/refdata' },
          {},
          {},
        );
        if (res && res.supportedCoinTypes) {
          this.coinTypes = res.supportedCoinTypes;
          return res.supportedCoinTypes;
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
      async copyURL(props) {
        await copyToClipboard.apply(this, [`${props}`]);
      },

      editAddress(props) {
        this.$router.push({
          name: `edit-monitor-address`,
          params: { lang: this.lang || undefined, id: props.id },
        });
      },
      async deleteAddress(props) {
        try {
          const res = await new APIService().api(
            { method: 'post', url: `address/deleteMonitorAddress/${props.id}` },
            {},
            {},
          );
          if (res && res.result && res.result.requestStatus === 'COMPLETED') {
            this.getMonitorAddresses();
            this.$toast({
              component: ToastificationContent,
              props: {
                title: this.$t(
                  'MonitorAddress.successful.AddressDeletedSuccessfully',
                ),
                icon: 'EditIcon',
                variant: 'success',
              },
            });
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
        } catch (error) {
          this.isLoading = false;
        }
      },
      async getMonitorAddresses(params) {
        this.isLoading = true;
        const size = params
          ? (this.currentPage + 1) * this.perPage
          : this.perPage;
        if (this.currentPage === 0) {
          this.Addresses = [];
        }
        const res = await new APIService().api(
          { method: 'GET', url: 'address/getMonitorAddresses' },
          {
            page: params ? 0 : this.currentPage,
            size,
            address: this.address || undefined,
          },
          {},
        );
        if (res && res.addresses) {
          if (res.addresses.length) {
            if (params) {
              if (res.addresses.length < size - 1) {
                this.showLoadMore = false;
              } else {
                this.showLoadMore = true;
              }
              this.Addresses = res.addresses;
            } else this.Addresses = this.Addresses.concat(res.addresses);
          } else if (this.currentPage === 0 && !res.addresses.length) {
            this.showLoadMore = false;
            this.Addresses = [];
          } else {
            this.showLoadMore = false;
          }
          if (res.addresses.length && res.addresses.length === size) {
            this.showLoadMore = true;
          } else if (res.addresses.length && res.addresses.length < size) {
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
        params && this.getRequestPointBalance();
        this.isLoading = false;
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

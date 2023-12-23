<template>
  <div class="auth-wrapper auth-v1 Crad-height hide-visible">
    <div class="auth-inner py-2 Card-width-1">
      <!-- Login v1 -->
      <b-card class="">
        <div class="d-flex justify-content-end">
          <feather-icon
            id="XIcon"
            icon="XIcon"
            size="24"
            class="mr-2 cursor-pointer"
            @click="$router.go(-1)"
          />
          <b-tooltip target="XIcon" triggers="hover">
            {{ $t('GenerateTxCostReport.Close') }}
          </b-tooltip>
        </div>
        <b-card-title
          title-tag="h2"
          class="frogot-password-card-title font-weight-bold mb-3 d-flex align-items-center justify-content-center"
        >
          {{ $t('GenerateTxCostReport.GenerateReport') }}
        </b-card-title>
        <!-- form -->
        <validation-observer #default="{ handleSubmit }" ref="loginForm">
          <b-form
            class="auth-login-form mt-2"
            @submit.prevent="handleSubmit(generateStatementReport)"
          >
            <b-col md="12">
              <validation-provider
                #default="{ errors }"
                name="network currency"
                rules="required"
              >
                <h5>{{ $t('GenerateTxCostReport.NetworkCurrency') }}</h5>
                <b-form-group>
                  <v-select
                    v-model="coinType"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="title"
                    :options="option"
                    :placeholder="'ETH'"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="12">
              <validation-provider
                #default="{ errors }"
                name="address"
                rules="required"
              >
                <h5>{{ $t('GenerateTxCostReport.Address') }}</h5>
                <b-form-group>
                  <div
                    class="d-flex justify-content-between align-items-center w-100"
                  >
                    <Search
                      style="float: left"
                      v-model="address"
                      :addresses="addresses"
                      :set-value="setValue"
                    ></Search>
                    <feather-icon
                      icon="StarIcon"
                      v-b-tooltip.hover.v-primary
                      :title="$t('GenerateTxCostReport.AddToFavorites')"
                      size="20"
                      @click="addUserFavouriteAddress"
                      :class="[
                        'cursor-pointer',
                        'w-10',
                        { 'fill-current': isFavourite },
                        isFavourite ? 'primary-color' : 'text-muted',
                      ]"
                    />
                  </div>

                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="12">
              <validation-provider
                #default="{ errors }"
                name="report currency"
                rules="required"
              >
                <h5>{{ $t('GenerateTxCostReport.ReportCurrency') }}</h5>
                <b-form-group>
                  <v-select
                    v-model="reportCurrency"
                    placeholder="USD"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="title"
                    :options="reportCurrencyOption"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="12">
              <validation-provider
                #default="{ errors }"
                name="start time"
                rules="required"
              >
                <b-form-group>
                  <h5>{{ $t('GenerateTxCostReport.StartTime') }}</h5>
                  <vue-ctk-date-time-picker
                    v-model="startTime"
                    :label="$t('GenerateTxCostReport.StartTimePlaceholder')"
                    :format="'YYYY-MM-DD HH:mm'"
                    :formatted="'DD/MM/YYYY HH:mm'"
                    no-label
                    color="#7367f0"
                    button-color="#7367f0"
                    :max-date="new Date().toString()"
                    position="top"
                  />

                  <small class="text-danger">
                    {{ errors[0] || startDateErr }}
                  </small>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col md="12">
              <validation-provider
                #default="{ errors }"
                name="end time"
                rules="required"
              >
                <b-form-group>
                  <h5>{{ $t('GenerateTxCostReport.EndTime') }}</h5>
                  <vue-ctk-date-time-picker
                    v-model="endTime"
                    :label="$t('GenerateTxCostReport.EndTimePlaceholder')"
                    :format="'YYYY-MM-DD HH:mm'"
                    :formatted="'DD/MM/YYYY HH:mm'"
                    no-label
                    color="#7367f0"
                    button-color="#7367f0"
                    :max-date="new Date().toString()"
                    position="top"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>

            <b-col v-if="requiredPoints" md="12">
              <h5>{{ `${requiredPoints} request points required` }}</h5>
            </b-col>
            <b-col md="12">
              <b-button type="submit" variant="primary" block>
                {{ $t('GenerateTxCostReport.GenerateNewReports') }}
              </b-button>
            </b-col>
          </b-form>
        </validation-observer>
      </b-card>
    </div>
    <Loader :show="isLoading" />
  </div>
</template>

<script>
  import { ValidationProvider, ValidationObserver } from 'vee-validate';
  import Loader from '@/layouts/components/Loader.vue';
  import Search from '@/layouts/components/Search.vue';
  import vSelect from 'vue-select';
  import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
  import {
    BButton,
    BForm,
    BFormGroup,
    BCard,
    BCardTitle,
    BCol,
    BTooltip,
    VBTooltip,
  } from 'bootstrap-vue';

  import APIService from '@/libs/api/api';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
  import { required } from '@validations';
  import { mapMutations } from 'vuex';

  export default {
    components: {
      vSelect,
      BForm,
      BFormGroup,
      BButton,
      BCard,
      BCardTitle,
      ValidationProvider,
      ValidationObserver,
      BCol,
      Loader,
      BTooltip,
      VueCtkDateTimePicker,
      Search,
    },
    directives: {
      'b-tooltip': VBTooltip,
    },
    data() {
      return {
        dateNtim: null,
        isLoading: false,
        address: null,
        startTime: null,
        endTime: null,
        coinType: null,
        selected: { title: 'Select Currency' },
        option: [],
        reportCurrency: null,
        reportCurrencyOption: [],
        startDateErr: '',
        requiredPoints: 0,
        selectedItem: '',
        searchFiled: '',
        addresses: [],
        isFavourite: false,
        lang: this.$route.params.lang,
        required,
      };
    },
    watch: {
      coinType(newStartTime, oldStartTime) {
        if (newStartTime && newStartTime !== oldStartTime)
          this.getUserFavouriteAddresses();
      },
      address(newAddress, oldAddress) {
        if (!newAddress) {
          this.isFavourite = false;
        }
        if (newAddress && newAddress !== oldAddress) this.getCost();
      },
      reportCurrency(newStartTime, oldStartTime) {
        if (newStartTime && newStartTime !== oldStartTime) this.getCost();
      },
      startTime(newStartTime, oldStartTime) {
        if (newStartTime && newStartTime !== oldStartTime) {
          this.getCost();
          this.timeValidate();
        }
      },
      endTime(newEndTime, oldEndTime) {
        if (newEndTime && newEndTime !== oldEndTime) {
          this.getCost();
          this.timeValidate();
        }
      },
    },
    mounted() {
      this.getCoinTypes();
    },
    methods: {
      ...mapMutations('user', ['setRequestPointBalance']),
      setValue(value) {
        this.address = value;
        this.checkAddress();
      },
      selectItem(item) {
        this.selectedItem = item.name;
      },
      async getCost() {
        if (
          this.address &&
          this.reportCurrency &&
          this.startTime &&
          this.endTime
        ) {
          if (this.timeValidate()) {
            const res = await new APIService().api(
              { method: 'post', url: `report/getCost` },
              {
                requestId: Date.now(),
                address: this.address,
                reportCurrency: this.reportCurrency,
                startTime: new Date(this.startTime).toISOString().split('.')[0],
                endTime: new Date(this.endTime).toISOString().split('.')[0],
              },
              {},
            );
            if (res && res.requireRequestPoint) {
              this.requiredPoints = res.requireRequestPoint;
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
          }
        }
      },
      timeValidate() {
        const endDate = this.endTime ? new Date(this.endTime) : null;
        const startDate = this.startTime ? new Date(this.startTime) : null;
        if (endDate && startDate && startDate >= endDate) {
          this.startDateErr = 'Start time must be less than end time';
          return false;
        }
        this.startDateErr = '';
        return true;
      },
      async getCoinTypes() {
        const res = await new APIService().api(
          { method: 'GET', url: 'report/refdata' },
          {},
          {},
        );
        if (res && res.supportedCoinTypes) {
          this.option = res.supportedCoinTypes;
          this.reportCurrencyOption = res.reportCurrencies;
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
      async generateStatementReport() {
        if (this.coinType && this.timeValidate()) {
          this.isLoading = true;
          const res = await new APIService().api(
            { method: 'post', url: `report/generateStatement` },
            {
              coinType: this.coinType,
              requestId: Date.now(),
              address: this.address,
              reportCurrency: this.reportCurrency,
              startTime: new Date(this.startTime).toISOString().split('.')[0],
              endTime: new Date(this.endTime).toISOString().split('.')[0],
            },
            {},
          );
          if (res && res.message) {
            this.getRequestPointBalance();
            this.$toast({
              component: ToastificationContent,
              props: {
                title: res.message,
                icon: 'EditIcon',
                variant: 'success',
              },
            });
            this.$router.push({
              name: 'tx-cost-report',
              params: { lang: this.lang || undefined },
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
      async getUserFavouriteAddresses() {
        this.addresses = [];
        this.isFavourite = false;
        const res = await new APIService().api(
          {
            method: 'GET',
            url: `report/getUserFavouriteAddresses/${this.coinType}`,
          },
          {},
          {},
        );
        if (res && res.addresses) {
          this.addresses = res.addresses;
          this.checkAddress();
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
      checkAddress() {
        this.isFavourite = this.addresses.includes(this.address);
      },
      async addUserFavouriteAddress() {
        if (this.coinType && this.address && !this.checkAddress()) {
          this.isLoading = true;
          const res = await new APIService().api(
            { method: 'post', url: `report/addUserFavouriteAddress` },
            {
              coinType: this.coinType,
              address: this.address,
            },
            {},
          );
          if (res && res.result && res.result.requestStatus === 'COMPLETED') {
            this.addresses.push(this.address);
            this.checkAddress();
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
        }
      },
    },
  };
</script>

<style lang="scss">
  @import '@core/scss/vue/pages/page-auth.scss';
  @import '@core/scss/vue/pages/all-pages.scss';
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
</style>

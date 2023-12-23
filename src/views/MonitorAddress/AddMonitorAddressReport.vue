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
            {{ $t('AddMonitorAddressReport.Close') }}
          </b-tooltip>
        </div>
        <b-card-title
          title-tag="h2"
          class="frogot-password-card-title font-weight-bold mb-3 d-flex align-items-center justify-content-center"
        >
          {{ $t('AddMonitorAddressReport.AddAddress') }}
        </b-card-title>
        <!-- form -->
        <validation-observer #default="{ handleSubmit }" ref="loginForm">
          <b-form
            class="auth-login-form mt-2"
            @submit.prevent="handleSubmit(saveMonitorAddress)"
          >
            <b-col md="12">
              <validation-provider
                #default="{ errors }"
                name="network currency"
                rules="required"
              >
                <h5>{{ $t('AddMonitorAddressReport.NetworkCurrency') }}</h5>
                <b-form-group>
                  <v-select
                    v-model="coinType"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="title"
                    :options="option"
                    :placeholder="''"
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
                <h5>{{ $t('AddMonitorAddressReport.Address') }}</h5>
                <b-form-group>
                  <b-form-input
                    id="basicInput"
                    v-model="address"
                    placeholder=""
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="12">
              <validation-provider
                #default="{ errors }"
                name="url"
                rules="required"
              >
                <h5>{{ $t('AddMonitorAddressReport.Url') }}</h5>
                <b-form-group>
                  <b-form-input id="basicInput" v-model="url" placeholder="" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="12">
              <div
                class="d-flex w-100 justify-content-between align-items-center"
              >
                <div class="margin-right-6px">
                  <h5>{{ $t('AddMonitorAddressReport.HeaderName') }}</h5>
                  <b-form-group>
                    <b-form-input
                      id="basicInput"
                      v-model="key"
                      placeholder=""
                    />
                    <!-- <small class="text-danger">{{ errors[0] }}</small> -->
                  </b-form-group>
                </div>
                <div class="margin-right-6px">
                  <h5>{{ $t('AddMonitorAddressReport.Value') }}</h5>
                  <b-form-group>
                    <b-form-input
                      id="basicInput"
                      v-model="value"
                      placeholder=""
                    />
                  </b-form-group>
                </div>
                <div class="margin-top-8px">
                  <b-button
                    variant="primary"
                    size="20"
                    class="btn-icon rounded-circle"
                    @click="addHeader()"
                  >
                    <feather-icon icon="PlusIcon" size="40" />
                  </b-button>
                </div>
              </div>
              <small class="text-danger">{{ errorMassage }}</small>
              <div
                v-for="(value, key) in headers"
                :key="key"
                max-width="10px"
                class="font-small-3 border-bottom-1px margin-bottom-8px"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h6>{{ value.key }}</h6>
                    <span
                      class="AddressSize wap-text primary-color"
                      variant="primary"
                    >
                      {{ value.value }}
                    </span>
                  </div>
                  <div class="justify-center-end">
                    <div class="justify-center-end">
                      <feather-icon
                        icon="Trash2Icon"
                        size="16"
                        variant="danger"
                        class="mr-0 mr-sm-50 cursor-pointer danger-color"
                        @click="deleteHeader(value, key)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col md="12">
              <div v-if="requiredPoints" class="mt-1">
                <h5>
                  {{
                    $t('AddMonitorAddressReport.RPsRequired', {
                      amount: requiredPoints,
                    })
                  }}
                </h5>
              </div>
            </b-col>
            <b-col md="12">
              <b-button type="submit" variant="primary" block>
                {{ $t('AddMonitorAddressReport.AddAddress') }}
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
  import vSelect from 'vue-select';
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
  import {
    BButton,
    BForm,
    BFormGroup,
    BCard,
    BCardTitle,
    BFormInput,
    BCol,
    BTooltip,
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
      BFormInput,
      ValidationProvider,
      ValidationObserver,
      BCol,
      Loader,
      BTooltip,
    },

    data() {
      return {
        isLoading: false,
        address: null,
        coinType: null,
        option: [],
        requiredPoints: 0,
        url: null,
        key: null,
        value: null,
        headers: [],
        errorMassage: null,
        lang: this.$route.params.lang,
        required,
      };
    },
    watch: {},
    mounted() {
      if (this.$route.params.id) {
        this.id = this.$route.params.id;
        this.getMonitorAddresses(this.id);
      }
      this.getCoinTypes();
    },
    methods: {
      ...mapMutations('user', ['setRequestPointBalance']),
      addHeader() {
        this.errorMassage = null;
        if (!this.key)
          this.errorMassage = this.$t(
            'AddMonitorAddressReport.errorMessage.headerNameRequired',
          );
        else if (!this.value)
          this.errorMassage = this.$t(
            'AddMonitorAddressReport.errorMessage.headerValueRequired',
          );
        else if (
          this.headers.find(
            (obj) =>
              obj.key?.toLocaleLowerCase() === this.key?.toLocaleLowerCase(),
          )
        )
          this.errorMassage = this.$t(
            'AddMonitorAddressReport.errorMessage.headerNameShouldBeUnique',
          );
        else {
          this.headers.push({ key: this.key, value: this.value });
          this.errorMassage = null;
          this.key = null;
          this.value = null;
        }
      },
      deleteHeader(value, key) {
        this.headers.splice(key, 1);
      },
      async getMonitorAddresses(params) {
        if (this.id) {
          this.isLoading = true;

          const res = await new APIService().api(
            { method: 'GET', url: 'address/getMonitorAddresses' },
            {
              page: 0,
              size: 1,
              id: this.id || undefined,
            },
            {},
          );
          if (res && res.addresses && res.addresses.length) {
            this.coinType = res.addresses[0].coinType;
            this.address = res.addresses[0].address;
            this.url = res.addresses[0].notificationConfig.url;

            for (let key in res.addresses[0].notificationConfig.headers) {
              this.headers.push({
                key,
                value: res.addresses[0].notificationConfig.headers[key],
              });
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
        }
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
          this.requiredPoints = res.requestRates.ADDRESS_MONITOR;
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
      async saveMonitorAddress() {
        this.isLoading = true;
        let notificationConfig = {
          url: this.url,
        };
        let header = {};
        for (let i = 0; i < this.headers.length; i++) {
          header[this.headers[i].key] = this.headers[i].value;
        }
        notificationConfig.headers = header;
        const res = await new APIService().api(
          { method: 'post', url: `address/saveMonitorAddress` },
          {
            id: this.id || undefined,
            coinType: this.coinType,
            address: this.address,
            notificationConfig,
          },
          {},
        );
        if (res && res.result && res.result.requestStatus === 'COMPLETED') {
          this.getRequestPointBalance();
          this.$toast({
            component: ToastificationContent,
            props: {
              title: this.$t(
                'AddMonitorAddressReport.successful.AddressAddedSuccessfully',
              ),
              icon: 'EditIcon',
              variant: 'success',
            },
          });
          this.$router.push({
            name: 'monitor-address',
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
  @import '@core/scss/vue/pages/page-auth.scss';
  @import '@core/scss/vue/pages/all-pages.scss';
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
</style>

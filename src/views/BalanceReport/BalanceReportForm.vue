<template>
  <div>
    <validation-observer ref="formValidator" #default="{ handleSubmit }">
      <b-form
        class="d-flex ml-n1 mt-n1 align-items-center"
        :class="{ 'flex-column': ['xs', 'sm'].includes(currentBreakPoint) }"
        @submit.prevent="handleSubmit(createBalanceReport)"
      >
        <validation-provider
          #default="{ errors }"
          class="w-50 ml-1 mt-1"
          name="coinType"
          rules="required"
          :class="{ 'w-100': ['xs', 'sm'].includes(currentBreakPoint) }"
        >
          <b-form-group class="font-weight-bold mb-0">
            <v-select
              v-model="createBalanceReportFields.coinType"
              name="coinType"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="coinTypes"
              :loading="isCoinTypesLoading"
              :placeholder="$t('BalanceReportForm.CurrencyLabel')"
              @input="getBalanceReportCost"
            />
            <small style="height: 15px" class="d-block text-danger">
              {{ errors[0] }}
            </small>
          </b-form-group>
        </validation-provider>

        <validation-provider
          #default="{ errors }"
          class="w-100 ml-1 mt-1"
          name="walletAddress"
          rules="required"
        >
          <b-form-group class="font-weight-bold mb-0">
            <b-form-input
              id="address"
              v-model="createBalanceReportFields.address"
              name="address"
              :placeholder="$t('BalanceReportForm.WalletAddressLabel')"
            />
            <small class="d-block text-danger" style="height: 15px">
              {{ errors[0] }}
            </small>
          </b-form-group>
        </validation-provider>
        <div
          class="ml-1 mt-1 w-50"
          :class="{ 'w-100': ['xs', 'sm'].includes(currentBreakPoint) }"
          style="margin-bottom: 15px"
        >
          <b-button
            ref="button"
            variant="primary"
            class="text-nowrap w-100 d-flex align-items-center justify-content-center"
            :disabled="isSubmitBtnLoading || isReportCostLoading"
            type="submit"
          >
            <span>
              {{ $t('BalanceReport.CreateBalanceReportBtn') }}
            </span>

            <span
              v-if="['xs', 'sm'].includes(currentBreakPoint)"
              v-show="requestPointsRequired"
              class="font-weight-bold"
              style="margin-bottom: 5px"
            >
              {{
                $t('BalanceReportForm.RequestPointsRequiredMobile', {
                  requestPointsAmount: requestPointsRequired,
                })
              }}
            </span>

            <b-spinner
              v-if="isSubmitBtnLoading || isReportCostLoading"
              class="ml-1"
              small
            />
          </b-button>
        </div>
      </b-form>
    </validation-observer>
    <div style="height: 18px">
      <span
        v-show="requestPointsRequired"
        v-if="!['xs', 'sm'].includes(currentBreakPoint)"
        class="font-weight-bold"
        style="margin-bottom: 5px"
      >
        {{
          $t('BalanceReportForm.RequestPointsRequired', {
            requestPointsAmount: requestPointsRequired,
          })
        }}
      </span>
    </div>
  </div>
</template>
<script>
  import {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BSpinner,
  } from 'bootstrap-vue';
  import vSelect from 'vue-select';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';

  import APIService from '@/libs/api/api';

  import { ValidationProvider, ValidationObserver } from 'vee-validate';
  import { required } from '@validations';

  import { mapActions, mapGetters } from 'vuex';

  export default {
    emits: ['success'],

    components: {
      vSelect,
      ValidationObserver,
      ValidationProvider,
      BButton,
      BForm,
      BFormGroup,
      BFormInput,
      BSpinner,
    },

    data() {
      return {
        createBalanceReportFields: {
          address: null,
          coinType: null,
        },
        coinTypes: [],
        requestPointsRequired: null,
        isReportCostLoading: false,
        isSubmitBtnLoading: false,
        isCoinTypesLoading: false,
        required,
      };
    },

    computed: {
      ...mapGetters({ currentBreakPoint: 'app/currentBreakPoint' }),
    },

    async created() {
      this.coinTypes = await this.getCoinTypes();
    },

    methods: {
      ...mapActions({
        fetchRequestPointsBalance: 'user/fetchRequestPointsBalance',
      }),

      async getCoinTypes() {
        try {
          this.isCoinTypesLoading = true;

          const response = await new APIService().api(
            { method: 'GET', url: 'report/refdata' },
            {},
            {},
          );

          if (response.result.errors) {
            return [];
          }

          return response.supportedCoinTypes;
        } finally {
          this.isCoinTypesLoading = false;
        }
      },

      async getBalanceReportCost() {
        try {
          this.isReportCostLoading = true;

          const response = await new APIService().api(
            { method: 'GET', url: 'wallet/getBalanceCost' },
            {
              coinType: this.createBalanceReportFields.coinType,
              size: 'magic words', // FIXME: Size variable must not be here, it is just used to get ApiService 'GET' request working.
            },
          );

          this.requestPointsRequired = response.requireRequestPoint;
        } finally {
          this.isReportCostLoading = false;
        }
      },
      async createBalanceReport() {
        try {
          this.isSubmitBtnLoading = true;
          const response = await new APIService().api(
            { method: 'GET', url: 'wallet/getBalance' },
            {
              ...this.createBalanceReportFields,
              size: 'magic words', // FIXME: Size variable must not be here, it is just used to get ApiService 'GET' request working.
            },
            {},
          );

          const responseError = response.result.errors;
          if (responseError) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Address not found',
                icon: 'AlertCircleIcon',
                variant: 'danger',
              },
            });

            return;
          }

          this.fetchRequestPointsBalance();

          this.$emit('success', response.balances);
          this.clearForm();
        } finally {
          this.isSubmitBtnLoading = false;
        }
      },
      clearForm() {
        this.createBalanceReportFields = {
          address: null,
          coinType: null,
        };
        this.$refs.formValidator.reset();
      },
    },
  };
</script>
<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>

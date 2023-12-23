<template>
  <div class="search_trx_content">
    <b-card-code class="card_padding" :title="$t('CreateWallet.Title')">
      <div class="mb-0 mt-1">
        <validation-observer ref="formValidator" #default="{ handleSubmit }">
          <b-form
            class="d-flex align-items-start w-100"
            @submit.prevent="handleSubmit(createWallet)"
          >
            <div class="w-100 mr-1">
              <validation-provider
                #default="{ errors }"
                name="Password"
                rules="required"
              >
                <v-select
                  v-model="coinType"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="coinTypeItems"
                  :placeholder="$t('CreateWallet.CoinTypePlaceholder')"
                  class="w-100 mr-1"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </div>

            <b-button
              variant="primary"
              class="create-wallet-width-20"
              block
              :disabled="isLoading"
              type="submit"
            >
              <div class="d-flex align-items-center justify-content-center">
                <feather-icon icon="PlusIcon" size="16" class="mr-0 mr-sm-50" />
                <span class="text-nowrap d-none d-sm-inline">
                  {{ $t('CreateWallet.CreateWalletBtn') }}
                </span>
              </div>
            </b-button>
          </b-form>
          <b-row v-if="requiredPoints" md="12" class="mt-1 margin_left_12">
            <h5>
              {{
                $t('CreateWallet.RPsRequired', {
                  amount: requiredPoints,
                })
              }}
            </h5>
          </b-row>
        </validation-observer>
      </div>
    </b-card-code>
    <b-card v-if="walletData" class="card_padding">
      <div class="d-flex justify-content-end">
        <feather-icon
          id="XIcon"
          icon="XIcon"
          size="24"
          class="mr-2 cursor-pointer"
          @click="clearForm()"
        />
        <b-tooltip target="XIcon" triggers="hover">
          {{ $t('CreateWallet.Clear') }}
        </b-tooltip>
      </div>
      <b-card-title title-tag="h3" class="font-weight-bold">
        {{ $t('CreateWallet.WalletDetails') }}
      </b-card-title>
      <div class="mt-1">
        <CreateWalletRowComponent
          :label="$t('CreateWallet.Address')"
          :address="walletData.address"
        />
        <CreateWalletRowComponent
          :label="$t('CreateWallet.PublicKey')"
          :address="walletData.publicKey"
        />
        <CreateWalletRowComponent
          :label="$t('CreateWallet.PrivateKey')"
          :address="walletData.privateKey"
          :is-private="true"
        />
      </div>
    </b-card>
    <Loader :show="isLoading" />
  </div>
</template>

<script>
  import { ValidationProvider, ValidationObserver } from 'vee-validate';
  import BCardCode from '@core/components/b-card-code/BCardCode.vue';
  import Loader from '@/layouts/components/Loader.vue';
  import CreateWalletRowComponent from '@/layouts/components/CreateWalletRowComponent.vue';
  import {
    BButton,
    BForm,
    BCard,
    BCardTitle,
    BRow,
    BTooltip,
  } from 'bootstrap-vue';
  import APIService from '@/libs/api/api';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
  import moment from 'moment';
  import copyToClipboard from '@/utils/clipboard';
  import vSelect from 'vue-select';
  import { mapMutations } from 'vuex';
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
  import { required } from '@validations';

  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
      BForm,
      BCardCode,
      BButton,
      BCard,
      BRow,
      BTooltip,
      Loader,
      CreateWalletRowComponent,
      vSelect,
      BCardTitle,
    },

    data() {
      return {
        address: null,
        coinTypeItems: [],
        walletData: null,
        isLoading: false,
        coinType: null,
        requiredPoints: null,
        required,
      };
    },
    computed: {},
    watch: {
      coinType(newValue) {
        if (newValue === null) {
          this.$refs.formValidator.reset();
        }
      },
    },
    mounted() {
      this.getCoinTypes();
    },
    methods: {
      ...mapMutations('user', ['setRequestPointBalance']),
      moment(date) {
        return moment(`${date}Z`).format('MMM DD YYYY, HH:mm:ss');
      },
      async copyURL(props) {
        await copyToClipboard.apply(this, [`${props}`]);
      },
      onClose() {
        this.$bvModal.hide('modal-sm-remove');
      },
      clearForm() {
        this.walletData = null;
        this.coinType = null;
      },
      async getCoinTypes() {
        const res = await new APIService().api(
          { method: 'GET', url: 'report/refdata' },
          {},
          {},
        );
        if (res && res.supportedCoinTypes) {
          this.coinTypeItems = res.supportedCoinTypes;
          this.requiredPoints = res.requestRates.WALLET_CREATE;
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
      async createWallet() {
        if (!this.coinType) {
          return;
        }

        this.walletData = null;
        this.isLoading = true;
        const res = await new APIService().api(
          {
            method: 'post',
            url: `wallet/create/${this.coinType.toLowerCase()}`,
          },
          {},
          {},
        );
        if (res && res.address) {
          this.walletData = res;
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
        this.getRequestPointBalance();
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

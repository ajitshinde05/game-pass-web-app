<template>
  <section>
    <b-row md="12" class="d-flex justify-content-center main-card">
      <!-- solid color -->

      <b-col md="6" class="d-flex justify-content-end">
        <b-card class="cardsize">
          <b-col
            class="d-flex p-1 justify-content-around align-items-center overflow-auto"
          >
            <div
              class="d-flex justify-content-center align-items-center text-center"
            >
              <h4 class="font-medium-4 font-weight-bold header-font">
                {{ $t('Payment.Title') }}
              </h4>
            </div>
          </b-col>
          <div class="d-flex align-items-center justify-content-center">
            <div class="d-flex">
              <VueQRCodeComponent
                class="mb-0 QR"
                :text="transaction.payAddress"
                size="150"
                error-level="L"
              ></VueQRCodeComponent>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-center">
            <div class="d-flex">
              <h2 class="mt-2 font-weight-bold w-100 FONT">
                {{ `${transaction.payAmount} ${transaction.payCurrency}` }}
              </h2>
            </div>
          </div>

          <div class="d-flex align-items-center justify-content-center">
            <b-col
              class="Card1 d-flex mt-1 align-items-center justify-content-center AddIPs"
            >
              <div
                class="d-flex justify-content-center cursor-pointer"
                @click="copyURL()"
              >
                <span
                  class="d-flex align-items-center font-medium-1 w-100 text-break trasactionip"
                >
                  <feather-icon icon="CopyIcon" size="12" />
                  <Span class="ml-1 AddressSize">
                    {{ transaction.payAddress }}
                  </Span>
                </span>
              </div>
            </b-col>
          </div>
          <b-row class="d-flex p-1 justify-content-around align-items-center">
            <div class="d-flex justify-content-center align-items-center">
              <h4 class="font-medium-1 font-weight-bold texterc">
                {{ $t('Payment.EnsureNetworkMessage') }}
                <span class="text-danger">{{ paymentCurrencies.type }}</span>
                .
              </h4>
            </div>
            <div class="d-flex justify-content-center mt-2 align-items-center;">
              <h4
                class="font-medium-4 font-weight-bold text-success text-align-center texterc"
              >
                {{ this.message }}
              </h4>
            </div>
          </b-row>
        </b-card>
      </b-col>
      <b-col md="6" class="d-flex justify-content-start">
        <b-card class="cardsize">
          <b-col
            class="Card d-flex p-1 justify-content-around align-items-center overflow-auto"
          >
            <div class="d-flex">
              <b-img
                v-if="transaction.planName === 'Basic'"
                src="@/assets/images/illustration/Pot1.svg"
                class="mb-0 OR-img"
                alt="svg img"
              />
              <b-img
                v-else-if="transaction.planName === 'Standard'"
                src="@/assets/images/illustration/Pot2.svg"
                class="mb-0 OR-img"
                alt="svg img"
              />
              <b-img
                v-else-if="transaction.planName === 'Premimum'"
                src="@/assets/images/illustration/Pot3.svg"
                class="mb-0 OR-img"
                alt="svg img"
              />
            </div>
            <div class="d-flex justify-content-center align-items-center;">
              <b-col class="Payment-card text-align-center">
                <h4>{{ transaction.planName }}</h4>
                <b-card-text
                  v-if="transaction.planName === 'Basic'"
                  class="align-items-center font-small-2 text-align-center"
                >
                  {{ $t('PricingPlans.Basic') }}
                </b-card-text>
                <b-card-text
                  v-else-if="transaction.planName === 'Standard'"
                  class="align-items-center font-small-2 text-align-center"
                >
                  {{ $t('PricingPlans.Standard') }}
                </b-card-text>
                <b-card-text
                  v-else-if="transaction.planName === 'Premimum'"
                  class="align-items-center font-small-2 text-align-center"
                >
                  {{ $t('PricingPlans.Premimum') }}
                </b-card-text>
              </b-col>
            </div>
            <div>
              <h3 class="d-inline mr-25 font-weight-bolder text-primary">
                {{ transaction.requestPoint }}
              </h3>
              <sub
                class="pricing-duration text-body font-small-1 font-weight-bold"
              >
                <span class="font-small-1 font-weight-bolder text-primary">
                  RP
                </span>
                /{{ `${transaction.payAmount} ${transaction.payCurrency}` }}
              </sub>
            </div>
          </b-col>

          <h4 class="mt-2 font-weight-bold w-100 header-font">
            {{ $t('Payment.SelectedPayment') }}
          </h4>

          <b-col class="Card1 d-flex mt-1 align-items-center" md="12">
            <div class="d-flex w-100 align-items-center">
              <b-media-aside class="mr-1">
                <b-avatar
                  rounded
                  variant="light-primary"
                  size="54"
                  class="currency-avatar"
                >
                  <b-img
                    :src="
                      paymentCurrencies.type === 'Ethereum'
                        ? require('@/assets/images/illustration/Ethereum.svg')
                        : require('@/assets/images/illustration/tron.svg')
                    "
                    alt="Meeting Pic"
                    height="35"
                    class="currency-avatar-icon"
                  />
                </b-avatar>
              </b-media-aside>

              <span
                class="pricing-duration text-body font-medium-2 ml-4 font-weight-bold font-14"
              >
                {{ `${paymentCurrencies.type} ${paymentCurrencies.name}` }}
              </span>
            </div>
          </b-col>
          <h4 class="mt-2 font-weight-bold w-100 header-font">
            {{ $t('Payment.TotalToPay') }}
          </h4>
          <h2 class="mt-1 font-weight-bold w-100">
            {{ `${transaction.payAmount} ${transaction.payCurrency}` }}
          </h2>
          <h5 class="mt-2 mb-4 font-weight-bold w-100 text-primary">
            {{ $t('Payment.PaymentInstruction') }}
          </h5>
          <h4 class="mt-1 font-medium-1 font-weight-bold texterc">
            {{ $t('Payment.Status') }}

            <span
              v-if="transaction.status === 'COMPLETED'"
              class="text-success"
            >
              {{ $t('Payment.Statuses')[transaction.status] }}
            </span>
            <span
              v-else-if="transaction.status === 'PENDING'"
              class="text-warning"
            >
              {{ $t('Payment.Statuses')[transaction.status] }}
            </span>
            <span
              v-else-if="transaction.status === 'EXPIRED'"
              class="text-danger"
            >
              {{ $t('Payment.Statuses')[transaction.status] }}
            </span>
            <feather-icon
              id="RefreshCwIcon"
              icon="RefreshCwIcon"
              size="24"
              class="ml-1 cursor-pointer"
              @click="getPaymentTx"
            />
            <b-tooltip target="RefreshCwIcon" triggers="hover">
              {{ $t('Payment.RefreshBtn') }}
            </b-tooltip>
          </h4>
        </b-card>
      </b-col>
    </b-row>
    <Loader :show="isLoading" />
  </section>
</template>

<script>
  import {
    BRow,
    BCol,
    BCard,
    BImg,
    BCardText,
    BAvatar,
    BTooltip,
  } from 'bootstrap-vue';
  import Loader from '@/layouts/components/Loader.vue';
  import VueQRCodeComponent from 'vue-qrcode-component';
  import Ripple from 'vue-ripple-directive';
  import APIService from '@/libs/api/api';
  import moment from 'moment';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
  import { mapMutations } from 'vuex';
  /* eslint-disable global-require */
  export default {
    components: {
      BCardText,
      BRow,
      BCol,
      BCard,
      BImg,
      BAvatar,
      VueQRCodeComponent,
      BTooltip,
      Loader,
    },
    directives: {
      Ripple,
    },

    data() {
      return {
        status: 'monthly',
        monthlyPlanShow: true,
        pricing: {},
        payAddress: '',
        payAmount: '',
        payCurrency: '',
        isLoading: false,
        plan: '',
        transaction: null,
        paymentCurrencies: null,
        message: '',
        lang: this.$route.params.lang,
      };
    },
    created() {
      this.$http.get('/pricing/data').then((res) => {
        this.pricing = res.data;
      });
    },
    async mounted() {
      if (this.$route.params.id) {
        await this.getPaymentTx();
        this.getPlans();
      }
    },
    methods: {
      ...mapMutations('user', ['setRequestPointBalance']),
      tooglePlan() {
        if (this.status === 'monthly') {
          this.monthlyPlanShow = true;
        } else {
          this.monthlyPlanShow = false;
        }
      },
      async copyURL() {
        try {
          await navigator.clipboard.writeText(this.transaction.payAddress);
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Transaction address copied',
              icon: 'EditIcon',
              variant: 'success',
            },
          });
        } catch ($e) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Cannot copy',
              icon: 'EditIcon',
              variant: 'danger',
            },
          });
          alert('Cannot copy');
        }
      },
      async getPlans() {
        const res = await new APIService().api(
          { method: 'GET', url: 'report/refdata' },
          {},
          {},
        );
        if (res && res.paymentCurrencies) {
          this.paymentCurrencies = res.paymentCurrencies.find(
            (p) => p.id === this.transaction.payCurrency,
          );
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
      async getPaymentTx() {
        this.isLoading = true;
        const res = await new APIService().api(
          { method: 'GET', url: `payment/tx/${this.$route.params.id}` },
          {},
          {},
        );
        if (res && res.tx) {
          this.transaction = res.tx;
          this.message = res.tx.message;
          const values = res.tx.messageParams;
          if (res.tx.status !== 'PENDING') {
            this.getRequestPointBalance();

            this.$toast({
              component: ToastificationContent,
              props: {
                title: `The payment transaction is ${res.tx.status}`,
                icon: 'EditIcon',
                variant: res.tx.status === 'COMPLETED' ? 'success' : 'danger',
              },
            });
            this.$router.push({
              name: 'payment-history',
              params: { lang: this.lang || undefined },
            });
          }

          // eslint-disable-next-line
          for (const index in values) {
            this.message = this.message.replaceAll(
              `{${index}}`,
              moment(`${values[index]}Z`).format('DD MMM YYYY, HH:mm:ss'),
            );
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
  /* eslint-disable global-require */
</script>

<style lang="scss">
  @import '@core/scss/vue/pages/page-pricing.scss';
</style>

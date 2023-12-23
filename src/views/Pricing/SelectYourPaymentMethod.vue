<template>
  <section>
    <b-row md="12" class="d-flex justify-content-center main-card">
      <!-- solid color -->
      <b-col md="7">
        <b-card v-if="plan !== null">
          <b-col
            class="Card d-flex p-1 justify-content-around align-items-center overflow-auto"
          >
            <div class="d-flex">
              <b-img
                v-if="plan.planName === 'Basic'"
                src="@/assets/images/illustration/Pot1.svg"
                class="mb-0"
                alt="svg img"
              />
              <b-img
                v-else-if="plan.planName === 'Standard'"
                src="@/assets/images/illustration/Pot2.svg"
                class="mb-0"
                alt="svg img"
              />
              <b-img
                v-else-if="plan.planName === 'Premimum'"
                src="@/assets/images/illustration/Pot3.svg"
                class="mb-0"
                alt="svg img"
              />
            </div>
            <div class="d-flex justify-content-center align-items-center;">
              <b-col class="Payment-card">
                <h3 v-if="plan.planName === 'Premimum'" class="free">
                  Enterprise
                </h3>
                <h3 v-else class="free">
                  {{ plan.planName }}
                </h3>
                <b-card-text class="align-items-center">
                  {{ $t(`PricingPlans.${plan.planName}`) }}
                </b-card-text>
              </b-col>
            </div>
            <div class="text-align-center">
              <h2 class="d-inline mr-25 font-weight-bolder text-primary">
                {{ plan.requestPoint }}
              </h2>

              <span class="font-medium-1 font-weight-bolder text-primary">
                RP
              </span>
              <sub
                class="pricing-duration text-body font-medium-1 font-weight-bold"
              >
                / {{ `${plan.amount} ${plan.currency}` }}
              </sub>
            </div>
          </b-col>
          <h3 class="mt-2 font-weight-bold frogot-password-card-title">
            Please select your payment method
          </h3>
          <div>
            <validation-observer ref="loginValidation">
              <ValidationProvider
                ref="provider"
                v-slot="{ errors }"
                rules="required"
                name="payment method"
                class="d-flex flex-wrap justify-content-between"
              >
                <div class="d-flex flex-wrap justify-content-between w-100">
                  <b-col
                    v-for="(value, key) in paymentCurrencies"
                    :key="key"
                    class="Card1 d-flex mt-2 w-45 align-items-center"
                  >
                    <div
                      class="d-flex justify-content-between align-items-center w-100"
                      @click="selectPaymentMethod(value.id)"
                    >
                      <b-media-aside class="mr-1">
                        <b-avatar rounded variant="light-primary" size="45">
                          <b-img
                            :src="
                              value.type === 'Ethereum'
                                ? require('@/assets/images/illustration/Ethereum.svg')
                                : require('@/assets/images/illustration/tron.svg')
                            "
                            alt="Meeting Pic"
                            height="35"
                          />
                        </b-avatar>
                      </b-media-aside>
                      <span
                        class="pricing-duration text-body font-small-1 font-weight-bold"
                      >
                        {{ `${value.type} (${value.name})` }}
                      </span>
                      <div class="d-flex align-items-center">
                        <b-form-radio
                          v-model="currencyId"
                          :value="value.id"
                          class="ml-1"
                        ></b-form-radio>
                      </div>
                    </div>
                  </b-col>
                </div>
                <small class="text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
              <div class="d-flex justify-content-center mt-2 w-100">
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required"
                  name="from address"
                  class="d-flex flex-wrap justify-content-between w-100"
                >
                  <b-form-input
                    id="From-address"
                    v-model="fromAddress"
                    :state="errors.length > 0 ? false : null"
                    name="From address"
                    :placeholder="
                      $t('SelectYourPaymentMethod.FromAddressFieldPlaceholder')
                    "
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
            </validation-observer>
          </div>
          <div class="d-flex justify-content-center mt-2">
            <b-col md="6" xl="6">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                block
                class="mt-2"
                variant="primary"
                :disabled="isLoading"
                @click="validate()"
              >
                {{
                  $t('SelectYourPaymentMethod.PayBtn', { amount: plan.amount })
                }}
              </b-button>
            </b-col>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <Loader :show="isLoading" />
  </section>
</template>

<script>
  import {
    BRow,
    BFormRadio,
    BCol,
    BCard,
    BImg,
    BCardText,
    BButton,
    BAvatar,
    BMediaAside,
    BFormInput,
  } from 'bootstrap-vue';
  import Ripple from 'vue-ripple-directive';
  import APIService from '@/libs/api/api';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
  import { ValidationProvider, ValidationObserver } from 'vee-validate';
  import { required } from '@validations';

  import Loader from '@/layouts/components/Loader.vue';
  import tracking from '@/utils/tracking';
  /* eslint-disable global-require */
  export default {
    components: {
      BMediaAside,
      BButton,
      BFormRadio,
      BCardText,
      BRow,
      BCol,
      BCard,
      BImg,
      BAvatar,
      ValidationProvider,
      ValidationObserver,
      BFormInput,
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
        plan: null,
        paymentCurrencies: [],

        currencyId: null,
        fromAddress: '',
        isLoading: false,
        lang: this.$route.params.lang,
        required,
      };
    },
    created() {
      this.$http.get('/pricing/data').then((res) => {
        this.pricing = res.data;
      });
    },
    mounted() {
      // this.$toast({
      //   component: ToastificationContent,
      //   props: {
      //     title: VueI18n.__mf("ajit {0}", { 0: "212121123123" }),
      //     icon: "EditIcon",
      //     variant: "success"
      //   }
      // });

      if (this.$route.params.id) {
        this.getPlans();
      } else {
        this.$router.go(-1);
      }
    },
    methods: {
      selectPaymentMethod(id) {
        this.currencyId = id;
      },
      tooglePlan() {
        if (this.status === 'monthly') {
          this.monthlyPlanShow = true;
        } else {
          this.monthlyPlanShow = false;
        }
      },
      async getPlans() {
        const res = await new APIService().api(
          { method: 'GET', url: 'report/refdata' },
          {},
          {},
        );
        if (res && res.requestPlans) {
          this.plan = res.requestPlans[this.$route.params.id];
          this.paymentCurrencies = res?.paymentCurrencies;
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
      async validate() {
        return new Promise((resolve, reject) => {
          this.$refs.loginValidation.validate().then((success) => {
            if (success) {
              this.buyPlan();
              resolve(true);
            } else {
              reject();
            }
          });
        });
      },
      async buyPlan() {
        if (this.currencyId) {
          this.isLoading = true;

          const res = await new APIService().api(
            { method: 'post', url: 'payment/createRequest' },
            {
              requestId: Date.now(),
              planId: this.$route.params.id,
              currencyId: this.currencyId,
              fromAddress: this.fromAddress,
            },
            {},
          );
          if (res && res.tx) {
            let { message } = res.tx;
            const values = res.tx.messageParams;

            // eslint-disable-next-line
            for (const index in values) {
              message = message.replaceAll(`{${index}}`, values[index]);
            }

            this.$toast({
              component: ToastificationContent,
              props: {
                title: message,
                icon: 'EditIcon',
                variant: 'success',
              },
            });
            tracking('PURCHASE', {
              plan: res.tx.planName,
              amount: res.tx.payAmount,
            });

            this.$router.push({
              name: 'payment',
              params: { id: res.tx.id, lang: this.lang || undefined },
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
    },
  };
  /* eslint-disable global-require */
</script>

<style lang="scss">
  @import '@core/scss/vue/pages/page-pricing.scss';
</style>

<template>
  <b-col lg="8" offset-md-2 class="d-none d-lg-flex align-items-center mt-1 we">
    <div class="d-lg-flex align-items-center justify-content-center w-100">
      <section id="pricing-plan ">
        <div class="text-center">
          <h1>{{ $t('PricingPlans.Title') }}</h1>
          <p class="mb-2 pb-75 mt-2">
            {{ $t('PricingPlans.Description') }}
          </p>
        </div>
        <!--/ title text and switch button -->

        <!-- pricing plan cards -->
        <div>
          <b-row class="pricing-card d-flex justify-content-center w-100">
            <b-col v-for="(value, key) in plans" :key="key" md="5">
              <b-card align="center">
                <!-- img -->
                <div class="imgsize">
                  <b-img
                    v-if="value.planName === 'Free'"
                    src="@/assets/images/illustration/Pot0.svg"
                    class="mb-2 pricing-img"
                    alt="basic svg img"
                  />
                  <b-img
                    v-else-if="value.planName === 'Basic'"
                    src="@/assets/images/illustration/Pot1.svg"
                    class="mb-2 pricing-img"
                    alt="basic svg img"
                  />
                  <b-img
                    v-else-if="value.planName === 'Standard'"
                    src="@/assets/images/illustration/Pot2.svg"
                    class="mb-2 pricing-img"
                    alt="basic svg img"
                  />
                  <b-img
                    v-else-if="value.planName === 'Premimum'"
                    src="@/assets/images/illustration/Pot3.svg"
                    class="mb-2 pricing-img"
                    alt="basic svg img"
                  />
                </div>
                <!--/ img -->
                <div class="mt-0">
                  <h3>{{ value.planName }}</h3>
                  <b-card-text v-if="value.planName === 'Free'">
                    {{ $t('PricingPlans.Free') }}
                  </b-card-text>
                  <b-card-text v-else-if="value.planName === 'Basic'">
                    {{ $t('PricingPlans.Basic') }}
                  </b-card-text>
                  <b-card-text v-else-if="value.planName === 'Standard'">
                    {{ $t('PricingPlans.Standard') }}
                  </b-card-text>
                  <b-card-text v-else-if="value.planName === 'Premimum'">
                    {{ $t('PricingPlans.Premimum') }}
                  </b-card-text>
                </div>

                <!-- annual plan -->
                <div class="annual-plan">
                  <div class="plan-price mt-2">
                    <span
                      class="pricing-basic-value font-weight-bolder text-primary"
                    >
                      {{ value.requestPoint }}
                    </span>
                    <sub
                      class="pricing-duration text-body font-medium-1 font-weight-bold"
                    >
                      <span
                        class="font-medium-1 font-weight-bolder text-primary"
                      >
                        RP
                      </span>
                      /
                      {{
                        value.planName === 'Free'
                          ? `On sign up`
                          : `${value.amount} ${value.currency}`
                      }}
                    </sub>
                  </div>
                </div>
                <!-- <b-button
                  v-if="value.planName === 'Free'"
                  v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                  block
                  class="mt-2"
                  variant="outline-success"
                  :disabled="true"
                >
                  Your current plan
                </b-button>
                <b-button
                  v-else-if="value.planName !== 'Free'"
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  block
                  class="mt-2"
                  variant="primary"
                  @click="buyPlan(value)"
                >
                  Buy
                </b-button> -->
              </b-card>
            </b-col>
          </b-row>
        </div>
        <div class="text-center"></div>
      </section>
    </div>
  </b-col>
</template>

<script>
  /* eslint-disable global-require */

  import { BRow, BCol, BImg, BCard, BCardText } from 'bootstrap-vue';
  import APIService from '@/libs/api/api';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';

  export default {
    components: {
      BRow,
      BCol,
      BImg,
      BCardText,
      BCard,
    },
    data() {
      return {
        plans: [],
      };
    },
    mounted() {
      this.getPlans();
    },
    methods: {
      async getPlans() {
        const res = await new APIService().api(
          { method: 'GET', url: 'report/refdata' },
          {},
          {},
        );
        if (res && res.requestPlans) {
          this.plans = res.requestPlans;
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
  @import '@core/scss/vue/pages/page-pricing.scss';
</style>

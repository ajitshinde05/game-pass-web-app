<template>
  <section id="pricing-plan">
    <!-- title text and switch button -->
    <div class="text-center">
      <h1>{{ $t('PricingPlans.Title') }}</h1>
      <p class="mb-2 pb-75 mt-3">
        {{ $t('PricingPlans.Description') }}
      </p>
    </div>
    <!--/ title text and switch button -->

    <!-- pricing plan cards -->
    <b-row class="pricing-card">
      <b-col
        offset-sm-2
        sm="10"
        md="12"
        offset-lg="2"
        lg="12"
        class="mx-auto mt-3"
      >
        <b-row>
          <b-col v-for="(value, key) in plans" :key="key" md="3">
            <b-card align="center">
              <!-- img -->
              <div class="imgsize1">
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
                  class="mb-2 pricing-img1"
                  alt="basic svg img"
                />
                <b-img
                  v-else-if="value.planName === 'Premimum'"
                  src="@/assets/images/illustration/Pot3.svg"
                  class="mb-2 pricing-img1"
                  alt="basic svg img"
                />
              </div>
              <!--/ img -->
              <div class="mt-0">
                <h3 v-if="value.planName === 'Premimum'" class="free">
                  Enterprise
                </h3>
                <h3 v-else class="free">
                  {{ value.planName }}
                </h3>

                <div class="d-flex justify-content-center">
                  <b-card-text class="plans">
                    {{ $t(`PricingPlans.${value.planName}`) }}
                  </b-card-text>
                </div>
              </div>

              <!-- annual plan -->
              <div class="annual-plan">
                <div class="plan-price mt-2">
                  <span
                    class="pricing-basic-value font-weight-bolder text-primary PricingSize"
                  >
                    {{ value.requestPoint }}
                  </span>
                  <sub
                    class="pricing-duration text-body font-medium-1 font-weight-bold"
                  >
                    <span class="font-medium-1 font-weight-bolder text-primary">
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
              <b-button
                v-if="value.planName === 'Free'"
                v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                block
                class="mt-2 price-button"
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
              </b-button>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <div class="text-center"></div>
    <Loader :show="isLoading" />
  </section>
</template>

<script>
  import { BRow, BCol, BCard, BImg, BCardText, BButton } from 'bootstrap-vue';
  import Ripple from 'vue-ripple-directive';
  import APIService from '@/libs/api/api';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
  import Loader from '@/layouts/components/Loader.vue';
  import tracking from '@/utils/tracking';
  /* eslint-disable global-require */
  export default {
    components: {
      BButton,
      BCardText,
      BRow,
      BCol,
      BCard,
      BImg,
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
        plans: [],
        isLoading: false,
        lang: this.$route.params.lang,
      };
    },
    created() {
      this.$http.get('/pricing/data').then((res) => {
        this.pricing = res.data;
      });
    },
    mounted() {
      this.getPlans();
    },
    methods: {
      tooglePlan() {
        if (this.status === 'monthly') {
          this.monthlyPlanShow = true;
        } else {
          this.monthlyPlanShow = false;
        }
      },
      async getPlans() {
        this.isLoading = true;
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
        this.isLoading = false;
      },
      buyPlan(value) {
        tracking('BUY', {
          plan: value.planName,
          amount: value.amount,
        });

        this.$router.push({
          name: 'payment-method',
          params: { id: value.id, lang: this.lang || undefined },
        });
      },
    },
  };
  /* eslint-disable global-require */
</script>

<style lang="scss">
  @import '@core/scss/vue/pages/page-pricing.scss';
</style>

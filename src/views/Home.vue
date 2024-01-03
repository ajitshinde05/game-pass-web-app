<template>
  <section id="pricing-plan">
    <b-row
      class="pricing-card d-flex justify-content-center align-items-center"
    >
      <b-col sm="12" md="12" lg="12" class="mx-auto mt-1">
        <b-row class="heigth_100">
          <b-col
            v-for="(value, key) in cards"
            :key="key"
            sm="6"
            md="6"
            lg="6"
            class="mt-3"
          >
            <b-card align="center">
              <!-- img -->

              <!--/ img -->
              <div class="mt-0 card_min_higth_home">
                <h3 class="free">{{ value.title }}</h3>
                <div class="d-flex justify-content-center mt-2">
                  <b-card-text class="home_card_texr">
                    {{ value.text }}
                  </b-card-text>
                </div>
              </div>
              <div class="annual-plan mb-0">
                <div class="plan-price mt-2">
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    block
                    class="mt-2 wap-text"
                    variant="primary"
                    :disabled="value.button === 'Coming soon' ? true : false"
                    :to="{ name: value.name, params: { lang: lang } }"
                  >
                    {{ value.button }}
                  </b-button>
                </div>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <div class="text-center"></div>
    <Loader :show="isLoading" />
  </section>
</template>
<script></script>
<script>
  import { BRow, BCol, BCard, BCardText, BButton } from 'bootstrap-vue';

  import Ripple from 'vue-ripple-directive';
  import { useUtils as useI18nUtils } from '@core/libs/i18n';

  import Loader from '@/layouts/components/Loader.vue';
  import tracking from '@/utils/tracking';
  import { computed, ref } from '@vue/composition-api';
  /* eslint-disable global-require */
  export default {
    components: {
      BButton,
      BCardText,
      BRow,
      BCol,
      BCard,
      Loader,
    },
    directives: {
      Ripple,
    },
    data() {
      return {
        isLoading: false,
        lang: this.$route.params.lang,
      };
    },

    mounted() {},
    methods: {
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

    setup() {
      const { t } = useI18nUtils();

      const cards = computed(() => [
        {
          title: t('Home.MonitorAddress.Title'),
          text: t('Home.MonitorAddress.Description'),
          button: t('Home.MonitorAddress.Button'),
          name: 'monitor-address',
        },
        {
          title: t('Home.FullTxCostReport.Title'),
          text: t('Home.FullTxCostReport.Description'),
          button: t('Home.FullTxCostReport.Button'),
          name: 'tx-cost-report',
        },
        {
          title: t('Home.SearchByTxHash.Title'),
          text: t('Home.SearchByTxHash.Description'),
          button: t('Home.SearchByTxHash.Button'),
          name: 'search-transaction-details',
        },
        {
          title: t('Home.BalanceReport.Title'),
          text: t('Home.BalanceReport.Description'),
          button: t('Home.BalanceReport.Button'),
          name: 'balance-report',
        },
        {
          title: t('Home.CreateWallet.Title'),
          text: t('Home.CreateWallet.Description'),
          button: t('Home.CreateWallet.Button'),
          name: 'create-wallet',
        },
      ]);
      return {
        cards,
      };
    },
  };
</script>

<style lang="scss">
  @import '@core/scss/vue/pages/page-pricing.scss';
</style>

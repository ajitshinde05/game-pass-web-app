<template>
  <b-col lg="8" offset-md-2 class="d-flex align-items-center mt-1 we">
    <div class="d-flex align-items-center justify-content-center w-100">
      <section id="pricing-plan ">
        <div class="text-center">
          <b-img
            :src="require('@/assets/images/pages/login/forgot-password.svg')"
          />
        </div>
        <!--/ title text and switch button -->

        <!-- pricing plan cards -->
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
      // this.getPlans();
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

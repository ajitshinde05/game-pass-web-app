<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Left Text-->
      <PricingPlans />
      <!-- /Left Text-->

      <!-- Forgot password-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5 card-padding"
      >
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title
            title-tag="h1"
            class="frogot-password-card-title font-weight-bold mb-3 d-flex align-items-center justify-content-center"
          >
            {{ $t('ForgotPassword.ForgotPassword') }}
          </b-card-title>
          <b-card-text class="mb-2">
            {{ $t('ForgotPassword.ResetPasswordInstructions') }}
          </b-card-text>

          <!-- form -->
          <validation-observer ref="simpleRules">
            <b-form
              class="auth-forgot-password-form mt-2"
              @submit.prevent="validationForm"
            >
              <b-form-group
                class="font-weight-bold"
                label="Email"
                label-for="forgot-password-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-input
                    id="forgot-password-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false : null"
                    name="forgot-password-email"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <vue-recaptcha
                class="mb-1"
                sitekey="6LdW5_MjAAAAAIltY9EXuuTxdhccunK2y-QJF2zd"
                @verify="onCaptchaVerified"
                @expired="onCaptchaExpired"
              ></vue-recaptcha>
              <small class="text-danger">{{ captchaErr }}</small>
              <b-button
                :disabled="isLoading"
                type="submit"
                variant="primary"
                block
              >
                {{ $t('ForgotPassword.SendResetLink') }}
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <b-link
              :to="{
                name: 'auth-login',
                params: { lang: this.lang || undefined },
              }"
            >
              <feather-icon icon="ChevronLeftIcon" />
              {{ $t('ForgotPassword.BackToLogin') }}
            </b-link>
          </p>
          <footer class="page-footer font-small blue mt-4 pt-3">
            <div class="col-md-12 col-lg-12 d-flex justify-content-center">
              <div>
                <h3 class="free d-flex justify-content-center">
                  <b-img
                    src="@/assets/images/illustration/Support.svg"
                    class="Support mr-2"
                    alt="basic svg img"
                  />
                </h3>
                <span class="fill-filer-color">support@coinrex.in</span>
              </div>
            </div>

            <div class="col-md-12 col-lg-12 d-flex justify-content-center pt-1">
              <div>
                <p class="copyright">
                  Copyright &copy;{{ new Date().getFullYear() }}
                  {{ $t('ForgotPassword.AllRightsReserved') }}
                </p>
              </div>
            </div>
          </footer>
        </b-col>
      </b-col>
      <!-- /Forgot password-->
    </b-row>
    <Loader :show="isLoading" />
  </div>
</template>

<script>
  /* eslint-disable global-require */
  import { ValidationProvider, ValidationObserver } from 'vee-validate';
  import {
    BRow,
    BCol,
    BLink,
    BCardTitle,
    BCardText,
    BImg,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BCard,
    BBadge,
  } from 'bootstrap-vue';
  import { required, email } from '@validations';
  import store from '@/store/index';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
  import { VueRecaptcha } from 'vue-recaptcha';
  import APIService from '@/libs/api/api.js';
  import Ripple from 'vue-ripple-directive';
  import qs from 'qs';
  import PricingPlans from '@core/components/PricingPlans/pricingplans.vue';
  import Loader from '@/layouts/components/Loader.vue';

  export default {
    components: {
      BRow,
      VueRecaptcha,
      BCol,
      BLink,
      BImg,
      BForm,
      BButton,
      BFormGroup,
      BFormInput,
      BCardTitle,
      BCardText,
      ValidationProvider,
      ValidationObserver,
      BCard,
      BBadge,
      PricingPlans,
      Loader,
    },
    directives: {
      Ripple,
    },
    data() {
      return {
        isLoading: false,
        userEmail: '',
        sideImg: require('@/assets/images/pages/forgot-password-v2.svg'),
        status: false,
        captchaErr: '',
        captcha: '',
        lang: this.$route.params.lang,
        required,
        email,
      };
    },
    computed: {
      imgUrl() {
        if (store.state.appConfig.layout.skin === 'dark') {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.sideImg = require('@/assets/images/pages/forgot-password-v2-dark.svg');
          return this.sideImg;
        }
        return this.sideImg;
      },
    },
    methods: {
      validationForm() {
        const me = this;
        this.$refs.simpleRules.validate().then((success) => {
          if (success) {
            // this.recoverAccount();
            if (me.status) {
              me.captchaErr = '';

              me.recoverAccount();
            } else {
              me.captchaErr = 'Captcha check required  ';
            }
          }
        });
      },
      onCaptchaVerified(response) {
        this.captcha = response;
        this.status = true;
      },
      onCaptchaExpired() {
        this.status = false;
        this.$refs.recaptcha.reset();
      },
      async recoverAccount() {
        this.isLoading = true;

        const res = await new APIService().api(
          { method: 'post', url: 'user/recoverAccount' },
          { email: this.userEmail, recaptchaResponse: this.captcha },
          {},
        );
        if (res && res.message) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: res.message,
              icon: 'EditIcon',
              variant: 'success',
            },
          });
          this.$router.push({
            name: 'home',
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
    },
  };
</script>

<style lang="scss">
  @import '@core/scss/vue/pages/page-auth.scss';
  @import '@core/scss/vue/pages/all-pages.scss';
  @import '@core/scss/vue/pages/page-pricing.scss';
</style>

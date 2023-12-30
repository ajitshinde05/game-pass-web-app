<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Left Text-->
      <ForgotPasswordImage />

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
                label="Enter Mobile Number"
                label-for="mobile-number"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Mobile Number"
                  rules="required|regex:^[0-9]{10}$"
                >
                  <b-form-input
                    type="number"
                    id="mobile-number"
                    v-model="mobileNumber"
                    :state="errors.length > 0 ? false : null"
                    name="mobile-number"
                    placeholder="Enter Mobile Number"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-button
                :disabled="isLoading"
                type="submit"
                variant="primary"
                block
              >
                {{ $t('ForgotPassword.Send') }}
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
        </b-col>
      </b-col>
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

  import ForgotPasswordImage from '@/@core/components/ImagesComponent/ForgotPasswordImage.vue';
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
      ForgotPasswordImage,
      Loader,
    },
    directives: {
      Ripple,
    },
    data() {
      return {
        isLoading: false,
        mobileNumber: '',
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
            this.recoverAccount();
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
          { method: 'POST', url: `auth/send-otp/+91${this.mobileNumber}` },
          {},
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
            name: 'code-verify',
            params: { username: this.mobileNumber },
          });
        } else if (res && res.error && res.error.message) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: res.error.message,
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

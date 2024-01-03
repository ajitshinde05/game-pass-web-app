<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Left Text-->

      <VerificationCodeImage
        :srcImg="require('@/assets/images/pages/login/password-updated.svg')"
      />
      <!-- /Left Text-->

      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5 card-padding"
      >
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title
            title-tag="h1"
            class="frogot-password-card-title font-weight-bold mb-3 d-flex align-items-center justify-content-center"
          >
            {{ $t('PasswordUpdated.PasswordUpdated') }}
          </b-card-title>
          <b-card-text class="mb-2">
            {{
              $t('PasswordUpdated.PasswordUpdatedInstructions', {
                mobile: `46577`,
              })
            }}
          </b-card-text>

          <p class="text-center mt-2">
            <b-link
              :to="{
                name: 'auth-login',
                params: { lang: this.lang || undefined },
              }"
            >
              <feather-icon icon="ChevronLeftIcon" />
              {{ $t('PasswordUpdated.BackToLogin') }}
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

  import VerificationCodeImage from '@/@core/components/ImagesComponent/VerificationCodeImage.vue';
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
      VerificationCodeImage,
      Loader,
    },
    directives: {
      Ripple,
    },
    data() {
      return {
        isLoading: false,
        mobileNumber: 1000101011,
        time: 30,
        sideImg: require('@/assets/images/pages/forgot-password-v2.svg'),
        status: false,
        captchaErr: '',
        captcha: '',
        otpDigits: Array(6).fill(''),
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
      handleInput(index) {
        // Move to the next input field when a digit is entered
        if (this.otpDigits[index] !== '' && index < this.otpDigits.length - 1) {
          this.$refs[`otpInput${index + 1}`][0].focus();
        }
      },
      validationForm() {
        const me = this;
        this.$refs.simpleRules.validate().then((success) => {
          if (success) {
            this.recoverAccount();
            // if (me.status) {
            //   me.captchaErr = '';

            //   me.recoverAccount();
            // } else {
            //   me.captchaErr = 'Captcha check required';
            // }
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
          { username: this.mobileNumber },
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

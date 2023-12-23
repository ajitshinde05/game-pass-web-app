<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-card-title class="mb-1 text-center">
          <h2>{{ message }} ✉️</h2>
        </b-card-title>

        <b-card-text
          v-if="message !== 'Account verification failed'"
          class="text-center mt-2"
        >
          <p class="text-center mt-2">
            <b-link
              :to="{
                name: 'auth-login',
                params: { lang: this.lang || undefined },
              }"
            >
              <feather-icon icon="ChevronLeftIcon" />
              Go to login
            </b-link>
          </p>
        </b-card-text>
        <b-card-text v-else class="text-center mt-2">
          <p class="text-center mt-2">
            {{ error }}
          </p>
        </b-card-text>
      </b-card>
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
              Copyright &copy;{{ new Date().getFullYear() }} All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
  import { ValidationProvider, ValidationObserver } from 'vee-validate';
  import {
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BCard,
    BLink,
    BCardTitle,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
  } from 'bootstrap-vue';

  import { required, email } from '@validations';
  import { togglePasswordVisibility } from '@core/mixins/ui/forms';
  import useJwt from '@/auth/jwt/useJwt';
  import APIService from '@/libs/api/api.js';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
  import { created } from 'vue-echarts';

  export default {
    components: {
      // BSV
      BButton,
      BForm,
      BFormInput,
      BFormGroup,
      BCard,
      BCardTitle,
      BLink,
      BCardText,
      BInputGroup,
      BInputGroupAppend,
      BFormCheckbox,
      ValidationProvider,
      ValidationObserver,
    },
    mixins: [togglePasswordVisibility],
    data() {
      return {
        message: '',
        error: '',
        // validation rules
        lang: this.$route.params.lang,
        required,
        email,
      };
    },

    computed: {
      passwordToggleIcon() {
        return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon';
      },
    },
    async created() {
      if (this.$route.params.id) {
        localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName);
        localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName);
        localStorage.removeItem('username');
        localStorage.removeItem('requestPointBalance');
        // Remove userData from localStorage
        localStorage.removeItem('userData');

        const res = await new APIService().api(
          { method: 'GET', url: `user/verify/${this.$route.params.id}` },
          {},
          {},
        );

        if (res && res.result && res.result.requestStatus === 'COMPLETED') {
          this.message = 'Account verification successful.';
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
          this.message = 'Account verification failed';

          this.error = res.result.errors[0].message;
        } else {
          this.error = '';
          this.message = 'Email verification failed';
        }
      } else {
        this.$router.push({
          name: 'auth-login',
          params: { lang: this.lang || undefined },
        });
      }
    },
  };
</script>

<style lang="scss">
  @import '@core/scss/vue/pages/page-auth.scss';
</style>

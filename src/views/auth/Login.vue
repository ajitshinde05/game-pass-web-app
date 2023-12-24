<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner ml-0">
      <!-- Left Text-->
      <PricingPlans />
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title
            title-tag="h1"
            class="Login-card-title font-weight-bold mb-3 d-flex align-items-center justify-content-center"
          >
            {{ $t('Login.Title') }}
          </b-card-title>
          <b-card-text class="mb-2">
            {{ $t('Login.Subtitle') }}
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form class="auth-login-form mt-2" @submit.prevent>
              <!-- email -->
              <b-form-group
                class="font-weight-bold"
                label="Email"
                label-for="login-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <b-form-input
                    id="login-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false : null"
                    name="login-email"
                    placeholder="john@example.com"
                    autocomplete="username"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="font-weight-bold d-flex justify-content-between">
                  <label for="login-password">
                    {{ $t('Login.PasswordLabel') }}
                  </label>
                  <b-link
                    :to="{
                      name: 'auth-forgot',
                      params: { lang: this.lang || undefined },
                    }"
                  >
                    <small>{{ $t('Login.ForgotPassword') }}</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="············"
                      autocomplete="current-password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  {{ $t('Login.RememberMe') }}
                </b-form-checkbox>
              </b-form-group>

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="isLoading"
                @click="validationForm"
              >
                {{ $t('Login.LoginBtn') }}
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <span>{{ $t('Login.NewOnPlatform') }}</span>
            <b-link
              :to="{
                name: 'auth-register',
                params: { lang: lang || undefined },
              }"
              @click="tracking('SIGNUP', {})"
            >
              <span>&nbsp;{{ $t('Login.CreateAccountBtn') }}</span>
            </b-link>
          </b-card-text>
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
                  {{ $t('Login.AllRightsReserved') }}
                </p>
              </div>
            </div>
          </footer>
        </b-col>
      </b-col>
      <!-- /Login-->
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
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
  } from 'bootstrap-vue';
  import { required, email } from '@validations';
  import { togglePasswordVisibility } from '@core/mixins/ui/forms';
  import store from '@/store/index';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
  import APIService from '@/libs/api/api';
  import useJwt from '@/auth/jwt/useJwt';
  import Ripple from 'vue-ripple-directive';
  import PricingPlans from '@core/components/PricingPlans/pricingplans.vue';
  import Loader from '@/layouts/components/Loader.vue';
  import tracking from '@/utils/tracking';

  export default {
    components: {
      BRow,
      BCol,
      BLink,
      BFormGroup,
      BFormInput,
      BInputGroupAppend,
      BInputGroup,
      BFormCheckbox,
      BCardText,
      BCardTitle,
      BImg,
      BForm,
      BButton,
      ValidationProvider,
      ValidationObserver,
      PricingPlans,
      Loader,
    },
    directives: {
      Ripple,
    },
    mixins: [togglePasswordVisibility],
    data() {
      return {
        isLoading: false,
        status: '',
        password: '',
        userEmail: '',
        sideImg: require('@/assets/images/pages/login-v3.svg'),
        lang: this.$route.params.lang,
        // validation rulesimport store from '@/store/index'
        required,
        email,
      };
    },
    computed: {
      passwordToggleIcon() {
        return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon';
      },
      imgUrl() {
        if (store.state.appConfig.layout.skin === 'dark') {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.sideImg = require('@/assets/images/pages/login-v3.svg');
          return this.sideImg;
        }
        return this.sideImg;
      },
    },
    methods: {
      validationForm() {
        this.$refs.loginValidation.validate().then((success) => {
          if (success) {
            this.login();
          }
        });
      },
      async login() {
        this.$router.push({
          name: 'home',
          params: { lang: this.lang || undefined },
        });
        return;
        this.isLoading = true;
        const res = await new APIService().api(
          { method: 'post', url: 'user/login' },
          { username: this.userEmail, password: this.password },
          {},
        );

        if (res && res.token) {
          tracking('LOGIN', {});
          localStorage.setItem(
            useJwt.jwtConfig.storageTokenKeyName,
            res.token.accessToken,
          );
          if (res.userInfo.username)
            localStorage.setItem('username', res.userInfo.username);
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
  .pricing-card-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .we {
    background-image: src('@/assets/images/pages/login-v3.svg');
  }
  .card-margin {
    margin-left: 50px;
  }
</style>

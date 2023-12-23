<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Left Text-->
      <PricingPlans />
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title
            title-tag="h1"
            class="register-card-title font-weight-bold mb-3 d-flex align-items-center justify-content-center"
          >
            {{ $t('Register.CreateAccount') }}
          </b-card-title>
          <b-card-text class="mb-2">
            {{ $t('Register.PleaseSignin') }}
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
                  :rules="{
                    required: true,
                    email: true,
                    regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  }"
                >
                  <b-form-input
                    id="register-email"
                    v-model="username"
                    :state="errors.length > 0 ? false : null"
                    name="register-email"
                    placeholder="john@example.com"
                    autocomplete="off"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="font-weight-bold d-flex justify-content-between">
                  <label for="login-password">
                    {{ $t('Register.Password') }}
                  </label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="register-password"
                      placeholder="············"
                      autocomplete="off"
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
              <b-form-group>
                <div class="font-weight-bold d-flex justify-content-between">
                  <label for="confirmPassword">
                    {{ $t('Register.ConfirmPassword') }}
                  </label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="confirmPassword"
                  rules="required|confirmed:password"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="confirmPassword"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      :placeholder="$t('Register.ConfirmPasswordPlaceholder')"
                      autocomplete="off"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">
                    {{ errors[0] }}
                  </small>
                </validation-provider>
              </b-form-group>
              <!-- submit buttons -->
              <b-button
                class="text-center mt-2"
                type="submit"
                variant="primary"
                block
                :disabled="isLoading"
                @click="validationForm"
              >
                {{ $t('Register.CreateAccount') }}
              </b-button>
            </b-form>
          </validation-observer>

          <b-card-text class="text-center mt-2">
            <span>{{ $t('Register.AlreadyHaveAccount') }}</span>
            <b-link
              :to="{
                name: 'auth-login',
                params: { lang: this.lang || undefined },
              }"
            >
              <span>&nbsp;{{ $t('Register.SigninAccount') }}</span>
            </b-link>
          </b-card-text>
          <footer class="page-footer font-small blue mt-4 pt-2">
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
                  {{ $t('Register.AllRightsReserved') }}
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
  import APIService from '@/libs/api/api.js';
  import useJwt from '@/auth/jwt/useJwt';
  import PricingPlans from '@core/components/PricingPlans/pricingplans.vue';
  import Loader from '@/layouts/components/Loader.vue';
  import tracking from '@/utils/tracking';
  import { regex } from 'vee-validate/dist/rules';

  export default {
    components: {
      BRow,
      BCol,
      BLink,
      BFormGroup,
      BFormInput,
      BInputGroupAppend,
      BInputGroup,
      BCardText,
      BCardTitle,
      BFormCheckbox,
      BImg,
      BForm,
      BButton,
      ValidationProvider,
      ValidationObserver,
      PricingPlans,
      Loader,
    },
    mixins: [togglePasswordVisibility],
    data() {
      return {
        isLoading: false,
        status: '',
        password: null,
        confirmPassword: null,
        username: null,
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
            this.registerAccount();
          }
        });
      },
      async registerAccount() {
        this.isLoading = true;
        const res = await new APIService().api(
          { method: 'post', url: 'user/signup' },
          { username: this.username, password: this.password },
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
          tracking('SIGNUP', {});
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
</style>

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
            class="New-Password-card-title font-weight-bold mb-3 d-flex align-items-center justify-content-center"
          >
            {{ $t('SetNewPassword.Title') }}
          </b-card-title>
          <b-card-text class="mb-2">
            {{ $t('SetNewPassword.Subtitle') }}
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form class="auth-login-form mt-2" @submit.prevent>
              <!-- forgot password -->
              <b-form-group>
                <div class="font-weight-bold d-flex justify-content-between">
                  <label for="set-new-password">
                    {{ $t('SetNewPassword.NewPasswordLabel') }}
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
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldTypeNew"
                      name="set-new-password"
                      placeholder="············"
                      autocomplete="new-password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIconNew"
                        @click="togglePasswordNew"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group>
                <div class="font-weight-bold d-flex justify-content-between">
                  <label for="set-new-password">
                    {{ $t('SetNewPassword.ConfirmPasswordLabel') }}
                  </label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Confirm Password"
                  rules="required|confirmed:password"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      v-model="confirmPassword"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldTypeRetype"
                      name="set-new-password"
                      placeholder="············"
                      autocomplete="new-password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIconRetype"
                        @click="togglePasswordRetype"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">
                    {{
                      errors[0] ===
                      'The Confirm Password field confirmation does not match'
                        ? 'The new password field and confirm password field does not match'
                        : errors[0]
                    }}
                  </small>
                </validation-provider>
              </b-form-group>
              <!-- submit buttons -->
              <b-button
                class="text-center mt-2"
                type="submit"
                variant="primary"
                :disabled="isLoading"
                block
                @click="validationForm"
              >
                {{ $t('SetNewPassword.SubmitButtonLabel') }}
              </b-button>
            </b-form>
          </validation-observer>
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
                  {{ $t('SetNewPassword.AllRightsReserved') }}
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
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
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
  import PricingPlans from '@core/components/PricingPlans/pricingplans.vue';
  import Loader from '@/layouts/components/Loader.vue';

  export default {
    components: {
      BRow,
      BCol,
      BFormGroup,
      BFormInput,
      BInputGroupAppend,
      BInputGroup,
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
    mixins: [togglePasswordVisibility],
    data() {
      return {
        isLoading: false,
        status: '',
        password: '',
        userEmail: '',
        confirmPassword: '',
        sideImg: require('@/assets/images/pages/login-v3.svg'),
        passwordFieldTypeNew: 'password',
        passwordFieldTypeRetype: 'password',
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
      passwordToggleIconNew() {
        return this.passwordFieldTypeNew === 'password'
          ? 'EyeIcon'
          : 'EyeOffIcon';
      },
      passwordToggleIconRetype() {
        return this.passwordFieldTypeRetype === 'password'
          ? 'EyeIcon'
          : 'EyeOffIcon';
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
    created() {
      this.verifyAccountToken();
    },

    methods: {
      togglePasswordNew() {
        this.passwordFieldTypeNew =
          this.passwordFieldTypeNew === 'password' ? 'text' : 'password';
      },
      togglePasswordRetype() {
        this.passwordFieldTypeRetype =
          this.passwordFieldTypeRetype === 'password' ? 'text' : 'password';
      },
      validationForm() {
        this.$refs.loginValidation.validate().then((success) => {
          if (success) {
            if (this.$route.params.token) {
              this.setPassword();
            }
          }
        });
      },
      async verifyAccountToken() {
        this.isLoading = true;
        const res = await new APIService().api(
          {
            method: 'GET',
            url: `user/verifyAccountToken/${this.$route.params.token}`,
          },
          {},
          {},
        );

        if (
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
          this.$router.push({
            name: 'home',
            params: { lang: this.lang || undefined },
          });
        }
        this.isLoading = false;
      },
      async setPassword() {
        this.isLoading = true;
        const res = await new APIService().api(
          { method: 'post', url: 'user/resetPassword' },
          { token: this.$route.params.token, password: this.password },
          {},
        );
        if (res && res.result && res.result.requestStatus === 'COMPLETED') {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Your password has been reset successfully',
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
</style>

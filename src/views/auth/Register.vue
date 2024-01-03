<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Left Text-->
      <LoginImage />
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
                label="Name"
                label-for="login-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Name"
                  :rules="{
                    required: true,
                  }"
                >
                  <b-form-input
                    id="name"
                    v-model="name"
                    :state="errors.length > 0 ? false : null"
                    name="name"
                    placeholder="Enter Name"
                    autocomplete="off"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
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
                  }"
                >
                  <b-form-input
                    id="register-email"
                    v-model="emailId"
                    :state="errors.length > 0 ? false : null"
                    name="register-email"
                    placeholder="Enter email id"
                    autocomplete="off"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                class="font-weight-bold"
                label="Age"
                label-for="age"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Age"
                  :rules="{ required: true, ValidAge: true }"
                >
                  <b-form-input
                    type="number"
                    id="age"
                    v-model="age"
                    :state="errors.length > 0 ? false : null"
                    name="age"
                    placeholder="Enter Age"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
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
              <span>&nbsp;{{ $t('Register.Login') }}</span>
            </b-link>
          </b-card-text>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
    <Loader :show="isLoading" />
    <b-modal
      id="termsModal"
      ref="myModal"
      title="Terms and Conditions"
      centered
      hide-footer
      size="sm"
      modal-class="no-footer-modal max-higth"
    >
      <div>
        <p>
          1) Company reserves the right to suspend/void any id/bets if the same
          is found to be illegitimate. For example incase of
          vpn/robot-use/multiple entry from same IP/ multiple bets at same time
          (Punching) and others. Note : only winning bets will be voided...
        </p>
        <br />
        <p>
          2) By participating in Khelogtto games, users agree to abide by these
          terms and conditions. Users must read, understand, and accept all the
          terms before participating in the Game. If you do not agree with any
          part of these terms, please do not use our Services and you can exit
          the game/application/web application.
        </p>
        <br />
        <p>3) You are over 18 years of age.</p>
        <br />
        <p>
          4) We may amend these Terms and Conditions at any time. It is your
          responsibility to regularly review these terms for updates.
        </p>
        <br />
        <p>5) Play at own risk, it includes risk of addiction.</p>
        <br />
        <p>
          6) Past performances do not guarantee success in the future. There are
          no dead certainties when it comes to betting so only risk money that
          you can comfortable afford to lose.
        </p>
        <br />
        <p>
          7) While we do our best to find the best odds for for all of our bets
          we cannot ensure they are always accurate as betting odds fluctuate
          from one minute to the next. All odds are subject to change and were
          correct at the time of publishing.
        </p>
        <br />
        <p>
          8) Gambling involves risk. Please only gamble with funds that you can
          afford to lose.
        </p>
        <br />
        <p>
          9) Khelogtto is not answerable to any of the loss made by you in the
          game while playing.
        </p>
        <br />
        <br />
        <b-button
          class="text-center mt-2"
          type="submit"
          variant="primary"
          block
          :disabled="isLoading"
          @click="registerAccount"
        >
          {{ $t('Register.Continue') }}
        </b-button>
      </div>
    </b-modal>
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
    BVModal,
  } from 'bootstrap-vue';
  import { required, email, ValidAge } from '@validations';
  import { togglePasswordVisibility } from '@core/mixins/ui/forms';
  import store from '@/store/index';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
  import APIService from '@/libs/api/api.js';
  import LoginImage from '@/@core/components/ImagesComponent/LoginImage.vue';
  import Loader from '@/layouts/components/Loader.vue';

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
      LoginImage,
      Loader,
      BVModal,
    },
    mixins: [togglePasswordVisibility],
    data() {
      return {
        isLoading: false,
        status: '',
        password: null,
        confirmPassword: null,
        name: null,
        age: null,
        mobileNumber: null,
        emailId: null,
        sideImg: require('@/assets/images/pages/login-v3.svg'),
        lang: this.$route.params.lang,
        // validation rulesimport store from '@/store/index'
        required,
        email,
        ValidAge,
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
            this.$refs.myModal.show();
            // this.registerAccount();
          }
        });
      },
      async registerAccount() {
        this.isLoading = true;
        const res = await new APIService().api(
          { method: 'post', url: 'auth/signup' },
          {
            username: this.mobileNumber,
            name: this.name,
            password: this.password,
            email: this.emailId,
            roles: ['user'],
            age: this.age,
          },
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
            name: 'auth-login',
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
        this.$refs.myModal.hide();
        this.isLoading = false;
      },
    },
  };
</script>

<style lang="scss">
  @import '@core/scss/vue/pages/page-auth.scss';
  @import '@core/scss/vue/pages/all-pages.scss';
  .modal-dialog {
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal {
    padding-left: 1rem !important;
  }
  .max-higth {
    .modal-body {
      overflow: scroll !important;
      height: 50vh !important;
      padding: 0.8rem 1.4rem !important;
    }
  }
</style>

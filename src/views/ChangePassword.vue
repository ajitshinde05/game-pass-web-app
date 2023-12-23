<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner py-2 d-flex justify-content-center">
      <!-- Login v1 -->
      <b-card class="mb-0 Card-width-1">
        <b-card-title
          title-tag="h2"
          class="frogot-password-card-title font-weight-bold mb-3 d-flex align-items-center justify-content-center"
        >
          {{ $t('ChangePassword.Title') }}
        </b-card-title>
        <!-- form -->
        <validation-observer ref="changePassword" #default="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(changePassword)">
            <!-- 
              Keep this username field hidden, it is needed for accessibility! 
              https://www.chromium.org/developers/design-documents/create-amazing-password-forms/ 
            -->
            <input autocomplete="username" class="d-none" />
            <!-- old password -->
            <b-col md="12">
              <validation-provider
                #default="{ errors }"
                name="old password"
                rules="required"
              >
                <b-form-group
                  :label="$t('ChangePassword.CurrentPasswordLabel')"
                  label-for="account-old-password"
                >
                  <b-input-group class="input-group-merge">
                    <b-form-input
                      id="account-old-password"
                      v-model="passwordValueOld"
                      name="old-password"
                      autocomplete="current-password"
                      :type="passwordFieldTypeOld"
                      :placeholder="
                        $t('ChangePassword.CurrentPasswordPlaceholder')
                      "
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIconOld"
                        class="cursor-pointer"
                        @click="togglePasswordOld"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- new password -->
            <b-col md="12">
              <validation-provider
                #default="{ errors }"
                name="new password"
                rules="required"
              >
                <b-form-group
                  label-for="account-new-password"
                  :label="$t('ChangePassword.NewPasswordLabel')"
                >
                  <b-input-group class="input-group-merge">
                    <b-form-input
                      id="account-new-password"
                      v-model="newPasswordValue"
                      :type="passwordFieldTypeNew"
                      autocomplete="new-password"
                      name="new-password"
                      :placeholder="$t('ChangePassword.NewPasswordPlaceholder')"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIconNew"
                        class="cursor-pointer"
                        @click="togglePasswordNew"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col md="12">
              <validation-provider
                #default="{ errors }"
                name="retype new password"
                rules="required|confirmed:new password"
              >
                <b-form-group
                  label-for="account-retype-new-password"
                  :label="$t('ChangePassword.RetypeNewPasswordLabel')"
                >
                  <b-input-group class="input-group-merge">
                    <b-form-input
                      id="account-retype-new-password"
                      v-model="RetypePassword"
                      :type="passwordFieldTypeRetype"
                      name="retype-password"
                      autocomplete="new-password"
                      :placeholder="
                        $t('ChangePassword.RetypeNewPasswordPlaceholder')
                      "
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIconRetype"
                        class="cursor-pointer"
                        @click="togglePasswordRetype"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">
                    {{
                      errors[0] ===
                      'The retype new password field confirmation does not match'
                        ? 'The new password field and retype new password field does not match'
                        : errors[0]
                    }}
                  </small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <!--/ retype password -->

            <!-- buttons -->
            <b-col cols="12" class="d-flex justify-content-center">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mt-1 mr-1"
                type="submit"
                :disabled="isLoading"
              >
                {{ $t('ChangePassword.SaveBtn') }}
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                variant="outline-secondary"
                class="mt-1"
                @click="reset"
              >
                {{ $t('ChangePassword.ResetBtn') }}
              </b-button>
            </b-col>
          </b-form>
        </validation-observer>
      </b-card>
      <!-- /Login v1 -->
    </div>
    <Loader :show="isLoading" />
  </div>
</template>

<script>
  import {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BCol,
    BCard,
    BInputGroup,
    BInputGroupAppend,
    BCardTitle,
  } from 'bootstrap-vue';
  import Ripple from 'vue-ripple-directive';
  import { required } from '@validations';
  import { ValidationProvider, ValidationObserver } from 'vee-validate';
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
  import APIService from '@/libs/api/api';
  import Loader from '@/layouts/components/Loader.vue';

  export default {
    components: {
      BButton,
      BForm,
      BFormGroup,
      BCardTitle,
      BFormInput,
      BCol,
      BCard,
      BInputGroup,
      BInputGroupAppend,
      ValidationProvider,
      ValidationObserver,
      Loader,
    },
    directives: {
      Ripple,
    },
    data() {
      return {
        passwordValueOld: '',
        newPasswordValue: '',
        RetypePassword: '',
        passwordFieldTypeOld: 'password',
        passwordFieldTypeNew: 'password',
        passwordFieldTypeRetype: 'password',
        isLoading: false,
        required,
      };
    },
    computed: {
      passwordToggleIconOld() {
        return this.passwordFieldTypeOld === 'password'
          ? 'EyeIcon'
          : 'EyeOffIcon';
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
    },
    methods: {
      reset() {
        this.passwordValueOld = '';
        this.newPasswordValue = '';
        this.RetypePassword = '';
      },
      togglePasswordOld() {
        this.passwordFieldTypeOld =
          this.passwordFieldTypeOld === 'password' ? 'text' : 'password';
      },
      togglePasswordNew() {
        this.passwordFieldTypeNew =
          this.passwordFieldTypeNew === 'password' ? 'text' : 'password';
      },
      togglePasswordRetype() {
        this.passwordFieldTypeRetype =
          this.passwordFieldTypeRetype === 'password' ? 'text' : 'password';
      },
      async changePassword() {
        this.isLoading = true;
        const res = await new APIService().api(
          { method: 'post', url: 'user/changePassword' },
          {
            oldPassword: this.passwordValueOld,
            newPassword: this.newPasswordValue,
          },
          {},
        );
        if (res && res.result && res.result.requestStatus === 'COMPLETED') {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Your password has been change successfully',
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
  @import '@core/scss/vue/pages/page-pricing.scss';
</style>

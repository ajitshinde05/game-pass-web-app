<template>
  <div>
    <b-card class="card-pd-0">
      <profile-header :user="user" />
      <div class="pd-15-15">
        <b-row>
          <b-col lg="5" class="mb-3">
            <b-media no-body>
              <b-media-aside class="mr-2">
                <b-avatar variant="light-primary" size="48" class="size-24">
                  <feather-icon icon="UserIcon" />
                </b-avatar>
              </b-media-aside>
              <b-media-body class="my-auto">
                <h4 class="font-weight-bolder mb-0">
                  {{ $t("profile.Username") }}
                </h4>
                <b-card-text class="font-small-3 mb-0">
                  {{ user.username }}</b-card-text
                >
              </b-media-body>
            </b-media>
          </b-col>
          <b-col lg="5" class="mb-0 mobile-mb-3">
            <b-media no-body>
              <b-media-aside class="mr-2">
                <b-avatar variant="light-primary" size="48" class="size-24">
                  <feather-icon icon="PhoneCallIcon" />
                </b-avatar>
              </b-media-aside>
              <b-media-body class="my-auto">
                <h4 class="font-weight-bolder mb-0">
                  {{ $t("profile.PhoneNumber") }}
                </h4>
                <div class="d-felx-item align-items-center">
                  <b-card-text class="font-small-3 mb-0">
                    {{ user.mobile }}
                  </b-card-text>
                  <span
                    v-if="user.mobile_verified"
                    v-b-tooltip.hover.v-primary
                    :title="$t('profile.Mobilenumberverifted')"
                    class="verify-icon ml-l-15"
                    fluid
                  >
                    
                  </span>
                </div>
                <b-button
                  v-if="false"
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  size="sm"
                  @click="verifyMobileRequest()"
                  class="mtt-10"
                  v-b-tooltip.hover.left.v-primary
                  :title="$t('profile.ResentmobileOTP')"
                >
                  {{ $t("profile.ResendOTP") }}
                </b-button>
              </b-media-body>
            </b-media>
          </b-col>

          <b-col lg="5" class="mb-3">
            <b-media no-body>
              <b-media-aside class="mr-2">
                <b-avatar variant="light-primary" size="48" class="size-24">
                  <feather-icon icon="ClockIcon" />
                </b-avatar>
              </b-media-aside>
              <b-media-body class="my-auto">
                <h4 class="font-weight-bolder mb-0">
                  {{ $t("profile.TimeZone") }}
                </h4>
                <b-card-text class="font-small-3 mb-0">
                  {{ getTimeZone(user.timezone) }}
                </b-card-text>
              </b-media-body>
            </b-media>
          </b-col>
          <b-col lg="5" class="mb-0 mobile-mb-3">
            <b-media no-body>
              <b-media-aside class="mr-2">
                <b-avatar variant="light-primary" size="48" class="size-24">
                  <feather-icon icon="BellIcon" />
                </b-avatar>
              </b-media-aside>
              <b-media-body class="my-auto">
                <h4 class="font-weight-bolder mb-0">
                  {{ $t("profile.Notification.title") }}
                </h4>
                <div class="d-felx-item align-items-center">
                  <b-card-text class="font-small-3 mb-0">
                    {{
                      notification_status
                        ? $t("Notification.Active")
                        : $t("Notification.INACTIVE")
                    }}
                  </b-card-text>
                </div>
              </b-media-body>
            </b-media>
          </b-col>
        </b-row>
       // <div class="bg-img-profile">
        //  <ProfileBottom />
        //</div>
      </div>
      <Loader :show="showLoading" />
    </b-card>

    <b-modal
      id="modal-verify-mobile"
      centered
      modal-class="no-header-modal VerifyOTPbody"
    >
      <b-card-text>
        <div class="new-invite-modal-title">{{ $t("profile.VerifyOTP") }}</div>
        <div class="mt-2">
          <v-otp-input
            v-model="code"
            ref="otpInput"
            input-classes="otp-input"
            separator="-"
            input-type="number"
            :num-inputs="6"
            :should-auto-focus="true"
            :is-input-num="true"
            value
            class="d-flex justify-content-center"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
          />
        </div>
        <div class="d-flex justify-content-center mb-64 mtt-40">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-2 mr-1"
            @click="verifyMobile()"
          >
            {{ $t("profile.Verify") }}
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            class="mt-2"
            @click="handleClearInput()"
          >
            {{ $t("profile.Clear") }}
          </b-button>
        </div>
      </b-card-text>
    </b-modal>
  </div>
</template>

<script>
import {
  BCard,
  BCardText,
  BRow,
  BCol,
  BLink,
  BMedia,
  BMediaAside,
  BAvatar,
  BMediaBody,
  BImg,
  BButton,
  VBTooltip
} from "bootstrap-vue";
import ProfileHeader from "./ProfileHeader.vue";
import Ripple from "vue-ripple-directive";
//import PushService from "@/libs/api/push-service";
//import constants from "@/utils/constants";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import Loader from "@/layouts/components/Loader.vue";
//import AuthService from "@/libs/api/auth-service";
//import parsePhoneNumber from "libphonenumber-js";
//import image from "../../assets/images/pages/avatar.svg";
//import VerfifyIcon from "@/assets/images/icons/verfify-icon.svg";
//import ProfileBottom from "@/assets/images/pages/profile-bottom.svg";
export default {
  components: {
    BCard,
    BCardText,
    ProfileHeader,
    BRow,
    BCol,
    BMedia,
    BMediaAside,
    BAvatar,
    BLink,
    BMediaBody,
    BImg,
    BButton,
    VBTooltip,
    Loader,
    //VerfifyIcon,
    //ProfileBottom
  },
  data() {
    return {
      notification_status: false,
      user: {
        first_name: null,
        email: null,
        last_name: null,
        username: null,
        mobile: null,
        timezone: null,
        profile_pic: null
      },
      code: "",
      currentUser: null,
      showLoading: false,
      profilePic: image,
      TZoption: constants.TZStrings,
     // parsePhoneNumber: parsePhoneNumber
    };
  },
  directives: {
    "b-tooltip": VBTooltip,
    Ripple
  },
  methods: {
    handleOnComplete(value) {
      this.code = value;
    },
    handleOnChange(value) {
      this.code = value;
    },
    handleClearInput() {
      this.$refs.otpInput.clearInput();
    },
    async getUserProfile() {
      try {
        this.showLoading = true;
        //let response = await new AuthService().getUserProfile({});
        //this.showLoading = false;
        //if (response && response.data) {
         // this.currentUser = response.data;
         // this.user = Object.assign({}, response.data);
         // const phoneNumber = this.parsePhoneNumber(this.user.mobile);
        //  this.user.mobile = phoneNumber.formatInternational();
         // if ("Notification" in window) {
         //   if (!Notification || Notification.permission != "granted") {
           //   this.notification_status = false;
         //   } else {
             // this.notification_status = this.currentUser
              //  ? this.currentUser.notification_status
              //  : false;
          //  }
          //} else {
           // this.notification_status = false;
         // }
        //} else if (response && response.error && response.error.message) {
        //  this.$toast({
          //  component: ToastificationContent,
           // props: {
            //  title: response.error.title,
            //  text: response.error.message,
             // icon: "InfoIcon",
              //variant: "danger"
            //}
         // });
      //  }
      } catch (err) {
        this.showLoading = false;
        this.$toast({
          component: ToastificationContent,
          props: {
            title: err.message,
            icon: "InfoIcon",
            variant: "danger"
          }
        });
      }
    },
    getTimeZone(time) {
      const timezone = this.TZoption.filter((t) => t.value === time);
      return timezone && timezone.length ? timezone[0].label : time;
    },
    mobileNumberFormat(mobileNumber) {
      //   const phoneUtil = this.PhoneNumberUtil.getInstance();
      // const phoneNumber = parsePhoneNumber(mobileNumber);
      // if (phoneNumber) {
      //   return phoneNumber.format("NATIONAL");
      // }
    },
    async verifyMobileRequest() {
      try {
        this.show = true;
        let response = await new AuthService().verifyMobileRequest({});
        this.show = false;
        if (response && response.data) {
          this.$bvModal.show("modal-verify-mobile");
          this.$toast({
            component: ToastificationContent,
            props: {
              title: this.$t("profile.ResentmobileOTP"),
              icon: "EditIcon",
              variant: "success"
            }
          });
        } else if (response && response.error && response.error.message) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: response.error.title,
              text: response.error.message,
              icon: "InfoIcon",
              variant: "danger"
            }
          });
        }
      } catch (err) {
        this.show = false;
        this.$toast({
          component: ToastificationContent,
          props: {
            title: err.message,
            icon: "InfoIcon",
            variant: "danger"
          }
        });
      }
    },
    async verifyMobile() {
      try {
        this.show = true;
        let response = await new AuthService().verifyMobile({
          code: this.code
        });
        this.show = false;
        if (response && response.data) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: this.$t("profile.Mobilenumberverifted"),
              icon: "EditIcon",
              variant: "success"
            }
          });
          this.$bvModal.hide("modal-verify-mobile");
          this.getUserProfile();
        } else if (response && response.error && response.error.message) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: response.error.title,
              text: response.error.message,
              icon: "InfoIcon",
              variant: "danger"
            }
          });
        }
      } catch (err) {
        this.show = false;
        this.$toast({
          component: ToastificationContent,
          props: {
            title: err.message,
            icon: "InfoIcon",
            variant: "danger"
          }
        });
      }
    }
  },

  mounted() {
    this.getUserProfile();
  }
};
</script>

<style lang="scss" scoped>
//@import "./index.scss";
@import "~@core/scss/base/bootstrap-extended/_variables.scss";
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid #82868b;
  text-align: center;

  &.error {
    border: 1px solid red !important;
  }
}
.dark-layout .otp-input {
  background-color: #293046;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.new-invite-modal-title {
  font-size: 28px;
  line-height: 34px;
  text-align: center;
  color: $headings-color;
}
.d-felx-item {
  display: flex;
  flex-wrap: wrap;
}
svg.verify-svg {
  fill: var(--primary);
}
svg.verify-svg .path-1 {
  fill: var(--primary);
}
.white-fill {
  fill: var(--white);
}
</style>
<style lang="scss">
@media only screen and (max-width: 820px) {
  .VerifyOTPbody {
    .modal-body {
      min-height: 25vh !important;
    }
  }
}
</style>

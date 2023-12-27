<template>
  <div class="profile-header-class">
    <!-- profile picture -->
    <div class="position-relative">
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        v-b-tooltip.hover.v-primary
        :title="$t('tooTip.updateProfile')"
        class="btn-icon margin-left-auto float-right"
        :to="{ name: 'update-profile' }"
      >
        <feather-icon icon="EditIcon" />
      </b-button>
      <div class="row profile-img-container d-flex align-items-center">
        <div class="profile-img">
          <b-media-aside>
            <b-link>
              <b-img
                v-if="user.profile_pic"
                class="profile-pic"
                ref="previewEl"
                rounded
                :src="user.profile_pic_url"
              />

              //<AvatarImage v-if="!user.profile_pic" />
            </b-link>
            <!--/ avatar -->
          </b-media-aside>
        </div>
        <!-- profile title -->
        <div class="col-md-5 profile-title mobile-resend-link">
          <h2 class="text-gray">{{ user.first_name }} {{ user.last_name }}</h2>
          <div
            class="d-flex align-items-center"
            :class="user.email_verified ? 'verified' : ''"
          >
            <p class="text-gray mb-0">{{ user.email }}</p>
            <span
              v-if="user.email_verified"
              class="verify-icon ml-l-10"
              fluid
              v-b-tooltip.hover.v-primary
              :title="$t('profile.Emailverifted')"
            >
            
            </span>
            <b-button
              v-if="!user.email_verified"
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              size="sm"
              class="ml-l-15"
              @click="verifyEmailRequest()"
              v-b-tooltip.hover.v-primary.bottomright
              :title="
                $t('profile.Resentemailverificationlink', {
                  old_email: this.user.old_email
                })
              "
            >
              {{ $t("profile.ResendLink") }}
            </b-button>
          </div>
        </div>
        <!--/ profile title -->
      </div>
    </div>
    <!--/ profile picture -->
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BImg,
  BNavbar,
  BNavbarToggle,
  BCollapse,
  BTabs,
  BNavItem,
  BButton,
  BMedia,
  BMediaAside,
  BAvatar,
  BMediaBody,
  BLink,
  VBTooltip
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
//import AvatarImage from "@/assets/images/pages/avatar.svg";
//import AuthService from "@/libs/api/auth-service";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
//import VerfifyIcon from "@/assets/images/icons/verfify-icon.svg";
export default {
  components: {
    BRow,
    BCol,
    BCard,
    BTabs,
    BButton,
    BNavItem,
    BNavbar,
    BNavbarToggle,
    BCollapse,
    BImg,
    BMedia,
    BMediaAside,
    BAvatar,
    BMediaBody,
    BLink,
    VBTooltip,
    //VerfifyIcon,
    //AvatarImage
  },
  data() {
    return {
      downloadUrl: process.env.VUE_APP_FILE_URL
      // profilePic: AvatarImage
    };
  },
  props: ["user"],

  directives: {
    "b-tooltip": VBTooltip,
    Ripple
  },
  methods: {
    async verifyEmailRequest() {
      try {
        this.show = true;
        //let response = await new AuthService().verifyEmailRequest({
          //email: this.user.email,
          //old_email: this.user.old_email
        //});
       // this.show = false;
        //if (response && response.data) {
         // this.$toast({
         //   component: ToastificationContent,
           // props: {
             // title: this.$t("profile.EmailVerification"),
             // title: this.$t("profile.ResentEmailSuccess"),

              //icon: "EditIcon",
            //  variant: "success"
           // }
          //});
       // } else if (response && response.error && response.error.message) {
          //this.$toast({
           // component: ToastificationContent,
            //props: {
             // title: response.error.title,
             // text: response.error.message,
            //  icon: "InfoIcon",
            //  variant: "danger"
           // }
          //});
       // }
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
  }
};
</script>
<style lang="scss" scoped>
.profile-pic {
  height: 80px;
  width: 80px;
  object-fit: cover;
}
.profile-img {
  width: 100px;
}
.tooltip-inner {
  max-width: 670px;
}
// .custom-tooltip .tooltip-inner {
//   max-width: 500px; /* Remove the default max-width */
//   white-space: normal; /* Allow the tooltip content to wrap */
// }
</style>

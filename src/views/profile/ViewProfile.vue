<template>
  <div>
    <b-card class="card-100">
      <div>
        <div class="d-flex justify-content-start align-items-center mb-1 profile-bg">
          <b-avatar src="@/assets/Frame.png" size="56" class="mr-1" />
          <div class="profile-user-info">
            <div class="user-name">Name : {{ userName }}</div>
            <div class="user-desc">Mobile no : {{ mobile }}</div>

          </div>
          <!-- <b-button variant="primary" class="btn-icon ml-auto left-30" size="sm">
            <feather-icon icon="EditIcon" />
          </b-button> -->
        </div>
        <div class="profile-menu-list">
          <div class="d-flex justify-content-start align-items-center desk-50">
            <b-avatar src="@/assets/game-history.svg" class="mr-50" size="40" />
            <div class="user-page-info">
              <h6 class="mb-0" @click="gameHistory()">Game History</h6>
            </div>
            <b-button variant="primary" class="btn-icon ml-auto left-30" size="sm">
              <feather-icon icon="ChevronRightIcon" />
            </b-button>
          </div>
          <div class="d-flex justify-content-start align-items-center desk-50 disabled">
            <b-avatar src="@/assets/download.svg" class="mr-50" size="40" />
            <div class="user-page-info">
              <h6 class="mb-0">Download</h6>
            </div>
            <b-button variant="primary" class="btn-icon ml-auto left-30" size="sm">
              <feather-icon icon="ChevronRightIcon" />
            </b-button>
          </div>
          <div class="d-flex justify-content-start align-items-center desk-50 disabled">
            <b-avatar src="@/assets/invite.svg" class="mr-50" size="40" />
            <div class="user-page-info">
              <h6 class="mb-0">Invite Friend</h6>
            </div>
            <b-button variant="primary" class="btn-icon ml-auto left-30" size="sm">
              <feather-icon icon="ChevronRightIcon" />
            </b-button>
          </div>
          <a href="https://game-service-4q3r.onrender.com/api/auth/redirect/whatsapp" target="_blank">
            <div class="d-flex justify-content-start align-items-center desk-50">
              <b-avatar src="@/assets/whatapp.svg" class="mr-50" size="40" />
              <div class="user-page-info">
                <h6 class="mb-0 ">WhatsApp Support</h6>
              </div>
              <b-button variant="primary" class="btn-icon ml-auto left-30" size="sm">
                <feather-icon icon="ChevronRightIcon" />
              </b-button>
            </div>
          </a>
          <div class="d-flex justify-content-start align-items-center desk-50" @click="logOut()">
            <b-avatar src="@/assets/logout.svg" class="mr-50" size="40" />
            <div class="user-page-info">
              <h6 class="mb-0">Log out</h6>
            </div>
            <b-button variant="primary" class="btn-icon ml-auto left-30" size="sm">
              <feather-icon icon="ChevronRightIcon" />
            </b-button>
          </div>
        </div>
        <b-modal id="modal-logout" hide-footer size="sm" centered>
          <div>
            <h3 class="d-block text-center">Confirm log out</h3>
            <div class="d-block text-center">
              Get help immediately when you are  logged in.
              are sure you want to  logout?</div>
          </div>
          <b-row>
            <b-col>
              <b-button class="mt-2" type="submit" block @click=" closeModal()">
                No
              </b-button>
            </b-col>
            <b-col>
              <b-button class="mt-2" type="submit" variant="primary" block @click=" logOutFunction()">
                Yes
              </b-button>
            </b-col>
          </b-row>
        </b-modal>
      </div>
      <Tab />
    </b-card>
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
  VBTooltip,
} from 'bootstrap-vue';
import Ripple from 'vue-ripple-directive';
import Tab from '../tab.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
import APIService from '@/libs/api/api';
export default {
  components: {
    BCard,
    BCardText,
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
    Tab
  },
  data() {
    return {
      notification_status: false,
      userName: null,
      mobile: null,
      code: '',
      currentUser: null,
      showLoading: false,
    };
  },
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },
  mounted() {
    this.getUserByUserName();

  },
  methods: {
    logOutFunction() {
      new APIService().logout();
      this.closeModal();
      this.$router.push({
        name: 'auth-login',
      });
    },
    logOut() {
      this.$bvModal.show('modal-logout');
    },
    closeModal() {
      this.$bvModal.hide('modal-logout');
    },
    gameHistory() {
      this.$router.push({
        name: 'game-history',
      });
    },
    handleOnComplete(value) {
      this.code = value;
    },
    handleOnChange(value) {
      this.code = value;
    },
    handleClearInput() {
      this.$refs.otpInput.clearInput();
    },
    async getUserByUserName() {
      let userData = localStorage.getItem('userData');
      if (!userData) {
        return new APIService().logout();
      }
      userData = JSON.parse(userData);
      const res = await new APIService().api(
        { method: 'GET', url: `api/user/getUserByUserName/${userData.username}` },
        {},
        {},
      );
      if (res) {
        this.userName = res.name;
        this.mobile = userData.username
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
    },

  },
};
</script>

<style lang="scss" scoped>
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
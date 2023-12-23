<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- dark mode toggler -->
    <!-- <div
      class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex"
    >
      <dark-Toggler class="d-none d-lg-block" />
    </div> -->
    <b-navbar-brand href="#" @click="gotoHomePage">
      <b-img
        src="@/assets/images/illustration/Logo.svg"
        class="navbar-container__logo d-none d-sm-block"
        alt="crypto report logo"
      />
    </b-navbar-brand>

    <b-button
      class="rounded-pill d-sm-none"
      style="padding: 11px"
      variant="outline-primary"
      @click="
        $router
          .push({ name: 'home', params: { lang: lang || undefined } })
          .catch(() => {})
      "
    >
      <feather-icon size="20" icon="HomeIcon" />
    </b-button>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <Locale class="navbar-container__locale-select lang" />
      <b-card
        v-if="['md', 'lg', 'xl'].includes(currentBreakPoint)"
        class="d-flex cursor-pointer buy-card-div"
      >
        <div
          class="CoinCard d-flex justify-content-around align-items-center overflow-auto"
        >
          <div class="d-flex">
            <b-avatar
              size="35"
              :src="require('@/assets/images/illustration/Coin.svg')"
              alt="Meeting Pic"
              height="38"
              variant
            />
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div class="Payment-card text-align-center">
              <span class="text-warning font-weight-bolder font-medium-4">
                {{ requestPointBalance }}
              </span>
              <span
                class="align-items-center font-small-1 text-align-center Request-Point"
              >
                Request Point
              </span>
            </div>
          </div>
          <div class="vr"></div>
          <div>
            <b-link @click="tracking1()">
              <h3
                class="d-inline mr-25 font-weight-bolder font-medium-1 text-primary"
              >
                {{ $t('CoinCard.Buy') }}
              </h3>
            </b-link>
          </div>
        </div>
      </b-card>
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ username }}
            </p>
            <!-- <span class="user-status">Admin</span> -->
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            :text="username ? username[0] : ''"
            class="badge-minimal"
          />
        </template>

        <!-- <b-dropdown-item
          link-class="d-flex align-items-center"
          :to="{ name: 'pricing' }"
        >
          <feather-icon size="16" icon="FlagIcon" class="mr-50" />
          <span>Billings & Plans</span>
        </b-dropdown-item> -->
        <!-- TODO: add locale switcher for mobile navbar -->
        <b-dropdown-item>
          <div
            v-if="['xs', 'sm'].includes(currentBreakPoint)"
            class="CoinCard d-flex justify-content-around align-items-center overflow-auto"
          >
            <div class="d-flex">
              <b-avatar
                size="35"
                :src="require('@/assets/images/illustration/Coin.svg')"
                alt="Meeting Pic"
                height="38"
                variant
              />
            </div>
            <div class="d-flex justify-content-center align-items-center">
              <div class="Payment-card text-align-center">
                <span class="text-warning font-weight-bolder font-medium-4">
                  {{ requestPointBalance }}
                </span>
                <span
                  class="align-items-center font-small-1 text-align-center Request-Point"
                >
                  Request Point
                </span>
              </div>
            </div>
            <div class="vr"></div>
            <div>
              <b-link @click="tracking1()">
                <h3
                  class="d-inline mr-25 font-weight-bolder font-medium-1 text-primary"
                >
                  {{ $t('CoinCard.Buy') }}
                </h3>
              </b-link>
            </div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item
          link-class="d-flex align-items-center"
          :to="{ name: 'payment-history', params: { lang: lang } }"
        >
          <feather-icon size="16" icon="FileIcon" class="mr-50" />
          <span>{{ $t('NavbarDropdown.PaymentHistory') }}</span>
        </b-dropdown-item>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          :to="{ name: 'change-password', params: { lang: lang } }"
        >
          <feather-icon size="16" icon="LockIcon" class="mr-50" />
          <span>{{ $t('NavbarDropdown.Security') }}</span>
        </b-dropdown-item>

        <b-dropdown-divider />

        <b-dropdown-item link-class="d-flex align-items-center" @click="logout">
          <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
          <span>{{ $t('NavbarDropdown.Logout') }}</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
  import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
  import {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
    BCard,
    BNavbarBrand,
    BImg,
    BButton,
  } from 'bootstrap-vue';
  import APIService from '@/libs/api/api';
  import { mapState, mapMutations, mapGetters } from 'vuex';
  import tracking from '@/utils/tracking';
  import Locale from '@/@core/layouts/components/app-navbar/components/Locale.vue';
  import useJwt from '@/auth/jwt/useJwt';

  export default {
    components: {
      BLink,
      BNavbarNav,
      BNavItemDropdown,
      BDropdownItem,
      BDropdownDivider,
      BAvatar,
      BCard,
      BNavbarBrand,
      BImg,
      BButton,
      // Navbar Components
      Locale,
    },
    props: {
      toggleVerticalMenuActive: {
        type: Function,
        default: () => {},
      },
    },
    data() {
      return {
        username: '',
        lang: this.$route.params.lang,
      };
    },
    computed: {
      ...mapState('user', ['requestPointBalance']),
      ...mapGetters({ currentBreakPoint: 'app/currentBreakPoint' }),
    },

    mounted() {
      this.username = localStorage.getItem('username') || '';
      this.getRequestPointBalance();
    },

    methods: {
      tracking1() {
        tracking('PRICING_PAGE', {});
        this.$router.push({
          name: 'pricing',
          params: { lang: this.lang || undefined },
        });
      },
      gotoHomePage() {
        if (window.location.pathname === '/') {
          return;
        }
        this.$router.push({
          name: 'home',
          params: { lang: this.lang || undefined },
        });
      },
      widthBreakpointV1() {
        return window.innerWidth > 650;
      },
      ...mapMutations('user', ['setRequestPointBalance']),
      async logout() {
        localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName);
        localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName);
        localStorage.removeItem('username');
        localStorage.removeItem('requestPointBalance');
        localStorage.removeItem('userData');

        this.$router.push({
          name: 'auth-login',
          params: { lang: this.lang || undefined },
        });
      },
      async getRequestPointBalance() {
        const res = await new APIService().api(
          { method: 'GET', url: 'user/requestPointBalance' },
          {},
          {},
        );
        if (res && res.requestPointBalance) {
          this.setRequestPointBalance(res.requestPointBalance);
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
      },
    },
  };
</script>
<style lang="scss">
  .navbar-container {
    &__logo {
      height: 33px;
    }
    &__locale-select {
      margin-right: 15px;

      @media (min-width: 500px) {
        margin-right: 27px;
      }
    }
  }
</style>

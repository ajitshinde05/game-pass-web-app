<template>
  <div>
    <div id="header" class="ss fixed-top header-transparent">
      <b-navbar
        toggleable="lg"
        class="container container1 p-2 d-flex navbar-pd"
      >
        <div class="logo">
          <a href="#home" @click="checkRoute('home')">
            <img
              src="../assets/images/logo.svg"
              class="img-fluid"
              alt="sdsdfdfggg"
            />
          </a>
          <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
        </div>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <div class="mx-lg-12 d-lg-flex flex-lg-row d-flex">
              <form class="d-flex align-items-center ls-button">
                <ul>
                  <li>
                    <a
                      class="nav-link scrollTo"
                      :class="route === 'home' ? 'active' : ''"
                      href="#home"
                      @click="checkRoute('home')"
                    >
                      {{ $t('Home') }}
                    </a>
                  </li>
                  <li>
                    <a
                      class="nav-link scrollTo"
                      :class="route === 'features' ? 'active' : ''"
                      href="#features"
                      @click="checkRoute('features')"
                    >
                      {{ $t('AppFeatures') }}
                    </a>
                  </li>

                  <li>
                    <a
                      class="nav-link scrollTo"
                      :class="route === 'pricing' ? 'active' : ''"
                      href="#pricing"
                      @click="checkRoute('pricing')"
                    >
                      {{ $t('Pricing') }}
                    </a>
                  </li>

                  <li>
                    <a
                      class="nav-link scrollTo"
                      :class="route === 'contact' ? 'active' : ''"
                      href="#contact"
                      @click="checkRoute('contact')"
                    >
                      {{ $t('Contact') }}
                    </a>
                  </li>

                  <li class=" "><Locale class="lang" /></li>
                  <li>
                    <a
                      class="login_button scrollto ml-0"
                      href="https://acc.coinrex.in/auth/login"
                      @click="tracking('SIGNUP', {})"
                    >
                      {{ $t('Login') }}
                    </a>
                  </li>
                  <li>
                    <a
                      class="getstarted scrollto ml-1"
                      href="https://acc.coinrex.in/auth/register"
                      @click="tracking('SIGNUP', {})"
                    >
                      {{ $t('SignUp') }}
                    </a>
                  </li>
                </ul>
              </form>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>

    <section id="home" ref="home" class="d-flex align-items-center mt-4">
      <div class="container mt-4">
        <div class="row">
          <div
            class="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1"
            data-aos="fade-up"
          >
            <div>
              <h2 class="mobilesize">
                {{ $t('AllInOneTitle') }}
              </h2>
            </div>
            <div class="signup_button_container">
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                block
                class="signup_button"
                variant="primary"
                href="https://acc.coinrex.in/auth/register"
                @click="tracking('SIGNUP', {})"
              >
                {{ $t('SignUp') }}
              </b-button>
            </div>
          </div>
          <div
            class="col-lg-6 d-lg-flex flex-lg-column align-items-stretch order-1 order-lg-2 hero-img"
            data-aos="fade-up"
          >
            <img src="../assets/images/hero-img.png" class="img-fluid" alt="" />
          </div>
        </div>
      </div>
    </section>

    <section id="features" ref="features" class="testimonials mt-1">
      <div class="container">
        <b-col cols="12" md="12" lg="12" sm="12">
          <h3 style="text-align: center">{{ $t('AppFeatures') }}</h3>
        </b-col>

        <div class="row">
          <div class="col-lg-12">
            <!-- Indicators -->

            <!-- Wrapper for slides -->
            <div class="row align-items-center m-top1">
              <div class="col-md-5">
                <div
                  class="testimonial-item box-border"
                  style="text-align: center"
                  data-aos="fade-right"
                >
                  <img
                    src="../assets/images/monitor-address-icon.svg"
                    class="img-fluid mb-2"
                    alt=""
                  />
                  <h3>{{ $t('MonitorAddresses') }}</h3>

                  <p>
                    {{ $t('MonitorAddressesSubText') }}
                  </p>
                </div>
              </div>
              <div class="col-md-7 img-234" data-aos="fade-left">
                <img
                  src="../assets/images/monitor-address.gif"
                  width="100%"
                  height="315"
                  class="img-fluid box-border"
                  alt="GIF"
                />
              </div>
            </div>

            <div class="row align-items-center m-top">
              <div class="col-md-5">
                <div
                  class="testimonial-item info-block tex-align-center box-border"
                  style="text-align: center"
                  data-aos="fade-right"
                >
                  <img
                    src="../assets/images/cost-report-icon.svg"
                    class="img-fluid mb-2"
                    alt=""
                  />
                  <h3>{{ $t('WalletStatements') }}</h3>

                  <p>
                    {{ $t('WalletStatementsSubText') }}
                  </p>
                </div>
              </div>
              <div class="col-md-7 img-234" data-aos="fade-left">
                <img
                  src="../assets/images/wallet-statements.gif"
                  width="100%"
                  height="315"
                  class="img-fluid box-border"
                  alt="GIF"
                />
              </div>
            </div>

            <div class="row align-items-center m-top">
              <div class="col-md-5">
                <div
                  class="testimonial-item info-block tex-align-center box-border"
                  style="text-align: center"
                  data-aos="fade-right"
                >
                  <img
                    src="../assets/images/search-by-transaction-hash-icon.svg"
                    class="img-fluid mb-2"
                    alt=""
                  />
                  <h3>
                    {{ $t('CrossBlockchainTransactionSearch') }}
                  </h3>
                  <p>
                    {{ $t('CrossBlockchainTransactionSearchSubText') }}
                  </p>
                </div>
              </div>
              <div class="col-md-7 img-234" data-aos="fade-left">
                <img
                  src="../assets/images/transaction-search.gif"
                  width="100%"
                  height="315"
                  class="img-fluid box-border"
                  alt="GIF"
                />
              </div>
            </div>

            <div class="row align-items-center m-top">
              <div class="col-md-5">
                <div
                  class="testimonial-item info-block tex-align-center box-border"
                  style="text-align: center"
                  data-aos="fade-right"
                >
                  <img
                    src="../assets/images/get-balance-icon.svg"
                    class="img-fluid mb-2"
                    alt=""
                  />
                  <h3>{{ $t('WalletBalanceChecker') }}</h3>

                  <p>
                    {{ $t('WalletBalanceCheckerSubText') }}
                  </p>
                </div>
              </div>
              <div class="col-md-7 img-234" data-aos="fade-left">
                <img
                  src="../assets/images/balance-checker.gif"
                  width="100%"
                  height="315"
                  class="img-fluid box-border"
                  alt="GIF"
                />
              </div>
            </div>

            <div class="row align-items-center mt-4 m-top">
              <div class="col-md-5">
                <div
                  class="testimonial-item info-block tex-align-center box-border"
                  style="text-align: center"
                  data-aos="fade-right"
                >
                  <img
                    src="../assets/images/create-wallet-icon.svg"
                    class="img-fluid mb-2"
                    alt=""
                  />
                  <h3>{{ $t('CreateWallet') }}</h3>

                  <p>
                    {{ $t('CreateWalletSubText') }}
                  </p>
                </div>
              </div>
              <div class="col-md-7 img-234" data-aos="fade-left">
                <img
                  src="../assets/images/create-wallet.gif"
                  width="100%"
                  height="315"
                  class="img-fluid box-border"
                  alt="GIF"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="pricing" ref="pricing" class="pb-2">
      <b-container class="margin320">
        <b-row class="">
          <b-col cols="12" md="12" lg="12" sm="12">
            <h3 style="text-align: center">{{ $t('LetsPickTheBestPlan') }}</h3>
            <p class="text-muted mt-4" style="text-align: center">
              {{ $t('LetsPickTheBestPlanSubText') }}
            </p>
          </b-col>
        </b-row>

        <b-row class="mt-4 mb-4 p-2">
          <b-col
            v-for="(value, key) in plans"
            :key="key"
            md="3"
            sm="6"
            class="smallcard"
            data-aos="fade-up"
          >
            <b-card align="center" class="cardborder margincard">
              <!-- img -->
              <div class="imgsize12">
                <b-img
                  v-if="value.planName === 'Free'"
                  src="../assets/images/illustration/Pot0.svg"
                  class="mb-2 pricing-img"
                  alt="basic svg img"
                />
                <b-img
                  v-else-if="value.planName === 'Basic'"
                  src="../assets/images/illustration/Pot1.svg"
                  class="mb-2 pricing-img"
                  alt="basic svg img"
                />
                <b-img
                  v-else-if="value.planName === 'Standard'"
                  src="../assets/images/illustration/Pot2.svg"
                  class="mb-2 pricing-img"
                  alt="basic svg img"
                />
                <b-img
                  v-else-if="value.planName === 'Premimum'"
                  src="../assets/images/illustration/Pot3.svg"
                  class="mb-2 pricing-img"
                  alt="basic svg img"
                />
              </div>
              <!--/ img -->
              <div class="mt-0">
                <h3 class="free">{{ value.planName }}</h3>
                <div class="d-flex justify-content-center">
                  <b-card-text class="plans">
                    {{ $t(`${value.planName}`) }}
                  </b-card-text>
                </div>
              </div>

              <!-- annual plan -->
              <div class="annual-plan">
                <div class="plan-price mt-2">
                  <span
                    class="pricing-basic-value font-weight-bolder text-primary PricingSize"
                  >
                    {{ value.requestPoint }}
                  </span>
                  <sub
                    class="pricing-duration text-body font-medium-1 font-weight-bold"
                  >
                    <span class="font-medium-1 font-weight-bolder text-primary">
                      RP
                    </span>
                    <span class="text-muted">
                      /
                      {{
                        value.planName === 'Free'
                          ? `${$t('OnSignup')}`
                          : `${value.amount} ${value.currency}`
                      }}
                    </span>
                  </sub>
                </div>
              </div>
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                block
                class="mt-4"
                variant="primary"
                href="https://acc.coinrex.in/auth/login"
              >
                {{ $t('Buy') }}
              </b-button>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="12" lg="12" sm="12" class="mb-4">
            <p class="text-muted mt-4 italic">{{ `${$t('NOTE')}:` }}</p>
            <p class="text-muted mt-1 italic">
              {{ $t('PlanDescription') }}
            </p>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section id="contact" ref="contact" class="contact">
      <ContactUs />
    </section>
    <footer id="footer">
      <div class="container py-4">
        <div class="copyright">
          &copy; {{ $t('Copyright') }}
          <strong>
            <span>{{ $t('CryptoWatch') }}</span>
          </strong>
          . {{ $t('AllRightsReserved') }}
        </div>
      </div>
    </footer>
    <!-- End Footer -->

    <a
      href="#"
      class="back-to-top d-flex align-items-center justify-content-center"
    >
      <i class="bi bi-arrow-up-short"></i>
    </a>
  </div>
</template>
<script>
  import {
    BNavbarNav,
    BContainer,
    BCard,
    BRow,
    BCol,
    BImg,
    BCardText,
    BButton,
    BNavbarToggle,
    BCollapse,
    BNavbar,
  } from 'bootstrap-vue';
  import Ripple from 'vue-ripple-directive';
  import axios from 'axios';
  import Locale from './LocaleSelect.vue';
  import ContactUs from './contact-us.vue';
  import ToastificationContent from './toastification/ToastificationContent.vue';

  export default {
    name: 'App',
    components: {
      ContactUs,
      BNavbar,
      BNavbarNav,
      BContainer,
      BCard,
      BRow,
      BCol,
      BImg,
      BCardText,

      BButton,

      BNavbarToggle,
      BCollapse,

      Locale,
    },
    directives: {
      Ripple,
    },
    data() {
      return {
        displayedContent: '',
        displayedContent1: '',
        displayedContent2: '',
        displayedContent3: '',

        isCollapsed: false,
        isCollapsed1: false,
        isCollapsed2: false,
        isCollapsed3: false,

        readMoreActivated: false,
        plans: [],
        route: window.location.hash.substr(1) || 'home',
        scrollDirection: 'down',
      };
    },
    beforeCreate() {
      // if (!localStorage.getItem('windowReloaded')) {
      //   localStorage.setItem('windowReloaded', true);
      //   window.location.reload();
      // } else {
      //   localStorage.removeItem('windowReloaded');
      // }
    },
    mounted() {
      this.getPlans();
      this.collapseContent(55);
      this.collapseContent1(55);
      this.collapseContent2(55);
      this.collapseContent3(70);

      const options = {
        root: null, // Use the viewport as the root element
        rootMargin: '0px', // No margin
        threshold: 0.5, // 50% of the element must be visible to trigger the intersection callback
      };

      const sections = ['home', 'features', 'pricing', 'contact'];

      const observer = new IntersectionObserver(
        this.handleIntersection,
        options,
      );

      sections.forEach((section) => {
        const element = this.$refs[section];
        observer.observe(element);
      });

      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleIntersection(entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.route = entry.target.id;
          }
        });
      },
      handleScroll() {
        // Check the scroll direction
        const { scrollY } = window;
        const prevDirection = this.scrollDirection;
        this.scrollDirection = scrollY > this.scrollYPosition ? 'down' : 'up';
        this.scrollYPosition = scrollY;

        // If the scroll direction changes, update the active section
        if (this.scrollDirection !== prevDirection) {
          this.updateActiveSection();
        }
      },
      updateActiveSection() {
        const sections = ['home', 'features', 'pricing', 'contact'];

        // Find the section currently visible in the viewport
        sections.forEach((section) => {
          const element = this.$refs[section];
          const rect = element.getBoundingClientRect();
          const isInViewport =
            rect.top >= 0 && rect.bottom <= window.innerHeight;

          if (isInViewport) {
            this.route = section;
          }
        });
      },
      checkRoute(props) {
        this.route = props || 'home';
      },
      tracking(eventName, params) {
        if (process.env.NODE_ENV === 'production') {
          window.gtag('event', eventName, { ...params });
        }
      },
      activateReadMore() {
        this.readMoreActivated = true;
      },
      checkWindow() {
        return window.innerWidth < 750;
      },
      checkWindownav() {
        return window.innerWidth < 790;
      },
      collapseContent(shortenSize = 100) {
        if (window.innerWidth < 750) {
          this.displayedContent = this.content?.slice(0, shortenSize);
          this.displayedContent1 = this.content1?.slice(0, shortenSize);
        } else {
          this.displayedContent = this.content;
        }
        this.isCollapsed = !this.isCollapsed;
      },
      expandContent() {
        this.displayedContent = this.content;

        this.isCollapsed = !this.isCollapsed;
      },
      collapseContent1(shortenSize = 100) {
        if (window.innerWidth < 750) {
          this.displayedContent1 = this.content1?.slice(0, shortenSize);
        } else {
          this.displayedContent1 = this.content1;
        }
        this.isCollapsed1 = !this.isCollapsed1;
      },
      expandContent1() {
        this.displayedContent1 = this.content1;

        this.isCollapsed1 = !this.isCollapsed1;
      },
      collapseContent2(shortenSize = 100) {
        if (window.innerWidth < 750) {
          this.displayedContent2 = this.content2?.slice(0, shortenSize);
        } else {
          this.displayedContent2 = this.content2;
        }
        this.isCollapsed2 = !this.isCollapsed2;
      },
      expandContent2() {
        this.displayedContent2 = this.content2;

        this.isCollapsed2 = !this.isCollapsed2;
      },
      collapseContent3(shortenSize = 100) {
        if (window.innerWidth < 750) {
          this.displayedContent3 = this.content3?.slice(0, shortenSize);
        } else {
          this.displayedContent3 = this.content3;
        }
        this.isCollapsed3 = !this.isCollapsed3;
      },
      expandContent3() {
        this.displayedContent3 = this.content3;

        this.isCollapsed3 = !this.isCollapsed3;
      },
      async getPlans() {
        const config = {
          method: 'GET',
          url: `${process.env.VUE_APP_API}report/refdata`,
          headers: {
            'content-type': 'application/json',
          },
        };

        const res = await axios(config);

        if (res.data && res.data.requestPlans) {
          this.plans = res.data.requestPlans;
        } else if (
          res &&
          res.data.result &&
          res.data.result.errors &&
          res.data.result.errors[0].message
        ) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: res.data.result.errors[0].message,
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
      // margin-right: 15px;

      @media (min-width: 500px) {
        // margin-right: 27px;
      }
    }
  }
  @media (min-width: 700px) {
    .scrollTo {
      margin-right: 0px !important;
    }
    .scrollTo {
      margin-right: 35px !important;
    }
  }
  @import './index.scss';
</style>

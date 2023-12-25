import Vue from 'vue';
import VueRouter from 'vue-router';
import useJwt from '@/auth/jwt/useJwt';
import VueI18n from '@/libs/i18n';
import ru from '@/router/PageTitleLocales/ru';
import en from '@/router/PageTitleLocales/en';
import es from '@/router/PageTitleLocales/es';

const titleLocales = { ru, en, es };

function checkToken() {
  const isUserLoggedIn = localStorage.getItem(
    useJwt.jwtConfig.storageTokenKeyName,
  );
  return !!isUserLoggedIn;
}

// function environment(to, from, next) {
//   console.log('environment', process.env.NODE_ENV, process.env.VUE_APP_API);
//   if (process.env.NODE_ENV === 'development') {
//     // gtag("event", "Downloads", {
//     //   event_category: "MP3",
//     //   event_label: "Debussy - Clair de lune"
//     // });
//     // window.dataLayer = window.dataLayer || [];
//     // function gtag() {
//     //   dataLayer.push(arguments);
//     // }
//     // gtag("js", new Date());
//     // gtag("config", "G-PGXHVVXR97");
//     window.dataLayer = window.dataLayer || [];

//     function gtag() {
//       dataLayer.push(arguments);
//     }

//     gtag('event', 'LANDING_LOGIN', {});
//   }
// }
const LANGUAGES_STRING = ':lang(en|es|ru)?';
async function protectedRoute(to, from, next) {
  if (checkToken()) {
    // environment(to, from, next);
    next();
  } else next('/auth/login');
}

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: `/${LANGUAGES_STRING}`,
      name: 'home',
      beforeEnter: protectedRoute,
      component: () => import('@/views/Home.vue'),
      children: [
        {
          path: '',
          name: 'home',
          beforeEnter: protectedRoute,
          component: () => import('@/views/Home.vue'),
          meta: {
            pageTitle: 'Home',
            breadcrumb: [
              {
                text: 'Home',
                active: true,
              },
            ],
          },
        },
      ],
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },

    {
      path: `/${LANGUAGES_STRING}/tx-cost-report`,
      name: 'tx-cost-report',
      beforeEnter: protectedRoute,
      component: () => import('@/views/TxCostReport/TxCostReportPage.vue'),
      meta: {
        pageTitle: 'TxCostReport',
        breadcrumb: [
          {
            text: 'TxCostReport',
            active: true,
          },
        ],
      },
    },
    {
      path: '/tx-cost-report',
      name: 'tx-cost-report',
      beforeEnter: protectedRoute,
      component: () => import('@/views/TxCostReport/TxCostReportPage.vue'),
      meta: {
        pageTitle: 'TxCostReport',
        breadcrumb: [
          {
            text: 'TxCostReport',
            active: true,
          },
        ],
      },
    },

    {
      //  TODO: START FROM HERE
      path: `/${LANGUAGES_STRING}/search-transaction-details`,
      name: 'search-transaction-details',
      beforeEnter: protectedRoute,
      component: () => import('@/views/SearchTransactionDetails.vue'),
      meta: {
        pageTitle: 'TransactionDetails',
        breadcrumb: [
          {
            text: 'TransactionDetails',
            active: true,
          },
        ],
      },
    },
    {
      //  TODO: START FROM HERE
      path: '/search-transaction-details',
      name: 'search-transaction-details',
      beforeEnter: protectedRoute,
      component: () => import('@/views/SearchTransactionDetails.vue'),
      meta: {
        pageTitle: 'TransactionDetails',
        breadcrumb: [
          {
            text: 'TransactionDetails',
            active: true,
          },
        ],
      },
    },
    {
      path: `/${LANGUAGES_STRING}/balance-report`,
      name: 'balance-report',
      beforeEnter: protectedRoute,
      component: () => import('@/views/BalanceReport/BalanceReportPage.vue'),
      meta: {
        pageTitle: 'BalanceReport',
        breadcrumb: [
          {
            text: 'BalanceReport',
            active: true,
          },
        ],
      },
    },
    {
      path: '/balance-report',
      name: 'balance-report',
      // beforeEnter: protectedRoute,
      component: () => import('@/views/BalanceReport/BalanceReportPage.vue'),
      meta: {
        pageTitle: 'BalanceReport',
        breadcrumb: [
          {
            text: 'BalanceReport',
            active: true,
          },
        ],
      },
    },
    {
      path: `/${LANGUAGES_STRING}/create-wallet`,
      name: 'create-wallet',
      beforeEnter: protectedRoute,
      component: () => import('@/views/CreateWallet.vue'),
      meta: {
        pageTitle: 'CreateWallet',
        breadcrumb: [
          {
            text: 'CreateWallet',
            active: true,
          },
        ],
      },
    },
    {
      path: '/create-wallet',
      name: 'create-wallet',
      beforeEnter: protectedRoute,
      component: () => import('@/views/CreateWallet.vue'),
      meta: {
        pageTitle: 'CreateWallet',
        breadcrumb: [
          {
            text: 'CreateWallet',
            active: true,
          },
        ],
      },
    },
    {
      path: `/${LANGUAGES_STRING}/pricing`,
      name: 'pricing',
      beforeEnter: protectedRoute,
      component: () => import('@/views/Pricing/Pricing.vue'),
      meta: {
        pageTitle: 'Pricing',
        breadcrumb: [
          {
            text: 'Pricing',
            active: true,
          },
        ],
      },
    },
    {
      path: '/pricing',
      name: 'pricing',
      beforeEnter: protectedRoute,
      component: () => import('@/views/Pricing/Pricing.vue'),
      meta: {
        pageTitle: 'Pricing',
        breadcrumb: [
          {
            text: 'Pricing',
            active: true,
          },
        ],
      },
    },
    {
      path: `/${LANGUAGES_STRING}/change-password`,
      name: 'change-password',
      beforeEnter: protectedRoute,
      component: () => import('@/views/ChangePassword.vue'),
      meta: {
        pageTitle: 'ChangePassword',
        breadcrumb: [
          {
            text: 'ChangePassword',
            active: true,
          },
        ],
      },
    },
    {
      path: '/change-password',
      name: 'change-password',
      beforeEnter: protectedRoute,
      component: () => import('@/views/ChangePassword.vue'),
      meta: {
        pageTitle: 'ChangePassword',
        breadcrumb: [
          {
            text: 'ChangePassword',
            active: true,
          },
        ],
      },
    },
    {
      path: `/${LANGUAGES_STRING}/auth/verify-account/:id`,
      name: 'verify-account',
      component: () => import('@/views/auth/VerifyAccount.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/auth/verify-account/:id',
      name: 'verify-account',
      component: () => import('@/views/auth/VerifyAccount.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: `/${LANGUAGES_STRING}/payment-method/:id`,
      name: 'payment-method',
      beforeEnter: protectedRoute,
      component: () => import('@/views/Pricing/SelectYourPaymentMethod.vue'),
      meta: {
        pageTitle: 'PaymentMethod',
        breadcrumb: [
          {
            text: 'PaymentMethod',
            active: true,
          },
        ],
      },
    },
    {
      path: '/payment-method/:id',
      name: 'payment-method',
      beforeEnter: protectedRoute,
      component: () => import('@/views/Pricing/SelectYourPaymentMethod.vue'),
      meta: {
        pageTitle: 'PaymentMethod',
        breadcrumb: [
          {
            text: 'PaymentMethod',
            active: true,
          },
        ],
      },
    },
    {
      path: `/${LANGUAGES_STRING}/payment/:id`,
      name: 'payment',
      beforeEnter: protectedRoute,
      component: () => import('@/views/Pricing/PaymentPage.vue'),
      meta: {
        pageTitle: 'Payment',
        breadcrumb: [
          {
            text: 'Payment',
            active: true,
          },
        ],
      },
    },
    {
      path: '/payment/:id',
      name: 'payment',
      beforeEnter: protectedRoute,
      component: () => import('@/views/Pricing/PaymentPage.vue'),
      meta: {
        pageTitle: 'Payment',
        breadcrumb: [
          {
            text: 'Payment',
            active: true,
          },
        ],
      },
    },
    // {
    //   path: `/${LANGUAGES_STRING}/payment-history`,
    //   name: 'payment-history',
    //   beforeEnter: protectedRoute,
    //   component: () => import('@/views/PaymentHistoryPage.vue'),
    //   meta: {
    //     pageTitle: 'PaymentList',
    //     breadcrumb: [
    //       {
    //         text: 'PaymentList',
    //         active: true,
    //       },
    //     ],
    //   },
    // },
    // {
    //   path: '/payment-history',
    //   name: 'payment-history',
    //   beforeEnter: protectedRoute,
    //   component: () => import('@/views/PaymentHistoryPage.vue'),
    //   meta: {
    //     pageTitle: 'PaymentList',
    //     breadcrumb: [
    //       {
    //         text: 'PaymentList',
    //         active: true,
    //       },
    //     ],
    //   },
    // },
    {
      path: `/${LANGUAGES_STRING}/generate-tx-cost-report`,
      name: 'generate-tx-cost-report',
      beforeEnter: protectedRoute,
      component: () => import('@/views/TxCostReport/GenerateTxCostReport.vue'),
      meta: {
        pageTitle: 'GenerateTxCostReport',
        breadcrumb: [
          {
            text: 'GenerateTxCostReport',
            active: true,
          },
        ],
      },
    },
    {
      path: '/generate-tx-cost-report',
      name: 'generate-tx-cost-report',
      beforeEnter: protectedRoute,
      component: () => import('@/views/TxCostReport/GenerateTxCostReport.vue'),
      meta: {
        pageTitle: 'GenerateTxCostReport',
        breadcrumb: [
          {
            text: 'GenerateTxCostReport',
            active: true,
          },
        ],
      },
    },

    {
      path: `/${LANGUAGES_STRING}/monitor-address`,
      name: 'monitor-address',
      beforeEnter: protectedRoute,
      component: () => import('@/views/MonitorAddress/MonitorAddress.vue'),
      meta: {
        pageTitle: 'MonitorAddress',
        breadcrumb: [
          {
            text: 'MonitorAddress',
            active: true,
          },
        ],
      },
    },
    {
      path: '/monitor-address',
      name: 'monitor-address',
      beforeEnter: protectedRoute,
      component: () => import('@/views/MonitorAddress/MonitorAddress.vue'),
      meta: {
        pageTitle: 'MonitorAddress',
        breadcrumb: [
          {
            text: 'MonitorAddress',
            active: true,
          },
        ],
      },
    },
    {
      path: `/${LANGUAGES_STRING}/add-monitor-address`,
      name: 'add-monitor-address',
      beforeEnter: protectedRoute,
      component: () =>
        import('@/views/MonitorAddress/AddMonitorAddressReport.vue'),
      meta: {
        pageTitle: 'AddMonitorAddress',
        breadcrumb: [
          {
            text: 'AddMonitorAddress',
            active: true,
          },
        ],
      },
    },
    {
      path: '/add-monitor-address',
      name: 'add-monitor-address',
      beforeEnter: protectedRoute,
      component: () =>
        import('@/views/MonitorAddress/AddMonitorAddressReport.vue'),
      meta: {
        pageTitle: 'AddMonitorAddress',
        breadcrumb: [
          {
            text: 'AddMonitorAddress',
            active: true,
          },
        ],
      },
    },
    {
      path: `/${LANGUAGES_STRING}/edit-monitor-address/:id`,
      name: 'edit-monitor-address',
      beforeEnter: protectedRoute,
      component: () =>
        import('@/views/MonitorAddress/AddMonitorAddressReport.vue'),
      meta: {
        pageTitle: 'EditMonitorAddress',
        breadcrumb: [
          {
            text: 'EditMonitorAddress',
            active: true,
          },
        ],
      },
    },
    {
      path: '/edit-monitor-address/:id',
      name: 'edit-monitor-address',
      beforeEnter: protectedRoute,
      component: () =>
        import('@/views/MonitorAddress/AddMonitorAddressReport.vue'),
      meta: {
        pageTitle: 'EditMonitorAddress',
        breadcrumb: [
          {
            text: 'EditMonitorAddress',
            active: true,
          },
        ],
      },
    },
    {
      path: `/game-history`,
      name: 'game-history',
      component: () => import('@/views/GameHistoryPage.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: `/withdrawal`,
      name: 'withdrawal',
      component: () => import('@/views/withdrawal/WithDrawal.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: `/view-profile`,
      name: 'view-history',
      component: () => import('@/views/profile/ViewProfile.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: `/${LANGUAGES_STRING}/auth/login`,
      name: 'auth-login',
      beforeEnter(to, from, next) {
        if (checkToken()) {
          next('/');
        } else next();
      },
      component: () => import('@/views/auth/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/auth/login',
      name: 'auth-login',
      beforeEnter(to, from, next) {
        if (checkToken()) {
          next('/');
        } else next();
      },
      component: () => import('@/views/auth/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: `/${LANGUAGES_STRING}/auth/register`,
      name: 'auth-register',
      beforeEnter(to, from, next) {
        if (checkToken()) {
          next('/');
        } else next();
      },
      component: () => import('@/views/auth/Register.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/auth/register',
      name: 'auth-register',
      beforeEnter(to, from, next) {
        if (checkToken()) {
          next('/');
        } else next();
      },
      component: () => import('@/views/auth/Register.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: `/${LANGUAGES_STRING}/auth/forgot`,
      name: 'auth-forgot',
      beforeEnter(to, from, next) {
        if (checkToken()) {
          next('/');
        } else next();
      },
      component: () => import('@/views/auth/ForgotPassword.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/auth/forgot',
      name: 'auth-forgot',
      beforeEnter(to, from, next) {
        if (checkToken()) {
          next('/');
        } else next();
      },
      component: () => import('@/views/auth/ForgotPassword.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: `/${LANGUAGES_STRING}/auth/reset-password/:token`,
      name: 'auth-reset-password',
      beforeEnter(to, from, next) {
        if (checkToken()) {
          next('/');
        } else next();
      },
      component: () => import('@/views/auth/SetNewPassword.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/auth/reset-password/:token',
      name: 'auth-reset-password',
      beforeEnter(to, from, next) {
        if (checkToken()) {
          next('/');
        } else next();
      },
      component: () => import('@/views/auth/SetNewPassword.vue'),
      meta: {
        layout: 'full',
      },
    },

    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg');
  if (appLoading) {
    appLoading.style.display = 'none';
  }
});

router.beforeEach((to, form, next) => {
  const currentLocale = VueI18n.vm.locale;

  // Dynamic assign page title
  const newTitle =
    titleLocales[currentLocale][to.name] ||
    titleLocales[currentLocale].DEFAULT_TITLE;

  document.title = newTitle;

  document
    .querySelector('meta[property="og:title"]')
    .setAttribute('content', newTitle);

  next();
});

export default router;

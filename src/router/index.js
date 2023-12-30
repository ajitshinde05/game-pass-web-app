import Vue from 'vue';
import VueRouter from 'vue-router';
import useJwt from '@/auth/jwt/useJwt';
import VueI18n from '@/libs/i18n';
import ru from '@/router/PageTitleLocales/ru';
import en from '@/router/PageTitleLocales/en';
import es from '@/router/PageTitleLocales/es';

const titleLocales = { ru, en, es };

function checkToken() {
  console.log(localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName));
  const isUserLoggedIn = localStorage.getItem(
    useJwt.jwtConfig.storageTokenKeyName,
  );
  return !!isUserLoggedIn;
}

async function protectedRoute(to, from, next) {
  if (checkToken()) {
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
      path: `/`,
      name: 'home',
      beforeEnter: protectedRoute,
      component: () => import('@/views/Home.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: `/wallet`,
      name: 'wallet',
      beforeEnter: protectedRoute,
      component: () => import('@/views/wallet/Wallet.vue'),
      meta: {
        layout: 'full',
      },
    },

    // {
    //   path: `/game`,
    //   name: 'game',

    //   component: () => import('@/views/auth/VerificationCode.vue'),
    //   meta: {
    //     layout: 'full',
    //   },
    // },
    {
      path: `/game1/:gameId`,
      name: 'game1',

      component: () => import('@/views/auth/game1.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: `/game/one-min`,
      name: 'game-one-min',

      component: () => import('@/views/auth/game1.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: `/game/three-min`,
      name: 'game-three-min',

      component: () => import('@/views/auth/game1.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: `/game/five-min`,
      name: 'game-five-min',

      component: () => import('@/views/auth/game1.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: `/game/fifteen-min`,
      name: 'game-fifteen-min',

      component: () => import('@/views/auth/game1.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: `/game2`,
      name: 'game2',

      component: () => import('@/views/auth/game2.vue'),
      meta: {
        layout: 'full',
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
      path: `/profile`,
      name: 'profile',
      component: () => import('@/views/profile/ViewProfile.vue'),
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
      path: '/auth/login',
      name: 'auth-login',
      // beforeEnter(to, from, next) {
      //   if (checkToken()) {
      //     next('/');
      //   } else next();
      // },
      component: () => import('@/views/auth/Login.vue'),
      meta: {
        layout: 'full',
      },
    },

    {
      path: '/auth/register',
      name: 'auth-register',
      // beforeEnter(to, from, next) {
      //   if (checkToken()) {
      //     next('/');
      //   } else next();
      // },
      component: () => import('@/views/auth/Register.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/auth/code-verify/:username',
      name: 'code-verify',
      // beforeEnter(to, from, next) {
      //   if (checkToken()) {
      //     next('/');
      //   } else next();
      // },
      component: () => import('@/views/auth/VerificationCode.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/auth/password-updated',
      name: 'password-updated',
      beforeEnter(to, from, next) {
        if (checkToken()) {
          next('/');
        } else next();
      },
      component: () => import('@/views/auth/PasswordUpdated.vue'),
      meta: {
        layout: 'full',
      },
    },

    {
      path: '/auth/forgot',
      name: 'auth-forgot',
      // beforeEnter(to, from, next) {
      //   if (checkToken()) {
      //     next('/');
      //   } else next();
      // },
      component: () => import('@/views/auth/ForgotPassword.vue'),
      meta: {
        layout: 'full',
      },
    },

    {
      path: '/auth/reset-password/:username',
      name: 'auth-reset-password',
      // beforeEnter(to, from, next) {
      //   if (checkToken()) {
      //     next('/');
      //   } else next();
      // },
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
    {
      path: `/add-balance`,
      name: 'add-balance',
      component: () => import('@/views/AddBalance.vue'),
      meta: {
        layout: 'full',
      },
    },
  ],
});

router.afterEach(() => {
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

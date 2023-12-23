import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/:lang(de|fr|en|zu|es|ru)/',
      name: 'home',

      component: () => import('../components/landingpage.vue'),
      children: [
        {
          path: '',
          name: 'home',

          component: () => import('../components/landingpage.vue'),

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
        layout: 'full',
      },
    },
    {
      path: '/',
      name: 'home',

      component: () => import('../components/landingpage.vue'),

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
      path: '*',

      redirect: '/',
    },
  ],
});
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg');
  if (appLoading) {
    appLoading.style.display = 'none';
  }
});
export default router;

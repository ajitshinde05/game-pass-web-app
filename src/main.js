import Vue from 'vue';
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue';
import VueCompositionAPI from '@vue/composition-api';

import i18n from '@/libs/i18n';
import VueGoodTablePlugin from 'vue-good-table';
import router from './router';
import store from './store';
import App from './App.vue';

import 'vue-good-table/dist/vue-good-table.css';
// Global Components
import './global-components';

// 3rd party plugins
import '@/libs/toastification';
import '@axios';
import '@/libs/portal-vue';
import '@/libs/clipboard';
import '@/libs/sweet-alerts';
import '@/libs/vue-select';
import '@/libs/tour';

Vue.use(VueGoodTablePlugin);

// BSV Plugin Registration
Vue.use(ToastPlugin);
Vue.use(ModalPlugin);

// Composition API
Vue.use(VueCompositionAPI);

// import core styles
require('@core/scss/core.scss');

require('@core/assets/fonts/feather/iconfont.css'); // For form-wizard
// import assets styles
require('@/assets/scss/style.scss');

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

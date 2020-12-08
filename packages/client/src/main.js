import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import App from './App.vue';
import router from './router';
import store from './store';

const fetchApi = require('@/helpers/fetchApi');

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

fetchApi.get('/api/sessions')
  .then((r) => r.json())
  .then((data) => {
    if (data && data.user) {
      store.dispatch('users/login', data.user);
    }
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  })
  .catch((e) => {
    console.log(e);
  });
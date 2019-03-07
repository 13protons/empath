import Vue from 'vue';
import Buefy from 'buefy';
import 'material-design-icons/iconfont/material-icons.css';
import 'buefy/dist/buefy.css';

import App from './App';
import router from './router';
import store from './store';

Vue.use(Buefy, {
  defaultIconPack: 'mdi',
  defaultContainerElement: '#app'
});

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');

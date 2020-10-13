import Vue from 'vue';
import App from './App.vue';
import FlashMessage from '@smartweb/vue-flash-message';

Vue.config.productionTip = false;
Vue.use(FlashMessage);

new Vue({
  render: (h) => h(App),
}).$mount('#app');

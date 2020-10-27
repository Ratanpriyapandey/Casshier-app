/*eslint-disable*/
import Vue from 'vue'
import App from './App'
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);
Vue.prototype.$selectedfield = 'toPay'
Vue.prototype.$old_input  ='00,00'
Vue.prototype.$ToBePaid   = 0
Vue.prototype.$Out        = '0.0'
Vue.prototype.$Seperator  = '0.0'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    showModal: false
  },
  render: h => h(App)
}).$mount("#app");


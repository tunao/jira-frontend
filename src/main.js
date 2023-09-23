import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import router from './router'

Vue.use(Vuetify);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

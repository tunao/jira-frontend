import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import JsonCSV from 'vue-json-csv'; // Importieren Sie das vue-json-csv-Plugin

Vue.use(Vuetify);
Vue.component('v-json-csv', JsonCSV); // Registrieren Sie das vue-json-csv-Plugin global als Komponente

new Vue({
    render: (h) => h(App),
}).$mount('#app');

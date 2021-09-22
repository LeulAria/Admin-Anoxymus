import Vue from "vue";
import './global.styl';
import App from "./App.vue";
import store from "@/store";
import router from "./router";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";

// utils
import '@/utils/validation_observer'
import '@/utils/filters'

import "vuetify/dist/vuetify.min.css";
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

import Vue from "vue";
// import axios from "axios"

import App from "./App.vue";
import Compare from "./components/Compare.vue";
import NumberOfNotes from "./components/NumberOfNotes.vue";
import Play from "./components/Play.vue";
import Portee from "./components/Portee.vue";
import router from "./router";
import store from "./store";

import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
// tslint:disable-next-line:  ordered-imports
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";

// Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false;

if (!process.env.IS_WEB) {
  Vue.use(require("vue-electron"));
}
Vue.use(BootstrapVue);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>",
}).$mount("#app");

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: "#divid2",
  store,
  render: (h) => h(NumberOfNotes),
});

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: "#divid3",
  store,
  render: (h) => h(Play),
});

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: "#divid4",
  store,
  render: (h) => h(Portee),
});

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: "#divid5",
  store,
  render: (h) => h(Compare),
});

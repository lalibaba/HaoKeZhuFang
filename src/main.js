import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import Vant from "vant";
import "vant/lib/index.css";
import router from "./router/index.js";
import "./assets/flexible.js";
import "./assets/reset.css";
import "./assets/font/iconfont.css";
Vue.config.productionTip = false;
import { Lazyload } from "vant";
Vue.use(Lazyload);

Vue.use(Vant);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

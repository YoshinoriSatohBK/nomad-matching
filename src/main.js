import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

// AWS Amplify
import AWS from "aws-sdk";
import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);
AWS.config.region = awsExports.aws_project_region;
Vue.use(AmplifyPlugin, AmplifyModules);

// Buefy
import Buefy from "buefy";
import "buefy/dist/buefy.css";
Vue.use(Buefy);

// Vue Head
import VueHead from "vue-head";
Vue.use(VueHead);

// Vue Carousel
import VueCarousel from "vue-carousel";
Vue.use(VueCarousel);

// Vue scrollto
import VueScrollTo from "vue-scrollto";
Vue.use(VueScrollTo);

// VeeValidate
import VeeValidate, { Validator } from "vee-validate";
Vue.use(VeeValidate);
import ja from "vee-validate/dist/locale/ja";
Validator.localize("ja", ja);

// Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

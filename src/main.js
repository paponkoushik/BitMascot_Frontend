import Vue from 'vue';
import App from './App.vue';
import {routes} from "./router/index";
import VueRouter from "vue-router";
import store from "./store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.css';
import axios from "axios";
import { setupStoreSubscriber } from './store/subscriber';

require('./store/subscriber');

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
// axios.defaults.baseURL = "https://dev.logiclabpro.xyz/api";
Vue.prototype.$appURL = "http://127.0.0.1:8000"
// Vue.prototype.$appURL = "https://dev.logiclabpro.xyz"

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes,
  mode:'history'
});
setupStoreSubscriber(router);
store.dispatch('Auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    render: h => h(App),
    router,
    store
  }).$mount('#app')
})


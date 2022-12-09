import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import axios from 'axios'
import router from './router'
import jsCookie from 'js-cookie'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.prototype.$axios = axios
Vue.prototype.$cookie = jsCookie;

axios.defaults.baseURL = "https://wemall.minephone.com/Invoice/api/public/index.php";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')



// import Vue from 'vue'
// import App from './App.vue'
// import VueRouter from 'vue-router'
// import router from './router/index'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import axios from "axios";

// Vue.config.productionTip = false

// Vue.use(ElementUI);
// Vue.use(VueRouter);
// Vue.prototype.$axios = axios;

// axios.defaults.baseURL = "https://wemall.minephone.com/Invoice/api/public/index.php";

// new Vue({
//   render: h => h(App),
//   router

// }).$mount('#app')

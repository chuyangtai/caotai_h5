// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App'

import store from './store/index'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import './assets/sass/mint.scss';

Vue.config.productionTip = false

Vue.use(Element);
Vue.use(Mint);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

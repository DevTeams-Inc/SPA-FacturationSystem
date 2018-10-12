// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import IView from 'iview'
import 'iview/dist/styles/iview.css'
import store from './store/index'
import locale from 'iview/dist/locale/es-ES'

Vue.config.productionTip = false
Vue.use(IView, { locale })

router.beforeEach((to, from, next) => {
  IView.LoadingBar.start();
  next();
})

router.afterEach(route => {
  IView.LoadingBar.finish();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

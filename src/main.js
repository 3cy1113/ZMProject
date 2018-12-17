// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './vuex/'
import App from './App'
import Bus from './utils/bus'
//引入第三方库
import axios from './utils/http'
import lodash from 'lodash'
import moment from 'moment'
import accounting from 'accounting'
import lockr from 'lockr'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
//引入UI组件
import iView from 'iview'
import locale from 'iview/dist/locale/zh-CN'
//引入自定义组件
//加载自定义工具模块
import appConfig from './utils/config'
import util from './utils/util'
import ServiceRequest from './utils/service'
import Consts from './utils/consts'
import './utils/filters'
//引入样式文件
import 'element-ui/lib/theme-chalk/index.css'
//router引用必须放在最后,否则会引发样式问题.
import router from './router'
Vue.use(iView,{
  locale,
  transfer: true,
  size: 'default'
});
Vue.use(Viewer);
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
window.appConfig=Vue.prototype.appConfig = appConfig;
window.moment=Vue.prototype.moment=moment;
Vue.prototype.accounting=accounting;
Vue.prototype.lockr=lockr;
window.Bus=Vue.prototype.$bus=Bus;
window.util=Vue.prototype.util=util;
window.Consts=Consts;
window._=Vue.prototype._=lodash;
window.axios=axios;
window.$alert=Vue.prototype.$alert;
window.$Modal=Vue.prototype.$Modal;
window.ServiceRequest=ServiceRequest;

router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  next();

});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
}).$mount('#app')

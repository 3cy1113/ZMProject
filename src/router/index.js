import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
function importRoutes(r) {
  let routes = r.keys().map(key => r(key).default);
  return _.flatten(routes);
};
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/pages/index').default,
      meta: {
        title: '首页',
        // allowBack:false,
        display: {
          shortCut: true,
          nav: false,
          left: false,
          crumb: false,
          footer: true,
        },
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: require('@/pages/home/index').default,
          children: importRoutes(require.context('@/', true, /^\.\/pages\/home\/((?!\/)[\s\S])+\/route\.js$/)),
          meta: {
            title: '首页',
            display: {
              shortCut: true,
              nav: false,
              left: false,
              crumb: false,
              footer: true,
            },
          }
        }
      ]
    },
    {
      path: '*',   // 错误路由[写在最后一个]
      redirect: '/index'   //重定向
    }
  ]
})

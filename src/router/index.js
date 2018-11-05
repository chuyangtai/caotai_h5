import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import ('@/pages/login'),
      meta: {title: '登陆', requireAuth: false}
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import ('@/pages/sign-in'),
      meta: {title: '注册有好礼', requireAuth: false}
    },
    {
      path: '/sign-sale',
      name: 'sign-service',
      component: () => import ('@/pages/sign-service'),
      meta: {title: '申请成为服务商', requireAuth: true}
    },
    {
      path: '/sign-agent',
      name: 'sign-agent',
      component: () => import ('@/pages/sign-agent'),
      meta: {title: '申请成为代理商', requireAuth: true}
    },
    {
      path: '/sign-train',
      name: 'sign-institution',
      component: () => import ('@/pages/sign-institution'),
      meta: {title: '申请成为机构', requireAuth: true}
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: () => import ('@/pages/agreement'),
      meta: {title: '隐私政策', requireAuth: false}
    },
    {
      path: '/app-rule',
      name: 'app-rule',
      component: () => import ('@/pages/app-rule'),
      meta: {title: '草豆规则', requireAuth: false}
    },
    {
      path: '/app-use-instruction',
      name: 'app-use-instruction',
      component: () => import ('@/pages/app-use-instruction'),
      meta: {title: '使用说明', requireAuth: false}
    },{
      path: '/app-about',
      name: 'app-about',
      component: () => import ('@/pages/app-about'),
      meta: {title: '关于我们', requireAuth: false}
    },{
      path: '/app-contact',
      name: 'app-contact',
      component: () => import ('@/pages/app-contact'),
      meta: {title: '联系我们', requireAuth: false}
    },
    {
      path: '*',
      redirect: "/"
    }
  ]
})
router.beforeEach((to, from, next) => {
  if(to.meta.title){
    document.title=to.meta.title;
  }
  if (!to.meta.requireAuth||sessionStorage.getItem('currentUser_token')) {
    next();
  } else {
    next({
      path: '/login',
      query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  }
})
export default router
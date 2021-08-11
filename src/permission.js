import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

const whiteList = ['/login', '/404'] // 定义路由白名单

router.beforeEach((to, from, next) => {
  NProgress.start() // 开启进度条
  // 判断有无token
  if (store.getters.token) {
    // 有token，但无用户信息，就发起请求
    if (!store.getters.userId) {
      store.dispatch('user/getUserInfo')
    }
    // 有token，是否去登录页
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 没有token，是否在白名单中
    if (whiteList.indexOf(to.path) === -1) {
      next('/login')
    } else {
      next()
    }
  }
  NProgress.done() // 强制关闭进度条
})

router.afterEach(() => {
  NProgress.done() // 路由跳转成功关闭进度条
})

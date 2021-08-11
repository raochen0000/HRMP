import router from './router'
import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style

router.beforeEach((to, from, next) => {
  // 判断有无token
  if (store.getters.token) {
    // 有token，是否去登录页
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  }
})

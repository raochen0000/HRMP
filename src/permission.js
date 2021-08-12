import router from './router'
import store from './store'

const whiteList = ['/login', '/404'] // 定义路由白名单

router.beforeEach(async(to, from, next) => {
  // 判断有无token
  if (store.getters.token) {
    // 有token，但无用户信息，就发起请求
    if (!store.getters.userId) {
      await store.dispatch('user/getUserInfo')
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
})


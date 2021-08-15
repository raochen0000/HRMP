import { getUserBaseInfo, getUserInfo, login } from '@/api/user'
import { getToken, setToken, removeToken, setTokenTime } from '@/utils/auth'
import { resetRouter, constantRoutes } from '@/router'
const state = {
  token: getToken(),
  userInfo: {}, // 用户信息
  menus: [] // 用户权限菜单
}
const mutations = {
  setToken(state, payload) {
    state.token = payload
    setToken(payload)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  logout() {
    // mutations中的this是store
    state.userInfo = {}
    this.commit('user/removeToken')
    this.commit('user/setMenus', [])
    resetRouter()
  },
  setMenus(state, payload) {
    state.menus = [...constantRoutes, ...payload]
  }
}
const actions = {
  async login(context, data) {
    const token = await login(data)
    context.commit('setToken', token)
    // 设置token时间戳
    setTokenTime()
  },
  // 获取用户信息
  async getUserInfo(context) {
    const userInfo = await getUserInfo()
    const userBaseInfo = await getUserBaseInfo(userInfo.userId)
    context.commit('setUserInfo', { ...userInfo, ...userBaseInfo })
    return userInfo
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


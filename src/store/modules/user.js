import { getUserBaseInfo, getUserInfo, login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  token: getToken(),
  userInfo: {} // 用户信息
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
  }
}
const actions = {
  async login(context, data) {
    const token = await login(data)
    context.commit('setToken', token)
  },
  // 获取用户信息
  async getUserInfo(context) {
    const userInfo = await getUserInfo()
    const userBaseInfo = await getUserBaseInfo(userInfo.userId)
    context.commit('setUserInfo', { ...userInfo, ...userBaseInfo })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


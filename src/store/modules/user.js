import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  token: getToken()
}
const mutations = {
  setToken(state, tokenData) {
    state.token = tokenData
    setToken(tokenData)
  },
  removeToken(state, tokenData) {
    state.token = null
    removeToken(tokenData)
  }
}
const actions = {
  async login(context, data) {
    const res = await login(data)
    console.log(res)
    context.commit('setToken', res.data.data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


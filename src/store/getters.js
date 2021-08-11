const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // 映射用户信息
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId
}
export default getters

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // 映射用户信息
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId,
  username: state => state.user.userInfo.username,
  avatar: state => state.user.userInfo.staffPhoto,
  // 映射权限菜单
  menus: state => state.user.menus
}
export default getters

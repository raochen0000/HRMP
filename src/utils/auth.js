import Cookies from 'js-cookie'

const TokenKey = 'hrsaas_token'
const TokenTime = 'hrssa_tokenTime'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// token 时间戳方法
export function setTokenTime() {
  Cookies.set(TokenTime, Date.now())
}
export function getTokenTime() {
  return Cookies.get(TokenTime)
}

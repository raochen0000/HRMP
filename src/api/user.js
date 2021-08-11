import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/**
 * 获取员工的基本信息
 * @param {*} id 用户id
 * @returns Promise
 */
export function getUserBaseInfo(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}

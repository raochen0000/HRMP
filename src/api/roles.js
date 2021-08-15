import request from '@/utils/request'

export function getAllRolesAPI() {
  return request({
    method: 'get',
    url: '/sys/role'
  })
}

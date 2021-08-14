import request from '@/utils/request'

export function getDepartmentListAPI() {
  return request({
    method: 'get',
    url: '/company/department'
  })
}

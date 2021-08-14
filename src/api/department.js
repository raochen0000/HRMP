import request from '@/utils/request'

export function getDepartmentListAPI() {
  return request({
    method: 'get',
    url: '/company/department'
  })
}

export function delOrganizeAPI(id) {
  return request({
    method: 'delete',
    url: '/company/department/' + id
  })
}

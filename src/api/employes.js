import request from '@/utils/request'

export function getEmployesAPI() {
  return request({
    method: 'get',
    url: '/sys/user/simple'
  })
}

import request from '@/utils/request'

export function getPersonInfoListByPerNumName(data) {
  return request({
    url: '/api/personinfo/getPersonInfoListByPerNumName',
    method: 'POST',
    data
  })
}

export function getPersonInfoListByPerNumNameQuery(data) {
  return request({
    url: '/api/personinfo/getPersonInfoListByPerNumName',
    method: 'POST',
    data
  })
}
export function getPersonNameMapListByPerNumName(data) {
  return request({
    url: '/api/personinfo/getPersonNameMapListByPerNumName',
    method: 'POST',
    data
  })
}





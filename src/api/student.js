import request from '@/utils/request'

export function studentBaseInfoMaintainInit(data) {
  return request({
    url: '/api/student/studentBaseInfoMaintainInit',
    method: 'POST',
    data
  })
}

export function studentBaseInfoMaintain(data) {
  return request({
    url: '/api/student/studentBaseInfoMaintain',
    method: 'POST',
    data
  })
}
export function getCetScore(data) {
  return request({
    url: '/api/student/getCetScore',
    method: 'POST',
    data
  })
}
export function getCetInitInfo(data) {
  return request({
    url: '/api/student/getCetInitInfo',
    method: 'POST',
    data
  })
}
export function updateCetScore(data) {
  return request({
    url: '/api/student/updateCetScore',
    method: 'POST',
    data
  })
}
export function englishScoreMaintenanceInit(data) {
  return request({
    url: '/api/student/englishScoreMaintenanceInit',
    method: 'POST',
    data
  })
}


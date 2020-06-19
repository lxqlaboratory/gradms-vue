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
export function instructorViewStudentInit(data) {
  return request({
    url: '/api/instructor/instructorViewStudentInit',
    method: 'POST',
    data
  })
}
export function instructorViewStudentInitQuery(data) {
  return request({
    url: '/api/instructor/instructorViewStudentInitQuery',
    method: 'POST',
    data
  })
}

export function scanCodeTermRegister(data) {
  return request({
    url: '/api/student/scanCodeTermRegister',
    method: 'POST',
    data
  })
}

export function scanCodeTermRegisterMaintain(data) {
  return request({
    url: '/api/student/scanCodeTermRegisterMaintain',
    method: 'POST',
    data
  })
}
export function scanCodeTermRegisterQuery(data) {
  return request({
    url: '/api/student/scanCodeTermRegisterQuery',
    method: 'POST',
    data
  })
}
export function scanCodeTermRegisterSubmit(data) {
  return request({
    url: '/api/student/scanCodeTermRegisterSubmit',
    method: 'POST',
    data
  })
}

export function scanCodeFreshRegister(data) {
  return request({
    url: '/api/student/scanCodeFreshRegister',
    method: 'POST',
    data
  })
}

export function scanCodeFreshRegisterMaintain(data) {
  return request({
    url: '/api/student/scanCodeFreshRegisterMaintain',
    method: 'POST',
    data
  })
}
export function scanCodeFreshRegisterQuery(data) {
  return request({
    url: '/api/student/scanCodeFreshRegisterQuery',
    method: 'POST',
    data
  })
}
export function scanCodeFreshRegisterSubmit(data) {
  return request({
    url: '/api/student/scanCodeFreshRegisterSubmit',
    method: 'POST',
    data
  })
}

export function loanInfoImportForLeaving(data) {
  return request({
    url: '/api/student/loanInfoImportForLeaving',
    method: 'POST',
    data
  })
}

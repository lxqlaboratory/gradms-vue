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

export function termRegisterStuRegister(data) {
  return request({
    url: '/api/instructor/termRegisterStuRegister',
    method: 'POST',
    data
  })
}

export function termRegisterStuRegisterMaintain(data) {
  return request({
    url: '/api/instructor/termRegisterStuRegisterMaintain',
    method: 'POST',
    data
  })
}
export function termRegisterStuRegisterQuery(data) {
  return request({
    url: '/api/instructor/termRegisterStuRegisterQuery',
    method: 'POST',
    data
  })
}
export function termRegisterStuRegisterSubmit(data) {
  return request({
    url: '/api/instructor/termRegisterStuRegisterSubmit',
    method: 'POST',
    data
  })
}

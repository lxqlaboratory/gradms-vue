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
  
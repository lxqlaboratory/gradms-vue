import request from '@/utils/request'



export function newPlanSelectCourse(data) {
  return request({
    url: '/api/cultivatenew/newPlanSelectCourse',
    method: 'POST',
    data
  })
}
export function studentSultivatePlanMaintain(data) {
  return request({
    url: '/api/cultivate/studentSultivatePlanMaintain',
    method: 'POST',
    data
  })
}
export function studentSultivatePlanCourseAdd(data) {
  return request({
    url: '/api/cultivatenew/studentSultivatePlanCourseAdd',
    method: 'POST',
    data
  })
}

export function studentSultivatePlanCourseDelete(data) {
  return request({
    url: '/api/cultivatenew/studentSultivatePlanCourseDelete',
    method: 'POST',
    data
  })
}

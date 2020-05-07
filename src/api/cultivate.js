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
export function acrossCourseQueryInit(data) {
  return request({
    url: '/api/cultivatenew/acrossCourseQueryInit',
    method: 'POST',
    data
  })
}
export function publicCourseQueryDoQuery(data) {
  return request({
    url: '/api/cultivatenew/publicCourseQueryDoQuery',
    method: 'POST',
    data
  })
}
export function newCultivateCourseDetail(data) {
  return request({
    url: '/api/cultivatenew/newCultivateCourseDetail',
    method: 'POST',
    data
  })
}
export function newCultivateSelectPublicCourse(data) {
  return request({
    url: '/api/cultivatenew/newCultivateSelectPublicCourse',
    method: 'POST',
    data
  })
}

export function acrossCourseQueryDoQuery(data) {
  return request({
    url: '/api/cultivatenew/acrossCourseQueryDoQuery',
    method: 'POST',
    data
  })
}


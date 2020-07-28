import request from '@/utils/request'



export function studentSultivatePlanMaintain(data) {
  return request({
    url: '/api/cultivatenew/studentSultivatePlanMaintain',
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
export function studentSultivatePlanCourseAddOther(data) {
  return request({
    url: '/api/cultivatenew/studentSultivatePlanCourseAddOther',
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
export function studentSultivatePlanPublicCourseQuery(data) {
  return request({
    url: '/api/cultivatenew/studentSultivatePlanPublicCourseQuery',
    method: 'POST',
    data
  })
}

export function studentSultivatePlanaCrossCourseQuery(data) {
  return request({
    url: '/api/cultivatenew/studentSultivatePlanaCrossCourseQuery',
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

export function collegeQueryStudentAbroadApply(data) {
  return request({
    url: '/api/cultivatenew/collegeQueryStudentAbroadApply',
    method: 'POST',
    data
  })
}

export function newCultivateSchemeInsert(data) {
  return request({
    url: '/api/cultivatenew/newCultivateSchemeInsert',
    method: 'POST',
    data
  })
}
export function newCultivateSchemeStuTypeChange(data) {
  return request({
    url: '/api/cultivatenew/newCultivateSchemeStuTypeChange',
    method: 'POST',
    data
  })
}


export function newCultivateSchemeSubmit(data) {
  return request({
    url: '/api/cultivatenew/newCultivateSchemeSubmit',
    method: 'POST',
    data
  })
}

export function collegeCheckCultivatePlan(data) {
  return request({
    url: '/api/cultivatenew/collegeCheckCultivatePlan',
    method: 'POST',
    data
  })
}
export function collegeCheckCultivatePlanMajor(data) {
  return request({
    url: '/api/cultivatenew/collegeCheckCultivatePlanMajor',
    method: 'POST',
    data
  })
}
export function collegeCheckCultivatePlanQuery(data) {
  return request({
    url: '/api/cultivatenew/collegeCheckCultivatePlanQuery',
    method: 'POST',
    data
  })
}
export function collegeCheckCultivatePlanCheck(data) {
  return request({
    url: '/api/cultivatenew/collegeCheckCultivatePlanCheck',
    method: 'POST',
    data
  })
}

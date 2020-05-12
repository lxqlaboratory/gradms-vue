import request from '@/utils/request'

export function instructorMemberManageInit(data) {
  return request({
    url: '/api/instructor/instructorMemberManageInit',
    method: 'POST',
    data
  })
}
export function instructorStudentTutorQuery(data) {
  return request({
    url: '/api/instructor/instructorStudentTutorQuery',
    method: 'POST',
    data
  })
}
export function collegeMaintainStudentInstructorSubmit(data) {
  return request({
    url: '/api/instructor/collegeMaintainStudentInstructorSubmit',
    method: 'POST',
    data
  })
}
export function collegeMaintainStudentTutorMajor(data) {
  return request({
    url: '/api/instructor/collegeMaintainStudentTutorMajor',
    method: 'POST',
    data
  })
}
export function instructorDetailInfoShow(data) {
  return request({
    url: '/api/instructor/instructorDetailInfoShow',
    method: 'POST',
    data
  })
}
export function degreeCollegeInstructorMemberPersonDelete(data) {
  return request({
    url: '/api/instructor/degreeCollegeInstructorMemberPersonDelete',
    method: 'POST',
    data
  })
}
export function degreeCollegeInstructorMemberPersonAdd(data) {
  return request({
    url: '/api/instructor/degreeCollegeInstructorMemberPersonAdd',
    method: 'POST',
    data
  })
}
export function degreeCollegeInstructorMemberClear(data) {
  return request({
    url: '/api/instructor/degreeCollegeInstructorMemberClear',
    method: 'POST',
    data
  })
}

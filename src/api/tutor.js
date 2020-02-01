import request from '@/utils/request'

//监考人员库
export function degreeCollegeTutorMemberManageInit(data) {
  return request({
    url: '/api/tutor/degreeCollegeTutorMemberManageInit',
    method: 'POST',
    data
  })
}
export function degreeCollegeTutorMemberQuery(data) {
  return request({
    url: '/api/tutor/degreeCollegeTutorMemberManageInit',
    method: 'POST',
    data
  })
}

export function degreeCollegeTutorMemberPersonDelete(data) {
  return request({
    url: '/api/tutor/degreeCollegeTutorMemberPersonDelete',
    method: 'POST',
    data
  })
}

export function degreeCollegeTutorMemberPersonAdd(data) {
  return request({
    url: '/api/tutor/degreeCollegeTutorMemberPersonAdd',
    method: 'POST',
    data
  })
}



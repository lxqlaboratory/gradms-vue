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

export function degreeCollegeTutorMemberClear(data) {
  return request({
    url: '/api/tutor/degreeCollegeTutorMemberClear',
    method: 'POST',
    data
  })
}

export function degreeCollegeTutorMemberInit(data) {
  return request({
    url: '/api/tutor/degreeCollegeTutorMemberInit',
    method: 'POST',
    data
  })
}

export function collegeMaintainStudentTutor(data) {
  return request({
    url: '/api/tutor/collegeMaintainStudentTutor',
    method: 'POST',
    data
  })
}

export function collegeMaintainStudentTutorInit(data) {
  return request({
    url: '/api/tutor/collegeMaintainStudentTutorInit',
    method: 'POST',
    data
  })
}
export function collegeMaintainStudentTutorMajor(data) {
  return request({
    url: '/api/tutor/collegeMaintainStudentTutorMajor',
    method: 'POST',
    data
  })
}

export function collegeMaintainStudentTutorQuery(data) {
  return request({
    url: '/api/tutor/collegeMaintainStudentTutorQuery',
    method: 'POST',
    data
  })
}

export function collegeMaintainStudentTutorSubmit(data) {
  return request({
    url: '/api/tutor/collegeMaintainStudentTutorSubmit',
    method: 'POST',
    data
  })
}


export function studentViewCollegeTutorInit(data) {
  return request({
    url: '/api/tutor/studentViewCollegeTutor',
    method: 'POST',
    data
  })
}
export function studentViewCollegeTutorQuery(data) {
  return request({
    url: '/api/tutor/studentViewCollegeTutor',
    method: 'POST',
    data
  })
}

export function tutorDetailInfoShow(data) {
  return request({
    url: '/api/tutor/tutorDetailInfoShow',
    method: 'POST',
    data
  })
}

export function tutorBaseInfoMaintainInit(data) {
  return request({
    url: '/api/tutor/tutorBaseInfoMaintainInit',
    method: 'POST',
    data
  })
}

export function tutorBaseInfoMaintain(data) {
  return request({
    url: '/api/tutor/tutorBaseInfoMaintain',
    method: 'POST',
    data
  })
}

export function tutorAuxiliaryMaintainInit(data) {
  return request({
    url: '/api/tutor/tutorAuxiliaryMaintainInit',
    method: 'POST',
    data
  })
}

export function tutorAuxiliaryMaintain(data) {
  return request({
    url: '/api/tutor/tutorAuxiliaryMaintain',
    method: 'POST',
    data
  })
}

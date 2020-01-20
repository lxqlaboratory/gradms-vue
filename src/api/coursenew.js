import request from '@/utils/request'

//教师课程任务
export function teacherCourseTaskQueryInit(data) {
  return request({
    url: '/api/coursenew/teacherCourseTaskQuery',
    method: 'POST',
    data
  })
}
export function teacherCourseTaskQuerySelect(data) {
  return request({
    url: '/api/coursenew/teacherCourseTaskQuery',
    method: 'POST',
    data
  })
}
//监考人员库
export function newCultivateExamAffairPersonManageInit(data) {
  return request({
    url: '/api/coursenew/newCultivateExamAffairPersonManageInit',
    method: 'POST',
    data
  })
}

export function newCultivateExamAffairPersonDelete(data) {
  return request({
    url: '/api/coursenew/newCultivateExamAffairPersonDelete',
    method: 'POST',
    data
  })
}

export function newCultivateExamAffairPersonAdd(data) {
  return request({
    url: '/api/coursenew/newCultivateExamAffairPersonAdd',
    method: 'POST',
    data
  })
}


export function getPersonInfoListByPerNumName(data) {
  return request({
    url: '/api/personinfo/getPersonInfoListByPerNumName',
    method: 'POST',
    data
  })
}

export function getPersonInfoListByPerNumNameQuery(data) {
  return request({
    url: '/api/personinfo/getPersonInfoListByPerNumName',
    method: 'POST',
    data
  })
}

//监考安排管理
export function newCultivateExamInvigilaterArrangeInit(data) {
  return request({
    url: '/api/coursenew/newCultivateExamInvigilaterArrangeInit',
    method: 'POST',
    data
  })
}

export function newCultivateExamInvigilaterArrangeSubmit(data) {
  return request({
    url: '/api/coursenew/newCultivateExamInvigilaterArrangeSubmit',
    method: 'POST',
    data
  })
}

//巡考安排管理
export function newCultivateExamTourCollegeArrangeInit(data) {
  return request({
    url: '/api/coursenew/newCultivateExamTourCollegeArrangeInit',
    method: 'POST',
    data
  })
}

export function newCultivateExamTourCollegeArrangePersonAdd(data) {
  return request({
    url: '/api/coursenew/newCultivateExamTourCollegeArrangePersonAdd',
    method: 'POST',
    data
  })
}

export function newCultivateExamTourCollegeArrangePersonDelete(data) {
  return request({
    url: '/api/coursenew/newCultivateExamTourCollegeArrangePersonDelete',
    method: 'POST',
    data
  })
}

//考务安排管理
export function newCultivateExamAffairArrangeInit(data) {
  return request({
    url: '/api/coursenew/newCultivateExamAffairArrangeInit',
    method: 'POST',
    data
  })
}

export function newCultivateExamAffairArrangePersonAdd(data) {
  return request({
    url: '/api/coursenew/newCultivateExamAffairArrangePersonAdd',
    method: 'POST',
    data
  })
}

export function newCultivateExamAffairArrangePersonDelete(data) {
  return request({
    url: '/api/coursenew/newCultivateExamAffairArrangePersonDelete',
    method: 'POST',
    data
  })
}

//考务信息查询
export function newCultivateExamAffairInfoQuery(data) {
  return request({
    url: '/api/coursenew/newCultivateExamAffairInfoQuery',
    method: 'POST',
    data
  })
}


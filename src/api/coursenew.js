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
export function newCultivateExamTourCollegeArrangeSubmit(data) {
  return request({
    url: '/api/coursenew/newCultivateExamTourCollegeArrangeSubmit',
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

//我的课表
export function studentViewTeachingSchedule(data) {
  return request({
    url: '/api/coursenew/studentViewTeachingSchedule',
    method: 'POST',
    data
  })
}
export function studentViewTeachingScheduleQuery(data) {
  return request({
    url: '/api/coursenew/studentViewTeachingScheduleQuery',
    method: 'POST',
    data
  })
}

//学院排课
export function collegeWorkOutTeachingScheduleInit(data) {
  return request({
    url: '/api/coursenew/collegeWorkOutTeachingScheduleInit',
    method: 'POST',
    data
  })
}

export function collegeWorkOutTeachingScheduleRoomList(data) {
  return request({
    url: '/api/coursenew/collegeWorkOutTeachingScheduleRoomList',
    method: 'POST',
    data
  })
}

export function collegeWorkOutTeachingScheduleScheduleList(data) {
  return request({
    url: '/api/coursenew/collegeWorkOutTeachingScheduleScheduleList',
    method: 'POST',
    data
  })
}

export function collegeWorkOutTeachingScheduleTeaList(data) {
  return request({
    url: '/api/coursenew/collegeWorkOutTeachingScheduleTeaList',
    method: 'POST',
    data
  })
}

export function collegeWorkOutTeachingScheduleSave(data) {
  return request({
    url: '/api/coursenew/collegeWorkOutTeachingScheduleSave',
    method: 'POST',
    data
  })
}

export function collegeWorkOutTeachingScheduleDelete(data) {
  return request({
    url: '/api/coursenew/collegeWorkOutTeachingScheduleDelete',
    method: 'POST',
    data
  })
}

export function collegeWorkOutTeachingScheduleTaskList(data) {
  return request({
    url: '/api/coursenew/collegeWorkOutTeachingScheduleTaskList',
    method: 'POST',
    data
  })
}

export function newCultivateCourseQueryInit(data) {
  return request({
    url: '/api/coursenew/newCultivateCourseQueryInit',
    method: 'POST',
    data
  })
}
export function newCultivateCourseQuery(data) {
  return request({
    url: '/api/coursenew/newCultivateCourseQuery',
    method: 'POST',
    data
  })
}
export function newCultivateCourseDetail(data) {
  return request({
    url: '/api/coursenew/newCultivateCourseDetail',
    method: 'POST',
    data
  })
}
export function getTeachTaskAwakeInfoInit(data) {
  return request({
    url: '/api/coursenew/getTeachTaskAwakeInfoInit',
    method: 'POST',
    data
  })
}
export function teachTaskAwakeInfoSubmit(data) {
  return request({
    url: '/api/coursenew/teachTaskAwakeInfoSubmit',
    method: 'POST',
    data
  })
}


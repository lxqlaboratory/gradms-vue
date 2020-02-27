import request from '@/utils/request'

//监考人员库
export function degreeTutorCheckStudentGraduateApplyInit(data) {
  return request({
    url: '/api/graduate/degreeTutorCheckStudentGraduateApplyInit',
    method: 'POST',
    data
  })
}

export function degreeTutorCheckStudentGraduateApplyCheckPass(data) {
  return request({
    url: '/api/graduate/degreeTutorCheckStudentGraduateApplyCheckPass',
    method: 'POST',
    data
  })
}

export function degreeTutorCheckStudentGraduateApplyCancel(data) {
  return request({
    url: '/api/graduate/degreeTutorCheckStudentGraduateApplyCancel',
    method: 'POST',
    data
  })
}
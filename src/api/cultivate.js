export function studentSultivatePlanMaintain(data) {
    return request({
      url: '/api/coursenew/studentSultivatePlanMaintain',
      method: 'POST',
      data
    })
  }
 
  export function studentSultivatePlanCourseAdd(data) {
    return request({
      url: '/api/coursenew/studentSultivatePlanCourseAdd',
      method: 'POST',
      data
    })
  }
 
  export function studentSultivatePlanCourseDelete(data) {
    return request({
      url: '/api/coursenew/studentSultivatePlanCourseDelete',
      method: 'POST',
      data
    })
  }

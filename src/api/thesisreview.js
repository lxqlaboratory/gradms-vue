import request from '@/utils/request'

//在线评审
export function thesisReviewPasswordUpdate(data) {
  return request({
    url: '/api/thesisreview/thesisReviewPasswordUpdate',
    method: 'POST',
    data
  })
}

export function thesisReviewExpertInfoMaintain(data) {
  return request({
    url: '/api/thesisreview/thesisReviewExpertInfoMaintain',
    method: 'POST',
    data
  })
}

export function thesisReviewExpertInfoMaintainSubmit(data) {
  return request({
    url: '/api/thesisreview/thesisReviewExpertInfoMaintainSubmit',
    method: 'POST',
    data
  })
}

export function thesisReviewOnlineReview(data) {
  return request({
    url: '/api/thesisreview/thesisReviewOnlineReview',
    method: 'POST',
    data
  })
}

export function thesisReviewExpertManage(data) {
  return request({
    url: '/api/thesisreview/thesisReviewExpertManage',
    method: 'POST',
    data
  })
}
export function thesisReviewExpertResetPwd(data) {
  return request({
    url: '/api/thesisreview/thesisReviewExpertResetPwd',
    method: 'POST',
    data
  })
}

export function thesisReviewExpertDelete(data) {
  return request({
    url: '/api/thesisreview/thesisReviewExpertDelete',
    method: 'POST',
    data
  })
}

export function thesisReviewPersonManage(data) {
  return request({
    url: '/api/thesisreview/thesisReviewPersonManage',
    method: 'POST',
    data
  })
}
export function thesisReviewPersonQuery(data) {
  return request({
    url: '/api/thesisreview/thesisReviewPersonQuery',
    method: 'POST',
    data
  })
}

export function thesisReviewPersonDelete(data) {
  return request({
    url: '/api/thesisreview/thesisReviewPersonDelete',
    method: 'POST',
    data
  })
}


export function getExportInfoListByPerNumName(data) {
  return request({
    url: '/api/thesisreview/getExportInfoListByPerNumName',
    method: 'POST',
    data
  })
}

export function getExportInfoListByPerNumNameQuery(data) {
  return request({
    url: '/api/thesisreview/getExportInfoListByPerNumName',
    method: 'POST',
    data
  })
}
export function thesisReviewPersonAdd(data) {
  return request({
    url: '/api/thesisreview/thesisReviewPersonAdd',
    method: 'POST',
    data
  })
}


export function thesisReviewDirectionManage(data) {
  return request({
    url: '/api/thesisreview/thesisReviewDirectionManage',
    method: 'POST',
    data
  })
}

export function thesisReviewConfigManage(data) {
  return request({
    url: '/api/thesisreview/thesisReviewConfigManage',
    method: 'POST',
    data
  })
}

export function thesisReviewReviewInfoManage(data) {
  return request({
    url: '/api/thesisreview/thesisReviewReviewInfoManage',
    method: 'POST',
    data
  })
}

export function thesisReviewReviewInfoQuery(data) {
  return request({
    url: '/api/thesisreview/thesisReviewReviewInfoQuery',
    method: 'POST',
    data
  })
}
export function thesisReviewReviewFeeManage(data) {
  return request({
    url: '/api/thesisreview/thesisReviewReviewFeeManage',
    method: 'POST',
    data
  })
}


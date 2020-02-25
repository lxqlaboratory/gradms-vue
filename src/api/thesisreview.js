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


import client from './client'

export function getReviewSessions() {
  return client.get('/admin/review_sessions')
}

export function getReviewSession(id) {
  return client.get(`/admin/review_sessions/${id}`)
}

export function createReviewSession(data = {}) {
  return client.post(`/admin/review_sessions`, {
    title: data.title,
    start_at: data.startAt,
    end_at: data.endAt
  })
}

export function updateReviewSession(id, data) {
  return client.put(`/admin/review_sessions/${id}`, {
    title: data.title,
    start_at: data.startAt,
    end_at: data.endAt
  })
}

export function updateAssignment(reivew_session_id, reviewee_id, reviewer_id) {
  return client.put(`/admin/review_sessions/${reivew_session_id}/assignment`, {
    reviewer_id,
    reviewee_id
  })
}

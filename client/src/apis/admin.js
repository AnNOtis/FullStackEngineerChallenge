import client from './client'

export function getReviewSessions() {
  return client.get('/admin/review_sessions')
}

export function getReviewSession(id) {
  return client.get(`/admin/review_sessions/${id}`)
}

export function updateAssignment(reivew_session_id, reviewer_id, reviewee_id) {
  return client.put(`/admin/review_sessions/${reivew_session_id}/assignment`, {
    reviewer_id,
    reviewee_id
  })
}

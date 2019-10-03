import client from './client'

export function getReviews() {
  return client.get('/me/reviews')
}

export function submitReview(id, content) {
  return client.get(`/me/reviews/${id}`, { content })
}

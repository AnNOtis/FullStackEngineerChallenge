import client from './client'

export function getAssignments() {
  return client.get('/me/assignments')
}

export function getAssignment(id) {
  return client.get(`/me/assignments/${id}`)
}

export function submitAssignment(id, content) {
  return client.put(`/me/assignments/${id}`, { content })
}

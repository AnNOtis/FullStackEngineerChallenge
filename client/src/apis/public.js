import client from './client'

export function login(email, password) {
  return client.post('/session', { email, password })
}

export function logout() {
  return client.delete('/session')
}

export function auth() {
  return client.get('/auth')
}

import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'

function parseJSONwithCamelcase(data) {
  if (typeof data !== 'string') {
    return data
  }
  try {
    return camelcaseKeys(JSON.parse(data), { deep: true })
  } catch (e) {
    console.error(e)
    return ''
  }
}

const client = axios.create({
  baseURL: '/api',
  timeout: 1000,
  transformResponse: [parseJSONwithCamelcase]
})

export default client

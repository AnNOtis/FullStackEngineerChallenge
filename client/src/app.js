import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader'
import * as apis from '@/apis/public'

function logAPI(res) {
  console.log(res.data)
  return res
}

function App() {
  useEffect(() => {
    apis
      .login('admin@example.com', '123123')
      .then(logAPI)
      .then(apis.auth)
      .then(logAPI)
  }, [])
  return <div>Hello</div>
}

// eslint-disable-next-line no-undef
export default hot(module)(App)

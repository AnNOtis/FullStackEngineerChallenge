import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader'

function App() {
  const [healthCheck, setHealthCheck] = useState('ping')
  useEffect(() => {
    fetch('/api/ping')
      .then(res => res.json())
      .then(result => setHealthCheck(result.data))
  }, [])
  return <div>Hello {healthCheck}</div>
}

// eslint-disable-next-line no-undef
export default hot(module)(App)

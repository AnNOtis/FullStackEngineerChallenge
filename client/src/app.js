import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRoute from '@/components/ProtectedRoute'
import AdminRoute from '@/components/AdminRoute'
import useInitialAuth from '@/hooks/useInitialAuth'

function App() {
  const isAuth = useInitialAuth()
  if (!isAuth) return 'Loading...'

  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/me/reviews" />
        <Route exact path="/login">
          <h1>/login</h1>
        </Route>
        <ProtectedRoute exact path="/me/reviews">
          <h1>/me/reviews</h1>
        </ProtectedRoute>
        <AdminRoute exact path="/admin/review-sessions">
          <h1>/admin/review-sessions</h1>
        </AdminRoute>
        <AdminRoute exact path="/admin/review-sessions/:id">
          <h1>/admin/review-sessions/:id</h1>
        </AdminRoute>
        <Route>
          <h1>Not Found Page</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

// eslint-disable-next-line no-undef
export default hot(module)(App)

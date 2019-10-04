import React from 'react'
import { hot } from 'react-hot-loader'
import { Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRoute from '@/components/ProtectedRoute'
import AdminRoute from '@/components/AdminRoute'
import useInitialAuth from '@/hooks/useInitialAuth'
import MainLayout from '@/components/layouts/MainLayout'
import LoginPage from '@/pages/LoginPage'

function App() {
  const isAuth = useInitialAuth()

  return (
    <MainLayout>
      {isAuth && (
        <Switch>
          <Redirect exact from="/" to="/me/assignments" />
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/me/assignments">
            <h1>/me/assignments</h1>
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
      )}
    </MainLayout>
  )
}

// eslint-disable-next-line no-undef
export default hot(module)(App)

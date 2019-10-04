import React from 'react'
import { hot } from 'react-hot-loader'
import { Switch, Route, Redirect } from 'react-router-dom'
import ProtectedRoute from '@/components/ProtectedRoute'
import AdminRoute from '@/components/AdminRoute'
import useInitialAuth from '@/hooks/useInitialAuth'
import MainLayout from '@/components/layouts/MainLayout'
import LoginPage from '@/pages/LoginPage'
import AssignmentsPage from '@/pages/me/AssignmentsPage'
import ReviewSessionsPage from '@/pages/admin/ReviewSessionsPage'

function App() {
  const isAuth = useInitialAuth()

  return (
    <MainLayout>
      {isAuth && (
        <Switch>
          <Redirect exact from="/" to="/me/assignments" />
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute
            exact
            path="/me/assignments"
            component={AssignmentsPage}
          />
          <AdminRoute
            exact
            path="/admin/review-sessions"
            component={ReviewSessionsPage}
          />
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

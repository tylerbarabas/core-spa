import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const isAuthenticated = false;

export default ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

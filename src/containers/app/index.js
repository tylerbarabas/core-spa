import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from '../private-route'
import Login from '../login'
import Dashboard from '../dashboard'
import 'bulma'
import 'animate.css'
import './base.scss'

const App = () => (
  <div>
    <main>
      <PrivateRoute path="/" pcomponent={Dashboard} />
      <Route path="/login" component={Login} />
    </main>
  </div>
)

export default App

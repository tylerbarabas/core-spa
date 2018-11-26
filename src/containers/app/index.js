import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from '../../components/private-route'
import Login from '../login'
import Dashboard from '../dashboard'
import 'bulma'
import 'animate.css'
import './base.scss'

const App = () => (
  <div>
    <main>
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/" component={Dashboard} />
    </main>
  </div>
)

export default App

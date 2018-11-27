import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from '../private-route'
import Dashboard from '../dashboard'
import 'bulma'
import 'animate.css'
import './base.scss'

const App = () => (
  <div>
    <main>
      <PrivateRoute path="/" pcomponent={Dashboard} />
    </main>
  </div>
)

export default App

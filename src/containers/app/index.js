import React from 'react'
import { Route } from 'react-router-dom'
import Login from '../login'
import 'bulma'
import 'animate.css'
import './base.scss'

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Login} />
    </main>
  </div>
)

export default App

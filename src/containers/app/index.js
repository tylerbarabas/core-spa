import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../home'
import 'bulma'
import 'animate.css'
import './base.scss'

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Home} />
    </main>
  </div>
)

export default App

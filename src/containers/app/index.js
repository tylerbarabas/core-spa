import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PrivateRoute from '../../components/private-route'
import Dashboard from '../dashboard'
import PublicArea from '../public-area'
import NotFound from '../not-found'
import 'bulma'
import 'animate.css'
import './base.scss'

class App extends React.Component {
  render(){
    let { isAuthenticated } = this.props.auth
    return(
      <div>
        <main>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} isAuthenticated={isAuthenticated} />
            <Route exact path="/public-area" component={PublicArea} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    )
  }
}

App.propTypes = {
  auth: PropTypes.object,
}

const mapStateToProps = ({ auth }) => ({ 
  auth
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

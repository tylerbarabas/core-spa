import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { setIsAuthenticated } from 'core-spa/src/modules/auth'
import { getMyUser } from 'core-spa/src/modules/user'
import { selectContext } from 'core-spa/src/modules/context'

import Login from '../login'
import Service from '../../service'
import ContextSelector from '../../components/context-selector'
import BigLoading from '../../components/big-loading'

class PrivateRoute extends React.Component {
  isContext(Component){
    let { user, context, selectContext, ...rest } = this.props
    let template = (<Component {...rest} />)

    if (user.id === null) {
      template = <BigLoading msg={'Retrieving user data...'} />
    } else if (context.id === null) {
      let contextCookie = Service.getContextCookie()
      let combined = user.retailers.concat(user.brands)
      let f = combined.find( c => {
        return c.id === parseInt(contextCookie)
      })

      if (combined.length === 1) {
        selectContext(combined[0])
      } else if (contextCookie !== null && typeof f !== 'undefined') {
        selectContext(f)
      } else if (combined.length > 1) {
        template = (<ContextSelector brands={user.brands} retailers={user.retailers} selectContext={selectContext} />)
      } else {
        template = 'No contexts available.' //Should never reach this
      } 
    }

    return template
  }

  render(){
    let { setIsAuthenticated, component, ...rest } = this.props
    let { isAuthenticated } = this.props.auth

    return ( <Route {...rest} render={() => {
      if (isAuthenticated === true) {
        return (<div>{ this.isContext(component) }</div>)

      } else if (Service.isValidAuthCookie() === true){
        setIsAuthenticated(true)
        return null
      } else {
        return (<Login />)
      }
    }} /> )
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  setIsAuthenticated: PropTypes.func,
  context: PropTypes.object,
  user: PropTypes.object,
}

const mapStateToProps = ({ auth, user, context }) => ({ 
  auth,
  user,
  context,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMyUser,
      setIsAuthenticated,
      selectContext,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute)

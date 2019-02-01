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
  getTemplate(Component){
    let { user, context, selectContext, ...rest } = this.props
    let template = (<Component {...rest} />)

    if (user.id === null) {
      template = <BigLoading msg={'Retrieving user data...'} />
    } else if (context.uuid === null) {
      let contextCookie = Service.getContextCookie()
      let { brands, retailers } = this.props.user
      let combinedLength = brands.length + retailers.length

      if (combinedLength > 1) {
        template = (<ContextSelector brands={user.brands} retailers={user.retailers} selectContext={selectContext} />)
      } else {
        template = 'No contexts available.' //Should never reach this
      } 
    }

    return template
  }

  checkContext( nextProps = this.props ){
      let { selectContext, context } = nextProps
      let contextCookie = Service.getContextCookie()
      let { brands, retailers } = nextProps.user
      let combinedLength = brands.length + retailers.length
      let findb = brands.find(b => {
        return b.uuid === contextCookie
      })
      let findr = retailers.find(r => {
        return r.uuid === contextCookie
      })
      let f = findb || findr || false

      if (combinedLength === 1) {
        if ( brands.length > 0 && brands[0].uuid !== context.uuid ) selectContext(brands[0])
        else if (retailers[0].uuid !== context.uuid) selectContext(retailers[0])
      } else if (contextCookie !== null && f !== false && context.uuid !== contextCookie) {
        selectContext(f)
      }
  }

  shouldComponentUpdate( nextProps ){
    this.checkContext( nextProps )
    return true 
  }

  render(){
    let { setIsAuthenticated, component, ...rest } = this.props
    let { isAuthenticated } = this.props.auth

    return ( <Route {...rest} render={() => {
      if (isAuthenticated === true) {
        return (<div>{ this.getTemplate(component) }</div>)
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

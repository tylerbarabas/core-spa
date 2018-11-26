import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class PrivateRoute extends React.Component {
    render () {
        console.log('privateRoute render', this.props);
        return ( <Route {...this.props} render={() => (
            this.props.auth.isAuthenticated === true
              ? <this.props.pcomponent {...this.props} />
              : <Redirect to='/login' />
          )} /> )
    }
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
)(PrivateRoute)

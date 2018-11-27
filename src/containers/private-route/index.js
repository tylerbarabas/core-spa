import React from 'react'
import { Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Login from '../login'

class PrivateRoute extends React.Component {
    render () {
        return ( <Route exact {...this.props} render={() => {
            if (this.props.auth.isAuthenticated === true) {
                return (<this.props.pcomponent {...this.props} />);
            } else {
                return (<Login />)
            }
          }} /> )
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

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LoginForm from '../../components/login-form'
import { requestToken, errorFound } from '../../modules/auth';

class Login extends React.Component {
    render(){
        console.log('login render', this.props.auth.isAuthenticated);
        return this.props.auth.isAuthenticated === false
           ? ( <div>
                <LoginForm
                    onSubmit={this.props.requestToken}
                    onError={this.props.errorFound}
                    errorMsg={this.props.auth.errorMsg}
                    isRequesting={this.props.auth.isRequesting}
                />
            </div> ) : <Redirect to='/' />
    }
}

const mapStateToProps = ({ auth }) => ({ 
    auth
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        requestToken,
        errorFound,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

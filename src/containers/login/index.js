import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginForm from '../../components/login-form'
import { requestToken, errorFound } from '../../modules/auth';

class Login extends React.Component {
    render(){
       return ( <div>
            <LoginForm
                onSubmit={this.props.requestToken}
                onError={this.props.errorFound}
                errorMsg={this.props.auth.errorMsg}
                isRequesting={this.props.auth.isRequesting}
            />
        </div> )
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

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginForm from '../../components/login-form'
import { requestToken, errorFound } from '../../modules/auth';
import colors from '../app/variables.scss'

class Login extends React.Component {
    componentDidMount(){
        document.body.style.backgroundColor = colors.backgroundDarkblue;
    }

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

import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginForm from '../../components/login-form'
import { requestToken, errorFound } from '../../modules/auth'
import colors from '../../extendables/parent-container-component/variables.scss'

class Login extends React.Component {
  componentDidMount(){
    document.getElementById('root').style.backgroundColor = colors.backgroundDarkblue
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

Login.propTypes = {
  requestToken: PropTypes.func,
  errorFound: PropTypes.func,
  auth: PropTypes.object,
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

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginForm from '../../components/login-form'
import { requestToken } from '../../modules/auth';

class Home extends React.Component {
    render(){
        return (
            <div>
                <LoginForm
                    onSubmit={this.props.requestToken}
                    errorMsg={this.props.auth.errorMsg}
                    isRequesting={this.props.auth.isRequesting}
                />
            </div>
        ) 
    }
}

const mapStateToProps = ({ auth }) => ({ 
    auth
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
        requestToken
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginForm from '../../components/login-form'
import { requestToken } from '../../modules/token';

class Home extends React.Component {
    render(){
        return (
            <div>
                <LoginForm
                    onSubmit={this.props.requestToken}
                    errorMsg={this.props.token.errorMsg}
                    isRequesting={this.props.token.isRequesting}
                />
            </div>
        ) 
    }
}

const mapStateToProps = ({ token }) => ({ 
    token
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

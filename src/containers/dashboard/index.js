import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Login extends React.Component {
    render(){
        return (
            <div>
                This is the dashboard.
            </div>
        ) 
    }
}

const mapStateToProps = () => ({ 
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
)(Login)

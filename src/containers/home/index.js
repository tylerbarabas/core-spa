import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginForm from '../../components/login-form'

const Home = props => (
  <div>
    <LoginForm />
  </div>
)

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
)(Home)

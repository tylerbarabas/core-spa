import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LoginForm from '../../components/login-form/index';

const Home = props => (
  <div>
    <h1>Home</h1>
    <LoginForm />
  </div>
)

const mapStateToProps = ({ counter }) => ({
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

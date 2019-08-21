import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import * as EmailValidator from 'email-validator'
import './index.scss'

export default class LoginForm extends React.Component {
  constructor(){
    super()
    this.isInitialLoad = true
  }

  handleSubmit(e){
    e.preventDefault()
    let email = document.getElementById('login-email').value
    let password = document.getElementById('login-password').value

    let errors = this.checkErrors(email, password)

    if (errors.length === 0)
      this.props.onSubmit(email, password)
    else
      this.props.onError(errors[0])
  }

  checkErrors(email, password){
    let errors = []
    if (email.length < 1) errors.push('Email cannot be empty.')
    if (!EmailValidator.validate(email)) errors.push('Please use a valid email address')
    if (password.length < 1) errors.push('Password cannot be empty.')
    return errors
  }

  isSpinner(){
    return (this.props.isRequesting) ? (<FontAwesomeIcon icon={faSpinner} spin />) : ''
  }

  animateContainer(){
    const { errorMsg } = this.props
    const staticClasses = 'columns is-centered is-radiusless animated login-form'
    let animClass = ''
    if ( errorMsg !== null ) animClass = 'pulse'
    if ( this.isInitialLoad ) {
      animClass = 'fadeIn'
      this.isInitialLoad = false
    }

    return `${staticClasses} ${animClass}`
  }

  getMessage(){
    let { errorMsg, isRequesting } = this.props
    let msg = ''
    if ( errorMsg ) msg = errorMsg
    if ( isRequesting ) msg = 'Signing in...'

    return msg
  }

  render(){
    let { errorMsg, isRequesting } = this.props
    return(
      <div className="section">
        <div className="container">
          <div className={this.animateContainer()}>
            <div className="column is-half">
              <div><img className="logo" src="/logo.png" alt="RevCascade Logo" /></div>
              <div className={'message '+(errorMsg?'error-msg':'')}>{ this.getMessage() }</div>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="field">                            
                  <label htmlFor="login-email">Email</label>
                  <div className="control">
                    <input className="is-one-quarter input login-fields is-large" type="text" id="login-email" />
                  </div>
                </div>
                <div className="field">                            
                  <label htmlFor="login-password">Password</label>
                  <div className="control">
                    <input className="is-one-quarter input login-fields is-large" type="password" id="login-password" />
                  </div>
                </div>
                <button type="submit" className="button is-large is-primary login-button" disabled={(isRequesting)}>Sign In {this.isSpinner()}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  onError: PropTypes.func,
  isRequesting: PropTypes.bool,
  errorMsg: PropTypes.string,
}

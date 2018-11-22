import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import * as EmailValidator from 'email-validator'
import './index.scss'

export default class LoginForm extends React.Component {
    constructor(){
        super();
        this.isInitialLoad = true;
    }

    handleSubmit(e){
        e.preventDefault();
        let email = document.getElementById('login-email').value;
        let password = document.getElementById('login-password').value;
//        let remember = document.getElementById('login-remember-me').checked;

        let errors = this.checkErrors(email, password);

        if (errors.length === 0)
            this.props.onSubmit(email, password);
        else
            this.props.onError(errors[0]);
    }

    checkErrors(email, password){
        let errors = [];
        if (email.length < 1) errors.push('Email cannot be empty.');
        if (!EmailValidator.validate(email)) errors.push('Please use a valid email address');
        if (password.length < 1) errors.push('Password cannot be empty.');
        return errors;
    }

    isSpinner(){
        return (this.props.isRequesting) ? (<FontAwesomeIcon icon={faSpinner} spin />) : '';
    }

    animateContainer( isFinishedMounting = false ){
        const { errorMsg } = this.props;
        const staticClasses = 'column box is-one-fifth is-offset-two-fifths is-radiusless has-text-centered animated login-form';
        let animClass = '';
        if ( errorMsg !== null ) animClass = 'pulse';
        if ( this.isInitialLoad ) {
            animClass = 'fadeInDown';
            this.isInitialLoad = false;
        }

        return `${staticClasses} ${animClass}`;
    }

    getMessage(){
        let { errorMsg, isRequesting } = this.props;
        let msg = 'Automating eCommerce.';
        if ( errorMsg ) msg = errorMsg;
        if ( isRequesting ) msg = 'Signing in...';

        return msg;
    }

    render(){
        let { errorMsg, isRequesting } = this.props;
        return(
            <div className="section">
                <div className="columns">
                    <div className={this.animateContainer()}>
                        <img className="logo" src="logo.png" alt="RevCascade Logo" />
                        <strong className={"slogan "+(errorMsg?'error-msg':'')}>{ this.getMessage() }</strong>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <input className="is-one-quarter input login-fields" type="text" placeholder="Email Address" id="login-email" />
                            <input className="is-one-quarter input login-fields" type="password" placeholder="Password" id="login-password" />
                            <div className="login-remember-me">
                                <label className="checkbox is-pulled-left">
                                    <input type="checkbox" className="is-pulled-left" id="login-remember-me" />
                                    Remember me?
                                </label>
                            </div>
                            <button type="submit" className="button is-primary login-button" disabled={(isRequesting)}>Sign In {this.isSpinner()}</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

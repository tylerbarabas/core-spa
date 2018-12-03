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
        const staticClasses = 'column is-one-fifth is-offset-two-fifths is-radiusless animated login-form';
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
        let msg = '';
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
                        <div className={"message "+(errorMsg?'error-msg':'')}>{ this.getMessage() }</div>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="field">                            
                            <label htmlFor="login-email">Email</label>
                            <div className="control">
                                <input className="is-one-quarter input login-fields" type="text" id="login-email" />
                            </div>
                        </div>
                        <div className="field">                            
                            <label htmlFor="login-password">Password</label>
                            <div className="control">
                                <input className="is-one-quarter input login-fields" type="password" id="login-password" />
                            </div>
                        </div>
                            <button type="submit" className="button is-primary login-button" disabled={(isRequesting)}>Sign In {this.isSpinner()}</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

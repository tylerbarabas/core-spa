import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

export default class LoginForm extends React.Component {

    handleSubmit(e){
        e.preventDefault();
        let email = document.getElementById('login-email').value;
        let password = document.getElementById('login-password').value;
//        let remember = document.getElementById('login-remember-me').checked;

        this.props.onSubmit(email, password);
    }

    isSpinner(){
        return (this.props.isRequesting) ? (<FontAwesomeIcon icon={faSpinner} />) : '';
    }

    render(){
        let { errorMsg, isRequesting } = this.props;
        return(
            <div className="section">
                <div className="columns">
                    <div className="column box is-one-fifth is-offset-two-fifths is-radiusless has-text-centered login-form">
                        <img className="logo" src="logo.png" alt="RevCascade Logo" />
                        <strong className={"slogan "+(errorMsg?'error-msg':'')}>{ (!errorMsg) ? "Automating eCommerce." : errorMsg }</strong>
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

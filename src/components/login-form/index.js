import React from 'react'
import './index.scss'

export default class LoginForm extends React.Component {
    render(){
        return(
            <div className="section">
                    <div className="columns">
                        <div className="column box is-one-fifth is-offset-two-fifths is-radiusless has-text-centered login-form">
                            <img className="logo" src="logo.png" />
                            <strong>Automating eCommerce.</strong>
                            <input className="is-one-quarter input login-fields" type="text" placeholder="Email Address" />
                            <input className="is-one-quarter input login-fields" type="password" placeholder="Password" />
                            <div className="login-remember-me">
                                <label className="checkbox is-pulled-left">
                                    <input type="checkbox" className="is-pulled-left" />
                                    Remember me
                                </label>
                            </div>
                            <button type="button" className="button is-primary login-button">Sign In</button>
                        </div>
                    </div>
            </div>
        );
    }
}

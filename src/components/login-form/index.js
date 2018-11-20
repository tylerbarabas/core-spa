import React from 'react'
import './index.scss'

export default class LoginForm extends React.Component {

    handleSubmit(e){
        e.preventDefault();
        console.log('handleSubmit');
    }

    render(){
        return(
            <div className="section">
                    <div className="columns">
                        <div className="column box is-one-fifth is-offset-two-fifths is-radiusless has-text-centered login-form">
                            <img className="logo" src="logo.png" alt="RevCascade Logo" />
                            <strong className="slogan">Automating eCommerce.</strong>
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <input className="is-one-quarter input login-fields" type="text" placeholder="Email Address" />
                                <input className="is-one-quarter input login-fields" type="password" placeholder="Password" />
                                <div className="login-remember-me">
                                    <label className="checkbox is-pulled-left">
                                        <input type="checkbox" className="is-pulled-left" />
                                        Remember me?
                                    </label>
                                </div>
                                <button type="submit" className="button is-primary login-button">Sign In</button>
                            </form>
                        </div>
                    </div>
            </div>
        );
    }
}

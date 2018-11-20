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
                        </div>
                    </div>
            </div>
        );
    }
}

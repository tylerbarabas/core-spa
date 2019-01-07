import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

export default class TopBar extends React.Component {
    render(){
        return (
            <div className="top-bar animated fadeInDown">
                <FontAwesomeIcon icon={faTh} />
                <img src="rc_circle.png" className ="rc-circle" alt="RevCascade Logo" />
                { this.props.name || "" }
                <div className="logout is-pulled-right" onClick={this.props.logout.bind(this)}>Log out</div>
            </div>
        )
    }
}

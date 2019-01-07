import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

export default class TopBar extends React.Component {
    getButtons(){
      return(
        <div className="buttons">Buttons!</div>
      );
    }

    render(){
        return (
            <div className="top-bar animated fadeInDown">
                <FontAwesomeIcon icon={faTh} />
                <img src="rc_circle.png" className ="rc-circle" alt="RevCascade Logo" />
                <strong className="app-name">{ this.props.name || "" }</strong>
                {this.getButtons()}
                <div className="logout is-pulled-right" onClick={this.props.logout.bind(this)}>Log out</div>
            </div>
        )
    }
}

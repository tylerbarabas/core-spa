import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh,faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

export default class TopBar extends React.Component {
    getButtons(){
      let { buttons } = this.props;
      let template = [];
      for (let i=0;i<buttons.length;i++){
        let selected = '';
        if (i===2) selected = 'selected';
        let b = buttons[i];
        template.push(<div key={b.name} className={`nav-button ${selected}`}>{b.name}</div>)
      }

      return(
        <div className="nav-buttons">
          {template}
        </div>
      );
    }

    render(){
        let { firstName } = this.props.user;
        let { isAuthenticated, logout } = this.props;
        return (
            <div className={`top-bar animated fadeInDown${(!isAuthenticated) ? ' is-hidden':''}`}>
              <FontAwesomeIcon icon={faTh} />
              <img src="rc_circle.png" className ="rc-circle" alt="RevCascade Logo" />
              <strong className="app-name">{ this.props.name || "" }</strong>
              {this.getButtons()}
              <div className="logout is-pulled-right" onClick={logout.bind(this)}>
                Hi, {firstName} <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
        )
    }
}

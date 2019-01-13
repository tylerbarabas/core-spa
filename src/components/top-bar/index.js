import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh,faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

export default class TopBar extends React.Component {
  getButtons(){
    let { buttons } = this.props
    let template = []
    for (let i=0;i<buttons.length;i++){
      let selected = ''
      let b = buttons[i]
      template.push(<a key={b.name} className='navbar-item'>{b.name}</a>)
    }

    return(
      <div className="navbar-start">
        {template}
      </div>
    )
  }

  render(){
    let { firstName } = this.props.user
    let { isAuthenticated, logout } = this.props
    return (
      <nav className={`navbar animated fadeInDown${(!isAuthenticated) ? ' is-hidden':''}`} role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item">
            <FontAwesomeIcon icon={faTh} />
            <img src="rc_circle.png" className="rc-circle" />
            Catalog
          </a>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            {this.getButtons()}
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link is-arrowless">
                Hi, {firstName} <FontAwesomeIcon icon={faChevronDown} />
              </a>
              <div className="navbar-dropdown">
                <a className="navbar-item" onClick={logout}>
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

TopBar.propTypes = {
  buttons: PropTypes.array,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func,
  name: PropTypes.string,
}

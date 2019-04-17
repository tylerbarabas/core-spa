import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import AutoSuggestBox from '../auto-suggest-box'
import ParentVisualComponent from '../../extendables/parent-visual-component'
import './index.scss'

export default class TopBar extends ParentVisualComponent {
  getButtons(){
    let buttons = this.props.buttons || []
    let template = []
    for (let i=0;i<buttons.length;i++){
      let b = buttons[i]
      template.push(<Link key={b.name} className='navbar-item' to={b.href}>{b.name}</Link>)
    }

    return(
      <div className="navbar-start">
        {template}
      </div>
    )
  }

  getContextProducts(){
    let { retailers, brands } = this.props.user
    return retailers.concat(brands)
  }

  contextChanged ( uuid ) {
    this.props.selectContext( uuid )
  }

  burgerClick(e){
    let burger = e.target
    let navbar = document.getElementById('rc-navbar')
    if (burger.className.indexOf('is-active') === -1) {
      burger.className += ' is-active'
      navbar.className += ' is-active'
    } else {
      burger.classList.remove('is-active')
      navbar.classList.remove('is-active')
    }
  }

  render(){
    let { firstName } = this.props.user
    let { isAuthenticated, logout, name } = this.props
    let ctx = this.getContext()
    let options = this.getContextProducts()
    return (
      <nav className={`navbar animated fadeInDown${(!isAuthenticated) ? ' is-hidden':''}`} role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src="/rc_circle.png" className="rc-circle" alt="RevCascade Logo"/>
            { name }
          </Link>
          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" onClick={this.burgerClick.bind(this)}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="navbar-menu" id="rc-navbar">
          <div className="navbar-start">
            {this.getButtons()}
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link is-arrowless ctx-selector">
              { ctx.name } <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div className="navbar-dropdown is-right">
              <div className="navbar-item">
                <div className="select is-small">
                  <AutoSuggestBox options={options} action={this.contextChanged.bind(this)}/>
                </div>
              </div>
            </div>
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link is-arrowless">
                Hi, {firstName} <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div className="navbar-dropdown is-right">
              <div className="navbar-item" onClick={logout}>
                  Logout
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
  context: PropTypes.object,
  selectContext: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func,
  name: PropTypes.string,
}

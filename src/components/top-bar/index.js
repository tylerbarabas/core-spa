import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import AutoSuggestBox from '../auto-suggest-box'
import ParentVisualComponent from '../../extendables/parent-visual-component'
import './index.scss'

export default class TopBar extends ParentVisualComponent {
  getIsActive(href, pathname){
    return (href === pathname)?' is-active':''
  }

  getButtons(){
    let buttons = this.props.buttons || []
    let template = []
    let { location } = this.props
    for (let i=0;i<buttons.length;i++){
      let b = buttons[i]
      if (typeof b.submenu === 'undefined') {
        template.push(
          <Link
            key={b.name}
            className={`navbar-item${this.getIsActive(b.href, location.pathname)}`}
            to={b.href}
          >
            {b.name}
          </Link>
        )
      } else {
        template.push(
          <div
            key={b.name}
            className={`navbar-item has-dropdown is-hoverable${this.getIsActive(b.href, location.pathname)}`}
          >
            <Link className='navbar-link is-arrowless' to={b.href}>
              <span>{b.name}</span>
              <span className="icon small"><FontAwesomeIcon icon={faCaretDown} /></span>
            </Link>
            <div className="navbar-dropdown">
              {this.getSubmenu(b.submenu)}
            </div>
          </div>
        )
      }
    }

    return(
      <div className="navbar-start">
        {template}
      </div>
    )
  }

  getSubmenu(s){
    let template = []
    for (let i=0;i<s.length;i+=1){
      template.push(<Link className="navbar-item" key={`nav-submenu-${i}`} to={s[i].href}>{s[i].name}</Link>)
    }
    return template
  }

  getContextProducts(){
    let { retailers, brands } = this.props.user
    let editr = retailers.map(r=>{
      r.role = 'retailers'
      return r
    })
    let editb = brands.map(b=>{
      b.role = 'brands'
      return b
    })
    return editr.concat(editb)
  }

  contextChanged ( selected ) {
    this.props.selectContext(selected.role, selected.id)
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
    let { isAuthenticated, logout, name, context } = this.props
    let ctx = this.getContext()
    let options = this.getContextProducts()
    let ctxHidden = ' is-invisible'
    if (options.length > 1 && context.id !== null) ctxHidden  = ''
    let userHidden = ' is-invisible'
    if ( firstName !== null ) userHidden = ''
    return (
      <nav className={`navbar animated fadeInDown${(!isAuthenticated) ? ' is-hidden':''} has-text-weight-bold`} role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <img src="/rc_circle.png" alt="RevCascade Logo"/>
              <span className="has-text-white has-text-weight-bold m-l-sm">{ name }</span>
            </Link>
            <div role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" onClick={this.burgerClick.bind(this)}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </div>
          </div>
          <div className="navbar-menu" id="rc-navbar">
            {this.getButtons()}
            <div className={`navbar-item has-dropdown is-hoverable is-hidden-touch${ctxHidden}`}>
              <div className="navbar-link is-arrowless ctx-selector">
                <span>{ ctx.name }</span>
                <span className="icon small"><FontAwesomeIcon icon={faCaretDown} /></span>
              </div>
              <div className='navbar-dropdown is-right'>
                <div className="navbar-item">
                  <div className="select is-small">
                    <AutoSuggestBox placeholder={'Find a context...'} options={options} action={this.contextChanged.bind(this)}/>
                  </div>
                </div>
              </div>
            </div>
            <div className={`navbar-item has-dropdown is-hoverable is-hidden-touch${userHidden}`}>
              <div className="navbar-link is-arrowless">
                <span>Hi, {firstName}</span>
                <span className="icon small"><FontAwesomeIcon icon={faCaretDown} /></span>
              </div>
              <div className="navbar-dropdown is-right">
                <div className="navbar-item is-pointer" onClick={logout}>
                  Logout
                </div>
              </div>
            </div>
            <div className={`navbar-item has-dropdown is-hoverable is-hidden-desktop${ctxHidden}`}>
              <div className="navbar-link is-arrowless ctx-selector">
                <AutoSuggestBox placeholder={'Find a context...'} options={options} action={this.contextChanged.bind(this)}/>
              </div>
            </div>
            <div className={`navbar-item has-dropdown is-hoverable is-hidden-desktop${userHidden}`}>
              <div className="navbar-item is-pointer" onClick={logout}>
                Logout
              </div>
            </div>

          </div>
        </div>
        <div className="has-gradient-primary" />
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
  location: PropTypes.object,
}

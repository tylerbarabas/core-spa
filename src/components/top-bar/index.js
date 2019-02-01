import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh,faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './index.scss'

export default class TopBar extends React.Component {
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

  getContextItems(){
    let { retailers, brands } = this.props.user
    let template = []
    let x = 0
    for (let i=0;i<retailers.length;i+=1) {
      let r = retailers[i]
      template.push (
        <option value={r.uuid} className="navbar-item" key={x}>
          {r.name}
        </option>
      )
      x++
    }
    for (let i=0;i<brands.length;i+=1) {
      let b = brands[i]
      template.push (
        <option value={b.uuid} className="navbar-item" key={x}>
          {b.name}
        </option>
      )
      x++
    }
    return template
  }

  getContext(uuid){
    let { retailers, brands } = this.props.user
    let findr = retailers.find(r => {
      return r.uuid === uuid
    })
    let findb = brands.find(b => {
      return b.uuid === uuid
    })
    return findr || findb || { name: 'Select context' }
  }

  contextChanged(e){
    this.props.selectContext( e.target.value )
  }

  render(){
    let { firstName } = this.props.user
    let { isAuthenticated, logout, name } = this.props
    let { uuid } = this.props.context
    let ctx = this.getContext(uuid)
    return (
      <nav className={`navbar animated fadeInDown${(!isAuthenticated) ? ' is-hidden':''}`} role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <FontAwesomeIcon icon={faTh} />
            <img src="/rc_circle.png" className="rc-circle" alt="RevCascade Logo"/>
            { name }
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            {this.getButtons()}
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link is-arrowless">
                { ctx.name } <FontAwesomeIcon icon={faChevronDown} />
              </div>
              <div className="navbar-dropdown">
                <div className="navbar-item">
                  <select onChange={this.contextChanged.bind(this)}>
                    <option value="select_one">Select context</option>
                    {this.getContextItems()}
                  </select>
                </div>
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link is-arrowless">
                Hi, {firstName} <FontAwesomeIcon icon={faChevronDown} />
              </div>
              <div className="navbar-dropdown">
                <div className="navbar-item" onClick={logout}>
                  Logout
                </div>
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

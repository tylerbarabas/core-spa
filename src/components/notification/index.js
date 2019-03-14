import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default class Notification extends React.Component {
  render(){
    let { msg, title, type, isActive } = this.props
    return (
      <article className={`notification message is-${type} animated ${(isActive)?'fadeInDown':'hidden'}`}>
        <div className="message-header">
          <p>{title}</p>
          <button className="delete" aria-label="delete"></button>
        </div>
        <div className="message-body">
          { msg }
        </div>
      </article>
    )
  }
}

Notification.propTypes = {
  msg: PropTypes.string
}

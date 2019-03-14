import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default class Notification extends React.Component {
  render(){
    let { msg, title, type, isActive } = this.props
    title = title || 'Notification title'
    msg = msg || 'This is a notification'
    type = type || 'warning'
    isActive = isActive || true
    return (
      <article className={`notification message is-${type} animated ${(isActive)?'fadeInDown':'fadeOutUp'}`}>
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

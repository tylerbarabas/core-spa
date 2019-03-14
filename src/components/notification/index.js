import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default class Notification extends React.Component {
  render(){
    let { msg, title, nType, isActive, hideNotification } = this.props
    return (
      <article className={`notification message is-${nType} animated ${(isActive)?'fadeInDown':'hidden'}`}>
        <div className="message-header">
          <p>{title}</p>
          <button onClick={()=>{hideNotification()}} className="delete" aria-label="delete"></button>
        </div>
        <div className="message-body">
          { msg }
        </div>
      </article>
    )
  }
}

Notification.propTypes = {
  title: PropTypes.string,
  msg: PropTypes.string,
  isActive: PropTypes.bool,
  nType: PropTypes.string,
  hideNotification: PropTypes.func,
}

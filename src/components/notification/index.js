import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default class Notification extends React.Component {
  render(){
    let { msg } = this.props
    msg = msg || 'This is a notification'
    return (
      <div className="notification">
        { msg }
      </div>
    )
  }
}

Notification.propTypes = {
  msg: PropTypes.string
}

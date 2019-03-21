import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default class Collapsible extends React.Component {
  render(){
    return (
      <div className="collapsible columns">
        This is collapsible
      </div>
    )
  }
}

Collapsible.propTypes = {
  msg: PropTypes.string
}

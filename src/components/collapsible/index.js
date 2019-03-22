import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default class Collapsible extends React.Component {
  render(){
    let { innerTemplate } = this.props
    return (
      <div className="collapsible">
        { innerTemplate() }
      </div>
    )
  }
}

Collapsible.propTypes = {
  innerTemplate: PropTypes.func
}

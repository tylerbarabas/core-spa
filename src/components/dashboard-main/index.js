import React from 'react'
import PropTypes from 'prop-types'

export default class DashCenter extends React.Component {
  render(){
    return (
      <div className="section">
        <div className="columns">
          <div className="column is-one-third is-offset-one-third animated fadeIn context-selector">
            <h1 className="title">Dashboard</h1>
            <div style={{textAlign: 'center'}}>{this.props.context.id}</div>
          </div>
        </div>
      </div>
    )
  }
}

DashCenter.propTypes = {
  user: PropTypes.object,
  context: PropTypes.object,
}

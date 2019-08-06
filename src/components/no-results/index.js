import React from 'react'
import PropTypes from 'prop-types'

export default class NoResults extends React.Component {
  render(){
    let { msg } = this.props
    let m = msg || 'There are no results to show.'
    return(
      <div style={{paddingLeft: '5px'}}>
        {m}
      </div>
    )
  }
}

NoResults.propTypes = {
  msg: PropTypes.string,
}

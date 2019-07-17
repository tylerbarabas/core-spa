import React from 'react'
import PropTypes from 'prop-types'

export default class ExpandyCard extends React.Component {
  render(){
    return (
      This is expandy card.
    )
  }
}

ExpandyCard.propTypes = {
  topArea: PropTypes.func,
  bottomArea: PropTypes.func,
}

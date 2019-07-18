import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

export default class ExpandyCard extends React.Component {
  render(){
    let { topArea, bottomArea } = this.props
    let isExpanded = false

    return (
      <div className="expandy-card">
        <FontAwesomeIcon icon={faPlus} className={`card-plus${(isExpanded)?' is-expanded':''}`} />
        <FontAwesomeIcon icon={faMinus} className={`card-minus${(isExpanded)?' is-expanded':''}`} />
        <div className="top-area">
          {topArea()}
        </div>
        <div className="bottom-area">
          {bottomArea()}
        </div>
      </div>
    )
  }
}

ExpandyCard.propTypes = {
  topArea: PropTypes.func,
  bottomArea: PropTypes.func,
}

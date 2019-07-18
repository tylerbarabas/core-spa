import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

export default class ExpandyCard extends React.Component {
  constructor(){
    super()
    this.state = {
      isExpanded: false,
    }
  }

  toggleExpanded(){
    let { isExpanded } = this.state
    this.setState({ isExpanded: !isExpanded })
  }

  render(){
    let { topArea, bottomArea } = this.props
    let { isExpanded } = this.state

    return (
      <div className={`expandy-card${(isExpanded)?' is-expanded':''}`}>
        <FontAwesomeIcon
          icon={faPlus}
          className={`card-plus${(isExpanded)?' is-expanded':''}`}
          onClick={this.toggleExpanded.bind(this)}
        />
        <FontAwesomeIcon
          icon={faMinus}
          className={`card-minus${(isExpanded)?' is-expanded':''}`}
          onClick={this.toggleExpanded.bind(this)}
        />
        <div className={`expand${(isExpanded)?' is-expanded':''}`}>
          Expand
        </div>
        <div className={`collapse${(isExpanded)?' is-expanded':''}`}>
          Collapse
        </div>
        <div className="top-area">
          {topArea()}
        </div>
        <div className={`bottom-area${(isExpanded)?' is-expanded':''}`}>
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

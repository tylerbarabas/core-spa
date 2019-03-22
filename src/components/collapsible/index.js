import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

export default class Collapsible extends React.Component {
  constructor(){
    super()
    this.state = {
      isActive: false
    }
  }

  clicked(e){
    console.log(e.target.tagName)
    let { isActive } = this.state
    if (e.target.tagName !== 'DIV'
      && e.target.tagName !== 'INPUT') this.setState({isActive: !isActive})
  }

  render(){
    let { innerTemplate } = this.props
    let { isActive } = this.state

    let ac = ''
    let angle = '0deg'
    if ( isActive ) {
      ac = 'is-active'
      angle = '180deg'
    }

    return (
      <div onClick={this.clicked.bind(this)} className={`collapsible ${ac}`}>
        <FontAwesomeIcon icon={faAngleDown} style={{transform: `rotate(${angle})`}}/>
       { innerTemplate() }
      </div>
    )
  }
}

Collapsible.propTypes = {
  innerTemplate: PropTypes.func
}

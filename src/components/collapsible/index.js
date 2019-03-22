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
    console.log('clicked', e)
    let { isActive } = this.state
    this.setState({isActive: !isActive})
  }

  render(){
    let { innerTemplate } = this.props
    let { isActive } = this.state
    let ac = ( isActive ) ? 'is-active' : ''

    return (
      <div onClick={this.clicked.bind(this)} className={`collapsible ${ac}`}>
        <FontAwesomeIcon icon={faAngleDown} />
       { innerTemplate() }
      </div>
    )
  }
}

Collapsible.propTypes = {
  innerTemplate: PropTypes.func
}

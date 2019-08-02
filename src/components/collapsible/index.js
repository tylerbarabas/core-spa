import React from 'react'
import PropTypes from 'prop-types'
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
    let { isActive } = this.state
    if (e.target.tagName !== 'DIV'
      && e.target.tagName !== 'LABEL'
      && e.target.tagName !== 'INPUT') this.setState({isActive: !isActive})
  }

  render(){
    let {
      topTemplate,
      innerTemplate,
      className,
    } = this.props
    let { isActive } = this.state

    let ac = ''
    if ( isActive ) {
      ac = 'is-active'
    }

    return (
      <div onClick={this.clicked.bind(this)} className={`collapsible ${ac} ${className}`}>
        <div className="top-area">
          { topTemplate() }
        </div>
        <div className="inner-area">
          { innerTemplate() }
        </div>
      </div>
    )
  }
}

Collapsible.propTypes = {
  innerTemplate: PropTypes.func,
  className: PropTypes.string,
  topTemplate: PropTypes.func,
}

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

export default class BasicDropdown extends React.Component {
  constructor(){
    super()
    this.state = {
      value: null,
      isActive: false,
    }
  }

  componentDidMount(){
    let { items } = this.props
    if (
      !Array.isArray(items)
      && items.length < 1
    ) items[0] = null
    this.setState({value: items[0]})
  }

  getItems(){
    let { items } = this.props
    let { value, isActive } = this.state
    let template = []
    for(let i=0;i<items.length;i+=1) {
      let it = items[i]
      template.push(
        <a className={`dropdown-item is-pulled-left${(it === value)?' is-active':''}`} onClick={this.selectItem.bind(this, it)}>
          {it}
        </a>
      )
    }
    return template
  }

  selectItem(value){
    this.setState({value, isActive: false})
  }

  toggleDropdown(){
    let { isActive } = this.state
    this.setState({isActive: !isActive})
  }

  render(){
    let { value, isActive } = this.state
    return (
      <div className={`basic-dropdown dropdown${(isActive)?' is-active':''}`}>
        <div className="dropdown-trigger" onClick={this.toggleDropdown.bind(this)}>
          <button className="button is-pulled-left" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>{value}</span>
            <span className={`icon is-small${(isActive)?' active':''}`}>
              <FontAwesomeIcon icon={faAngleDown} />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {this.getItems()}
          </div>
        </div>
      </div>
    )
  }
}

BasicDropdown.propTypes = {
  value: PropTypes.string,
  items: PropTypes.array,
}

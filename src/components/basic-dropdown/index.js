import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

export default class BasicDropdown extends React.Component {
  constructor(){
    super()
    this.state = {
      selectedItem: '',
      isActive: false,
    }
  }

  componentDidMount(){
    let { items } = this.props
    if (
      !Array.isArray(items)
      && items.length < 1
    ) items[0] = {
      display: 'Loading...',
      value: null
    }
    this.selectItem(items[0])
  }

  getItems(){
    let { items } = this.props
    let { selectedItem } = this.state
    let template = []
    for(let i=0;i<items.length;i+=1) {
      let it = items[i]
      let display = it
      if (typeof it === 'object') display = it.display
      template.push(
        <a className={`dropdown-item is-pulled-left${(it === selectedItem)?' is-active':''}`} onClick={this.selectItem.bind(this, it)} key={`dd-item-${i}`}>
          {display}
        </a>
      )
    }
    return template
  }

  selectItem(item){
    this.setState({
      selectedItem: item,
      isActive: false,
    })
  }

  toggleDropdown(){
    let { isActive } = this.state
    this.setState({isActive: !isActive})
  }

  render(){
    let { selectedItem, isActive } = this.state
    let display = selectedItem

    if  (typeof selectedItem === 'object') display = selectedItem.display

    return (
      <div className={`basic-dropdown dropdown${(isActive)?' is-active':''}`}>
        <div className="dropdown-trigger" onClick={this.toggleDropdown.bind(this)}>
          <button className="button is-pulled-left" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>{display}</span>
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
  selectedItem: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  items: PropTypes.array,
}

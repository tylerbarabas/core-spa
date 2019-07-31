import React from 'react'
import PropTypes from 'prop-types'
import UtilityComponent from '../../extendables/utility-component'
import OPTIONS from './options.json'
import './index.scss'

export default class DateFilter extends UtilityComponent {
  constructor(){
    super()
    this.checked = null
  }

  componentDidUpdate(){
    let { shouldClear } = this.props
    if (shouldClear) this.resetFilter()
  }

  dateSelected(e){
    let { action, filterKey } = this.props
    this.checked = e.target.value
    let seconds = this.getSeconds(e.target.value)
    action(seconds, filterKey)
  }

  resetFilter(){
    let { action, filterKey } = this.props
    this.checked = null
    action(this.checked, filterKey)
  }

  getOptions(){
    let { filterKey } = this.props
    let options = OPTIONS
    let template = []
    for (let i=0;i<options.length;i+=1) {
      let o = options[i]
      template.push(
        <div key={i} className="filter-option">
          <input type="radio"
            key={i}
            id={`filter-${filterKey}-${i}`}
            value={o.value}
            onChange={this.dateSelected.bind(this)}
            checked={(this.checked === o.value)}
          /> <label htmlFor={`filter-${filterKey}-${i}`}>{o.display}</label>
        </div>
      )
    }

    return template
  }

  render(){
    let { name } = this.props
    return (
      <div className="date-filter">
        <strong>{name}</strong>
        <div className="reset-all" onClick={this.resetFilter.bind(this)}>Reset All</div>
        { this.getOptions() }
      </div>
    )
  }
}

DateFilter.propTypes = {
  filterKey: PropTypes.string,
  name: PropTypes.string,
  action: PropTypes.func,
  shouldClear: PropTypes.bool,
}

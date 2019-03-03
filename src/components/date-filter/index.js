import React from 'react'
import PropTypes from 'prop-types'
import OPTIONS from './options.json'

const SECONDSINADAY = 86399

export default class DateFilter extends React.Component {
  constructor(){
    super()
    this.checked = null
  }

  dateSelected(e){
    let { action, filterKey } = this.props
    this.checked = e.target.value
    let seconds = this.getSeconds(e.target.value)
    action(seconds, filterKey)
  }

  getSeconds(time){
    let d = new Date()
    let sunday = 0
    let currentDay = d.getDay()
    let distance
    switch(time){
      default:
      case 'today':
        d.setHours(0,0,0,0)
      break;
      case 'yesterday':
        d.setHours(0,0,0,0)
        d.setDate(d.getDate() - 1)
      break;
      case 'this_week':
        d = new Date()
        d.setHours(0,0,0,0)
        distance = sunday - currentDay
        d.setDate(d.getDate() + distance)
      break;
      case 'this_month':
        d = new Date()
        d.setHours(0,0,0,0)
        d.setDate(1)
      break;
      case 'last_week':
        d = new Date()
        d.setHours(0,0,0,0)
        let oneWeek = 7
        let currentDay = d.getDay()
        distance = sunday - currentDay - oneWeek
        d.setDate(d.getDate() + distance)
      break;
      case 'last_month':
        d = new Date()
        d.setHours(0,0,0,0)
        d.setDate(1)
        d.setMonth(d.getMonth()-1)
      break;
    }
    let ms = d.getTime()

    return ms / 1000
  }

  resetFilter(){
    this.checked = null
    action(this.checked, filterKey)
  }

  getOptions(){
    let { filterKey } = this.props
    let options = OPTIONS;
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
      <div className="filter">
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
}

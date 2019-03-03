import React from 'react'
import PropTypes from 'prop-types'

export default class RadioFilter extends React.Component {
  constructor(){
    super()
    this.checked = null
  }

  radioSelected(e){
    let { action, filterKey } = this.props
    this.checked = e.target.value
    action(this.checked, filterKey)
  }

  resetFilter(){
    let { action, filterKey } = this.props
    this.checked = null
    action(this.checked, filterKey)
  }

  getOptions(){
    let { options, filterKey } = this.props
    let template = []
    for (let i=0;i<options.length;i+=1) {
      let o = options[i]
      template.push(
        <div key={i} className="filter-option">
          <input type="radio"
            key={i}
            id={`filter-${filterKey}-${i}`}
            value={o.value}
            onChange={this.radioSelected.bind(this)}
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

RadioFilter.propTypes = {
  filterKey: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  action: PropTypes.func,
}

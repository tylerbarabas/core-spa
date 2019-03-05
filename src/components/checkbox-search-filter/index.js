import React from 'react'
import PropTypes from 'prop-types'

export default class CheckboxFilter extends React.Component {
  constructor(){
    super()
    this.checked = []
  }

  componentDidUpdate(){
    let { shouldClear } = this.props
    if (shouldClear) this.resetFilter()
  }

  checkboxSelected(e){
    let { action, filterKey } = this.props
    if (e.target.checked) this.checked.push(e.target.value)
    else {
      let i = this.checked.indexOf(e.target.value)
      this.checked.splice(i, 1)
    }
    action(this.checked, filterKey)
  }

  resetFilter(){
    let { action, filterKey } = this.props
    this.checked = []
    action(this.checked, filterKey)
  }

  getOptions(){
    let { options, filterKey } = this.props
    let template = []
    for (let i=0;i<options.length;i+=1) {
      let o = options[i]
      template.push(
        <div key={i} className="filter-option">
          <input type="checkbox"
            key={i}
            id={`filter-${filterKey}-${i}`}
            value={o.value}
            onChange={this.checkboxSelected.bind(this)}
            checked={(this.checked.indexOf(o.value) !== -1)}
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

CheckboxFilter.propTypes = {
  filterKey: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  action: PropTypes.func,
}

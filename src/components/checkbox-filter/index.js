import React from 'react'
import PropTypes from 'prop-types'

export default class CheckboxFilter extends React.Component {
  constructor(){
    super()
    this.checked = []
  }

  checkboxSelected(){
    let { key } = this.props
    if (e.target.checked) this.checked.push(id)
    else {
      let i = this.checked.indexOf(id)
      this.checked.splice(i, 1)
    }
    this.action(this.checked, key) 
  }

  resetFilter(){
    this.checked = []
    this.action(this.checked, key)
  }

  getOptions(){
    let { options, key } = this.props
    let template = []
    for (let i=0;i<options.length;i+=1) {
      let o = options[i]
      template.push(
        <div className="filter-option">
          <input type="checkbox"
              key={i}
              id={`filter-${key}-${i}`}
              onChange={this.checkboxSelected.bind(this)}
              checked={(this.checked.indexOf(o.value) !== -1)}
          /> <label htmlFor={`filter-${key}-${i}`}>Inventory</label>
        </div>
      )
    }
  }

  render(){
    return (
      <div className="filter">
        <strong>Data Type</strong>
        <div className="reset-all" onClick={this.resetFilter.bind(this)}>Reset All</div>
        { this.getOptions() }
      </div>
    )
  }
}

CheckboxFilter.propTypes = {
  key: PropTypes.string,
  options: PropTypes.array,
  action: PropTypes.func,
}

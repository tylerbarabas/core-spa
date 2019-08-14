import React from 'react'
import PropTypes from 'prop-types'
import UtilityComponent from '../../extendables/utility-component'
import './index.scss'

export default class RadioFilter extends UtilityComponent {
  constructor(){
    super()
    this.state = {
      checked: null
    }
  }

  componentDidUpdate(){
    let { shouldClear } = this.props
    if (shouldClear) this.resetFilter()
  }

  radioSelected(e){
    let { action, filterKey } = this.props
    this.setState({checked: e.target.value})
    action(e.target.value, filterKey)
  }

  resetFilter(){
    let { action, filterKey } = this.props
    this.setState({ checked: null })
    action(null, filterKey)
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
            checked={(this.state.checked === o.value)}
          /> <label htmlFor={`filter-${filterKey}-${i}`}>{o.display}</label>
        </div>
      )
    }

    return template
  }

  render(){
    let {
      name,
      shouldUseLabel,
      shouldUseReset,
    } = this.props
    let sul = (shouldUseLabel === false) ? false : true
    let sur = (shouldUseReset === false) ? false : true
    return (
      <div className="radio-filter">
        <strong style={this.getDisplay(sul)}>{name}</strong>
        <div className="reset-all" onClick={this.resetFilter.bind(this)} style={this.getDisplay(sur)}>Reset</div>
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
  shouldClear: PropTypes.bool,
  shouldUseLabel: PropTypes.bool,
  shouldUseReset: PropTypes.bool,
}

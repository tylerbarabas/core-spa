import React from 'react'
import PropTypes from 'prop-types'
import UtilityComponent from '../../extendables/utility-component'
import './index.scss'

export default class CheckboxFilter extends UtilityComponent {
  constructor(){
    super()
    this.state = {
      checked: []
    }
  }

  componentDidUpdate(){
    let { shouldClear, shouldUpdateTo } = this.props
    if (typeof shouldUpdateTo !== 'undefined' && shouldUpdateTo !== false) this.updateTo(shouldUpdateTo)
    else if (shouldClear) this.resetFilter()
  }

  updateTo(value){
    this.setState({checked: value})
  }

  checkboxSelected(e){
    let { action, filterKey } = this.props
    let checked = this.state.checked.concat()
    if (e.target.checked) {
      checked.push(e.target.value)
      this.setState({ checked })
    } else {
      let i = checked.indexOf(e.target.value)
      checked.splice(i, 1)
      this.setState({ checked })
    }
    action(checked, filterKey)
  }

  resetFilter(){
    let { action, filterKey } = this.props
    this.setState({ checked: [] })
    action([], filterKey)
  }

  getOptions(){
    let { options, filterKey } = this.props
    let template = []
    if ( options === null || options.length < 1 ) {
      template.push(
        <div className="filter-options" key={'none'}>
          -No results-
        </div>
      )
    } else {
      for (let i=0;i<options.length;i+=1) {
        let o = options[i]
        template.push(
          <div key={i} className="filter-option">
            <input type="checkbox"
              key={i}
              id={`filter-${filterKey}-${i}`}
              value={o.value}
              onChange={this.checkboxSelected.bind(this)}
              checked={(this.state.checked.indexOf(o.value) !== -1)}
            /> <label htmlFor={`filter-${filterKey}-${i}`}>{o.display}</label>
          </div>
        )
      }
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
      <div className="checkbox-filter">
        <strong style={this.getDisplay(sul)}>{name}</strong>
        <div className="reset-all" onClick={this.resetFilter.bind(this)} style={this.getDisplay(sur)}>Reset</div>
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
  shouldClear: PropTypes.bool,
  shouldUpdateTo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  shouldUseLabel: PropTypes.bool,
  shouldUseReset: PropTypes.bool,
}

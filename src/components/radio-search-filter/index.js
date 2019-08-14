import React from 'react'
import PropTypes from 'prop-types'
import UtilityComponent from '../../extendables/utility-component'
import './index.scss'

export default class RadioSearchFilter extends UtilityComponent {
  constructor(){
    super()
    this.state = {
      filterArr: [],
      searchQuery: '',
      checked: null,
    }
  }

  componentDidUpdate(){
    let { shouldClear } = this.props
    if (shouldClear) this.resetFilter()
  }

  shouldComponentUpdate(nextProps, nextState){
    let optionsMatch = nextProps.options === this.props.options
    let searchMatch = nextState.searchQuery === this.state.searchQuery
    if (!optionsMatch || !searchMatch) this.makeFilterArr(nextProps, nextState)
    return true
  }

  componentDidMount(){
    let initialValue = this.props.initialValue || null
    if (initialValue !== null) this.setState({ checked: initialValue})
    this.makeFilterArr()
  }

  radioSelected(e){
    let { action, filterKey } = this.props
    this.setState({ checked: e.target.value })
    action(e.target.value, filterKey)
  }

  makeFilterArr(props = this.props, state = this.state){
    let { options } = props
    let { searchQuery, checked } = state
    let arr = []

    if (searchQuery !== '') {
      for (let i=0;i<options.length;i++){
        let { display } = options[i]
        for (let o=searchQuery.length;o>0;o-=1){
          let substr = searchQuery.slice(0,o)
          if (display.toUpperCase().indexOf(substr.toUpperCase()) !== -1) {
            arr.push({o, a: options[i]})
            break
          }
        }
      }

      arr.sort((a,b)=>{
        return b.o - a.o
      })

      arr = arr.slice(0,10)

      arr = arr.map(a=>{
        return a.a
      })
    } else {
      arr = options.slice(0,10) 
    }

    let selected = options.filter(o=>o.value===checked)
    let sIndex = arr.indexOf(selected[0])
    if (checked !== null && sIndex === -1) {
      arr.unshift(selected[0])
      arr.pop()
    }

    this.setState({
      filterArr: arr
    })
  }

  resetFilter(){
    let { action, filterKey } = this.props
    this.setState({ checked: null })
    action(null, filterKey)
  }

  getDisplayOptions(){
    let { filterKey } = this.props
    let { filterArr, checked } = this.state
    let template = []
    for (let i=0;i<filterArr.length;i+=1) {
      let o = filterArr[i]
      template.push(
        <div key={i} className="filter-option">
          <input type="radio"
            key={i}
            id={`filter-${filterKey}-${i}`}
            value={o.value}
            onChange={this.radioSelected.bind(this)}
            checked={(checked === o.value)}
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
    let placeholder = this.props.placeholder || ''
    let sul = (shouldUseLabel === false) ? false : true
    let sur = (shouldUseReset === false) ? false : true
    return (
      <div className="radio-search-filter">
        <strong style={this.getDisplay(sul)}>{name}</strong>
        <div className="reset-all" onClick={this.resetFilter.bind(this)} style={this.getDisplay(sur)}>Reset</div>
        <input type="text" placeholder={placeholder} className="search-filter" onChange={e => {
          this.setState({searchQuery: e.target.value})
        }} value={this.state.searchQuery} />
        { this.getDisplayOptions() }
      </div>
    )
  }
}

RadioSearchFilter.propTypes = {
  filterKey: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  action: PropTypes.func,
  shouldClear: PropTypes.bool,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  shouldUseLabel: PropTypes.bool,
  shouldUseReset: PropTypes.bool,
}

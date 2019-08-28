import React from 'react'
import PropTypes from 'prop-types'
import AutoSuggest from 'react-autosuggest'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

const DISPLAY_PROP = 'name'
const IS_LOADING = false
const LOADING_TEMPLATE = () => (
  <FontAwesomeIcon className="loading" icon={faSpinner} spin />
)
export default class AutoSuggestBox extends React.Component {
  constructor() {
    super()

    this.state = {
      value: '',
      suggestions: []
    }
  }

  componentDidUpdate(prevProps){
    if (prevProps.options !== this.props.options) {
      this.setState({suggestions: this.props.options})
    }
  }

  getSuggestionValue (suggestion) {
    let dp = this.props.displayProp || DISPLAY_PROP
    return suggestion[dp]
  }

  renderSuggestion (suggestion) {
    let dp = this.props.displayProp || DISPLAY_PROP
    return (
      <span id={suggestion.id}>{suggestion[dp]}</span>
    )
  }

  onKeyDown(e) {
    let dp = this.props.displayProp || DISPLAY_PROP
    let { options, action } = this.props
    if (e.which === 13) {
      let o = options.filter(o => o[dp] === e.target.value)
      if (typeof o[0] !== 'undefined') {
        action(o[0])
      }
    }
    if (typeof this.props.onKeyDown === 'function') this.props.onKeyDown(e)
  }

  onChange (e, { newValue, method }) {
    let { options } = this.props
    let dp = this.props.displayProp || DISPLAY_PROP
    let o = options.find(s => s[dp] === newValue)

    this.setState({
      value: newValue
    })
    if (method === 'click') {
      this.props.action(o)
    }

    if (typeof this.props.onChange === 'function' && method !== 'down' && method !== 'UP') this.props.onChange(e)
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim())
    let { options } = this.props
    let dp = this.props.displayProp || DISPLAY_PROP
    if (escapedValue === '') {
      return []
    }

    const regex = new RegExp('^' + escapedValue, 'i')

    return options.filter(o => regex.test(o[dp]))
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }
 
  onSuggestionsFetchRequested ({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    })
  }

  render() {
    return (
      <div className="auto-suggest-box">
        {this.getTemplate()}
      </div>
    )
  }

  getTemplate() {
    const { value, suggestions } = this.state
    let {
      placeholder,
      isLoading,
      loadingTemplate,
    } = this.props

    if (typeof placeholder === 'undefined') placeholder = 'Start typing...'

    const inputProps = {
      placeholder,
      value,
      onChange: this.onChange.bind(this),
      onKeyDown: this.onKeyDown.bind(this),
    }

    let il = isLoading || IS_LOADING
    let lt = loadingTemplate || LOADING_TEMPLATE

    let template = (
      <AutoSuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
        getSuggestionValue={this.getSuggestionValue.bind(this)}
        renderSuggestion={this.renderSuggestion.bind(this)}
        inputProps={inputProps}
      />
    )

    if (il) template = (
      <AutoSuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
        getSuggestionValue={this.getSuggestionValue.bind(this)}
        renderSuggestion={this.renderSuggestion.bind(this)}
        inputProps={inputProps}
        renderSuggestionsContainer={lt}
      />
    )

    return template
  }
}

AutoSuggestBox.propTypes = {
  options: PropTypes.array,
  action: PropTypes.func,
  placeholder: PropTypes.string,
  displayProp: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingTemplate: PropTypes.func,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func,
}

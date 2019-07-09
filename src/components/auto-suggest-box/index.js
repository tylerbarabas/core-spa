import React from 'react'
import PropTypes from 'prop-types'
import AutoSuggest from 'react-autosuggest'
import './index.scss'

export default class AutoSuggestBox extends React.Component {
  constructor() {
    super()

    this.state = {
      value: '',
      suggestions: []
    }
  }

  getSuggestionValue (suggestion) {
    return suggestion.name
  }

  renderSuggestion (suggestion) {
    return (
      <span id={`${suggestion.role}-${suggestion.id}`}>{suggestion.name}</span>
    )
  }

  onKeyDown(e) {
    let { options, action } = this.props
    if (e.which === 13) {
      let o = options.filter(o => o.name === e.target.value)
      if (typeof o[0] !== 'undefined') {
        action(o[0])
      }
    }
    if (typeof this.props.onKeyDown === 'function') this.props.onKeyDown(e)
  }

  onChange (e, { newValue, method }) {
    let { options } = this.props
    let o = options.find(s => s.name === newValue)

    this.setState({
      value: newValue
    })
    if (method === 'click') {
      this.props.action(o)
    }
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim())
    let { options } = this.props
    if (escapedValue === '') {
      return []
    }

    const regex = new RegExp('^' + escapedValue, 'i')

    return options.filter(o => regex.test(o.name))
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
    const { value, suggestions } = this.state
    let { placeholder } = this.props

    if (typeof placeholder === 'undefined') placeholder = 'Start typing...'

    const inputProps = {
      placeholder,
      value,
      onChange: this.onChange.bind(this),
      onKeyDown: this.onKeyDown.bind(this),
    }

    return (
      <AutoSuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
        getSuggestionValue={this.getSuggestionValue.bind(this)}
        renderSuggestion={this.renderSuggestion.bind(this)}
        inputProps={inputProps} />
    )
  }
}

AutoSuggestBox.propTypes = {
  options: PropTypes.array,
  action: PropTypes.func,
  placeholder: PropTypes.string,
}

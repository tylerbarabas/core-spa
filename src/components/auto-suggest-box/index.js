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
      <span id={suggestion.uuid}>{suggestion.name}</span>
    )
  }

  onKeyDown(e) {
    let { options, action } = this.props
    if (e.which === 13) {
      let o = options.filter(o => o.name === e.target.value)
      let uuid = o[0].uuid
      action(uuid)
    }
  }

  onChange (e, { newValue, method }) {
    this.setState({
      value: newValue
    })
    if (method === 'click') {
      let uuid = e.target.id
      this.props.action(uuid)
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
    const inputProps = {
      placeholder: 'Start typing...',
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
}

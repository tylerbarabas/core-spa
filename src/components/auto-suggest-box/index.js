import React from 'react'
import PropTypes from 'prop-types'
import AutoSuggest from 'react-autosuggest'
import './index.scss'

export default class AutocompleteBox extends React.Component {
  constructor() {
    super()

    this.state = {
      value: '',
      suggestions: []
    } 
  }

  getSuggestionValue = suggestion => {
    return suggestion.name
  }

  renderSuggestion = suggestion => {
    return (
      <span>{suggestion.name}</span>
    )
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    })
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
 
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  render() {
    const { value, suggestions } = this.state
    const inputProps = {
      placeholder: "Start typing...",
      value,
      onChange: this.onChange
    }

    return (
      <AutoSuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps} />
    )
  }
}


/*

const languages = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'C#',
    year: 2000
  },
  {
    name: 'C++',
    year: 1983
  },
  {
    name: 'Clojure',
    year: 2007
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Go',
    year: 2009
  },
  {
    name: 'Haskell',
    year: 1990
  },
  {
    name: 'Java',
    year: 1995
  },
  {
    name: 'Javascript',
    year: 1995
  },
  {
    name: 'Perl',
    year: 1987
  },
  {
    name: 'PHP',
    year: 1995
  },
  {
    name: 'Python',
    year: 1991
  },
  {
    name: 'Ruby',
    year: 1995
  },
  {
    name: 'Scala',
    year: 2003
  }
]

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters


class App extends React.Component {

}
*/



AutocompleteBox.propTypes = {
  data: PropTypes.object,
}

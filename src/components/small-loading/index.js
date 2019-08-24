import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

export default class SmallLoading extends React.Component {
  render(){
    return (
      <div className="small-loading has-text-centered">
        <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
      </div>
    )
  }
}

SmallLoading.propTypes = {
  msg: PropTypes.string
}

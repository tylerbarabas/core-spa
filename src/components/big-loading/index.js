import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

export default class BigLoading extends React.Component {
    render(){
        return (
            <div className="big-loading columns">
                <div className="column is-one-fifth is-offset-two-fifths animated fadeInDown has-text-centered">
                    <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
                    <p className="loading-text">Loading...</p>
                </div>
            </div>
        )
    }
}

import React from 'react'
import './index.scss'

export default class ContextSelector extends React.Component {
  render(){
    return (
      <div className="section">
        <div className="columns">
          <div className="column is-one-third is-offset-one-third animated fadeInDown context-selector">
            <h1 className="title">Choose context.</h1>
          </div>
        </div>
      </div> 
    )
  }
}

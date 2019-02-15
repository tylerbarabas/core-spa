import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './index.scss'

export default class MainMenu extends React.Component {
  getButtons(){
    let template = []
    let { buttons } = this.props
    for (let i=0;i<buttons.length;i+=1) {
      let b = buttons[i]
      template.push(
        <div className="columns">
          <Link to={b.to} className="column is-offset-one-fifth is-three-fifths large-button">{b.title}</Link>
        </div>
      )
    }
    return template
  }
  render(){
    let { title } = this.props
    return (
      <div className="columns animated fadeIn">
        <div className="column main-menu">
          <div className="columns">
            <div className="column">
              <h1>{ title }</h1>
              <h2>Please select a task below...</h2>
            </div>
          </div>
          { this.getButtons() }
        </div>
      </div>
    ) 
  }
}

MainMenu.propTypes = {
  title: PropTypes.string,
  buttons: PropTypes.string,
}

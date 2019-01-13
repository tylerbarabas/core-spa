import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import key from './key.json'
import './index.scss'

export default class Breadcrumbs extends React.Component {
  getBreadcrumbs(){
    let { pathname } = window.location
    let pathArr = pathname.split('/')
    let template = []
    for (let i=1;i<pathArr.length;i++){
      if (pathArr[i] === '') continue
      let name = key[pathArr[i]] || 'Unkown'
      template.push(<li key={name}>{name}</li>)
    }
    return template
  }

  render(){
    return (
      <div className="container">
        <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
          <ul>
            <li className="home-icon"><FontAwesomeIcon icon={faHome} /></li>
            {this.getBreadcrumbs()}
          </ul>
        </nav>
      </div>
    )
  }
}

import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default class DetailCard extends React.Component {
  getCardList(){
    let template = []
    let { list } = this.props
    for (let k in list) {
      let v = list[k]
      template.push(
        <li key={k} className="columns">
            <div className="key column is-one-quarter">{k}</div>
            <div className="value column is-three-quarter">{v}</div>
        </li>
      )
    }
    return template 
  }

  getContent(){
    let { template, list } = this.props
    if ( typeof template !== 'undefined'){
      return template()
    } else if ( typeof list !== 'undefined') {
      return (
        <ul className="data-list">
          {this.getCardList()}
        </ul>
      )
    }

    return ('Either a template or a list is required!')
  }

  render(){
    let { header } = this.props
    return (
      <div className="detail-card card">
        <div className="card-header">
          <div className="blue-bottom">
            {header}
          </div>
        </div>
        <div className="card-content">
          <div className="content">
            {this.getContent()}
          </div>
        </div>
      </div>
    )
  }
}

DetailCard.propTypes = {
  header: PropTypes.string,
  list: PropTypes.object,
  template: PropTypes.func,
  labelWidth: PropTypes.string,
}

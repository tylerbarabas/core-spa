import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default class DetailCard extends React.Component {
  getCardList(){
    let template = []
    let { list } = this.props
    let { labelWidth } = this.props
    for (let k in list) {
      let v = list[k]
      template.push(
        <li key={k}>
          <div className="key" style={{width: labelWidth}}>{k}</div>
          <div className="value">{v}</div>
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

    return (`Either a template or a list is required!`)
  }

  render(){
    let { header, synopsis } = this.props
    return [(
        <div className="column is-one-third detail-card-info" key="0">
          <div className="header">{header}</div>
          <div className="synopsis">{synopsis}</div>
        </div>
        ),( 
        <div className="column is-two-thirds detail-card-data" key="1">
          <div className="card">
            <div className="card-content">
              <div className="content">
                {this.getContent()}
              </div>
            </div>
          </div>
        </div>
      )]
  }
}

DetailCard.propTypes = {
  header: PropTypes.string,
  synopsis: PropTypes.string,
  list: PropTypes.object,
  template: PropTypes.func,
  labelWidth: PropTypes.string,
}

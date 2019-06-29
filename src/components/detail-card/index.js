import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default class DetailCard extends React.Component {
  parseList(list){
    let template = []
    for (let k in list) {
      let v = list[k]
      if (v === 'line'){
        template.push(
          <hr key={k} />
        )
      } else {
        template.push(
          <li key={`${k}-${Date.now()}`} className="columns is-mobile">
            <div className="key column is-two-fifths">{k}</div>
            <div className="value column is-three-fifths">{v}</div>
          </li>
        )
      }
    }
    return template
  }

  getCardList(){
    let template = []
    let { list } = this.props
    if (Array.isArray(list)) {
      for (let i=0;i<list.length;i+=1){
        let l = list[i]
        if (i !== list.length - 1) l.line = 'line'
        template = template.concat(this.parseList(l))
      }
    } else {
      template = this.parseList(list)
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
      <div className="card detail-card">
        <header className="card-header">
          <p className="card-header-title blue-bottom">
            {header}
          </p>
        </header>
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
  list: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  template: PropTypes.func,
  labelWidth: PropTypes.string,
}

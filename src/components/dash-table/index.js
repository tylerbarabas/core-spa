import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

export default class DashTable extends React.Component {
  getRows(){
    let { rows } = this.props.data
    let template = []
    for (let i=0;i<rows.length;i+=1){
      let r = rows[i]
      template.push(
        <div className="columns">
          <div className="column is-full dash-table-row">
            <div className="columns is-mobile is-desktop">
              <div className="column is-four-fifths">
                <Link to={r.href} className="title">
                  {r.title}
                </Link>
                <p className="description">
                  {r.description}
                </p>
              </div>
              <div className="column is-one-fifth">
                <p className="count">
                  {r.count}
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return template
  }

  getHeader(){
    let { data } = this.props
    let template = (
      <div className="columns dash-table-header">
        <div className="column is-full">
          {data.header}
        </div>
      </div>
    )
    if (typeof data.viewAll !== 'undefined' && data.viewAll === true){
      template = (
        <div className="columns dash-table-header">
          <div className="column is-four-fifths">
            {data.header}
          </div>
          <div className="column is-one-fifth is-paddingless">
            <button className="button view-all">
              View All
            </button>
          </div>
        </div>
      )
    }
    return template
  }

  render(){
    let { data } = this.props
    return (
      <div className="dash-table">
        {this.getHeader()}
        {this.getRows()}
      </div>
    )
  }
}

DashTable.propTypes = {
}

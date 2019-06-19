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
            <Link to={r.href} className="title">
              {r.title}
            </Link>
            <p className="description">
              {r.description}
            </p>
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
        <div className="columns">
          <div className="column is-full dash-table-header">
            {data.header}
          </div>
        </div>
        { this.getRows() }
      </div>
    )
  }
}

DashTable.propTypes = {
}

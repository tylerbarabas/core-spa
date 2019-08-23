import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class DashTable extends React.Component {
  getRows(){
    let { rows } = this.props.data
    let template = []
    for (let i=0;i<rows.length;i+=1){
      let r = rows[i]
      template.push(
        <div className="columns is-mobile is-desktop has-background-white has-radius m-b-lg p-sm" key={`dash-table-row-${i}`}>
              <div className="column">
                <Link to={r.href} className="is-size-5 has-text-weight-bold has-text-primary">
                  {r.title}
                </Link>
                <p className="is-size-6">
                  {r.description}
                </p>
              </div>
              <div className="column is-narrow">
                <p className="count">
                  {r.count}
                </p>
              </div>
        </div>
      )
    }
    return template
  }


  render(){
    return (
      <div className="dash-table">
        {this.getRows()}
      </div>
    )
  }
}

DashTable.propTypes = {
  data: PropTypes.object,
}

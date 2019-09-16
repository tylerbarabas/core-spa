import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import SmallLoading from 'core-spa/src/components/small-loading'
import './index.scss'

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
          <div className="column is-narrow is-vcentered">
            <div className="count is-size-5 has-text-centered has-background-light has-radius">
              <Link to={r.href} className={`has-text-weight-bold ${r.fontClass}`}>
                {this.getCount(r.count)}
              </Link>
            </div>
          </div>
        </div>
      )
    }
    return template
  }

  getCount(count){
    let { isRequesting } = this.props
    if (isRequesting) {
      return (
        <div className="is-size-7 has-text-black"><SmallLoading /></div>
      )
    } else if (count === 'View') {
      return (
        <span className="is-size-6">View</span>
      )
    }
    return count
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
  isRequesting: PropTypes.bool,
}

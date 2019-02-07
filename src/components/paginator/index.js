import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default class Paginator extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPage: 1
    }
  }

  getPaginationList(){
    const l = 25
    let { count } = this.props
    let { currentPage } = this.state
    let totalPages = Math.ceil(count / l)
    let template = []

    if ( totalPages > 6 ) {
      template.push(
        <span>
          <li><a className={`pagination-link${(currentPage===1)?' is-current':''}`} aria-label="Goto page 1">1</a></li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><a className="pagination-link" aria-label="Goto page 45">45</a></li>
          <li><a className="pagination-link" aria-label="Page 46" aria-current="page">46</a></li>
          <li><a className="pagination-link" aria-label="Goto page 47">47</a></li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li><a className="pagination-link" aria-label={`Goto page ${totalPages}`}>{totalPages}</a></li> 
        </span>
      ) 
    } else {
      for ( let i=1; i <= totalPages; i+=1 ){
        template.push(
          <li>
            <a 
              className={`pagination-link${(currentPage===i)?' is-current':''}`} 
              aria-label={`Goto page ${i}`}
            >{i}</a>
          </li>
        )
      }
    }

    return template
  }

  render(){
    return (
      <div className="paginator-container columns">
        <div className="column">
          <nav className="pagination is-right" role="navigation" aria-label="pagination">
            <a className="pagination-previous">Previous</a>
            <a className="pagination-next">Next page</a>
            <ul className="pagination-list">
              {this.getPaginationList()}
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

Paginator.propTypes = {
  count: PropTypes.number
}

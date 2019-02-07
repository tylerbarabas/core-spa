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
    let totalPages = Math.ceil(count / l) + 5
    let template = []

    if ( totalPages > 6 ) {
      let start = currentPage - 1
      if ( currentPage === 1 || currentPage === totalPages ) {
        start = Math.ceil(totalPages/2) - 1
      } else if ( currentPage === 2 ) {
        start = 2
      } else if ( currentPage === totalPages - 1 ) {
        start = currentPage - 2
      }

      template.push(
        <ul className="pagination-list">
          <li>
            <a 
              className={`pagination-link${(currentPage===1)?' is-current':''}`}
              aria-label="Goto page 1"
              onClick={()=>{this.setState({currentPage: 1})}}
            >1</a>
          </li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li>
            <a
              className={`pagination-link${(currentPage===start)?' is-current':''}`}
              aria-label={`Goto page ${start}`}
              onClick={()=>{this.setState({currentPage: start})}}
            >{start}</a>
          </li>
          <li>
            <a
              className={`pagination-link${(currentPage===start+1)?' is-current':''}`}
              aria-label={`Goto page ${start+1}`}
              onClick={()=>{this.setState({currentPage: start+1})}}
            >{start+1}</a>
          </li>
          <li>
            <a
              className={`pagination-link${(currentPage===start+2)?' is-current':''}`}
              aria-label={`Goto page ${start+2}`}
              onClick={()=>{this.setState({currentPage: start+2})}}
            >{start+2}</a>
          </li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li>
            <a 
              className={`pagination-link${(currentPage===totalPages)?' is-current':''}`}
              aria-label={`Goto page ${totalPages}`}
              onClick={()=>{this.setState({currentPage: totalPages})}}
            >{totalPages}</a>
          </li> 
        </ul>
      )
    } else {
      for ( let i=1; i <= totalPages; i+=1 ){
        template.push(
          <li>
            <a 
              className={`pagination-link${(currentPage===i)?' is-current':''}`} 
              aria-label={`Goto page ${i}`}
              onClick={()=>{this.setState({currentPage: i})}}
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

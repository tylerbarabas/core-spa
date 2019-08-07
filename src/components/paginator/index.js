import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default class Paginator extends React.Component {
  shouldComponentUpdate(nextProps){
    let { action } = nextProps
    if (nextProps.page !== this.props.page){
      action(nextProps.page)
    }
    return true
  }

  getTotalPages(){
    let { count, limit } = this.props
    return Math.ceil(count / limit)
  }

  getPaginationList(){
    let { action, page } = this.props
    let template = []
    let totalPages = this.getTotalPages()

    if ( totalPages > 6 ) {
      let start = page - 1
      if ( page === 1 || page === totalPages ) {
        start = Math.ceil(totalPages/2) - 1
      } else if ( page === 2 ) {
        start = 2
      } else if ( page === totalPages - 1 ) {
        start = page - 2
      }

      template.push(
        <ul key={0} className="pagination-list">
          <li>
            <a 
              className={`pagination-link${(page===1)?' is-current':''}`}
              aria-label="Goto page 1"
              onClick={()=>{action(1)}}
            >1</a>
          </li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li>
            <a
              className={`pagination-link${(page===start)?' is-current':''}`}
              aria-label={`Goto page ${start}`}
              onClick={()=>{action(start)}}
            >{start}</a>
          </li>
          <li>
            <a
              className={`pagination-link${(page===start+1)?' is-current':''}`}
              aria-label={`Goto page ${start+1}`}
              onClick={()=>{action(start+1)}}
            >{start+1}</a>
          </li>
          <li>
            <a
              className={`pagination-link${(page===start+2)?' is-current':''}`}
              aria-label={`Goto page ${start+2}`}
              onClick={()=>{action(start+2)}}
            >{start+2}</a>
          </li>
          <li><span className="pagination-ellipsis">&hellip;</span></li>
          <li>
            <a 
              className={`pagination-link${(page===totalPages)?' is-current':''}`}
              aria-label={`Goto page ${totalPages}`}
              onClick={()=>{action(totalPages)}}
            >{totalPages}</a>
          </li> 
        </ul>
      )
    } else {
      for ( let i=1; i <= totalPages; i+=1 ){
        template.push(
          <li key={i}>
            <a 
              className={`pagination-link${(page===i)?' is-current':''}`} 
              aria-label={`Goto page ${i}`}
              onClick={()=>{action(i)}}
            >{i}</a>
          </li>
        )
      }
    }

    return template
  }

  previousClicked(){
    let { page, action } = this.props
    if (page > 1) action(page-1)
  }

  nextClicked(){
    let { page, action } = this.props
    let totalPages = this.getTotalPages()
    if (page < totalPages) action(page+1)
  }

  render(){
    let { page, className } = this.props
    let limit = this.getTotalPages() - 1
    let display = (limit < 1) ? {display: 'none'} : {display: ''}
    return (
      <div className={`paginator-container ${className}`} style={display}>
        <nav className="pagination is-right" role="navigation" aria-label="pagination">
          <a className="pagination-previous" onClick={this.previousClicked.bind(this)} disabled={(page<2)}>Previous</a>
          <a className="pagination-next" onClick={this.nextClicked.bind(this)} disabled={(page > limit)}>Next page</a>
          <ul className="pagination-list">
            {this.getPaginationList()}
          </ul>
        </nav>
      </div>
    )
  }
}

Paginator.propTypes = {
  count: PropTypes.number,
  limit: PropTypes.number,
  page: PropTypes.number,
  action: PropTypes.func,
  className: PropTypes.string,
}

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

export default class DataTable extends React.Component {
  getTableHeader(){
    let { columns } = this.props
    let template = []
    for (let i=0;i<columns.length;i+=1) {
      let c = columns[i]
      let style = ( i === 0 ) ? 'first' : ''
      template.push(
        <th className={style} key={i}>
          {c.title} 
          <button className="tooltip" data-tooltip={c.tooltip}>
            <FontAwesomeIcon icon={faQuestionCircle} />
          </button>
        </th>
      )
    }
    return template
  }

  getTableBody(){
    let { data } = this.props
    let template = []
    for (let i=0;i<data.length;i+=1){
      template.push(<tr key={i}>{this.getTableRow(i)}</tr>)
    }

    return template
  }

  getTableRow(index){
    let { columns, data } = this.props
    let template = []
    for (let i=0;i<columns.length;i+=1){
      let c = columns[i]
      let d = data[index]
      template.push(<td key={i}>{d[c.index]}</td>)
    }
    return template
  }

  render(){
    return (
      <div className="columns animated fadeIn">
        <div className="column">
          <table className="table data-table">
            <thead>
              <tr>
                {this.getTableHeader()}
              </tr>
            </thead>
            <tbody>
              { this.getTableBody() }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

DataTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
}

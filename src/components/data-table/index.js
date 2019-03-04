import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

export default class DataTable extends React.Component {
  getTableHeader(){
    let { columns, sortFunc } = this.props
    let template = []
    for (let i=0;i<columns.length;i+=1) {
      let c = columns[i]
      template.push(
        <th key={i} onClick={() => {
          sortFunc(c.index)
        }} style={{width: `${c.width}%`}}>
          {c.title} 
          <button className="tooltip is-tooltip-bottom" data-tooltip={c.tooltip}>
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
      <div className="column" style={{overflowX: 'auto', padding: 0}}>
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
    )
  }
}

DataTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
}

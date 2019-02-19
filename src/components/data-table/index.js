import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './index.scss'

export default class DataTable extends React.Component {
  render(){
    let { myData } = this.props.data[0]
    return (
      <div>{myData}</div>
    )
  }
}

DataTable.propTypes = {
  data: PropTypes.array,
}

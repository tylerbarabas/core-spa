import React from 'react'
import PropTypes from 'prop-types'

const DEFAULT_IMG = '/notfound.png'

export default class BigLoading extends React.Component {
  render(){
    let { src } = this.props
    return (<img src={src} onError={(e)=>{e.target.onerror = null; e.target.src=DEFAULT_IMG }}/>)
  }
}

BigLoading.propTypes = {
  msg: PropTypes.string
}

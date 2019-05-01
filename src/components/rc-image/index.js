import React from 'react'
import PropTypes from 'prop-types'

const DEFAULT_IMG = '/notfound.png'

export default class RcImage extends React.Component {
  render(){
    let { src, className } = this.props
    return (<img src={src} className={className} onError={(e)=>{e.target.onerror = null; e.target.src=DEFAULT_IMG }} />)
  }
}

RcImage.propTypes = {
  src: PropTypes.string
}

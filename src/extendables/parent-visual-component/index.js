import React from 'react'
import PropTypes from 'prop-types'

export default class ParentVisualComponent extends React.Component {
  /**
    Find the user's current context

    @param props - React props of the component
    User module (props.user) must be handed down from the container.
    Context module (props.context) must be handed down from the container
  **/
  getContext( props = this.props ){
    if (typeof props.user === 'undefined') return false

    let { brands, retailers } = props.user
    let { uuid } = props.context
    let findb = brands.find(b => {
      return b.uuid === uuid
    })
    let findr = retailers.find(r => {
      return r.uuid === uuid
    })

    return findb || findr || false
  }

  /**
    Get the current query string params.
    @param props - React props of the component.  
    Location module (props.location) must be handed down from the container.
  **/
  getParams(props = this.props){
    if (typeof props.location === 'undefined') return false
    let { search } = props.location
    let s = search.substr(1,search.length-1)
    let arr = s.split('&')
    let obj = {}
    for (let i=0;i<arr.length;i+=1){
      let split = arr[i].split('=')
      obj[split[0]] = split[1]
    }
    return obj
  }
}
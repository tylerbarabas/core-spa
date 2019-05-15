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

    let { id, role } = props.context

    if (role === null) return false

    let arr = props.user[role]
    let ctx = arr.find(a=>a.id===id)

    return ctx || false
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

  /**
    Convert an object in to a query string.
    @param obj - Some object.  
  **/
  makeQueryString(obj){
    let str = ''
    let i = 0

    for (let key in obj){
      let piece = `${key}=${obj[key]}`
      if (i > 0) piece = `&${piece}`
      i += 1
      str += piece
    }

    return str
  }

  /**
    Form a CDN url.
    @param url - Image url that has already been synced to CDN
  **/
  makeCdnUrl(url, mods){
    const prefixPos = url.search('://')
    if (prefixPos !== -1) url = url.substr(prefixPos+3)

    let modStr = ''
    if (typeof mods === 'object'){
      let arr = []
      for (let key in mods){
        let value = mods[key]
        switch (key){
          case 'height':
          case 'h':
            arr.push(`h_${value}`)
          break;
          case 'width':
          case 'w':
            arr.push(`w_${value}`)
          break;
          default:
          break;
        }
      }
      modStr = arr.join(',')
    }

    if (modStr.length > 0) modStr += '/'

    return `https://res.cloudinary.com/revcascade/${modStr}${url}`
  }
}

ParentVisualComponent.propTypes = {
  user: PropTypes.object,
  context: PropTypes.object,
  location: PropTypes.object,
}

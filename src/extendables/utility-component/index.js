import React from 'react'
import PropTypes from 'prop-types'

/**
  This class is for utility functions that do not require redux state.  Functions that
require Redux state should be defined in class ParentVisualComponent or ParentContainerComponent.
**/
export default class UtilityComponent extends React.Component {
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
          break
        case 'width':
        case 'w':
          arr.push(`w_${value}`)
          break
        default:
          break
        }
      }
      modStr = arr.join(',')
    }

    if (modStr.length > 0) modStr += '/'

    return `https://res.cloudinary.com/revcascade/${modStr}${url}`
  }

  /**
    Copy a string to the clipboard.
    @param str - any string
  **/
  copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea')
    // Set value (string to be copied)
    el.value = str
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '')
    el.style = {position: 'absolute', left: '-9999px'}
    document.body.appendChild(el)
    // Select text inside element
    el.select()
    // Copy text to clipboard
    document.execCommand('copy')
    // Remove temporary element
    document.body.removeChild(el)
  }
}

UtilityComponent.propTypes = {
}

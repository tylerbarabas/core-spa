import React from 'react'

const DISPLAY_NONE = {display: 'none'}
const DISPLAY_BLOCK = {display: 'block'}
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

  /**
    Convert a simplified time code in to seconds that are usable
    with the API.  TODO Deprecate this for getGteLte.

    @param time - can be 'today', 'yesterday', 'this_week', 'this_month',
    'last_week', 'last_month', or an ISO date (ex: 2011-10-05T14:48:00.000Z).
  **/
  getSeconds(time) {
    let t = time
    if (this.isDateString(time)) t = 'custom'

    let d = new Date()
    let sunday = 0
    let currentDay = d.getDay()
    let oneWeek = 7
    let distance
    switch(t){
    default:
    case 'today':
      d.setHours(0,0,0,0)
      break
    case 'yesterday':
      d.setHours(0,0,0,0)
      d.setDate(d.getDate() - 1)
      break
    case 'this_week':
      d.setHours(0,0,0,0)
      distance = sunday - currentDay
      d.setDate(d.getDate() + distance)
      break
    case 'this_month':
      d.setHours(0,0,0,0)
      d.setDate(1)
      break
    case 'last_week':
      d.setHours(0,0,0,0)
      currentDay = d.getDay()
      distance = sunday - currentDay - oneWeek
      d.setDate(d.getDate() + distance)
      break
    case 'last_month':
      d.setHours(0,0,0,0)
      d.setDate(1)
      d.setMonth(d.getMonth()-1)
      break
    case 'custom':
      d = new Date(time)
      break
    }

    let ms = d.getTime()

    return ms / 1000
  }

  /**
    Convert a simplified string in to an object with gte/lte timestamps 
    that are usable with the API.

    @param time - can be 'today', 'yesterday', 'this_week', 'this_month',
    'last_week', 'last_month', or an ISO date (ex: 2011-10-05T14:48:00.000Z).
  **/
  getGteLte(time) {
    let t = time
    if (this.isDateString(time)) t = 'custom'

    let g = new Date()
    let l = new Date()
    let sunday = 0
    let currentDay = g.getDay()
    let oneWeek = 7
    let distance
    switch(t){
    default:
    case 'today':
      g.setHours(0,0,0,0)
      l = null
      break
    case 'yesterday':
      g.setHours(0,0,0,0)
      g.setDate(g.getDate() - 1)

      l.setHours(23,59,59,0)
      l.setDate(l.getDate() - 1)
      break
    case 'this_week':
      g.setHours(0,0,0,0)
      distance = sunday - currentDay
      g.setDate(g.getDate() + distance)

      l = null
      break
    case 'this_month':
      g.setHours(0,0,0,0)
      g.setDate(1)

      l = null
      break
    case 'last_week':
      g.setHours(0,0,0,0)
      currentDay = g.getDay()
      distance = sunday - currentDay - oneWeek
      g.setDate(g.getDate() + distance)

      l.setHours(12,59,59,0)
      distance = sunday - currentDay
      l.setDate(l.getDate() + distance)
      break
    case 'last_month':
      g.setHours(0,0,0,0)
      g.setDate(1)
      g.setMonth(g.getMonth()-1)

      l.setHours(0,0,-1,0)
      l.setDate(1)
      break
    case 'custom':
      g = new Date(time)
      l = null
      break
    }

    return { gte: g.getTime()/1000, lte: (l !== null) ? l.getTime()/1000 : l }
  }

  isDateString(str){
    const regex = new RegExp(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/g)
    return regex.test(str)
  }

  /**
    Converts a boolean value to {display: 'block'} or {display: 'none'} for easy use in the style attr's of React components

    @param shouldUse - boolean
  **/
  getDisplay(shouldUse){
    return (shouldUse) ? DISPLAY_BLOCK : DISPLAY_NONE
  }
}

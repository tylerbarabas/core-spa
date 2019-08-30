import React from 'react'
import moment from 'moment'

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
    for (let key in obj){
      let data = obj[key]
      let piece = ''

      if (data === null) continue

      if (typeof data === 'string' || typeof data === 'number') {

        piece = `&${key}=${data}`

      } else if (Array.isArray(data) && data.length > 0) {
        let a = ''

        for (let o=0;o<data.length;o++){
          if (o>0) a += ','

          a += data[o]
        }

        piece = `&${key}=${a}`
      }


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
    'last_week', 'last_month', 'late', 'critically_late', or an ISO date (ex: 2011-10-05T14:48:00.000Z).
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
    case 'late': //greater than two but less than five days ago
      g.setHours(0,0,0,0)
      g.setDate(g.getDate() - 5)

      l.setHours(23,59,59,0)
      l.setDate(l.getDate() - 2)
      break
    case 'critically_late': //greater than five days ago
      g = null

      l.setHours(0,0,0,0)
      l.setDate(l.getDate() - 5)
      break
    case 'custom':
      g = new Date(time)
      l = null
      break
    }

    return {
      gte: (g !== null) ? g.getTime()/1000 : g,
      lte: (l !== null) ? l.getTime()/1000 : l,
    }
  }

  isDateString(str){
    const regex = new RegExp(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/g)
    return regex.test(str)
  }

  /**
    Converts a boolean value to {display: 'block'} or {display: 'none'} for easy use in the style attr's of React components

    @param shouldUse - boolean
  **/
  getDisplay(shouldUse, d=DISPLAY_BLOCK){
    return (shouldUse) ? d : DISPLAY_NONE
  }

  /**
    Converts an ISO date value in to month and day, like "Aug 23rd"

    @param date - ISO date string
  **/
  getShortDate(date){
    if (!this.isDateString(date)) return false
    let m = moment(date)
    return m.format('MMM D')
  }

  /**
    Tells the approximate distance between two ISO dates
    @param to - ISO date string
    @param from - ISO date string
  **/
  getTimeUntil(to, from){
    let a = (this.isDateString(from)) ? moment(from) : moment()
    let b = (this.isDateString(to)) ? moment(to) : moment()
    return a.to(b)
  }
}

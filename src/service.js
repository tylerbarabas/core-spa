import Cookie from 'browser-cookies'
import CacheLayer from './cache-layer'

let Config
try {
  Config = require('./client_config').default
} 
catch (e) {
  throw new Error('Client config not found.')
}

const cookieDays = 2
const fullPath = path => `${Config.HOST}${path}`

const uri_authToken = fullPath('/auth/token/')
const uri_getMyUser = fullPath('/v1/users/me/')
const uri_getBrands = fullPath('/v1/brands/')
const uri_getRetailers = fullPath('/v1/retailers/')


//catalog
//const uri_getBrandConnections = fullPath('/v1/brands/:id/connections/')
const uri_getVendorImports = fullPath('/v1/retailers/:id/feed-queue/?connections=1&direction=import&limit=25')
const uri_getVendorList = fullPath('/v1/retailers/:id/connections/?pagination=0&short=1&order_by=brand__name')
const uri_getInventorySummary = fullPath('/v1/retailers/:id/inventory-summary/')
const uri_getInventoryItems = fullPath('/v1/retailers/:id/inventory/')

let Auth = {
  accessToken: null,
  tokenType: null
}

const getAuthHeaders = () => ({'Authorization': `${Auth.tokenType} ${Auth.accessToken}`})

const Cache = new CacheLayer()

export default {
  getAuthToken: async (email, password) => {

    let fd = new FormData()
    fd.append('client_id', Config.CLIENT_ID)
    fd.append('grant_type', Config.GRANT_TYPE)
    fd.set('username', email)
    fd.set('password', password)

    let res = await fetch(uri_authToken, {  
      method: 'POST',
      body: fd
    })

    let data = await res.json()

    Auth.accessToken = data.access_token
    Auth.tokenType = data.token_type

    Cookie.set('at', data.access_token, { expires: cookieDays })
    Cookie.set('tt', data.token_type, { expires: cookieDays })

    return data
  },
  getMyUser: async () => {
    let res = await fetch(uri_getMyUser, {
      headers: getAuthHeaders()
    })

    return res
  },
  getMyRetailers: async () => {
    let res = await fetch(uri_getRetailers, {
      headers: getAuthHeaders()
    })
    return res
  },
  getMyBrands: async () => {
    let res = await fetch(uri_getBrands, {
      headers: getAuthHeaders()
    })
    return res
  },
  isValidAuthCookie: () => {
    Auth.accessToken = Cookie.get('at')
    Auth.tokenType = Cookie.get('tt')

    if (Auth.accessToken === null || Auth.tokenType === null) {
      return false
    }
    return true 
  },
  getContextCookie: () => {
    return Cookie.get('ctx') 
  },
  setContextCookie: ( uuid ) => {
    let current = Cookie.get('ctx')
    if (current !== uuid) {
      Cookie.set('ctx', `${uuid}`, { expires: cookieDays })
    }
  },
  destroyCookies: () => {
    Cookie.erase('at')
    Cookie.erase('tt')
    Cookie.erase('ctx')
  },
  getVendorImports: async ( id, page = 1, filter = '' ) => {
    if (filter.length > 0) filter = `&${filter}`
    let uri = `${uri_getVendorImports.replace(/:id/,id)}${filter}&page=${page}`
    let c = Cache.find(uri)
    let data = null
    if (c === null) {
      let res = await fetch(uri, {
        headers: getAuthHeaders()
      })
      data = await res.json()
      Cache.record(uri, data)
    } else {
      data = c.res
    }
    return data
  },
  getVendorList: async id => {
    let uri = uri_getVendorList.replace(/:id/,id)
    let c = Cache.find(uri)
    let data = null
    if (c ===  null) {
      let res = await fetch(uri, {
        headers: getAuthHeaders()
      })
      data = await res.json()
      Cache.record(uri, data)
    } else {
      data = c.res
    }
    return data
  },
  getInventorySummary: async ( id, page = 1, filter ='' ) => {
    let data = null
    let uri = `${uri_getInventorySummary.replace(/:id/,id)}?${filter}&page=${page}`
    let thirtyMinutes = 60000 * 30
    let c = Cache.find(uri, thirtyMinutes)
    if (c === null) {
      let res = await fetch(uri, {
        headers: getAuthHeaders()
      })
      data = await res.json()
      Cache.record(uri, data)
    } else {
      data = c.res
    }
    return data
  },
  getInventoryItems: async ( id, page = 1, filter ='' ) => {
    let data = null
    let uri = `${uri_getInventoryItems.replace(/:id/,id)}?${filter}&page=${page}`
    let thirtyMinutes = 60000 * 30
    let c = Cache.find(uri, thirtyMinutes)
    if (c === null) {
      let res = await fetch(uri, {
        headers: getAuthHeaders()
      })
      data = await res.json()
      Cache.record(uri, data)
    } else {
      data = c.res
    }
    return data
  },
}

export const NOTIFICATION_SHOW = 'notification/NOTIFICATION_SHOW'
export const NOTIFICATION_HIDE = 'notification/NOTIFICATION_HIDE'

const initialState = {
  isActive: false,
  msg: 'This is a notification.',
  title: 'Notification Title',
  nType: 'warning',
}

export default (state = initialState, action) => {
  switch (action.type) {
  case NOTIFICATION_SHOW:
    return {
      ...state,
      isActive: true,
      title: action.title,
      msg: action.msg,
      nType: action.nType,
    }
  case NOTIFICATION_HIDE:
    return {
      ...state,
      isActive: false,
    }
  default:
    return state
  }
}

export const showNotification = (title = '', msg = '', nType = 'warning')  => {
  return dispatch => {
    dispatch({
      type: NOTIFICATION_SHOW,
      title,
      msg,
      nType,
    })
  }
}

export const hideNotification = () => {
  return dispatch => {
    dispatch({
      type: NOTIFICATION_HIDE,
    })
  }
}

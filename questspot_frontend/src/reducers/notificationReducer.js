
const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  case 'CLEAR':
    return ''
  default:
    return state
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR',
  }
}

export const notificationChange = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification: notification,
  }
}

export const setNotification = (notification, time = 3) => {
  return async dispatch => {
    dispatch(notificationChange(notification))
    setTimeout(() => {dispatch(clearNotification())}, time * 1000)
  }
}

export default notificationReducer
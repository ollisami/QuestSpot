
const initialState = false

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_SHOWLOGIN':
    return action.showLogin
  case 'HIDE':
    return false
  default:
    return state
  }
}

export const hideLogin = () => {
  return {
    type: 'HIDE',
  }
}

export const setShowLogin = value => {
  return {
    type: 'SET_SHOWLOGIN',
    showLogin: value,
  }
}

export default loginReducer
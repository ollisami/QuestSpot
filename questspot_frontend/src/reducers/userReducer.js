const initialState = ''

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  case 'CLEAR_USER':
    return initialState
  default:
    return state
  }
}

export const userChange = user => {
  if(!user) {
    return {
      type: 'CLEAR_USER'
    }
  }

  return {
    type: 'SET_USER',
    user: user,
  }
}

export default userReducer
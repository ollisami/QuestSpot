import profileService from '../services/profiles'

export const initializeProfiles = () => {
  return async dispatch => {
    const profiles = await profileService.getAll()
    dispatch({
      type: 'INIT_PROFILES',
      data: profiles,
    })
  }
}

const profilesReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_PROFILES':
    return action.data
  case 'RESET':
    return []
  default: return state
  }
}

export default profilesReducer
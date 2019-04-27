import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import profilesReducer from './reducers/profilesReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  profiles: profilesReducer,
  user: userReducer,
  showLogin: loginReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
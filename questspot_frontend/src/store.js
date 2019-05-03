import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import profilesReducer from './reducers/profilesReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'
import newsReducer from './reducers/newsReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  profiles: profilesReducer,
  user: userReducer,
  showLogin: loginReducer,
  news: newsReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
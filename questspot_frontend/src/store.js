import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import profilesReducer from './reducers/profilesReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  profiles: profilesReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

/*
blogService.getAll().then(blogs =>
  store.dispatch(initializeBlogs(blogs))
)*/
export default store
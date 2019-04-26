import newsService from '../services/news'

export const initializeNews = () => {
  return async dispatch => {
    const news = await newsService.getAll()
    dispatch({
      type: 'INIT_NEWS',
      data: news,
    })
  }
}

const newsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_NEWS':
    return action.data
  case 'RESET':
    return []
  default: return state
  }
}

export default newsReducer
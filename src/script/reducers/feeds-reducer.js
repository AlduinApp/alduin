const defaultState = {
  feeds: [],
  selectedFeed: null,
  selectedArticle: null
}

export default function (state = defaultState, action) {
  console.log(action)
  switch (action.type) {
    case 'ADD_FEED': return { ...state, feeds: [...state.feeds, action.payload] }
    case 'EDIT_FEED': return {...state, feeds: state.feeds.map((feed, idx) => ({
      ...feed,
      title: action.payload.feedId === idx ? action.payload.newTitle : feed.title
    }))}
    case 'SELECT_FEED': return { ...state, selectedFeed: action.payload }
    case 'DELETE_FEED': return { ...state, feeds: state.feeds.filter((feed, idx) => idx != action.payload) }
    case 'SELECT_ARTICLE': return { ...state, selectedArticle: action.payload }
    case 'READ_ARTICLE':
      return {
        ...state,
        feeds: state.feeds.map((feed, idx) => (
          {
            ...feed,
            articles: idx == action.payload.feedId ? feed.articles.map(article => article.id === action.payload.articleId ? { ...article, read: true } : article) : [...feed.articles]
          }
        ))
      }
    case 'READ_ARTICLES':
      return {
        ...state,
        feeds: state.feeds.map((feed, idx) => (
          {
            ...feed,
            articles: idx == action.payload.feedId ? feed.articles.map(article => ({ ...article, read: true })) : [...feed.articles]
          }
        ))
      }
    default: return state
  }
}

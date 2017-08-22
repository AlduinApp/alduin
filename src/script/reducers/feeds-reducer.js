const defaultState = {
  feeds: [],
  selectedFeed: null,
  selectedArticle: null
}

export default function (state = defaultState, action) {
  console.log(action)
  switch (action.type) {
    case 'ADD_FEED': return { ...state, feeds: [...state.feeds, action.payload] }
    case 'SELECT_FEED': return { ...state, selectedFeed: action.payload }
    case 'SELECT_ARTICLE': return { ...state, selectedArticle: action.payload }
    case 'READ_ARTICLE':
      return {
        ...state,
        feeds: state.feeds.map((feed, idx) => (
          {
            ...feed,
            articles: feed.articles.map(article => article.id === action.payload.articleId ? { ...article, read: true } : article)
          }
        ))
      }
    default: return state
  }
}

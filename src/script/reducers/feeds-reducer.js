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
        feeds: state.feeds.map((feed, idx) => {
          if(idx === action.payload.feedId)
            feed.articles = feed.articles.map(item => (item.id === action.payload.articleId ? (item.read = true, item) : item))
          return feed
        })
      }
    default: return state
  }
}

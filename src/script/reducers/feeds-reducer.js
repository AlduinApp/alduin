const defaultState = {
  feeds: [],
  selectedFeed: null,
  selectedArticle: null
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'ADD_FEED': return { ...state, feeds: [...state.feeds, action.payload] }
    case 'SELECT_FEED': return { ...state, selectedFeed: action.payload }
    case 'SELECT_ARTICLE': return { ...state, selectedArticle: action.payload }
    default: return state
  }
}

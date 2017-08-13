const defaultState = {
  feeds: [],
  selectedFeed: null
}

export default function (state = defaultState, action) {
  console.log(action)
  switch (action.type) {
    case 'ADD_FEED': return { ...state, feeds: [...state.feeds, action.payload] }
    case 'SELECT_FEED': return { ...state, selectedFeed: action.payload}
    default: return state
  }
}

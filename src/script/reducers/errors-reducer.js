const defaultState = {
  addFeedError: null
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'NEW_ADD_FEED_ERROR': return { ...state, addFeedError: action.payload }
    default: return state
  }
}

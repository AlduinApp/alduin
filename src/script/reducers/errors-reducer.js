const defaultState = {
  addFeedError: null,
  editFeedError: null
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'NEW_ADD_FEED_ERROR': return { ...state, addFeedError: action.payload }
    case 'REMOVE_ADD_FEED_ERROR': return { ...state, addFeedError: null }
    case 'NEW_EDIT_FEED_ERROR': return { ...state, editFeedError: action.payload }
    case 'REMOVE_EDIT_FEED_ERROR': return { ...state, editFeedError: null }
    default: return state
  }
}

const defaultState = {
  feeds: []
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'ADD_FEED': return { ...state, feeds: [...state.feeds, action.payload] }
    default: return state
  }
}

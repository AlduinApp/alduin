const defaultState = {
  openModal: null
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'OPEN_ADD_FEED_MODAL': return { ...state, openModal: 'add-feed' }
    case 'CLOSE_MODAL': return { ...state, openModal: null }
    default: return state
  }
}

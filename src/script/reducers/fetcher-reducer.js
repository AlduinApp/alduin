const defaultState = {
  isFetching: false
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'START_FETCH': return { isFetching: true }
    case 'END_FETCH': return { isFetching: false }
    default: return state
  }
}

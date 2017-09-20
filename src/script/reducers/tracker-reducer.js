const defaultState = {
  token: null,
  dntm: false
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'SET_TOKEN': return { ...state, token: action.payload }
    case 'DNTM': return { ...state, dntm: true }
    default: return state
  }
}

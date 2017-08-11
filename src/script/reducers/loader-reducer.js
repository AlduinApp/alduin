const defaultState = {
  display: false
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'DISPLAY_LOADER': return { display: true }
    case 'HIDE_LOADER': return { display: false }
    default: return state
  }
}

import { remote } from 'electron'

const defaultState = {
  isMaximized: remote.getCurrentWindow().isMaximized()
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'SET_MAXIMIZED': return { ...state, isMaximized: action.payload }

    default: return state
  }
}

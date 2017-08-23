import { remote } from 'electron'

const defaultState = {
  tooltip: ''
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'SET_TOOLTIP': return { ...state, tooltip: action.payload }
    default: return state
  }
}

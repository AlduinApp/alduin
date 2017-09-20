import { remote } from 'electron'

const defaultState = {
  fetchInterval: 1,
  popOnFetch: true
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'SET_SETTINGS': return action.payload
    default: return state
  }
}

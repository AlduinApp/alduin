const defaultState = {
    openModal: null
}

export default function (state = defaultState, action) {
    switch (action.type) {
        case 'OPEN_MODAL':  return { ...state, openModal: action.payload.type }
        case 'CLOSE_MODAL': return { ...state, openModal: null }
        default:            return state
    }
}
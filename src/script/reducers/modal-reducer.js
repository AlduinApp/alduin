const defaultState = {
  openModal: null,
  datas: null
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'OPEN_ADD_FEED_MODAL': return { ...state, openModal: 'add-feed' }
    case 'OPEN_EDIT_FEED_MODAL': return { ...state, openModal: 'edit-feed', datas: action.payload}
    case 'OPEN_SETTINGS_MODAL': return { ...state, openModal: 'settings' }
    case 'CLOSE_MODAL': return { ...state, openModal: null, datas: null }
    default: return state
  }
}

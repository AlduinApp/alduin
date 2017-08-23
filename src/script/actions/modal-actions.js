export function openAddFeedModal () {
  return {
    type: 'OPEN_ADD_FEED_MODAL'
  }
}

export function openEditFeedModal (feedId)  {
  return {
    type: 'OPEN_EDIT_FEED_MODAL',
    payload: feedId
  }
}
export function openSettingsModal () {
  return {
    type: 'OPEN_SETTINGS_MODAL'
  }
}

export function closeCurrentModal () {
  return {
    type: 'CLOSE_MODAL'
  }
}

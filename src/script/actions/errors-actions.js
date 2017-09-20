export function addAddFeedError(message) {
  return {
    type: 'NEW_ADD_FEED_ERROR',
    payload: message
  }
}
export function removeAddFeedError() {
  return {
    type: 'REMOVE_ADD_FEED_ERROR'
  }
}
export function addEditFeedError(message) {
  return {
    type: 'NEW_EDIT_FEED_ERROR',
    payload: message
  }
}
export function removeEditFeedError() {
  return {
    type: 'REMOVE_EDIT_FEED_ERROR'
  }
}
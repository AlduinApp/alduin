export function addFeedError (message) {
  return {
    type: 'NEW_ADD_FEED_ERROR',
    payload: message
  }
}

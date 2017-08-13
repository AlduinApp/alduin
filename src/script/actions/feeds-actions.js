export function addFeed(title, url, type, articles) {
  return {
    type: 'ADD_FEED',
    payload: { title, url, type, articles }
  }
}
export function updateArticles(title, articles) {
  return {
    type: 'UPDATE_ARTICLES',
    payload: { title, articles }
  }
}
export function selectFeed(title){
  return {
    type: 'SELECT_FEED',
    payload: title
  }
}
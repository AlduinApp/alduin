export type DataActionType<Action, Payload = void> = Payload extends void
  ? { type: Action }
  : { type: Action; payload: Payload };
export const ADD_FEED = 'ADD_FEED';
export const UPDATE_FEED = 'UPDATE_FEED';
export const UPDATE_ARTICLES = 'UPDATE_ARTICLES';
export const UPDATE_MULTIPLE_ARTICLES = 'UPDATE_MULTIPLE_ARTICLES';
export const UPDATE_FEED_TYPE = 'UPDATE_FEED_TYPE';
export const UPDATE_MULTIPLE_FEED_TYPE = 'UPDATE_MULTIPLE_FEED_TYPE';
export const READ_ARTICLE = 'READ_ARTICLE';
export const REMOVE_FEED = 'REMOVE_FEED';

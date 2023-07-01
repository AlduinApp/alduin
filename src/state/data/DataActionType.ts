export type DataActionType<Action, Payload = void> = Payload extends void
  ? { type: Action }
  : { type: Action; payload: Payload };
export const ADD_FEED = 'ADD_FEED';
export const UPDATE_ARTICLES = 'UPDATE_ARTICLES';
export const READ_ARTICLE = 'READ_ARTICLE';
export const REMOVE_FEED = 'REMOVE_FEED';

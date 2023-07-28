export type DataActionType<Action, Payload = void> = Payload extends void
  ? { type: Action }
  : { type: Action; payload: Payload };
export const LOAD = 'LOAD';
export const ADD_FEED = 'ADD_FEED';
export const UPDATE_FEED = 'UPDATE_FEED';
export const REORDER_FEED = 'REORDER_FEED';
export const UPDATE_CONTENT = 'UPDATE_CONTENT';
export const UPDATE_MULTIPLE_CONTENT = 'UPDATE_MULTIPLE_CONTENT';
export const READ_ARTICLE = 'READ_ARTICLE';
export const REMOVE_FEED = 'REMOVE_FEED';

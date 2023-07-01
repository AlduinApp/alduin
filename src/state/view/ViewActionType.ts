export type ViewActionType<Action, Payload = void> = Payload extends void
  ? { type: Action }
  : { type: Action; payload: Payload };
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const SET_ACTIVE_FEED = 'SET_ACTIVE_FEED';
export const SET_ACTIVE_ARTICLE = 'SET_ACTIVE_ARTICLE';
export const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE';

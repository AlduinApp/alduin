import { Draft, produce } from 'immer';
import { Reducer } from 'react';

import {
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_ACTIVE_ARTICLE,
  SET_ACTIVE_FEED,
  SET_FETCHING,
  TOGGLE_EDIT_MODE,
} from './ViewActionType';
import * as EditActions from './actions/EditActions';
import { ToggleEditModeAction } from './actions/EditActions';
import * as FetchingActions from './actions/FetchingActions';
import { SetFetchingAction } from './actions/FetchingActions';
import * as ModalActions from './actions/ModalActions';
import {
  CloseModalAction,
  OpenModalAction,
  SetActiveArticleAction,
  SetActiveFeedAction,
} from './actions/ModalActions';

export type ModalName = 'addFeed' | 'preference';

interface ModalState {
  open: boolean;
  state: unknown | null;
}

export interface ViewState {
  modals: Record<ModalName, ModalState>;
  activeFeed: string | null;
  activeArticle: string | null;
  editMode: boolean;
  fetching: boolean;
}

export const initialViewState: ViewState = {
  modals: {
    addFeed: {
      open: false,
      state: null,
    },
    preference: {
      open: false,
      state: null,
    },
  },
  activeFeed: null,
  activeArticle: null,
  editMode: false,
  fetching: false,
};

export type ViewActions =
  | OpenModalAction
  | CloseModalAction
  | SetActiveFeedAction
  | SetActiveArticleAction
  | ToggleEditModeAction
  | SetFetchingAction;

function innerViewReducer(draft: Draft<ViewState>, action: ViewActions) {
  switch (action.type) {
    case OPEN_MODAL:
      return ModalActions.openModal(draft, action.payload);
    case CLOSE_MODAL:
      return ModalActions.closeModal(draft, action.payload);
    case SET_ACTIVE_FEED:
      return ModalActions.setActiveFeed(draft, action.payload);
    case SET_ACTIVE_ARTICLE:
      return ModalActions.setActiveArticle(draft, action.payload);
    case TOGGLE_EDIT_MODE:
      return EditActions.toggleEditMode(draft);
    case SET_FETCHING:
      return FetchingActions.setFetching(draft, action.payload);
    default:
      break;
  }
}

export const viewReducer: Reducer<ViewState, ViewActions> =
  produce(innerViewReducer);

import { Draft } from 'immer';

import {
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_ACTIVE_ARTICLE,
  SET_ACTIVE_FEED,
  ViewActionType,
} from '../ViewActionType';
import { ModalName, ViewState } from '../ViewReducer';

export type OpenModalAction = ViewActionType<
  typeof OPEN_MODAL,
  { identifier: ModalName; state?: unknown | null }
>;

export type CloseModalAction = ViewActionType<
  typeof CLOSE_MODAL,
  { identifier: ModalName }
>;

export type SetActiveFeedAction = ViewActionType<
  typeof SET_ACTIVE_FEED,
  { identifier: string | null }
>;

export type SetActiveArticleAction = ViewActionType<
  typeof SET_ACTIVE_ARTICLE,
  { identifier: string | null }
>;

export function openModal(
  draft: Draft<ViewState>,
  {
    identifier,
    state = null,
  }: { identifier: ModalName; state?: unknown | null },
) {
  draft.modals[identifier] = {
    open: true,
    state,
  };
}

export function closeModal(
  draft: Draft<ViewState>,
  { identifier }: { identifier: ModalName },
) {
  draft.modals[identifier] = {
    open: false,
    state: null,
  };
}

export function setActiveFeed(
  draft: Draft<ViewState>,
  { identifier }: { identifier: string | null },
) {
  draft.activeFeed = identifier;
}

export function setActiveArticle(
  draft: Draft<ViewState>,
  { identifier }: { identifier: string | null },
) {
  draft.activeArticle = identifier;
}

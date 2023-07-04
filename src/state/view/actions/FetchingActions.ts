import { Draft } from 'immer';

import {
  INCREMENT_FETCHING,
  DECREMENT_FETCHING,
  ViewActionType,
} from '../ViewActionType';
import { ViewState } from '../ViewReducer';

export type IncrementFetchingAction = ViewActionType<typeof INCREMENT_FETCHING>;

export type DecrementFetchingAction = ViewActionType<typeof DECREMENT_FETCHING>;

export function incrementFetching(draft: Draft<ViewState>) {
  draft.fetching++;
}

export function decrementFetching(draft: Draft<ViewState>) {
  draft.fetching--;
}

import { Draft } from 'immer';

import { SET_FETCHING, ViewActionType } from '../ViewActionType';
import { ViewState } from '../ViewReducer';

export type SetFetchingAction = ViewActionType<
  typeof SET_FETCHING,
  { fetching: boolean }
>;

export function setFetching(
  draft: Draft<ViewState>,
  { fetching }: { fetching: boolean },
) {
  draft.fetching = fetching;
}

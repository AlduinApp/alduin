import { Draft } from 'immer';

import { DataActionType, LOAD } from '../DataActionType';
import { DataState } from '../DataReducer';

export type LoadAction = DataActionType<typeof LOAD, DataState>;

export function load(draft: Draft<DataState>, payload: LoadAction['payload']) {
  draft.feeds = payload.feeds;
}

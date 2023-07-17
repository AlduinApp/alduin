import { Draft, produce } from 'immer';
import { Reducer } from 'react';

import Feed from '../../types/Feed';

import {
  ADD_FEED,
  LOAD,
  READ_ARTICLE,
  REMOVE_FEED,
  UPDATE_CONTENT,
  UPDATE_FEED,
  UPDATE_MULTIPLE_CONTENT,
} from './DataActionType';
import * as FeedActions from './actions/FeedActions';
import {
  AddFeedAction,
  ReadArticleAction,
  RemoveFeedAction,
  UpdateContentAction,
  UpdateFeedAction,
  UpdateMultipleContentAction,
} from './actions/FeedActions';
import * as LoadActions from './actions/LoadActions';
import { LoadAction } from './actions/LoadActions';

export interface DataState {
  feeds: Feed[];
}

export const initialDataState: DataState = {
  feeds: [],
};

export type DataActions =
  | AddFeedAction
  | UpdateFeedAction
  | ReadArticleAction
  | RemoveFeedAction
  | LoadAction
  | UpdateContentAction
  | UpdateMultipleContentAction;

function innerDataReducer(draft: Draft<DataState>, action: DataActions) {
  switch (action.type) {
    case LOAD:
      return LoadActions.load(draft, action.payload);
    case ADD_FEED:
      return FeedActions.addFeed(draft, action.payload);
    case UPDATE_FEED:
      return FeedActions.updateFeed(draft, action.payload);
    case READ_ARTICLE:
      return FeedActions.readArticle(draft, action.payload);
    case REMOVE_FEED:
      return FeedActions.removeFeed(draft, action.payload);
    case UPDATE_CONTENT:
      return FeedActions.updateContent(draft, action.payload);
    case UPDATE_MULTIPLE_CONTENT:
      return FeedActions.updateMultipleContent(draft, action.payload);
    default:
      break;
  }
}

export const dataReducer: Reducer<DataState, DataActions> =
  produce(innerDataReducer);

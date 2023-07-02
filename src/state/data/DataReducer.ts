import { Draft, produce } from 'immer';
import { Reducer } from 'react';

import Feed from '../../types/Feed';

import {
  ADD_FEED,
  READ_ARTICLE,
  REMOVE_FEED,
  UPDATE_ARTICLES,
  UPDATE_FEED_TYPE,
  UPDATE_MULTIPLE_ARTICLES,
  UPDATE_MULTIPLE_FEED_TYPE,
} from './DataActionType';
import * as FeedActions from './actions/FeedActions';
import {
  AddFeedAction,
  ReadArticleAction,
  RemoveFeedAction,
  UpdateArticlesAction,
  UpdateFeedTypeAction,
  UpdateMultipleArticlesAction,
  UpdateMultipleFeedTypeAction,
} from './actions/FeedActions';

export interface DataState {
  feeds: Feed[];
}

export const initialDataState: DataState = {
  feeds: [],
};

export type DataActions =
  | AddFeedAction
  | UpdateArticlesAction
  | UpdateMultipleArticlesAction
  | UpdateFeedTypeAction
  | UpdateMultipleFeedTypeAction
  | ReadArticleAction
  | RemoveFeedAction;

function innerDataReducer(draft: Draft<DataState>, action: DataActions) {
  switch (action.type) {
    case ADD_FEED:
      return FeedActions.addFeed(draft, action.payload);
    case UPDATE_ARTICLES:
      return FeedActions.updateArticles(draft, action.payload);
    case UPDATE_MULTIPLE_ARTICLES:
      return FeedActions.updateMultipleArticles(draft, action.payload);
    case UPDATE_FEED_TYPE:
      return FeedActions.updateFeedType(draft, action.payload);
    case UPDATE_MULTIPLE_FEED_TYPE:
      return FeedActions.updateMultipleFeedType(draft, action.payload);
    case READ_ARTICLE:
      return FeedActions.readArticle(draft, action.payload);
    case REMOVE_FEED:
      return FeedActions.removeFeed(draft, action.payload);
    default:
      break;
  }
}

export const dataReducer: Reducer<DataState, DataActions> =
  produce(innerDataReducer);

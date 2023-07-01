import { Draft, produce } from 'immer';
import { Reducer } from 'react';

import Feed from '../../types/Feed';

import {
  ADD_FEED,
  READ_ARTICLE,
  REMOVE_FEED,
  UPDATE_ARTICLES,
} from './DataActionType';
import * as FeedActions from './actions/FeedActions';
import {
  AddFeedAction,
  ReadArticleAction,
  RemoveFeedAction,
  UpdateArticlesAction,
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
  | ReadArticleAction
  | RemoveFeedAction;

function innerDataReducer(draft: Draft<DataState>, action: DataActions) {
  switch (action.type) {
    case ADD_FEED:
      return FeedActions.addFeed(draft, action.payload);
    case UPDATE_ARTICLES:
      return FeedActions.updateArticles(draft, action.payload);
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

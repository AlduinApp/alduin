import { v4 as uuid } from '@lukeed/uuid';
import { Draft } from 'immer';

import Article from '../../../types/Article';
import Feed from '../../../types/Feed';
import FeedType from '../../../types/FeedType';
import SyncResponse, { ArticleResponse } from '../../../types/SyncResponse';
import articleMapper from '../../../utils/articleMapper';
import reconciliate from '../../../utils/reconciliate';
import {
  ADD_FEED,
  DataActionType,
  READ_ARTICLE,
  REMOVE_FEED,
  UPDATE_ARTICLES,
  UPDATE_FEED,
  UPDATE_FEED_TYPE,
  UPDATE_MULTIPLE_ARTICLES,
  UPDATE_MULTIPLE_FEED_TYPE,
  UPDATE_CONTENT,
  UPDATE_MULTIPLE_CONTENT,
} from '../DataActionType';
import { DataState } from '../DataReducer';

export type AddFeedAction = DataActionType<
  typeof ADD_FEED,
  { displayName: string; link: string; interval: string }
>;

export type UpdateFeedAction = DataActionType<
  typeof UPDATE_FEED,
  { identifier: string; displayName: string; link: string; interval: string }
>;

export type UpdateArticlesAction = DataActionType<
  typeof UPDATE_ARTICLES,
  { identifier: string; articles: Article[] }
>;

export type UpdateMultipleArticlesAction = DataActionType<
  typeof UPDATE_MULTIPLE_ARTICLES,
  { identifier: string; articles: Article[] }[]
>;

export type UpdateFeedTypeAction = DataActionType<
  typeof UPDATE_FEED_TYPE,
  { identifier: string; type: Exclude<FeedType, null> }
>;

export type UpdateMultipleFeedTypeAction = DataActionType<
  typeof UPDATE_MULTIPLE_FEED_TYPE,
  { identifier: string; type: Exclude<FeedType, null> }[]
>;

export type ReadArticleAction = DataActionType<
  typeof READ_ARTICLE,
  { identifier: string; articleIdentifier: string }
>;

export type RemoveFeedAction = DataActionType<
  typeof REMOVE_FEED,
  { identifier: string }
>;

export type UpdateContentAction = DataActionType<
  typeof UPDATE_CONTENT,
  SyncResponse
>;

export type UpdateMultipleContentAction = DataActionType<
  typeof UPDATE_MULTIPLE_CONTENT,
  SyncResponse[]
>;

export function addFeed(
  draft: Draft<DataState>,
  {
    displayName,
    link,
    interval,
  }: { displayName: string; link: string; interval: string },
) {
  draft.feeds.push({
    identifier: uuid(),
    displayName,
    link,
    articles: [],
    type: null,
    interval: Number.parseInt(interval, 10),
    lastUpdated: 0,
    image: null,
  });
}

export function updateFeed(
  draft: Draft<DataState>,
  {
    identifier,
    displayName,
    link,
    interval,
  }: {
    identifier: string;
    displayName: string;
    link: string;
    interval: string;
  },
) {
  const feed = draft.feeds.find((feed) => feed.identifier === identifier);
  if (!feed) return;

  feed.displayName = displayName;
  feed.link = link;
  feed.interval = Number.parseInt(interval, 10);
}

export function readArticle(
  draft: Draft<DataState>,
  {
    identifier,
    articleIdentifier,
  }: { identifier: string; articleIdentifier: string },
) {
  const feed = draft.feeds.find((feed) => feed.identifier === identifier);
  if (!feed) return;

  const article = feed.articles.find(
    (article) => article.identifier === articleIdentifier,
  );
  if (!article) return;

  article.read = true;
}

export function removeFeed(
  draft: Draft<DataState>,
  { identifier }: { identifier: string },
) {
  const feedIndex = draft.feeds.findIndex(
    (feed) => feed.identifier === identifier,
  );
  if (feedIndex === -1) return;

  draft.feeds.splice(feedIndex, 1);
}

function updateArticles(
  draft: Draft<DataState>,
  { feed, articles }: { feed: Feed; articles: ArticleResponse[] },
) {
  for (const article of articles.map(articleMapper)) {
    const alreadyExistingIndex = feed.articles.findIndex(
      (scanArticle) => scanArticle.identifier === article.identifier,
    );

    if (alreadyExistingIndex === -1) {
      feed.articles.push(article);
    } else {
      feed.articles[alreadyExistingIndex] = reconciliate(
        feed.articles[alreadyExistingIndex],
        article,
      );
    }
  }
}

export function updateContent(
  draft: Draft<DataState>,
  { identifier, articles, type, image }: SyncResponse,
) {
  const feed = draft.feeds.find((feed) => feed.identifier === identifier);
  if (!feed) return;

  feed.type = type;
  updateArticles(draft, { feed, articles });
  feed.image = image;

  feed.lastUpdated = Date.now();
}

export function updateMultipleContent(
  draft: Draft<DataState>,
  payload: SyncResponse[],
) {
  for (const syncResponse of payload) {
    updateContent(draft, syncResponse);
  }
}

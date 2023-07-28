import { v4 as uuid } from '@lukeed/uuid';
import { Draft } from 'immer';

import Feed from '../../../types/Feed';
import SyncResponse, { ArticleResponse } from '../../../types/SyncResponse';
import articleMapper from '../../../utils/articleMapper';
import reconciliate from '../../../utils/reconciliate';
import {
  ADD_FEED,
  DataActionType,
  READ_ARTICLE,
  REMOVE_FEED,
  UPDATE_FEED,
  UPDATE_CONTENT,
  UPDATE_MULTIPLE_CONTENT,
  REORDER_FEED,
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

export type ReorderFeedAction = DataActionType<
  typeof REORDER_FEED,
  { fromIdentifier: string; toIdentifier: string }
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

export function reorderFeed(
  draft: Draft<DataState>,
  {
    fromIdentifier,
    toIdentifier,
  }: { fromIdentifier: string; toIdentifier: string },
) {
  const fromIndex = draft.feeds.findIndex(
    (feed) => feed.identifier === fromIdentifier,
  );
  const toIndex = draft.feeds.findIndex(
    (feed) => feed.identifier === toIdentifier,
  );

  if (fromIndex === -1 || toIndex === -1) return;

  const [feed] = draft.feeds.splice(fromIndex, 1);
  draft.feeds.splice(toIndex, 0, feed);
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

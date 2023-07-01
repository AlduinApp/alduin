import { v4 as uuid } from '@lukeed/uuid';
import { Draft } from 'immer';

import Article from '../../../types/Article';
import reconciliate from '../../../utils/reconciliate';
import {
  ADD_FEED,
  DataActionType,
  READ_ARTICLE,
  REMOVE_FEED,
  UPDATE_ARTICLES,
} from '../DataActionType';
import { DataState } from '../DataReducer';

export type AddFeedAction = DataActionType<
  typeof ADD_FEED,
  { displayName: string; link: string; articles: Article[] }
>;

export type UpdateArticlesAction = DataActionType<
  typeof UPDATE_ARTICLES,
  { identifier: string; articles: Article[] }
>;

export type ReadArticleAction = DataActionType<
  typeof READ_ARTICLE,
  { identifier: string; articleIdentifier: string }
>;

export type RemoveFeedAction = DataActionType<
  typeof REMOVE_FEED,
  { identifier: string }
>;

export function addFeed(
  draft: Draft<DataState>,
  {
    displayName,
    link,
    articles,
  }: { displayName: string; link: string; articles: Article[] },
) {
  draft.feeds.push({ identifier: uuid(), displayName, link, articles });
}

export function updateArticles(
  draft: Draft<DataState>,
  { identifier, articles }: { identifier: string; articles: Article[] },
) {
  const feed = draft.feeds.find((feed) => feed.identifier === identifier);
  if (!feed) return;

  for (const article of articles) {
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

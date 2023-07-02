import FeedType from './FeedType';

export interface ArticleResponse {
  id: string;
  title: string;
  content: string;
  date: string;
  link: string;
}

export default interface SyncResponse {
  identifier: string;
  type: Exclude<FeedType, null>;
  articles: ArticleResponse[];
}

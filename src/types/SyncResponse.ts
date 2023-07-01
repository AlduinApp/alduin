import FeedType from './FeedType';

interface ArticleResponse {
  id: string;
  title: string;
  content: string;
  date: string;
  link: string;
}

export default interface SyncResponse {
  identifier: string;
  type: FeedType;
  articles: ArticleResponse[];
}

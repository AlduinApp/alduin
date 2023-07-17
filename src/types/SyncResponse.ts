import FeedType from './FeedType';
import ImageStructure from './ImageStructure';

export interface ArticleResponse {
  id: string;
  title: string;
  content: string;
  date: string;
  read: boolean;
}

export default interface SyncResponse {
  identifier: string;
  type: Exclude<FeedType, null>;
  articles: ArticleResponse[];
  image: ImageStructure | null;
}

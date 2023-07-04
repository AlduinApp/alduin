import Article from './Article';
import FeedType from './FeedType';

export default interface Feed {
  identifier: string;
  displayName: string;
  link: string;
  type: FeedType;
  articles: Article[];
  interval: number;
  lastUpdated: number;
}

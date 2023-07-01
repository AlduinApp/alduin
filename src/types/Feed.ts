import Article from './Article';

export default interface Feed {
  identifier: string;
  displayName: string;
  link: string;
  articles: Article[];
}

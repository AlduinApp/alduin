export default interface Article {
  identifier: string;
  title: string;
  content: string;
  date: Date;
  link: string;
  type: 'atom' | 'rss';
  read: boolean;
}

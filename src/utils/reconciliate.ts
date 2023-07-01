import Article from '../types/Article';

export default function reconciliate(previous: Article, current: Article) {
  return {
    ...current,
    read: previous.read,
    identifier: previous.identifier,
  };
}

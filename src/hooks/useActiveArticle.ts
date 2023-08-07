import { useQuery } from '@tanstack/react-query';

import ArticleService from '../services/ArticleService';
import QueryKey from '../utils/QueryKey';

import useView from './useView';

export default function useActiveArticle() {
  const view = useView();
  const { data: article } = useQuery(
    QueryKey.article(view.activeArticle),
    () => ArticleService.getArticle(view.activeArticle),
    { initialData: null },
  );

  return article;
}

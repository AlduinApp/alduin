import { useQuery } from '@tanstack/react-query';

import ArticleService from '../services/ArticleService';
import QueryKey from '../utils/QueryKey';

import useActiveFeed from './useActiveFeed';

export default function useArticles() {
  const activeFeed = useActiveFeed();

  const {
    data: articles,
    isLoading,
    isError,
  } = useQuery(
    QueryKey.articles(activeFeed?.identifier ?? null),
    () => ArticleService.getArticles(activeFeed?.identifier),
    { initialData: [] },
  );

  return { articles, isLoading, isError };
}

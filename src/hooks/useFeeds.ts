import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import FeedService from '../services/FeedService';
import QueryKey from '../utils/QueryKey';

export default function useFeeds() {
  const {
    data: feeds,
    isLoading,
    isError,
  } = useQuery(QueryKey.feeds(), FeedService.getFeeds, {
    initialData: [],
  });

  const ordered = useMemo(
    () => feeds.sort((a, b) => a.rowid - b.rowid),
    [feeds],
  );

  return { feeds: ordered, isLoading, isError };
}

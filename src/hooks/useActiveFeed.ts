import { useMemo } from 'react';

import useFeeds from './useFeeds';
import useView from './useView';

export default function useActiveFeed() {
  const view = useView();
  const { feeds } = useFeeds();

  const activeFeed = useMemo(
    () => feeds?.find((feed) => feed.identifier === view.activeFeed) ?? null,
    [feeds, view.activeFeed],
  );

  return activeFeed;
}

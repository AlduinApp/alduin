import { useCallback } from 'react';
import { FaDownload, FaSpinner } from 'react-icons/fa';

import useFeeds from '../hooks/useFeeds';
import useSync from '../hooks/useSync';

import IconButton from './form/IconButton';

export default function SyncAllButton() {
  const { feeds } = useFeeds();
  const { sync, isLoading } = useSync();

  const handleClick = useCallback(() => {
    sync(feeds.map((feed) => ({ identifier: feed.identifier, url: feed.url })));
  }, [feeds, sync]);

  if (isLoading) {
    return <IconButton Icon={FaSpinner} className="animate-spin" />;
  }

  return <IconButton Icon={FaDownload} onClick={handleClick} />;
}

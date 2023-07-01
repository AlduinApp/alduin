import { invoke } from '@tauri-apps/api';
import { xxHash32 } from 'js-xxhash';
import { useCallback } from 'react';

import Article from '../types/Article';
import SyncResponse from '../types/SyncResponse';

import useData from './useData';

export default function useSync() {
  const data = useData();

  const syncByLink = useCallback(async (link: string): Promise<Article[]> => {
    const response = await invoke<SyncResponse>('sync', {
      feedLink: link,
    });

    return response.articles.map(({ id, title, content, link, date }) => ({
      identifier: xxHash32(id).toString(16),
      title,
      content,
      link,
      read: false,
      date: new Date(date),
    }));
  }, []);

  const sync = useCallback(
    async (identifier: string): Promise<Article[]> => {
      const feed = data.feeds.find((feed) => feed.identifier === identifier);
      if (!feed) return [];

      return syncByLink(feed.link);
    },
    [data.feeds, syncByLink],
  );

  return { sync, syncByLink };
}

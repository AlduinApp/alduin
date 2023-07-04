import { invoke } from '@tauri-apps/api';
import { useCallback } from 'react';

import {
  UPDATE_ARTICLES,
  UPDATE_FEED_TYPE,
  UPDATE_MULTIPLE_ARTICLES,
  UPDATE_MULTIPLE_FEED_TYPE,
} from '../state/data/DataActionType';
import {
  DECREMENT_FETCHING,
  INCREMENT_FETCHING,
} from '../state/view/ViewActionType';
import SyncRequest from '../types/SyncRequest';
import SyncResponse from '../types/SyncResponse';
import articleMapper from '../utils/articleMapper';

import useData from './useData';
import useDataDispatch from './useDataDispatch';
import useViewDispatch from './useViewDispatch';

export default function useSync() {
  const data = useData();
  const dataDispatch = useDataDispatch();
  const viewDispatch = useViewDispatch();

  const sync = useCallback(
    (identifier: string) => {
      const feed = data.feeds.find((feed) => feed.identifier === identifier);
      if (!feed) return [];

      viewDispatch({
        type: INCREMENT_FETCHING,
      });

      invoke<SyncResponse>('sync', {
        syncRequest: {
          feedIdentifier: feed.identifier,
          feedLink: feed.link,
        },
      })
        .then((response) => {
          dataDispatch({
            type: UPDATE_FEED_TYPE,
            payload: {
              identifier: feed.identifier,
              type: response.type,
            },
          });
          dataDispatch({
            type: UPDATE_ARTICLES,
            payload: {
              identifier: feed.identifier,
              articles: response.articles.map(articleMapper),
            },
          });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          viewDispatch({
            type: DECREMENT_FETCHING,
          });
        });
    },
    [data.feeds, dataDispatch, viewDispatch],
  );

  const syncAll = useCallback(() => {
    /* eslint-disable camelcase */
    const syncRequest: SyncRequest[] = data.feeds.map((feed) => ({
      feed_identifier: feed.identifier,
      feed_link: feed.link,
    }));
    /* eslint-enable camelcase */

    viewDispatch({
      type: INCREMENT_FETCHING,
    });

    invoke<SyncResponse[]>('sync_all', { syncRequest })
      .then((response) => {
        dataDispatch({
          type: UPDATE_MULTIPLE_FEED_TYPE,
          payload: response.map(({ identifier, type }) => ({
            identifier,
            type,
          })),
        });

        dataDispatch({
          type: UPDATE_MULTIPLE_ARTICLES,
          payload: response.map(({ identifier, articles }) => ({
            identifier,
            articles: articles.map(articleMapper),
          })),
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        viewDispatch({
          type: DECREMENT_FETCHING,
        });
      });
  }, [data.feeds, dataDispatch, viewDispatch]);

  return { sync, syncAll };
}

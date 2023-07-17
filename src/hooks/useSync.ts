import { invoke } from '@tauri-apps/api';
import { useCallback } from 'react';

import {
  UPDATE_CONTENT,
  UPDATE_MULTIPLE_CONTENT,
} from '../state/data/DataActionType';
import {
  DECREMENT_FETCHING,
  INCREMENT_FETCHING,
} from '../state/view/ViewActionType';
import SyncRequest from '../types/SyncRequest';
import SyncResponse from '../types/SyncResponse';

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
          identifier: feed.identifier,
          link: feed.link,
        },
      })
        .then((response) => {
          dataDispatch({
            type: UPDATE_CONTENT,
            payload: response,
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
    const syncRequest: SyncRequest[] = data.feeds.map((feed) => ({
      identifier: feed.identifier,
      link: feed.link,
    }));
    viewDispatch({
      type: INCREMENT_FETCHING,
    });

    invoke<SyncResponse[]>('sync_all', { syncRequest })
      .then((response) => {
        dataDispatch({
          type: UPDATE_MULTIPLE_CONTENT,
          payload: response,
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

import { useMutation, useQueryClient } from '@tanstack/react-query';

import SyncService from '../services/SyncService';
import QueryKey from '../utils/QueryKey';

export default function useSync() {
  const queryClient = useQueryClient();

  const syncMutation = useMutation(SyncService.sync, {
    onSuccess: () => queryClient.invalidateQueries(QueryKey.feeds()),
  });

  return {
    sync: syncMutation.mutate,
    isLoading: syncMutation.isLoading,
  };
}

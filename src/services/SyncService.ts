import { invoke } from '@tauri-apps/api';

interface SyncRequest {
  identifier: string;
  url: string;
}

function sync(syncRequest: SyncRequest[]) {
  console.log('sync');
  return invoke('sync_all', { syncRequest });
}

const SyncService = {
  sync,
};

export default SyncService;

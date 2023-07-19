import { invoke } from '@tauri-apps/api';
import { memo, useEffect } from 'react';
import { useToggle } from 'react-use';

import AutostartManager from './AutostartManager';
import BackupManager from './BackupManager';

function LoadManager() {
  const [backupLoaded, toggleBackupLoaded] = useToggle(false);
  const [autostartLoaded, toggleAutostartLoaded] = useToggle(false);

  useEffect(() => {
    if (!backupLoaded || !autostartLoaded) return;
    invoke('close_splashscreen').catch((error) => console.error(error));
  }, [autostartLoaded, backupLoaded]);

  return (
    <>
      <BackupManager loaded={backupLoaded} triggerLoaded={toggleBackupLoaded} />
      {backupLoaded && (
        <AutostartManager
          loaded={autostartLoaded}
          triggerLoaded={toggleAutostartLoaded}
        />
      )}
    </>
  );
}

export default memo(LoadManager);

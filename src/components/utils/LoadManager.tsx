import { invoke } from '@tauri-apps/api';
import { getMatches } from '@tauri-apps/api/cli';
import { memo, useEffect } from 'react';
import { useToggle } from 'react-use';

import usePreference from '../../hooks/usePreference';

import AutostartManager from './AutostartManager';
import BackupManager from './BackupManager';

function LoadManager() {
  const [backupLoaded, toggleBackupLoaded] = useToggle(false);
  const [autostartLoaded, toggleAutostartLoaded] = useToggle(false);
  const { startMinimized } = usePreference();

  useEffect(() => {
    if (!backupLoaded || !autostartLoaded) return;
    async function bootedRoutine() {
      const matches = await getMatches();

      await invoke('close_splashscreen');

      const autostarting = (matches.args?.autostart?.occurrences ?? 0) > 0;
      console.log(matches, autostarting, startMinimized);

      if (autostarting && startMinimized) {
        return;
      }

      await invoke('open_main_window');
    }

    bootedRoutine().catch(console.error);
  }, [autostartLoaded, backupLoaded, startMinimized]);

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

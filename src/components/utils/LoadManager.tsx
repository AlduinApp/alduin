import { invoke } from '@tauri-apps/api';
import { getMatches } from '@tauri-apps/api/cli';
import { memo, useEffect } from 'react';
import { useToggle } from 'react-use';

import usePreferences from '../../hooks/usePreferences';

import AutostartManager from './AutostartManager';

function LoadManager() {
  const [autostartLoaded, toggleAutostartLoaded] = useToggle(false);
  const { startMinimized } = usePreferences();

  useEffect(() => {
    if (!autostartLoaded) return;
    async function bootedRoutine() {
      const matches = await getMatches();

      await invoke('close_splashscreen');

      const autostarting = (matches.args?.autostart?.occurrences ?? 0) > 0;
      if (autostarting && startMinimized) {
        return;
      }

      await invoke('open_main_window');
    }

    bootedRoutine().catch(console.error);
  }, [autostartLoaded, startMinimized]);

  return (
    <AutostartManager
      loaded={autostartLoaded}
      triggerLoaded={toggleAutostartLoaded}
    />
  );
}

export default memo(LoadManager);

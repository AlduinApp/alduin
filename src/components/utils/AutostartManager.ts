import { memo, useEffect } from 'react';
import {
  enable,
  isEnabled as isEnabledFunction,
  disable,
} from 'tauri-plugin-autostart-api';

import usePreferences from '../../hooks/usePreferences';

interface AutostartManagerProps {
  loaded: boolean;
  triggerLoaded: (state?: boolean) => void;
}

function AutostartManager({ loaded, triggerLoaded }: AutostartManagerProps) {
  const preferenceState = usePreferences();

  useEffect(() => {
    async function handleAutostart() {
      const wantedAutostart = preferenceState.autoStart;
      const currentAutostart = (await isEnabledFunction()) ?? false;

      if (wantedAutostart && !currentAutostart) {
        await enable();
      }

      if (!wantedAutostart && currentAutostart) {
        await disable();
      }
    }

    handleAutostart()
      .catch((error) => console.error(error))
      .finally(() => triggerLoaded(true));
  }, [loaded, preferenceState.autoStart, triggerLoaded]);

  return null;
}

export default memo(AutostartManager);

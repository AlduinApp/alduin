import { memo, useEffect, useMemo } from 'react';

import { DataBackup, PreferenceBackup } from '../../data/Backup';
import * as Backup from '../../data/Backup';
import { loadData, loadPreference } from '../../data/load';
import save from '../../data/save';
import useData from '../../hooks/useData';
import useDataDispatch from '../../hooks/useDataDispatch';
import usePreference from '../../hooks/usePreference';
import usePreferenceDispatch from '../../hooks/usePreferenceDispatch';
import usePromise from '../../hooks/usePromise';
import useThrottle from '../../hooks/useThrottle';
import { LOAD } from '../../state/data/DataActionType';
import { SET_PREFERENCES } from '../../state/preference/PreferenceActionType';

const throttleTime = 2000;

interface BackupManagerProps {
  loaded: boolean;
  triggerLoaded: (state?: boolean) => void;
}

function BackupManager({ loaded, triggerLoaded }: BackupManagerProps) {
  const rawDataState = useData();
  const dataDispatch = useDataDispatch();
  const rawPreferenceState = usePreference();
  const preferenceDispatch = usePreferenceDispatch();

  const dataState = useThrottle(rawDataState, throttleTime);
  const preferenceState = useThrottle(rawPreferenceState, throttleTime);

  // save data state
  useEffect(() => {
    if (!loaded) return;

    const backupStructure: DataBackup = {
      type: 'data',
      version: Backup.VERSION,
      state: dataState,
    };
    save(backupStructure).catch((error) => console.error(error));
  }, [dataState, loaded]);

  // save preference state
  useEffect(() => {
    if (!loaded) return;

    const backupStructure: PreferenceBackup = {
      type: 'preference',
      version: Backup.VERSION,
      state: preferenceState,
    };
    save(backupStructure).catch((error) => console.error(error));
  }, [loaded, preferenceState]);

  const dataPromise = useMemo(
    () =>
      loadData().then((backup) => {
        if (backup !== null) {
          dataDispatch({
            type: LOAD,
            payload: backup.state,
          });
        }
        return backup;
      }),
    [dataDispatch],
  );

  const preferencePromise = useMemo(
    () =>
      loadPreference().then((backup) => {
        if (backup !== null) {
          preferenceDispatch({
            type: SET_PREFERENCES,
            payload: backup.state,
          });
        }
        return backup;
      }),
    [preferenceDispatch],
  );

  const { loading: dataLoading, error: dataError } = usePromise(dataPromise);

  const { loading: preferenceLoading, error: preferenceError } =
    usePromise(preferencePromise);

  useEffect(() => {
    if (dataLoading || preferenceLoading) return;

    if (dataError || preferenceError) {
      // TODO : error on loading backup, explode to not corrupt data
      console.error(dataError);
      console.error(preferenceError);
      return;
    }

    triggerLoaded(true);
  }, [
    dataError,
    dataLoading,
    loaded,
    preferenceError,
    preferenceLoading,
    triggerLoaded,
  ]);

  return null;
}

export default memo(BackupManager);

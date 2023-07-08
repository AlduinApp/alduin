import { invoke } from '@tauri-apps/api';
import { memo, useEffect } from 'react';

import { DataBackup, PreferenceBackup } from '../../data/Backup';
import { loadData, loadPreference } from '../../data/load';
import save from '../../data/save';
import useData from '../../hooks/useData';
import useDataDispatch from '../../hooks/useDataDispatch';
import usePreference from '../../hooks/usePreference';
import usePreferenceDispatch from '../../hooks/usePreferenceDispatch';
import useThrottle from '../../hooks/useThrottle';
import { LOAD } from '../../state/data/DataActionType';
import { SET_PREFERENCES } from '../../state/preference/PreferenceActionType';

const throttleTime = 2000;

let loaded = false;

function BackupManager() {
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
      version: 1,
      state: dataState,
    };
    console.log('save data use effect', JSON.stringify(backupStructure));
    save(backupStructure).catch((error) => console.error(error));
  }, [dataState]);

  // save preference state
  useEffect(() => {
    if (!loaded) return;

    const backupStructure: PreferenceBackup = {
      type: 'preference',
      version: 1,
      state: preferenceState,
    };
    console.log('save preference use effect', JSON.stringify(backupStructure));
    save(backupStructure).catch((error) => console.error(error));
  }, [preferenceState]);

  useEffect(() => {
    console.log('load use effect');
    Promise.all([
      loadData().then((backup) => {
        if (backup !== null) {
          dataDispatch({
            type: LOAD,
            payload: backup.state,
          });
        }
      }),
      loadPreference().then((backup) => {
        if (backup !== null) {
          preferenceDispatch({
            type: SET_PREFERENCES,
            payload: backup.state,
          });
        }
      }),
    ])
      .then(() => {
        loaded = true;
      })
      .then(() => invoke('close_spashscreen'))
      .catch((error) => {
        // TODO : error on loading backup, explode to not corrupt data
        console.error(error);
      });
  }, [dataDispatch, preferenceDispatch]);

  return null;
}

export default memo(BackupManager);

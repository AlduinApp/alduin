import { invoke } from '@tauri-apps/api';
import {
  BaseDirectory,
  createDir,
  exists,
  readBinaryFile,
  writeBinaryFile,
} from '@tauri-apps/api/fs';
import JSZip from 'jszip';
import { memo, useCallback, useEffect } from 'react';
import { useBoolean } from 'react-use';

import useData from '../hooks/useData';
import useDataDispatch from '../hooks/useDataDispatch';
import usePreference from '../hooks/usePreference';
import usePreferenceDispatch from '../hooks/usePreferenceDispatch';
import useThrottle from '../hooks/useThrottle';
import { LOAD } from '../state/data/DataActionType';
import { DataState } from '../state/data/DataReducer';
import { SET_PREFERENCES } from '../state/preference/PreferenceActionType';
import { PreferenceState } from '../state/preference/PreferenceReducer';

type BackupType = 'data' | 'preference';

interface Backup<T> {
  type: BackupType;
  version: number;
  state: T;
}

type DataBackup = Backup<DataState>;
type PreferenceBackup = Backup<PreferenceState>;

const throttleTime = 2000;

function BackupManager() {
  const rawDataState = useData();
  const dataDispatch = useDataDispatch();
  const rawPreferenceState = usePreference();
  const preferenceDispatch = usePreferenceDispatch();

  const dataState = useThrottle(rawDataState, throttleTime);
  console.log('dataState', dataState);
  const preferenceState = useThrottle(rawPreferenceState, throttleTime);
  const [loaded, toggleLoaded] = useBoolean(false);

  const save = useCallback(
    async (backup: Backup<unknown>, dir: BaseDirectory) => {
      await createDir('', {
        dir,
        recursive: true,
      });

      const backupContent = JSON.stringify(backup);
      const zip = new JSZip();
      zip.file('content.json', backupContent);
      const buffer = await zip.generateAsync({ type: 'uint8array' });
      await writeBinaryFile(`${backup.type}.alduin`, buffer, {
        dir,
      });
    },
    [],
  );

  const load = useCallback(async <T>(type: BackupType, dir: BaseDirectory) => {
    console.log('load backup', type);
    const fileExists = await exists(`${type}.alduin`, { dir });
    if (!fileExists) return null;

    const buffer = await readBinaryFile(`${type}.alduin`, { dir });
    const zip = await JSZip.loadAsync(buffer);
    const file = zip.file('content.json');
    if (!file) throw new Error('Invalid backup file');
    const content = await file.async('string');
    const backup: T = JSON.parse(content);

    return backup;
  }, []);

  // save data state
  useEffect(() => {
    if (!loaded) return;

    const backupStructure: DataBackup = {
      type: 'data',
      version: 1,
      state: dataState,
    };
    save(backupStructure, BaseDirectory.AppData).catch((error) =>
      console.error(error),
    );
  }, [save, dataState, loaded]);

  // save preference state
  useEffect(() => {
    if (!loaded) return;

    const backupStructure: PreferenceBackup = {
      type: 'preference',
      version: 1,
      state: preferenceState,
    };
    save(backupStructure, BaseDirectory.AppConfig).catch((error) =>
      console.error(error),
    );
  }, [save, preferenceState, loaded]);

  useEffect(() => {
    Promise.all([
      load<DataBackup>('data', BaseDirectory.AppData).then((backup) => {
        if (backup !== null) {
          dataDispatch({
            type: LOAD,
            payload: backup.state,
          });
        }
      }),
      load<PreferenceBackup>('preference', BaseDirectory.AppConfig).then(
        (backup) => {
          if (backup !== null) {
            preferenceDispatch({
              type: SET_PREFERENCES,
              payload: backup.state,
            });
          }
        },
      ),
    ])
      .then(() => {
        toggleLoaded(true);
      })
      .then(() => invoke('close_spashscreen'))
      .catch((error) => {
        // TODO : error on loading backup, explode to not corrupt data
        console.error(error);
      });
  }, [dataDispatch, load, preferenceDispatch, toggleLoaded]);

  return null;
}

export default memo(BackupManager);

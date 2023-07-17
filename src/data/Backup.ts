import { DataState } from '../state/data/DataReducer';
import { PreferenceState } from '../state/preference/PreferenceReducer';

export type BackupType = 'data' | 'preference';

export interface Backup<T extends BackupType, S> {
  type: T;
  version: number;
  state: S;
}

export type DataBackup = Backup<'data', DataState>;
export type PreferenceBackup = Backup<'preference', PreferenceState>;

export type AnyBackup = DataBackup | PreferenceBackup;

export const VERSION = 2;

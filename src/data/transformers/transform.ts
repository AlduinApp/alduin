import { AnyBackup, DataBackup, PreferenceBackup } from '../Backup';

import v2 from './v2';

export interface Transformer {
  data: (backup: DataBackup) => DataBackup;
  preference: (backup: PreferenceBackup) => PreferenceBackup;
}

const transformers: Record<number, Transformer> = {
  1: v2,
};

export default function transform<T extends AnyBackup>(backup: T) {
  const transformer = transformers[backup.version];
  if (!transformer) return backup;
  const func = transformer[backup.type] as (backup: AnyBackup) => AnyBackup;
  if (!func) throw new Error(`Invalid backup type ${backup.type}`);
  return func(backup) as T;
}

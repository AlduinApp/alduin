import JSZip from 'jszip';

import { AnyBackup, Backup } from './Backup';
import init from './init';

export default async function save(backup: AnyBackup) {
  console.log('saving', backup);
  const backupContent = JSON.stringify(backup);
  const zip = new JSZip();
  zip.file('content.json', backupContent);
  const buffer = await zip.generateAsync({ type: 'uint8array' });
  const data = [...buffer];
  const db = await init();
  const result = await db.execute(
    'INSERT INTO files (name, content) VALUES (?, ?) ON CONFLICT (name) DO UPDATE SET content = ?',
    [`${backup.type}.alduin`, data, data],
  );
}

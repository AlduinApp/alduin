import JSZip from 'jszip';

import { BackupType, DataBackup, PreferenceBackup } from './Backup';
import init from './init';

async function load<T>(type: BackupType) {
  const db = await init();
  const result = await db.select<{ content: string }[]>(
    'SELECT content FROM files WHERE name = ?',
    [`${type}.alduin`],
  );
  if (result.length === 0) return null;
  const buffer = JSON.parse(result[0].content) as number[];

  const zip = await JSZip.loadAsync(buffer);
  const file = zip.file('content.json');
  if (!file) throw new Error('Invalid backup file');
  const content = await file.async('string');
  const backup: T = JSON.parse(content);
  return backup;
}

export async function loadData() {
  const data = await load<DataBackup>('data');
  if (data === null) return null;
  return parseDataBackup(data);
}

export async function loadPreference() {
  return load<PreferenceBackup>('preference');
}

function parseDataBackup(backup: DataBackup) {
  return {
    ...backup,
    state: {
      ...backup.state,
      feeds: backup.state.feeds.map((feed) => ({
        ...feed,
        articles: feed.articles.map((article) => ({
          ...article,
          date: new Date(article.date),
        })),
      })),
    },
  };
}

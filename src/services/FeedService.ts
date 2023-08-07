import { v4 as uuid } from '@lukeed/uuid';

import camelize from '../utils/camelize';

import database from './database/sqlite';

export interface IInitialFeed {
  identifier: string;
  displayName: string;
  url: string;
  interval: number;
}

export interface IFeed extends IInitialFeed {
  type: string | null;
  lastUpdated: number | null;
  imageUrl: string | null;
  unread: number;
  rowid: number;
}

async function getFeeds() {
  console.log('getFeeds');
  const db = await database();
  const snaked = await db.select(`
    SELECT
      feeds.identifier as identifier,
      feeds.display_name as display_name,
      feeds.url as url,
      feeds.type as type,
      feeds.interval as interval,
      feeds.last_updated as last_updated,
      feeds.image_url as image_url,
      feeds.rowid as rowid,
      COUNT(CASE WHEN articles.read = 0 THEN 1 END) as unread
    FROM feeds
    LEFT JOIN articles ON feeds.identifier = articles.feed_identifier
    GROUP BY feeds.identifier
    ORDER BY feeds.rowid ASC
  `);
  return camelize<IFeed[]>(snaked);
}

async function addFeed({ displayName, url, interval }: IInitialFeed) {
  console.log('addFeed');
  const identifier = uuid();
  const db = await database();
  await db.select(
    `
    INSERT INTO feeds (identifier, display_name, url, interval)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(identifier) DO UPDATE
    SET display_name = ?, url = ?, interval = ?
    RETURNING *
    `,
    [identifier, displayName, url, interval, displayName, url, interval],
  );
  return camelize<IFeed>({
    identifier,
    displayName,
    url,
    interval,
    type: null,
    lastUpdated: 0,
    imageUrl: null,
    unread: 0,
  });
}

async function updateFeed({
  identifier,
  displayName,
  url,
  interval,
}: IInitialFeed) {
  console.log('updateFeed');
  const db = await database();
  const snaked = await db.select<unknown[]>(
    `
    INSERT INTO feeds (identifier, display_name, url, interval)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(identifier) DO UPDATE
    SET display_name = ?, url = ?, interval = ?
    RETURNING *
    `,
    [identifier, displayName, url, interval, displayName, url, interval],
  );
  return camelize<IFeed>(snaked[0]);
}

async function deleteFeed(identifier: string) {
  console.log('deleteFeed');
  const db = await database();
  await db.execute(
    `
    DELETE FROM feeds
    WHERE identifier = ?
    `,
    [identifier],
  );
}

async function reorderFeed({ from, to }: { from: number; to: number }) {
  console.log('reorderFeed', from, to);
  const db = await database();
  await db.execute(
    `
    UPDATE feeds
    SET rowid = (CASE WHEN rowid = ? THEN -? ELSE -? END)
    WHERE rowid IN (?, ?);

    UPDATE feeds
    SET rowid = -rowid
    WHERE rowid < 0;
    `,
    [from, to, from, from, to],
  );
}

const FeedService = {
  getFeeds,
  addFeed,
  updateFeed,
  deleteFeed,
  reorderFeed,
};

export default FeedService;

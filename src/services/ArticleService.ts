import camelize from '../utils/camelize';

import database from './database/sqlite';

export interface IArticle {
  identifier: string;
  feedIdentifier: string;
  title: string;
  content: string;
  date: Date;
  read: boolean;
  imageUrl: string;
}

async function getArticles(identifier: string | undefined) {
  if (!identifier) return [] as IArticle[];
  console.log('getArticles');

  const db = await database();
  const snaked = await db.select<unknown[]>(
    `
    SELECT *
    FROM articles
    WHERE feed_identifier = ?
    ORDER BY date DESC
    `,
    [identifier],
  );

  if (!snaked) return [] as IArticle[];

  return camelize<IArticle[]>(snaked);
}

async function getArticle(identifier: string | null) {
  if (!identifier) return null as IArticle | null;
  console.log('getArticle');

  const db = await database();
  const snaked = await db.select<unknown[]>(
    `
    SELECT *
    FROM articles
    WHERE identifier = ?
    `,
    [identifier],
  );
  return camelize<IArticle>(snaked[0]);
}

async function readArticle(identifier: string) {
  console.log('readArticle');

  const db = await database();
  await db.execute(
    `
    UPDATE articles
    SET read = 1
    WHERE identifier = ?
    `,
    [identifier],
  );
}

const ArticleService = {
  getArticles,
  getArticle,
  readArticle,
};

export default ArticleService;

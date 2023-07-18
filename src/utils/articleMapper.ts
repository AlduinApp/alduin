import { xxHash32 } from 'js-xxhash';

import Article from '../types/Article';
import { ArticleResponse } from '../types/SyncResponse';

export default function articleMapper({
  id,
  title,
  content,
  date,
  image,
}: ArticleResponse): Article {
  return {
    identifier: xxHash32(id).toString(16),
    title,
    content,
    image,
    read: false,
    date: new Date(date),
  };
}

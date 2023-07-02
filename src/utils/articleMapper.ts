import { xxHash32 } from 'js-xxhash';

import { ArticleResponse } from '../types/SyncResponse';

export default function articleMapper({
  id,
  title,
  content,
  link,
  date,
}: ArticleResponse) {
  return {
    identifier: xxHash32(id).toString(16),
    title,
    content,
    link,
    read: false,
    date: new Date(date),
  };
}

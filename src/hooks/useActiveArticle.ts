import { useEffect, useMemo } from 'react';

import { SET_ACTIVE_ARTICLE } from '../state/view/ViewActionType';

import useActiveFeed from './useActiveFeed';
import useView from './useView';
import useViewDispatch from './useViewDispatch';

export default function useActiveArticle() {
  const activeFeed = useActiveFeed();
  const view = useView();
  const viewDispatch = useViewDispatch();

  const article = useMemo(
    () =>
      activeFeed?.articles.find(
        (article) => article.identifier === view.activeArticle,
      ) ?? null,
    [activeFeed?.articles, view.activeArticle],
  );

  useEffect(() => {
    if (article === null) {
      viewDispatch({
        type: SET_ACTIVE_ARTICLE,
        payload: { identifier: null },
      });
    }
  }, [article, viewDispatch]);

  return article;
}

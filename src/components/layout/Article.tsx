import clsx from 'clsx';
import { memo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useActiveFeed from '../../hooks/useActiveFeed';
import useDataDispatch from '../../hooks/useDataDispatch';
import useViewDispatch from '../../hooks/useViewDispatch';
import { READ_ARTICLE } from '../../state/data/DataActionType';
import { SET_ACTIVE_ARTICLE } from '../../state/view/ViewActionType';
import ArticleType from '../../types/Article';
import SanitizeHTML from '../utils/SanitizeHTML';

interface ArticleProps extends ArticleType {
  active: boolean;
}

function Article({
  identifier,
  title,
  content,
  date,
  read,
  active,
}: ArticleProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const viewDispatch = useViewDispatch();
  const dataDispatch = useDataDispatch();
  const feed = useActiveFeed();

  const selectArticle = useCallback(() => {
    navigate(`${location.pathname}/${identifier}`, { replace: false });
    viewDispatch({
      type: SET_ACTIVE_ARTICLE,
      payload: { identifier },
    });

    if (feed === null) return;
    dataDispatch({
      type: READ_ARTICLE,
      payload: { identifier: feed.identifier, articleIdentifier: identifier },
    });
  }, [
    dataDispatch,
    feed,
    identifier,
    location.pathname,
    navigate,
    viewDispatch,
  ]);

  return (
    <div
      className={clsx(
        'flex justify-between items-center text-xl p-3 font-bold border-l-[3px] cursor-pointer transition-all duration-300 hover:pl-6 hover:bg-neutral-100 hover:dark:bg-neutral-600',
        read
          ? 'border-neutral-50 dark:border-neutral-700 hover:border-neutral-100 dark:hover:border-neutral-600'
          : 'border-orange-400',
        active &&
          'bg-neutral-100 dark:bg-neutral-600 border-neutral-100 dark:border-neutral-600 pl-6',
      )}
      onClick={selectArticle}
    >
      <div className="text-black dark:text-white">
        {title.length > 40 ? `${title.slice(0, 40)}...` : title}
      </div>
      <div className="text-orange-400 text-xl">{date.toLocaleDateString()}</div>
    </div>
  );
}

export default memo(Article);

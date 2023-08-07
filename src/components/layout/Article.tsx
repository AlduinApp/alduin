import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { memo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import usePreferences from '../../hooks/usePreferences';
import useViewDispatch from '../../hooks/useViewDispatch';
import ArticleService, { IArticle } from '../../services/ArticleService';
import { SET_ACTIVE_ARTICLE } from '../../state/view/ViewActionType';
import QueryKey from '../../utils/QueryKey';

interface ArticleProps extends IArticle {
  active: boolean;
}

function Article({
  identifier,
  feedIdentifier,
  title,
  date,
  read,
  imageUrl,
  active,
}: ArticleProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { showArticleThumbnails } = usePreferences();
  const viewDispatch = useViewDispatch();

  const queryClient = useQueryClient();

  const readMutation = useMutation(ArticleService.readArticle, {
    onSuccess: () =>
      Promise.allSettled([
        queryClient.invalidateQueries(QueryKey.articles(feedIdentifier)),
        queryClient.invalidateQueries(QueryKey.feeds()),
      ]),
  });

  const selectArticle = useCallback(() => {
    navigate(`${location.pathname}/${identifier}`, { replace: false });
    viewDispatch({
      type: SET_ACTIVE_ARTICLE,
      payload: { identifier },
    });

    readMutation.mutate(identifier);
  }, [identifier, location.pathname, navigate, readMutation, viewDispatch]);

  return (
    <div
      className={clsx(
        'flex justify-between items-center gap-2 text-lg p-3 font-bold border-l-[3px] cursor-pointer hover:bg-neutral-100 hover:dark:bg-neutral-600',
        read
          ? 'border-neutral-50 dark:border-neutral-700 hover:border-neutral-100 dark:hover:border-neutral-600'
          : 'border-orange-400',
        active &&
          'bg-neutral-100 dark:bg-neutral-600 border-neutral-100 dark:border-neutral-600 pl-6',
      )}
      onClick={selectArticle}
    >
      <div className="flex items-center text-black dark:text-white transition-all duration-300 hover:pl-6 h-12">
        {/* Hacky way to preserve emojis */}
        {title.length > 35 ? `${[...title].slice(0, 35).join('')}...` : title}
      </div>

      <div className="flex items-center text-orange-400 text-xl flex gap-4 flex-nowrap">
        {showArticleThumbnails && imageUrl !== null && (
          <img src={imageUrl} className="w-12 h-12 object-cover rounded-full" />
        )}
        {new Date(date).toLocaleDateString()}
      </div>
    </div>
  );
}

export default memo(Article);

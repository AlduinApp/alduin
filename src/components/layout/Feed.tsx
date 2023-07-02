import clsx from 'clsx';
import { memo, useCallback, useMemo, MouseEvent } from 'react';
import { FaAtom, FaEdit, FaQuestion, FaRss } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import useEditMode from '../../hooks/useEditMode';
import useView from '../../hooks/useView';
import useViewDispatch from '../../hooks/useViewDispatch';
import { OPEN_MODAL, SET_ACTIVE_FEED } from '../../state/view/ViewActionType';
import IFeed from '../../types/Feed';
import FeedType from '../../types/FeedType';
import Button from '../form/Button';

interface FeedProps extends IFeed {}

function Feed({ identifier, displayName, link, articles, type }: FeedProps) {
  const view = useView();
  const viewDispatch = useViewDispatch();
  const navigate = useNavigate();
  const selectFeed = useCallback(() => {
    navigate(`/feeds/${identifier}`);
    viewDispatch({
      type: SET_ACTIVE_FEED,
      payload: { identifier },
    });
  }, [identifier, navigate, viewDispatch]);
  const { editing } = useEditMode();

  const editFeed = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      viewDispatch({
        type: OPEN_MODAL,
        payload: {
          identifier: 'addFeed',
          state: {
            displayName,
            feedLink: link,
          },
        },
      });
    },
    [displayName, link, viewDispatch],
  );

  const unread = useMemo(
    () => articles.filter((article) => !article.read).length,
    [articles],
  );
  const active = useMemo(
    () => view.activeFeed === identifier,
    [identifier, view.activeFeed],
  );

  return (
    <div
      className={clsx(
        'flex justify-between align-middle px-3 py-3  hover:bg-zinc-700 cursor-pointer',
        active && 'bg-zinc-700 text-white',
      )}
      onClick={selectFeed}
    >
      <div className="flex flex-row gap-4 items-center text-xl leading-8">
        {editing && (
          <Button
            variant="primary"
            className="text-white text-base leading-6"
            onClick={editFeed}
          >
            <FaEdit />
          </Button>
        )}

        {type === 'rss' && <FaRss className="w-6 h-6" />}
        {type === 'atom' && <FaAtom className="w-6 h-6" />}
        {type === null && <FaQuestion className="w-6 h-6" />}

        <div>{displayName}</div>
      </div>
      {unread > 0 && (
        <div className="flex justify-center items-center px-2 bg-orange-400 rounded-full text-white">
          {unread}
        </div>
      )}
    </div>
  );
}

export default memo(Feed);

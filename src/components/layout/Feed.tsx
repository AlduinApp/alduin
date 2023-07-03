import clsx from 'clsx';
import { memo, useCallback, useMemo, MouseEvent } from 'react';
import { FaAtom, FaEdit, FaQuestion, FaRss } from 'react-icons/fa';
import { VscJson } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

import useEditMode from '../../hooks/useEditMode';
import useModal from '../../hooks/useModal';
import useView from '../../hooks/useView';
import useViewDispatch from '../../hooks/useViewDispatch';
import { SET_ACTIVE_FEED } from '../../state/view/ViewActionType';
import IFeed from '../../types/Feed';
import Button from '../form/Button';
import { ModalFormContent } from '../modal/AddFeedModal';

interface FeedProps extends IFeed {}

function Feed({
  identifier,
  displayName,
  link,
  articles,
  type,
  interval,
}: FeedProps) {
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
  const { isEditing } = useEditMode();

  const { open } = useModal<ModalFormContent>('addFeed');

  const editFeed = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      open({
        identifier,
        displayName,
        feedLink: link,
        interval: interval.toString(),
      });
    },
    [displayName, identifier, interval, link, open],
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
        'flex justify-between align-middle px-3 py-3 hover:bg-slate-300 hover:dark:bg-zinc-700 cursor-pointer',
        active && 'bg-slate-300 dark:bg-zinc-700 text-black dark:text-white',
      )}
      onClick={selectFeed}
    >
      <div className="flex flex-row gap-4 items-center text-xl leading-8">
        {isEditing && (
          <Button
            variant="primary"
            className="dark:text-white text-base leading-6"
            onClick={editFeed}
          >
            <FaEdit />
          </Button>
        )}

        {type === 'rss' && <FaRss className="w-6 h-6" />}
        {type === 'atom' && <FaAtom className="w-6 h-6" />}
        {type === 'json' && <VscJson className="w-6 h-6" />}
        {type === null && <FaQuestion className="w-6 h-6" />}

        <div>{displayName}</div>
      </div>
      {unread > 0 && (
        <div className="flex justify-center items-center px-2 bg-orange-400 rounded-full text-black dark:text-white">
          {unread}
        </div>
      )}
    </div>
  );
}

export default memo(Feed);

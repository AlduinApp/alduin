import clsx from 'clsx';
import { memo, useCallback } from 'react';
import { FaCogs, FaEdit, FaPlus } from 'react-icons/fa';

import useData from '../../hooks/useData';
import useEditMode from '../../hooks/useEditMode';
import useModal from '../../hooks/useModal';
import SyncAllButton from '../SyncAllButton';
import IconButton from '../form/IconButton';
import { ModalFormContent } from '../modal/AddFeedModal';

import Feed from './Feed';

function FeedList() {
  const data = useData();
  const { toggleEditMode, isEditing } = useEditMode();

  const { open: openAddFeed } = useModal<ModalFormContent>('addFeed');
  const { open: openPreference } = useModal<ModalFormContent>('preference');

  const handleOpenAddFeed = useCallback(() => {
    openAddFeed();
  }, [openAddFeed]);
  const handleOpenPreference = useCallback(() => {
    openPreference();
  }, [openPreference]);

  return (
    <div className="flex-[3_3_0%] bg-neutral-200 dark:bg-zinc-600 flex flex-col shadow-custom-big">
      <div className="overflow-y-auto flex-1">
        {data.feeds.map((feed) => (
          <Feed key={feed.identifier} {...feed} />
        ))}
      </div>
      <div className="flex justify-around items-center h-12 shrink-0">
        <IconButton Icon={FaPlus} onClick={handleOpenAddFeed} />
        <SyncAllButton />
        <IconButton
          Icon={FaEdit}
          onClick={toggleEditMode}
          className={clsx(isEditing && 'text-black dark:text-white')}
        />
        <IconButton Icon={FaCogs} onClick={handleOpenPreference} />
      </div>
    </div>
  );
}

export default memo(FeedList);

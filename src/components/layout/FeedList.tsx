import clsx from 'clsx';
import { memo } from 'react';
import { FaCogs, FaDownload, FaEdit } from 'react-icons/fa';

import useData from '../../hooks/useData';
import useEditMode from '../../hooks/useEditMode';
import SyncAllButton from '../SyncAllButton';
import IconButton from '../form/IconButton';
import { AddFeedModal } from '../modal/AddFeedModal';
import PreferenceModal from '../modal/PreferenceModal';

import Feed from './Feed';

function FeedList() {
  const data = useData();
  const { toggleEditMode, isEditing } = useEditMode();

  return (
    <div className="flex-[3_3_0%] bg-neutral-200 dark:bg-zinc-600 flex flex-col shadow-custom-big">
      <div className="overflow-y-auto flex-1">
        {data.feeds.map((feed) => (
          <Feed key={feed.identifier} {...feed} />
        ))}
      </div>
      <div className="flex justify-around items-center h-12 shrink-0">
        <AddFeedModal />
        <SyncAllButton />
        <IconButton
          Icon={FaEdit}
          onClick={toggleEditMode}
          className={clsx(isEditing && 'text-black dark:text-white')}
        />
        <PreferenceModal />
      </div>
    </div>
  );
}

export default memo(FeedList);

import { memo } from 'react';
import { FaCogs, FaDownload, FaEdit } from 'react-icons/fa';

import useData from '../hooks/useData';
import useEditMode from '../hooks/useEditMode';
import useSync from '../hooks/useSync';

import Feed from './Feed';
import IconButton from './form/IconButton';
import { AddFeedModal } from './modal/AddFeedModal';

function FeedList() {
  const data = useData();
  const { toggleEditMode } = useEditMode();
  const { syncAll } = useSync();

  return (
    <div className="flex-[3_3_0%] bg-zinc-600 flex flex-col shadow-custom-big">
      <div className="overflow-y-auto flex-1">
        {data.feeds.map((feed) => (
          <Feed key={feed.identifier} {...feed} />
        ))}
      </div>
      <div className="flex justify-around items-center h-12 shrink-0">
        <AddFeedModal />
        <IconButton Icon={FaDownload} onClick={syncAll} />
        <IconButton Icon={FaEdit} onClick={toggleEditMode} />
        <IconButton Icon={FaCogs} onClick={() => {}} />
      </div>
    </div>
  );
}

export default memo(FeedList);

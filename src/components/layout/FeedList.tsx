import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import clsx from 'clsx';
import { memo, useCallback, useMemo } from 'react';
import { FaCogs, FaEdit, FaPlus } from 'react-icons/fa';

import useData from '../../hooks/useData';
import useDataDispatch from '../../hooks/useDataDispatch';
import useEditMode from '../../hooks/useEditMode';
import useModal from '../../hooks/useModal';
import usePreference from '../../hooks/usePreference';
import { REORDER_FEED } from '../../state/data/DataActionType';
import { PreferenceState } from '../../state/preference/PreferenceReducer';
import SyncAllButton from '../SyncAllButton';
import IconButton from '../form/IconButton';
import { ModalFormContent } from '../modal/AddFeedModal';

import Feed from './Feed';

function FeedList() {
  const data = useData();
  const dataDispatch = useDataDispatch();
  const preference = usePreference();
  const { toggleEditMode, isEditing } = useEditMode();

  const { open: openAddFeed } = useModal<ModalFormContent>('addFeed');
  const { open: openPreference } = useModal<PreferenceState>('preference');

  const handleOpenAddFeed = useCallback(() => {
    openAddFeed();
  }, [openAddFeed]);
  const handleOpenPreference = useCallback(() => {
    openPreference(preference);
  }, [openPreference, preference]);

  const identifiers: UniqueIdentifier[] = useMemo(
    () => data.feeds.map(({ identifier }) => identifier),
    [data.feeds],
  );

  const sensors = useSensors(useSensor(PointerSensor));
  const modifiers = useMemo(() => [restrictToVerticalAxis], []);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (over === null) {
        return;
      }
      dataDispatch({
        type: REORDER_FEED,
        payload: {
          fromIdentifier: active.id as string,
          toIdentifier: over.id as string,
        },
      });
    },
    [dataDispatch],
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={modifiers}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={identifiers}
        strategy={verticalListSortingStrategy}
      >
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
      </SortableContext>
    </DndContext>
  );
}

export default memo(FeedList);

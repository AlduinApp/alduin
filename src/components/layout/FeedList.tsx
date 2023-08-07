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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { memo, useCallback, useMemo } from 'react';
import { FaCogs, FaEdit, FaPlus } from 'react-icons/fa';

import useEditMode from '../../hooks/useEditMode';
import useFeeds from '../../hooks/useFeeds';
import useModal from '../../hooks/useModal';
import usePreferences from '../../hooks/usePreferences';
import FeedService from '../../services/FeedService';
import { IPreferences } from '../../services/PreferencesService';
import QueryKey from '../../utils/QueryKey';
import SyncAllButton from '../SyncAllButton';
import IconButton from '../form/IconButton';
import { ModalFormContent } from '../modal/AddFeedModal';

import Feed from './Feed';

function FeedList() {
  const preference = usePreferences();
  const { toggleEditMode, isEditing } = useEditMode();

  const { open: openAddFeed } = useModal<ModalFormContent>('addFeed');
  const { open: openPreference } = useModal<IPreferences>('preference');

  const handleOpenAddFeed = useCallback(() => {
    openAddFeed();
  }, [openAddFeed]);
  const handleOpenPreference = useCallback(() => {
    openPreference(preference);
  }, [openPreference, preference]);

  const { feeds, isLoading, isError } = useFeeds();

  const sensors = useSensors(useSensor(PointerSensor));
  const modifiers = useMemo(() => [restrictToVerticalAxis], []);

  const queryClient = useQueryClient();
  const reorderMutation = useMutation(FeedService.reorderFeed, {
    onSuccess: async () => queryClient.invalidateQueries(QueryKey.feeds()),
  });

  const identifiers: UniqueIdentifier[] = useMemo(
    () => feeds.map(({ rowid }) => rowid),
    [feeds],
  );

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (over === null) return;

      reorderMutation.mutate(
        {
          from: active.id as number,
          to: over.id as number,
        },
        {
          onSuccess: async () =>
            queryClient.invalidateQueries(QueryKey.feeds()),
        },
      );
    },
    [queryClient, reorderMutation],
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

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
            {feeds.map((feed) => (
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

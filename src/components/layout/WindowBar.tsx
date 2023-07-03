import { appWindow } from '@tauri-apps/api/window';
import clsx from 'clsx';
import { memo, useCallback } from 'react';
import {
  FaArrowLeft,
  FaWindowClose,
  FaWindowMaximize,
  FaWindowMinimize,
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

import useView from '../../hooks/useView';
import useViewDispatch from '../../hooks/useViewDispatch';
import {
  SET_ACTIVE_ARTICLE,
  SET_ACTIVE_FEED,
} from '../../state/view/ViewActionType';
import IconButton from '../form/IconButton';

function WindowBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const view = useView();
  const viewDispatch = useViewDispatch();

  const goBack = useCallback(() => {
    navigate(-1);
    if (view.activeArticle !== null) {
      viewDispatch({
        type: SET_ACTIVE_ARTICLE,
        payload: { identifier: null },
      });
      return;
    }

    if (view.activeFeed !== null) {
      viewDispatch({
        type: SET_ACTIVE_FEED,
        payload: { identifier: null },
      });
    }
  }, [navigate, view.activeArticle, view.activeFeed, viewDispatch]);

  return (
    <div
      data-tauri-drag-region
      className="bg-neutral-200 dark:bg-zinc-600 text-neutral-800 dark:text-zinc-400 flex flex-row justify-end h-12 min-h-[3rem] items-center shadow-custom-big z-10"
    >
      <div
        className="flex flex-1 items-center justify-start lg:hidden"
        data-tauri-drag-region
      >
        <IconButton
          onClick={goBack}
          Icon={FaArrowLeft}
          className={clsx('ml-2', location.pathname === '/feeds' && 'hidden')}
        />
      </div>
      <div
        className="flex flex-1 items-center justify-end"
        data-tauri-drag-region
      >
        <IconButton
          onClick={() => appWindow.minimize()}
          Icon={FaWindowMinimize}
          className="mr-2"
        />
        <IconButton
          onClick={() => appWindow.toggleMaximize()}
          Icon={FaWindowMaximize}
          className="mr-2"
        />
        <IconButton
          onClick={() => appWindow.close()}
          Icon={FaWindowClose}
          className="mr-2"
        />
      </div>
    </div>
  );
}

export default memo(WindowBar);

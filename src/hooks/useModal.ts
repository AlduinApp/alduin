import { useCallback, useMemo } from 'react';

import { OPEN_MODAL } from '../state/view/ViewActionType';
import { ModalName } from '../state/view/ViewReducer';

import useView from './useView';
import useViewDispatch from './useViewDispatch';

export default function useModal<T>(identifier: ModalName) {
  const view = useView();
  const viewDispatch = useViewDispatch();

  const { open: isOpen, state } = useMemo(
    () => view.modals[identifier],
    [identifier, view.modals],
  );

  const open = useCallback(
    (state?: T) => {
      viewDispatch({
        type: OPEN_MODAL,
        payload: {
          identifier,
          state: state ?? null,
        },
      });
    },
    [identifier, viewDispatch],
  );

  return {
    open,
    isOpen,
    state: state as T,
    isStateEmpty: state === null,
  };
}

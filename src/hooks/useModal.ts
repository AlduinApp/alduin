import { useMemo } from 'react';

import { ModalName } from '../state/view/ViewReducer';

import useView from './useView';

export default function useModal<T>(identifier: ModalName) {
  const view = useView();

  const { open, state } = useMemo(
    () => view.modals[identifier],
    [identifier, view.modals],
  );

  return {
    open,
    state: state as T,
    isStateEmpty: state === null,
  };
}

import { useCallback } from 'react';

import { TOGGLE_EDIT_MODE } from '../state/view/ViewActionType';

import useView from './useView';
import useViewDispatch from './useViewDispatch';

export default function useEditMode() {
  const { editMode } = useView();
  const viewDispatch = useViewDispatch();

  const toggleEditMode = useCallback(() => {
    viewDispatch({ type: TOGGLE_EDIT_MODE });
  }, [viewDispatch]);

  return { editing: editMode, toggleEditMode };
}

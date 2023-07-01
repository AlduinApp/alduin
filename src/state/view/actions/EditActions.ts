import { Draft } from 'immer';

import { TOGGLE_EDIT_MODE, ViewActionType } from '../ViewActionType';
import { ViewState } from '../ViewReducer';

export type ToggleEditModeAction = ViewActionType<typeof TOGGLE_EDIT_MODE>;

export function toggleEditMode(draft: Draft<ViewState>) {
  draft.editMode = !draft.editMode;
}

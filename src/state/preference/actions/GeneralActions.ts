import { Draft } from 'immer';

import { PreferenceActionType, SET_PREFERENCES } from '../PreferenceActionType';
import { PreferenceState } from '../PreferenceReducer';

export type SetPreferencesAction = PreferenceActionType<
  typeof SET_PREFERENCES,
  PreferenceState
>;

export function setPreferences(
  draft: Draft<PreferenceState>,
  payload: SetPreferencesAction['payload'],
) {
  draft.darkMode = payload.darkMode;
  draft.showFeedIcons = payload.showFeedIcons;
  draft.showArticleThumbnails = payload.showArticleThumbnails;
}

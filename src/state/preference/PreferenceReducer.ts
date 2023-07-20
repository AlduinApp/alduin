import { Draft, produce } from 'immer';
import { Reducer } from 'react';

import { SET_PREFERENCES } from './PreferenceActionType';
import * as GeneralActions from './actions/GeneralActions';
import { SetPreferencesAction } from './actions/GeneralActions';

export interface PreferenceState {
  darkMode: boolean;
  showFeedIcons: boolean;
  showArticleThumbnails: boolean;
  autoStart: boolean;
  startMinimized: boolean;
}

export const initialPreferenceState: PreferenceState = {
  darkMode: true,
  showFeedIcons: true,
  showArticleThumbnails: true,
  autoStart: true,
  startMinimized: false,
};

export type PreferenceActions = SetPreferencesAction;

function innerPreferenceReducer(
  draft: Draft<PreferenceState>,
  action: PreferenceActions,
) {
  switch (action.type) {
    case SET_PREFERENCES:
      return GeneralActions.setPreferences(draft, action.payload);
    default:
      break;
  }
}

export const preferenceReducer: Reducer<PreferenceState, PreferenceActions> =
  produce(innerPreferenceReducer);

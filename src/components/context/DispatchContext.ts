import { createContext, Dispatch } from 'react';

import { DataActions } from '../../state/data/DataReducer';
import { PreferenceActions } from '../../state/preference/PreferenceReducer';
import { ViewActions } from '../../state/view/ViewReducer';

interface DispatchState {
  data: Dispatch<DataActions>;
  view: Dispatch<ViewActions>;
  preference: Dispatch<PreferenceActions>;
}

export const DispatchContext = createContext<DispatchState>({
  data: () => {
    throw new Error('DataContext not initialized');
  },
  view: () => {
    throw new Error('ViewContext not initialized');
  },
  preference: () => {
    throw new Error('PreferenceContext not initialized');
  },
});

export const DispatchProvider = DispatchContext.Provider;

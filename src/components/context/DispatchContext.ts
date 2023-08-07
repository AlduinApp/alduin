import { createContext, Dispatch } from 'react';

import { ViewActions } from '../../state/view/ViewReducer';

interface DispatchState {
  view: Dispatch<ViewActions>;
}

export const DispatchContext = createContext<DispatchState>({
  view: () => {
    throw new Error('ViewContext not initialized');
  },
});

export const DispatchProvider = DispatchContext.Provider;

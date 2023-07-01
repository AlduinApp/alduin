import { createContext } from 'react';

import { initialViewState } from '../../state/view/ViewReducer';

export const ViewContext = createContext(initialViewState);

export const ViewProvider = ViewContext.Provider;

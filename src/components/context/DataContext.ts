import { createContext } from 'react';

import { initialDataState } from '../../state/data/DataReducer';

export const DataContext = createContext(initialDataState);

export const DataProvider = DataContext.Provider;

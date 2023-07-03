import { createContext } from 'react';

import { initialPreferenceState } from '../../state/preference/PreferenceReducer';

export const PreferenceContext = createContext(initialPreferenceState);

export const PreferenceProvider = PreferenceContext.Provider;

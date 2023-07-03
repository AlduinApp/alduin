import { useContext } from 'react';

import { PreferenceContext } from '../components/context/PreferenceContext';

export default function usePreference() {
  const ctx = useContext(PreferenceContext);
  return ctx;
}

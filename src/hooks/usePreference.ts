import { useContext } from 'react';

import { PreferenceContext } from '../components/context/PreferenceContext';

export default function usePreference() {
  const ctx = useContext(PreferenceContext);
  console.log('pref', ctx);
  return ctx;
}

import { useMemo } from 'react';

import usePreference from './usePreference';

export default function useDark() {
  const preference = usePreference();
  const isDark = useMemo(() => preference.darkMode, [preference]);
  return isDark;
}

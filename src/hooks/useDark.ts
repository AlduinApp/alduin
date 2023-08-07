import usePreferences from './usePreferences';

export default function useDark() {
  const { darkMode } = usePreferences();
  return darkMode;
}

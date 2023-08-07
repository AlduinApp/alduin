import { useQuery } from '@tanstack/react-query';

import PreferencesService from '../services/PreferencesService';
import QueryKey from '../utils/QueryKey';

export default function usePreferences() {
  const { data } = useQuery(
    QueryKey.preferences(),
    PreferencesService.getPreferences,
    {
      initialData: PreferencesService.defaultPreferences,
    },
  );
  return data;
}

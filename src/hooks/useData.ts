import { useContext } from 'react';

import { DataContext } from '../components/context/DataContext';

export default function useData() {
  return useContext(DataContext);
}

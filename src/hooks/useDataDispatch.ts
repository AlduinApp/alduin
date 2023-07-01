import { useContext } from 'react';

import { DispatchContext } from '../components/context/DispatchContext';

export default function useDataDispatch() {
  return useContext(DispatchContext).data;
}

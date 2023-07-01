import { useContext } from 'react';

import { DispatchContext } from '../components/context/DispatchContext';

export default function useViewDispatch() {
  return useContext(DispatchContext).view;
}

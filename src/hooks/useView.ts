import { useContext } from 'react';

import { ViewContext } from '../components/context/ViewContext';

export default function useView() {
  return useContext(ViewContext);
}

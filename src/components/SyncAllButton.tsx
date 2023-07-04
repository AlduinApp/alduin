import { useMemo } from 'react';
import { FaDownload, FaSpinner } from 'react-icons/fa';

import useSync from '../hooks/useSync';
import useView from '../hooks/useView';

import IconButton from './form/IconButton';

export default function SyncAllButton() {
  const { syncAll } = useSync();
  const view = useView();

  const isSyncing = useMemo(() => view.fetching > 0, [view.fetching]);

  if (isSyncing) {
    return <IconButton Icon={FaSpinner} className="animate-spin" />;
  }

  return <IconButton Icon={FaDownload} onClick={syncAll} />;
}
